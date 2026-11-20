# Experiments: climbing with a local copy of the judge

The house judge is published in RULES.txt: `z-ai/glm-5.3-flash` on OpenRouter, reasoning
effort high, at most 12,100 output tokens, with its instructions word for word. The kit's
harness source (`harness/harness-src.tar.gz`, `grader/judge-call.ts`) adds the answer format,
the user message and the request body. `tools/judge.ts` rebuilds that request and sends it,
with each verdict, margin and reason appended to `judge-runs/games.jsonl`. That record stays
local and is gitignored, because its reasons describe other entries.

## Method

- **Sparring partners.** The five entries ranked top on the leaderboard at 12:10 UTC on
  20 Nov, downloaded only to play against (gitignored `opponents/`, never used as material).
  Each was 12-0 against the house images, rated about 0.992.
- **Games.** Every candidate plays every opponent in both orders (A/B and B/A), 2-3 times
  on each provider route. A call is scored as RULES.txt scores it: the pick takes 0.5 plus
  margin/10.
- **Ratings.** `tools/bt.ts` fits Bradley-Terry over every call, with a weak N(0, 3²)
  prior. A rating is in logits against the opponents' mean, with its standard error from the
  inverse Hessian. The error is never scaled down: phi is about 0.1, so it is conservative.
  E is the expected share against the five. A change is kept only when it beats the previous
  best by more than the standard error of the difference.
- **Provider pinning.** OpenRouter spreads one model over about 40 endpoints, and one of
  them sends the model a much smaller copy of each image. Unpinned, the same ordered pair
  flipped its verdict 56% of the time. Pinned with no fallback it flipped 30% (Z.AI's own
  endpoint, `z-ai/fp8`) and 10% (`fireworks`). Every call after the first calibration is
  pinned, half to each route, and the route is recorded with the verdict. The house pins
  its provider too but does not publish which.
- **Known gap.** Z.AI refuses the house's forced-tool retry form (`tool_choice` naming the
  function) with HTTP 400. Retries only happen after an answer with no verdict, so this cost
  1 call in about 800.

## Results (1,571 pinned calls; spend about $1.64)

| Round | Candidate | Stories | Rating ± SE | E vs top 5 |
|---|---|---|---|---|
| — | v1, the first entry (`design/layout.html`) | 10 | −0.87 ± 0.34 | 0.30 |
| 1 | v1 with the Kerch tile corrected (`v1-fixed.html`) | 10 | −1.03 ± 0.36 | 0.26 |
| 1 | A: region ledger, text only (`ledger.html`) | 30 | −0.87 ± 0.34 | 0.30 |
| 1 | B: front + briefs (`front-briefs.html`) | 30 | −0.85 ± 0.34 | 0.30 |
| 1 | C: ranked list (`ranked.html`) | 30 | −0.61 ± 0.33 | 0.35 |
| 2 | C2: ranked + pictures (`ranked-pics.html`) | 30 | −0.57 ± 0.27 | 0.36 |
| 2 | B2: front + briefs with pictures (`front-pics.html`) | 30 | −0.37 ± 0.19 | 0.41 |
| 2 | **D: pictogram mosaic (`mosaic.html`)** | 30 | **−0.29 ± 0.22** | **0.43** |
| 3 | D3: mosaic, 34 stories + sources (`mosaic34.html`) | 34 | −0.53 ± 0.27 | 0.37 |
| 3 | D3m: the same + locator map (`mosaic34.html?map=1`) | 34 | −0.53 ± 0.27 | 0.37 |
| 3 | B3: front, 34 stories + sources (`front34.html`) | 34 | −0.70 ± 0.27 | 0.33 |
| 3 | B3m: the same + locator map (`front34.html?map=1`) | 34 | −0.68 ± 0.27 | 0.34 |
| 4 | D4: D with event drawings (`mosaic-art.html`) | 30 | −0.34 ± 0.22 | 0.41 |
| 4 | B4: B2 with event drawings (`front-art.html`) | 30 | −0.54 ± 0.27 | 0.37 |
| 5 | D5: D with the five fixes both outside critiques agreed on (`mosaic-fixes.html`) | 34 | −0.47 ± 0.26 | 0.38 |
| 5 | gemini-mosaic, after Gemini's "Editorial Poster Mosaic" (`gemini-mosaic.html`) | 34 | −0.26 ± 0.26 | 0.44 |
| 5 | gpt-three-acts, after GPT's "News in Three Acts" (`gpt-three-acts.html`) | 34 | −0.56 ± 0.27 | 0.36 |
| 5 | gpt-atlas, after GPT's "Living Atlas" (`gpt-atlas.html`) | 34 | −0.88 ± 0.28 | 0.29 |
| 6 | gemini-mosaic, re-fitted with 216 calls | 34 | −0.29 ± 0.14 | 0.43 |
| 6 | g6a: gemini-mosaic with the 30-story set (`gemini-mosaic.html?n=30`) | 30 | −0.57 ± 0.17 | 0.36 |
| 6 | g6b: gemini-mosaic without the map (`gemini-mosaic.html?nomap=1`) | 34 | −0.60 ± 0.17 | 0.36 |
| 6 | g6c: gemini-mosaic with a taller hero and picture tiers (`gemini-mosaic.html?big=1`) | 34 | −0.18 ± 0.17 | 0.46 |

