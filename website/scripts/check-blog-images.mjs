// Every blog raster needs a WebP sibling (served by src/components/WebpImage.tsx) under a size budget.
import { existsSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const dir = new URL("../public/blog/", import.meta.url).pathname;
const BUDGET_KB = 250;
const problems = [];
for (const name of readdirSync(dir)) {
  if (!/\.(png|jpe?g)$/i.test(name)) continue;
  const webp = join(dir, name.replace(/\.(png|jpe?g)$/i, ".webp"));
  if (!existsSync(webp)) problems.push(`${name}: missing WebP sibling`);
  else if (statSync(webp).size > BUDGET_KB * 1024) problems.push(`${name}: WebP over ${BUDGET_KB} KB`);
}
if (problems.length) {
  console.error(`Blog images need WebP (cwebp -q 80 <file> -o <file>.webp):\n${problems.join("\n")}`);
  process.exit(1);
}
console.log("blog images: every raster has a WebP sibling within budget");
