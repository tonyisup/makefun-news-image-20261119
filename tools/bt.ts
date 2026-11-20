// tools/bt.ts: Bradley-Terry ratings over every call in judge-runs/games.jsonl.
//
//   node tools/bt.ts [--ref <image>] [--only <tag>,<tag>] [--consistency]
//
// Each call is one observation: the pair (A, B) and the share A took, scored as RULES.txt
// scores a call (the pick 0.5 + margin/10, the other the rest; no verdict 0.5 each). The
// model is P(A beats B) = 1 / (1 + exp(-(t_A - t_B))), fitted by Newton's method on the
// fractional-outcome log-likelihood with a weak N(0, 3^2) prior so an unbeaten image stays
// finite. Players are images by sha256, so a re-rendered file is a new player.
//
// Printed per image: strength relative to the opponents' mean, its standard error (from the
// inverse Hessian, scaled by the dispersion phi when phi > 1), the expected share against
// the opponents, the raw mean share, the number of calls, and with --ref the difference to
// that image with the standard error of the difference (covariance included) and z.
// --consistency adds the noise report: how often the same ordered pair asked again
// changed its winner, and how often the two orders of one pair named different winners.
// Node 22, standard library only.

import { readFileSync, existsSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';

const ROOT = resolve(dirname(new URL(import.meta.url).pathname), '..');
const args = process.argv.slice(2);
const opt = (name) => {
  const i = args.indexOf(name);
  return i < 0 ? null : args[i + 1];
};
const only = opt('--only') ? new Set(opt('--only').split(',')) : null;
const ref = opt('--ref');

const calls = readFileSync(join(ROOT, 'judge-runs/games.jsonl'), 'utf8')
  .split('\n')
  .filter(Boolean)
  .map((l) => JSON.parse(l))
  .filter((g) => !only || only.has(g.tag));

// Players: by sha256, labelled by the latest file name seen for it.
const label = new Map();
for (const g of calls) {
  label.set(g.a_sha256, g.a);
  label.set(g.b_sha256, g.b);
}
const opponentFiles = new Set(JSON.parse(readFileSync(join(ROOT, 'opponents/index.json'), 'utf8')).map((o) => o.file));
const ids = [...label.keys()];
const index = new Map(ids.map((id, i) => [id, i]));
const n = ids.length;
const obs = calls.map((g) => ({ i: index.get(g.a_sha256), j: index.get(g.b_sha256), s: g.score.a }));

const sigmoid = (x) => 1 / (1 + Math.exp(-x));
const PRIOR_VAR = 9;

// Solve M x = v by Gauss-Jordan (n is small), returning the inverse when v is null.
function invert(M) {
  const k = M.length;
  const A = M.map((row, r) => [...row, ...Array.from({ length: k }, (_, c) => (c === r ? 1 : 0))]);
  for (let c = 0; c < k; c++) {
    let p = c;
    for (let r = c + 1; r < k; r++) if (Math.abs(A[r][c]) > Math.abs(A[p][c])) p = r;
    [A[c], A[p]] = [A[p], A[c]];
    const d = A[c][c];
    for (let x = 0; x < 2 * k; x++) A[c][x] /= d;
    for (let r = 0; r < k; r++) {
      if (r === c) continue;
      const f = A[r][c];
      if (f !== 0) for (let x = 0; x < 2 * k; x++) A[r][x] -= f * A[c][x];
    }
  }
  return A.map((row) => row.slice(k));
}

let t = new Array(n).fill(0);
let H;
for (let iter = 0; iter < 100; iter++) {
  const g = t.map((x) => -x / PRIOR_VAR);
  H = Array.from({ length: n }, (_, r) => Array.from({ length: n }, (_, c) => (r === c ? 1 / PRIOR_VAR : 0)));
  for (const { i, j, s } of obs) {
    const p = sigmoid(t[i] - t[j]);
    g[i] += s - p;
    g[j] -= s - p;
    const w = p * (1 - p);
    H[i][i] += w;
    H[j][j] += w;
    H[i][j] -= w;
    H[j][i] -= w;
  }
  const C = invert(H);
  const step = C.map((row) => row.reduce((acc, v, c) => acc + v * g[c], 0));
  t = t.map((x, k) => x + step[k]);
  if (Math.max(...step.map(Math.abs)) < 1e-9) break;
}
let cov = invert(H);

// Dispersion: Pearson chi-square over residual degrees of freedom; scales the errors when > 1.
let chi = 0;
for (const { i, j, s } of obs) {
  const p = sigmoid(t[i] - t[j]);
  chi += (s - p) ** 2 / (p * (1 - p));
}
const df = Math.max(1, obs.length - (n - 1));
const phi = chi / df;
const scale = Math.max(1, phi);
cov = cov.map((row) => row.map((v) => v * scale));

const oppIdx = ids.map((id, k) => (opponentFiles.has(label.get(id)) ? k : -1)).filter((k) => k >= 0);
const oppMean = oppIdx.length ? oppIdx.reduce((a, k) => a + t[k], 0) / oppIdx.length : 0;
// SE of (t_k - mean of opponents): var of a linear contrast.
function contrastSE(weights) {
  let v = 0;
  for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) v += weights[r] * weights[c] * cov[r][c];
  return Math.sqrt(Math.max(0, v));
}