Round 6, head to head against gemini-mosaic (24 calls each, both orders, both routes):
g6a took 0.396 (picked 0 of 24), g6b took 0.388 (0 of 24) and g6c took 0.554 ± 0.022
(18 of 24). In the full fit, g6c leads gemini-mosaic by +0.12 ± 0.21. It is ahead on both
routes and head to head, but not by more than the conservative fit error.

## Real provisional rates against the house images

| Entry | Local rating | Predicted | Real provisional rate (90% interval) |
|---|---|---|---|
| v1 (`layout.html`) | −0.87 | — | 0.981243 (0.9739–0.9886), 12-0 |
| D (`mosaic.html`) | −0.29 | about 0.989 | 0.977797 (0.9696–0.9860), 11-1-0 |
| gemini-mosaic (`gemini-mosaic.html`) | −0.29 | — | 0.986947 (0.9812–0.9927), 12-0 |

The prediction for D missed. It was a straight line through two points (v1 and the top five)
from the local rating, which is measured against rival entries, to the house rate, which is
measured against four images of 13 November's news. Those games are decided mostly by
criterion 1, so they separate good entries weakly, and the two scales are not one line.

Rounds 1-5 ratings are from the fit over the first 1,079 pinned calls, so earlier rows moved a little
as data came in (D: −0.31 after round 2, −0.29 now, with 84 calls). The opponents fall
between −0.16 and +0.07. Head to head (both orders, both routes): D took 0.51 against B2
and 0.55 against D4 (12 calls each), D4 took 0.54 against B2, and D took 0.512 ± 0.040
against gemini-mosaic (24 calls; picked 13 of 24). D and gemini-mosaic are level, and no
round-5 candidate beat D by more than its error.

## What moved the judge, and what did not

1. **Breadth first.** With 10 stories, every loss reason was "33-52 stories against 10".
2. **Then pictures.** At 30 stories, a text-only page lost as "a dense text wall". Giving
   every story a pictogram or its key figure (D, B2) gained about +0.5 over v1.
3. **More was not better.** Going to 34 stories with per-story source tags made the cells
   denser and lost about 0.2. A locator map, though the judge often named the opponents'
   maps, did not measurably help. Neither did drawings of the ten biggest events.
4. **Facts are checked against the other image.** Several opponents flag the Kerch Bridge
   strike as 18 November news. It was (CNN, UPI, Al Jazeera), and the judge marked the first
   entry down for showing it as 19 November news. Every later candidate reports the 19th's
   news instead: Putin ruling out truce talks.
5. **Outside ideas, tested (round 5).** Two other models' design briefs (see README.md) were
   built as candidates, with every line of code written here. A poster with drawn scenes and
   caption bands (gemini-mosaic) drew level with D. Applying both critiques' agreed fixes to
   D did not beat it: a drawn lead, drawn actions, 34 stories, a source per story, and the
   date check beside the Kerch story. A map-first atlas lost clearly; this judge rewards
   readable pictures of events over geography.

Reproduce: `node tools/plan.ts <tag> <reps> <images> --route z-ai/fp8`, then
`node tools/judge.ts --plan judge-runs/plan-<tag>.json`, then `node tools/bt.ts`.
