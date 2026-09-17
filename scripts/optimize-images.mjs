// One-off/maintenance script: converts heavy PNG artwork in public/imagery to
// resized WebP with clean kebab-case names and rewrites references in the source.
// Usage: node scripts/optimize-images.mjs
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const imageryDir = path.join(repoRoot, "public/imagery");
const sourceDirs = ["app", "components", "lib"].map((dir) => path.join(repoRoot, dir));
const MAX_WIDTH = 1920;

const toSlug = (fileName) =>
  fileName
    .replace(/\.png$/i, "")
    .replace(/^enhanced_/, "")
    .replace(/^\d{8}_\d{4}_/, "")
    .replace(/_remix_.*$/, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

async function* walk(dir) {
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else if (/\.(tsx?|css)$/.test(entry.name)) yield full;
  }
}

const renames = new Map();
const taken = new Set();
for (const file of (await fs.readdir(imageryDir)).filter((name) => /\.png$/i.test(name)).sort()) {
  let slug = toSlug(file);
  for (let n = 2; taken.has(slug); n += 1) slug = `${toSlug(file)}-${n}`;
  taken.add(slug);

  const input = path.join(imageryDir, file);
  const output = path.join(imageryDir, `${slug}.webp`);
  await sharp(input).resize({ width: MAX_WIDTH, withoutEnlargement: true }).webp({ quality: 82 }).toFile(output);
  const [before, after] = await Promise.all([fs.stat(input), fs.stat(output)]);
  console.log(`${file} -> ${slug}.webp  ${(before.size / 1e6).toFixed(1)}MB -> ${(after.size / 1e3).toFixed(0)}KB`);
  renames.set(`/imagery/${file}`, `/imagery/${slug}.webp`);
  await fs.unlink(input);
}

for (const dir of sourceDirs) {
  for await (const file of walk(dir)) {
    const original = await fs.readFile(file, "utf8");
    let updated = original;
    for (const [from, to] of renames) updated = updated.split(from).join(to);
    if (updated !== original) {
      await fs.writeFile(file, updated);
      console.log(`updated ${path.relative(repoRoot, file)}`);
    }
  }
}
