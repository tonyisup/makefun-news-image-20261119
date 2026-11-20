// tools/judge.ts: a local copy of make.fun's news-image judge, for sparring only.
//
// It sends the judge's published instructions (RULES.txt, "The judge", word for word),
// then the house's answer-format suffix, Entry A and Entry B to z-ai/glm-5.3-flash on
// OpenRouter at reasoning effort high and max_tokens 12,100, the request shape the kit's
// own harness source builds (harness-src.tar.gz: grader/judge-call.ts, judgeRequestBody).
// Each verdict is appended to judge-runs/games.jsonl with its margin, reason, tokens and cost.
//
// Node 22, standard library only. Plain JavaScript syntax, so it runs with or without
// TypeScript type stripping.
//
// Usage (from the repo root):
//   node tools/judge.ts <A image> <B image>                one call, printed
//   node tools/judge.ts --plan <plan.json> [--concurrency 6]
//        plan.json: {"tag": "...", "games": [{"a": file, "b": file, "rep": n}, ...]}
//        every call not already recorded under that tag/a/b/rep is sent; reruns resume
//   JUDGE_ROUTE=z-ai/fp8 pins the OpenRouter endpoint(s), comma-separated; a plan's "route" wins
//   node tools/judge.ts --spend                            OpenRouter spend since judge-runs/spend-start.json
//
// The key: OPENROUTER_API_KEY from the environment, else from the .env file JUDGE_ENV_FILE
// names (default ~/.hermes/profiles/makefun/.env). It is never printed, logged or written.

