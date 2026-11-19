// news-image-20261119: writes the one-page summary of 19 November 2026's world
// news to <output>/entry.png. The image is rendered ahead of time from
// design/layout.html (see render.sh); this program only copies its bytes, so
// every run writes exactly the same file. Node 22, standard library only.
//
// Local run:  mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const MAX_BYTES = 1048576; // the gate's 1 MiB cap
const MAX_SIDE = 1024; // and its 1024 x 1024 pixel cap
const PNG_SIGNATURE = '89504e470d0a1a0a';
const IEND_TRAILER = '0000000049454e44ae426082'; // empty IEND chunk with its CRC

// Refuse to write an image the gate would reject, so a bad render fails here,
// loudly, instead of becoming an invalid entry. (Plain JavaScript syntax on
// purpose: it runs whether or not this Node strips TypeScript types.)
function checkPng(bytes) {
  if (bytes.length > MAX_BYTES) throw new Error(`entry.png is ${bytes.length} bytes, over 1 MiB`);
  if (bytes.subarray(0, 8).toString('hex') !== PNG_SIGNATURE) throw new Error('entry.png is not a PNG');
  if (bytes.subarray(12, 16).toString('latin1') !== 'IHDR') throw new Error('entry.png has no IHDR first');
  const width = bytes.readUInt32BE(16);
  const height = bytes.readUInt32BE(20);
  if (width > MAX_SIDE || height > MAX_SIDE) throw new Error(`entry.png is ${width}x${height}, over ${MAX_SIDE}`);
  if (bytes.subarray(-12).toString('hex') !== IEND_TRAILER) throw new Error('entry.png is truncated (no IEND)');
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR || '/output';
const image = readFileSync(new URL('./entry.png', import.meta.url));
checkPng(image);
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, 'entry.png'), image);
