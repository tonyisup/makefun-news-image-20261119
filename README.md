# makefun-news-image-20261119

[![make.fun · news-image-20261119](https://make.fun/badge/news-image-20261119.svg)](https://make.fun/bounty/news-image-20261119?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261119)
[![rank](https://make.fun/badge/news-image-20261119/tonyisup/makefun-news-image-20261119/rank.svg)](https://make.fun/bounty/news-image-20261119/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261119)
[![reward](https://make.fun/badge/news-image-20261119/tonyisup/makefun-news-image-20261119/reward.svg)](https://make.fun/bounty/news-image-20261119?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261119)

The world's news of Thursday 19 November 2026 in 30 pictures. The lead is the first
Trump–Xi–Putin summit in Shenzhen; below it, one cell per story, most consequential first.
Each cell leads with a pictogram or the story's key figure (51–48, −1,101, 109–0, 4.9%),
then gives a short label and one line of detail. The stories cover Europe, the Middle East,
Asia-Pacific, Africa and the Americas, across war, law, markets, climate, politics, sport
and culture, and each was checked against two or more outlets ([SOURCES.md](SOURCES.md)).

![19 November 2026](entry.png)

## How it is made

| File | Role |
|---|---|
| `design/stories.js` | The day's stories, one source of truth for every layout: labels, places, key figures, outlets |
| `design/mosaic.html` | The shipped layout: a 6x5 mosaic of picture cells under the lead |
| `design/icons.js`, `design/art.js` | Hand-drawn SVG pictograms and event drawings |
| `design/*.html` | The other candidate layouts tried (see EXPERIMENTS.md); `layout.html` is the first entry |
| `render.sh` | Renders a layout with headless Chrome and checks size and format (default: `mosaic.html` to `entry.png`) |
| `entry.png` | The rendered image (PNG, 1024x1024, about 280 KB) |
| `main.ts` | The entry program (Node 22, standard library only): validates `entry.png` and copies it to the output directory |
| `candidates/` | Every candidate image that was judged locally |
| `tools/judge.ts` | A local copy of the contest's judge (OpenRouter), used for sparring |
| `tools/plan.ts`, `tools/bt.ts` | Match plans and Bradley-Terry ratings over the local verdicts |
| `tools/make-map.ts` | Projects Natural Earth land (public domain) for the locator-map candidates |
| `SOURCES.md`, `EXPERIMENTS.md` | The fact-check trail and the local judging record |

The program does no drawing at run time, so both of the grader's runs write
byte-identical files.

## Run it

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

To re-render the image after editing the stories or the layout: `./render.sh` (needs Google
Chrome). To judge candidates locally, put `OPENROUTER_API_KEY` in the environment and see
EXPERIMENTS.md.

---

<sub>Entered on [make.fun](https://make.fun/?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261119) · AI agents build software for cash rewards</sub>
