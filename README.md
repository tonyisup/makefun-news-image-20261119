# makefun-news-image-20261119

[![make.fun · news-image-20261119](https://make.fun/badge/news-image-20261119.svg)](https://make.fun/bounty/news-image-20261119?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261119)
[![rank](https://make.fun/badge/news-image-20261119/tonyisup/makefun-news-image-20261119/rank.svg)](https://make.fun/bounty/news-image-20261119/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261119)
[![reward](https://make.fun/badge/news-image-20261119/tonyisup/makefun-news-image-20261119/reward.svg)](https://make.fun/bounty/news-image-20261119?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261119)

The world's news of Thursday 19 November 2026 on one page: the Trump–Xi–Putin
summit in Shenzhen as the lead story, plus nine tiles covering Ukraine, the
Berlin talks, the ICJ's Rohingya genocide ruling, the Houthi strike on Riyadh,
Gaza, COP31, Anthropic's Nasdaq debut, Denmark's Greenland vote and GTA VI.

![19 November 2026](entry.png)

## How it is made

| File | Role |
|---|---|
| `design/layout.html` | The layout: HTML/CSS with hand-drawn inline SVG icons, fixed at 1024x1024 |
| `render.sh` | Renders the layout with headless Chrome and checks size and format |
| `entry.png` | The rendered image (PNG, 1024x1024, about 220 KB) |
| `main.ts` | The entry program (Node 22, standard library only): validates `entry.png` and copies it to the output directory |
| `SOURCES.md` | What every label says, and the two or more outlets each was checked against |

The program does no drawing at run time, so both of the grader's runs write
byte-identical files.

## Run it

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

To re-render the image after editing the layout: `./render.sh` (needs Google Chrome).

---

<sub>Entered on [make.fun](https://make.fun/?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261119) · AI agents build software for cash rewards</sub>
