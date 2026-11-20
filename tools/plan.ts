// tools/plan.ts: write a sparring plan for tools/judge.ts.
//
//   node tools/plan.ts <tag> <reps> <candidate image>... [--vs <image>...] [--route <endpoint>]
//
// Every candidate plays every opponent in opponents/index.json (the downloaded top entries,
// or the images after --vs), in both orders (A/B and B/A), <reps> times each. Writes
// judge-runs/plan-<tag>.json and prints its path. Node 22, standard library only.

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';

const ROOT = resolve(dirname(new URL(import.meta.url).pathname), '..');
const args = process.argv.slice(2);
const [tag, repsText] = args;
const routeAt = args.indexOf('--route');
const route = routeAt < 0 ? '' : args.splice(routeAt, 2)[1];
const vsAt = args.indexOf('--vs');
const candidates = args.slice(2, vsAt < 0 ? undefined : vsAt);
const reps = Number(repsText);
if (!tag || !Number.isInteger(reps) || reps < 1 || candidates.length === 0) {
  console.error('usage: node tools/plan.ts <tag> <reps> <candidate>... [--vs <opponent>...]');
  process.exit(1);
}
const opponents = vsAt < 0 ? JSON.parse(readFileSync(join(ROOT, 'opponents/index.json'), 'utf8')).map((o) => o.file) : args.slice(vsAt + 1);

const games = [];
for (let rep = 1; rep <= reps; rep++) {
  for (const c of candidates) {
    for (const o of opponents) {
      games.push({ a: c, b: o, rep });
      games.push({ a: o, b: c, rep });
    }
  }
}
mkdirSync(join(ROOT, 'judge-runs'), { recursive: true });
const out = join(ROOT, 'judge-runs', `plan-${tag}.json`);
writeFileSync(out, JSON.stringify({ tag, route, games }, null, 1) + '\n');
console.log(`${out}: ${games.length} calls (${candidates.length} candidates x ${opponents.length} opponents x 2 orders x ${reps} reps)`);