import { readFileSync, appendFileSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { homedir } from 'node:os';
import { join, resolve, dirname } from 'node:path';

const MODEL = 'z-ai/glm-5.3-flash';
const MAX_TOKENS = 12100;
const EFFORT = 'high';
const REASON_MAX = 600; // grader/judge-call.ts JUDGE_REASON_MAX
const API = 'https://openrouter.ai/api/v1';
const ROOT = resolve(dirname(new URL(import.meta.url).pathname), '..');
const RUNS = join(ROOT, 'judge-runs');
const GAMES = join(RUNS, 'games.jsonl');
const RULES = process.env.JUDGE_RULES || resolve(ROOT, '../news-image-20261119-kit/RULES.txt');

// ---------- the prompt ----------

// The judge's instructions, cut from RULES.txt between "word for word:" and the line that
// starts the house's own answer format, so not one character is retyped.
function judgeInstructions() {
  const lines = readFileSync(RULES, 'utf8').split('\n');
  const start = lines.findIndex((l) => l.startsWith('The judge is an AI model') && l.trimEnd().endsWith('word for word:'));
  const end = lines.findIndex((l, i) => i > start && l.startsWith('After them the house adds its answer format'));
  if (start < 0 || end < 0) throw new Error(`cannot find the judge's instructions in ${RULES}`);
  const text = lines.slice(start + 1, end).join('\n').trim();
  if (!text.startsWith("You are make.fun's judge") || !text.endsWith('let that decide unless a later one differs by much more.')) {
    throw new Error('the judge instructions cut from RULES.txt do not start and end as expected');
  }
  return text;
}

// grader/judge-call.ts JUDGE_VERDICT_INSTRUCTIONS (verdict v2), joined with '\n' as there.
const VERDICT_INSTRUCTIONS = [
  '## Your answer',
  '',
  'The user message holds two entries, Entry A and Entry B. Judge them by the criteria above: compare them point by point first, then pick the one that meets the criteria better and say by how much.',
  'There is no tie. When they seem equal, look for the detail that separates them, pick the one you would rank higher, and give it margin 1.',
  '',
  'The margin is how far the winner is ahead:',
  '1: by a hair, nearly even but the winner edges it',
  '2: slightly better',
  '3: clearly better',
  '4: much better',
  '5: overwhelmingly better',
  '',
  'Answer with one JSON object and nothing else, its keys in this order:',
  `{"reason": "your comparison and why the winner wins, at most ${REASON_MAX} characters", "winner": "A" or "B", "margin": 1, 2, 3, 4 or 5}`,
].join('\n');
const ANSWER_LINE = 'Answer with the one JSON object your instructions describe: {"reason": "...", "winner": "A" or "B", "margin": 1 to 5}.';
const TOOL_DESCRIPTION = 'Record your verdict: why, the entry that wins (A or B), and its margin from 1 (by a hair) to 5 (overwhelmingly better).';
const SCHEMA = {
  type: 'object',
  properties: {
    reason: { type: 'string', maxLength: REASON_MAX, description: `Your comparison and why the winner wins, at most ${REASON_MAX} characters.` },
    winner: { type: 'string', enum: ['A', 'B'], description: 'The entry that wins: A or B. Never a tie.' },
    margin: { type: 'integer', minimum: 1, maximum: 5, description: 'How far the winner is ahead: 1 by a hair, 2 slightly, 3 clearly, 4 much, 5 overwhelmingly better.' },
  },
  required: ['reason', 'winner', 'margin'],
  additionalProperties: false,
};

function mediaType(bytes) {
  const hex = bytes.subarray(0, 12).toString('hex');
  if (hex.startsWith('89504e470d0a1a0a')) return 'image/png';
  if (hex.startsWith('ffd8ff')) return 'image/jpeg';
  if (hex.startsWith('47494638')) return 'image/gif';
  if (hex.startsWith('52494646') && hex.slice(16, 24) === '57454250') return 'image/webp';
  throw new Error('not a PNG, JPEG, GIF or WebP image');
}

function image(file) {
  const bytes = readFileSync(file);
  return { file, bytes, sha256: createHash('sha256').update(bytes).digest('hex'), url: `data:${mediaType(bytes)};base64,${bytes.toString('base64')}` };
}

// grader/judge-call.ts judgeRequestBody: form 'answer' (json_object), then 'tool' on a retry.
// `route` pins OpenRouter endpoints (e.g. "z-ai/fp8"), with no fallback: the house pins its
// judge's provider too, but does not publish which, and an unpinned call lands on any of ~40
// endpoints (some send the model a smaller copy of each image). Recorded with every verdict.
function requestBody(system, a, b, form, route) {
  const base = {
    model: MODEL,
    messages: [
      { role: 'system', content: system },
      {
        role: 'user',
        content: [
          { type: 'text', text: '## Entry A' },
          { type: 'image_url', image_url: { url: a.url } },
          { type: 'text', text: '## Entry B' },
          { type: 'image_url', image_url: { url: b.url } },
          { type: 'text', text: ANSWER_LINE },
        ],
      },
    ],
    max_tokens: MAX_TOKENS,
    reasoning_effort: EFFORT,
    usage: { include: true }, // OpenRouter accounting only: reports the call's cost; not sent to the model
    ...(route ? { provider: { only: route.split(','), allow_fallbacks: false } } : {}),
  };
  if (form === 'tool') {
    return { ...base, tools: [{ type: 'function', function: { name: 'verdict', description: TOOL_DESCRIPTION, parameters: SCHEMA } }], tool_choice: { type: 'function', function: { name: 'verdict' } } };
  }
  return { ...base, response_format: { type: 'json_object' } };
}

// ---------- the key ----------

function apiKey() {
  if (process.env.OPENROUTER_API_KEY) return process.env.OPENROUTER_API_KEY;
  const file = process.env.JUDGE_ENV_FILE || join(homedir(), '.hermes/profiles/makefun/.env');
  for (const line of readFileSync(file, 'utf8').split('\n')) {
    const m = line.match(/^\s*(?:export\s+)?OPENROUTER_API_KEY\s*=\s*(.*)\s*$/);
    if (m) {
      const v = m[1].replace(/^['"]|['"]$/g, '').trim();
      if (v) return v;
    }
  }
  throw new Error('no OPENROUTER_API_KEY in the environment or the .env file');
}

// ---------- one call ----------

// The verdict as grader/judge-call.ts reads it: winner A/B in any case, margin an integer 1-5
// (or a one-digit string), the reason cut at 600. Anything else is no verdict.
function parseVerdict(text) {
  if (typeof text !== 'string') return null;
  const s = text.indexOf('{');
  const e = text.lastIndexOf('}');
  if (s < 0 || e <= s) return null;
  let o;
  try {
    o = JSON.parse(text.slice(s, e + 1));
  } catch {
    return null;
  }
  const winner = String(o.winner ?? '').trim().toUpperCase();
  const margin = typeof o.margin === 'string' && /^\s*[0-9]\s*$/.test(o.margin) ? Number(o.margin) : o.margin;
  if ((winner !== 'A' && winner !== 'B') || !Number.isInteger(margin) || margin < 1 || margin > 5) return null;
  return { winner, margin, reason: String(o.reason ?? '').trim().slice(0, REASON_MAX) };
}

async function post(body, key) {
  for (let attempt = 1; ; attempt++) {
    let res;
    try {
      res = await fetch(`${API}/chat/completions`, {
        method: 'POST',
        headers: { authorization: `Bearer ${key}`, 'content-type': 'application/json', 'x-title': 'makefun-news-image local judge' },
        body: JSON.stringify(body),
        signal: AbortSignal.timeout(300_000),
      });
    } catch (err) {
      if (attempt >= 3) throw new Error(`network: ${err.message}`);
      await new Promise((r) => setTimeout(r, 4000 * attempt));
      continue;
    }
    const json = await res.json().catch(() => null);
    // Transport-level failures (rate limit, upstream down) are retried; they are not verdicts.
    if ((res.status === 429 || res.status >= 500) && attempt < 4) {
      await new Promise((r) => setTimeout(r, 5000 * attempt));
      continue;
    }
    if (!res.ok) throw new Error(`HTTP ${res.status}: ${JSON.stringify(json?.error ?? json).slice(0, 300)}`);
    return json;
  }
}

function answerText(json, form) {
  const msg = json?.choices?.[0]?.message;
  if (!msg) return null;
  if (form === 'tool') return msg.tool_calls?.[0]?.function?.arguments ?? msg.content ?? null;
  return msg.content ?? null;
}

// One question to the judge. Like the house: an answer with no verdict is asked once more
// (the retry in the forced-tool form); a verdict, once given, is kept.
export async function judge(system, a, b, key, route) {
  const attempts = [];
  for (const form of ['answer', 'tool']) {
    const started = Date.now();
    const json = await post(requestBody(system, a, b, form, route), key);
    const text = answerText(json, form);
    const verdict = parseVerdict(text);
    attempts.push({
      form,
      ms: Date.now() - started,
      id: json?.id ?? null,
      provider: json?.provider ?? null,
      model: json?.model ?? null,
      finish: json?.choices?.[0]?.finish_reason ?? null,
      prompt_tokens: json?.usage?.prompt_tokens ?? null,
      completion_tokens: json?.usage?.completion_tokens ?? null,
      reasoning_tokens: json?.usage?.completion_tokens_details?.reasoning_tokens ?? null,
      cost: json?.usage?.cost ?? null,
      raw: verdict ? undefined : String(text ?? '').slice(0, 400),
    });
    if (verdict) return { verdict, attempts };
  }
  return { verdict: null, attempts };
}

// The share of the call each side takes, as RULES.txt scores it: the pick 0.5 + margin/10.
export function callScore(verdict) {
  if (!verdict) return { a: 0.5, b: 0.5 };
  const w = 0.5 + verdict.margin / 10;
  return verdict.winner === 'A' ? { a: w, b: 1 - w } : { a: 1 - w, b: w };
}

// ---------- spend ----------

async function keyUsage(key) {
  const res = await fetch(`${API}/key`, { headers: { authorization: `Bearer ${key}` } });
  const json = await res.json();
  if (!res.ok) throw new Error(`key info HTTP ${res.status}`);
  return Number(json?.data?.usage ?? NaN);
}

async function spend(key) {
  mkdirSync(RUNS, { recursive: true });
  const startFile = join(RUNS, 'spend-start.json');
  const now = await keyUsage(key);
  if (!existsSync(startFile)) writeFileSync(startFile, JSON.stringify({ usage: now, at: new Date().toISOString() }) + '\n');
  const start = JSON.parse(readFileSync(startFile, 'utf8'));
  let logged = 0;
  if (existsSync(GAMES)) {
    for (const line of readFileSync(GAMES, 'utf8').split('\n')) {
      if (!line) continue;
      for (const at of JSON.parse(line).attempts ?? []) logged += at.cost ?? 0;
    }
  }
  return { since: start.at, key_delta_usd: now - start.usage, logged_usd: logged };
}

// ---------- plans ----------

async function runPlan(planFile, concurrency, key) {
  const plan = JSON.parse(readFileSync(planFile, 'utf8'));
  const system = `${judgeInstructions().trimEnd()}\n\n${VERDICT_INSTRUCTIONS}`;
  mkdirSync(RUNS, { recursive: true });
  const done = new Set();
  if (existsSync(GAMES)) {
    for (const line of readFileSync(GAMES, 'utf8').split('\n')) {
      if (!line) continue;
      const g = JSON.parse(line);
      if (g.verdict) done.add(`${g.tag}|${g.route ?? ''}|${g.a_sha256}|${g.b_sha256}|${g.rep}`);
    }
  }
  const cache = new Map();
  const img = (f) => {
    const p = resolve(ROOT, f);
    if (!cache.has(p)) cache.set(p, image(p));
    return cache.get(p);
  };
  const route = plan.route ?? process.env.JUDGE_ROUTE ?? '';
  const todo = plan.games.filter((g) => !done.has(`${plan.tag}|${route}|${img(g.a).sha256}|${img(g.b).sha256}|${g.rep}`));
  console.log(`plan ${plan.tag} on ${route || 'any provider'}: ${plan.games.length} calls, ${plan.games.length - todo.length} already recorded, ${todo.length} to send (concurrency ${concurrency})`);
  let next = 0;
  let finished = 0;
  let failed = 0;
  const worker = async () => {
    while (next < todo.length) {
      const g = todo[next++];
      const a = img(g.a);
      const b = img(g.b);
      try {
        const { verdict, attempts } = await judge(system, a, b, key, route);
        const rec = { tag: plan.tag, route, at: new Date().toISOString(), a: g.a, b: g.b, a_sha256: a.sha256, b_sha256: b.sha256, rep: g.rep, verdict, score: callScore(verdict), attempts };
        appendFileSync(GAMES, JSON.stringify(rec) + '\n');
        finished++;
        const v = verdict ? `${verdict.winner}+${verdict.margin}` : 'no verdict';
        console.log(`[${finished + failed}/${todo.length}] ${g.a} vs ${g.b} rep ${g.rep}: ${v}`);
      } catch (err) {
        failed++;
        console.log(`[${finished + failed}/${todo.length}] ${g.a} vs ${g.b} rep ${g.rep}: FAILED ${err.message}`);
      }
    }
  };
  await Promise.all(Array.from({ length: Math.min(concurrency, todo.length) }, worker));
  console.log(`done: ${finished} recorded, ${failed} failed (rerun the same plan to retry them)`);
}

// ---------- main ----------

async function main() {
  const args = process.argv.slice(2);
  const key = apiKey();
  if (args[0] === '--spend') {
    console.log(JSON.stringify(await spend(key)));
    return;
  }
  await spend(key); // records the starting point on the first run
  if (args[0] === '--plan') {
    const ci = args.indexOf('--concurrency');
    await runPlan(args[1], ci > 0 ? Number(args[ci + 1]) : 6, key);
    console.log(JSON.stringify(await spend(key)));
    return;
  }
  if (args.length !== 2) throw new Error('usage: node tools/judge.ts <A image> <B image> | --plan <plan.json> | --spend');
  const system = `${judgeInstructions().trimEnd()}\n\n${VERDICT_INSTRUCTIONS}`;
  const { verdict, attempts } = await judge(system, image(args[0]), image(args[1]), key, process.env.JUDGE_ROUTE ?? '');
  console.log(JSON.stringify({ verdict, score: callScore(verdict), attempts }, null, 1));
}

if (process.argv[1] && resolve(process.argv[1]) === resolve(new URL(import.meta.url).pathname)) {
  main().catch((err) => {
    console.error(`judge: ${err.message}`);
    process.exit(1);
  });
}
