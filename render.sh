#!/bin/sh
# Render a layout to a 1024x1024 PNG with headless Chrome.
# Usage: ./render.sh [layout.html] [out.png]
#   default: design/gemini-mosaic.html -> entry.png (the image main.ts ships)
#   e.g.     ./render.sh design/ledger.html candidates/ledger.png
# CHROME=/path/to/chrome overrides the browser. The grader never runs this:
# main.ts only copies the committed entry.png.
set -eu

here="$(cd "$(dirname "$0")" && pwd)"
layout="${1:-design/gemini-mosaic.html}"
out="${2:-entry.png}"
case "$layout" in /*) ;; *) layout="$here/$layout" ;; esac
case "$out" in /*) ;; *) out="$here/$out" ;; esac
chrome="${CHROME:-/Applications/Google Chrome.app/Contents/MacOS/Google Chrome}"
tmp="$here/out/render-raw-$$.png"
mkdir -p "$here/out" "$(dirname "$out")"

"$chrome" --headless=new --disable-gpu --hide-scrollbars \
  --force-device-scale-factor=1 --window-size=1024,1024 \
  --default-background-color=00000000 --virtual-time-budget=3000 \
  --screenshot="$tmp" "file://$layout" >/dev/null 2>&1

# Check the PNG header, the size and the 1 MiB cap (Node, no packages), then
# put the image in place.
node -e '
const fs = require("node:fs");
const [src, dst] = process.argv.slice(1);
const b = fs.readFileSync(src);
if (b.subarray(0, 8).toString("hex") !== "89504e470d0a1a0a") throw new Error("not a PNG");
const w = b.readUInt32BE(16), h = b.readUInt32BE(20);
if (w !== 1024 || h !== 1024) throw new Error(`unexpected size ${w}x${h}`);
if (b.length > 1048576) throw new Error(`${b.length} bytes is over 1 MiB`);
fs.writeFileSync(dst, b);
fs.unlinkSync(src);
console.log(`${dst.split("/").slice(-2).join("/")} ${w}x${h} ${b.length} bytes`);
' "$tmp" "$out"
