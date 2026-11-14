// Food Picture entry — food-picture-01
//
// The program copies the bundled entry.png to /output/entry.png.
// The image is the entry; the program is a thin, deterministic copy.
//
// Image: a steaming gourmet ramen bowl — rich golden broth, chashu,
// jammy egg, nori, warm dramatic light. Appetizing, professional,
// reads clearly even small. Output is a whole PNG under 1 MiB
// (882,064 bytes, 1024x683), within the competition limits.
//
// Defensive check: fail loudly if the bundled image is missing or
// empty instead of writing a broken output.
//
// Repo makefun-food-picture-v2: created AFTER food-picture-01 opened
// (07:00 WIB 14 Nov 2026) — the first repo was created before open.
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
import { copyFileSync, existsSync, mkdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const src = new URL('./entry.png', import.meta.url);

if (!existsSync(src) || statSync(src).size === 0) {
  throw new Error('entry.png is missing or empty — cannot produce an output image');
}

// The output must be a whole PNG: check the 8-byte PNG signature
// before copying, so a corrupt bundle fails here, not at the gate.
const header = readFileSync(src).subarray(0, 8);
const PNG_SIGNATURE = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
if (!header.equals(PNG_SIGNATURE)) {
  throw new Error('entry.png does not start with the PNG signature — refusing to copy');
}

mkdirSync(outDir, { recursive: true });
const dest = join(outDir, 'entry.png');
copyFileSync(src, dest);

// Verify the copy landed whole: same byte count as the source.
if (statSync(dest).size !== statSync(src).size) {
  throw new Error('entry.png copy is incomplete — output size does not match source');
}