const refId = ref ? ids.find((id) => label.get(id) === ref) : null;
if (ref && !refId) console.error(`--ref ${ref}: no such image among the calls`);

const rows = ids.map((id, k) => {
  const w = new Array(n).fill(0);
  w[k] += 1;
  for (const o of oppIdx) w[o] -= 1 / oppIdx.length;
  const mine = obs.filter((o) => o.i === k || o.j === k);
  const raw = mine.reduce((a, o) => a + (o.i === k ? o.s : 1 - o.s), 0) / (mine.length || 1);
  const vsOpp = oppIdx.filter((o) => o !== k);
  const expected = vsOpp.length ? vsOpp.reduce((a, o) => a + sigmoid(t[k] - t[o]), 0) / vsOpp.length : NaN;
  let diff = null;
  if (refId && id !== refId) {
    const r = index.get(refId);
    const d = t[k] - t[r];
    const se = Math.sqrt(Math.max(0, cov[k][k] + cov[r][r] - 2 * cov[k][r]));
    diff = { d, se, z: d / se };
  }
  return { file: label.get(id), opponent: opponentFiles.has(label.get(id)), rating: t[k] - oppMean, se: contrastSE(w), expected, raw, calls: mine.length, diff };
});
rows.sort((a, b) => b.rating - a.rating);

const f = (x, d = 2) => (Number.isFinite(x) ? (x >= 0 ? ' ' : '') + x.toFixed(d) : '   -');
console.log(`${obs.length} calls, ${n} images, phi ${phi.toFixed(2)} (errors scaled by ${scale.toFixed(2)})${only ? `, tags ${[...only].join(',')}` : ''}`);
console.log('rating = strength vs the opponents\' mean (logit); E = expected share vs the 5 opponents; raw = mean share of its calls');
console.log(`${'image'.padEnd(42)} rating    se     E     raw  calls${refId ? '   diff vs ref   se    z' : ''}`);
for (const r of rows) {
  const name = (r.opponent ? '  ' : '* ') + r.file;
  const d = r.diff ? `  ${f(r.diff.d)}  ${r.diff.se.toFixed(2)}  ${f(r.diff.z, 1)}` : '';
  console.log(`${name.padEnd(42)} ${f(r.rating)}  ${r.se.toFixed(2)}  ${r.expected.toFixed(2)}  ${r.raw.toFixed(2)}  ${String(r.calls).padStart(4)}${d}`);
}

if (args.includes('--consistency')) {
  // Same ordered pair asked more than once: did the winner change?
  const byOrdered = new Map();
  const byPair = new Map();
  for (const g of calls) {
    if (!g.verdict) continue;
    const ko = `${g.a_sha256}|${g.b_sha256}`;
    if (!byOrdered.has(ko)) byOrdered.set(ko, []);
    byOrdered.get(ko).push(g.verdict.winner);
    const winnerSha = g.verdict.winner === 'A' ? g.a_sha256 : g.b_sha256;
    const kp = [g.a_sha256, g.b_sha256].sort().join('|');
    if (!byPair.has(kp)) byPair.set(kp, { orders: new Map() });
    const e = byPair.get(kp);
    const ord = g.a_sha256 < g.b_sha256 ? 'fwd' : 'rev';
    if (!e.orders.has(ord)) e.orders.set(ord, []);
    e.orders.get(ord).push(winnerSha);
  }
  let repPairs = 0;
  let repFlips = 0;
  for (const ws of byOrdered.values()) {
    for (let x = 1; x < ws.length; x++) {
      repPairs++;
      if (ws[x] !== ws[0]) repFlips++;
    }
  }
  let orderPairs = 0;
  let orderSplit = 0;
  for (const { orders } of byPair.values()) {
    const fw = orders.get('fwd') ?? [];
    const rv = orders.get('rev') ?? [];
    for (const x of fw) for (const y of rv) {
      orderPairs++;
      if (x !== y) orderSplit++;
    }
  }
  console.log(`same ordered pair asked again: ${repFlips} of ${repPairs} repeats named a different winner (${((100 * repFlips) / (repPairs || 1)).toFixed(0)}%)`);
  console.log(`the two orders of one pair: ${orderSplit} of ${orderPairs} order pairings named different images (${((100 * orderSplit) / (orderPairs || 1)).toFixed(0)}%)`);
}
