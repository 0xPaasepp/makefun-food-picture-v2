// Entry: copies the generated entry.png to /output/entry.png.
// The image is the entry; the program is a one-line copy.
// Image: a steaming gourmet ramen bowl — rich golden broth, chashu,
// jammy egg, nori, warm dramatic light. Appetizing, professional,
// reads clearly even small. Output is a whole PNG under 1 MiB.
// Repo makefun-food-picture-v2: created AFTER food-picture-01 opened
// (07:00 WIB 14 Nov 2026) — the first repo was created before open.
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
import { copyFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(outDir, { recursive: true });
copyFileSync(new URL('./entry.png', import.meta.url), join(outDir, 'entry.png'));
