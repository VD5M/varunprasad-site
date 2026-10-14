// Renders PappaRich PDF pages (6–37) at 200dpi and crops each artwork item,
// ignoring white margins, drop shadows and caption text.
// Output: _source/papparich_items/pPP-K.png (K = reading order on the page).
import sharp from "sharp";
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const SRC = "_source";
const pdf = path.join(SRC, "Portfolio_2019.pdf");
const pages = path.join(SRC, "papparich_pages200");
const items = path.join(SRC, "papparich_items");
fs.mkdirSync(pages, { recursive: true });
fs.mkdirSync(items, { recursive: true });
execFileSync("pdftoppm", ["-r", "200", "-f", "6", "-l", "37", "-png", pdf, path.join(pages, "pg")]);

const DS = 4; // detection runs on a 1/4-scale mask
const THRESH = 34; // distance from white that counts as "ink"

for (const f of fs.readdirSync(pages).filter((f) => f.endsWith(".png")).sort()) {
  const pageNo = Number(f.match(/(\d+)/)[1]);
  const img = sharp(path.join(pages, f));
  const meta = await img.metadata();
  const w = Math.floor(meta.width / DS), h = Math.floor(meta.height / DS);
  const raw = await img.clone().resize(w, h, { kernel: "nearest" }).removeAlpha().raw().toBuffer();
  let mask = new Uint8Array(w * h);
  for (let i = 0; i < w * h; i++) {
    const r = raw[i * 3], g = raw[i * 3 + 1], b = raw[i * 3 + 2];
    mask[i] = Math.max(255 - r, 255 - g, 255 - b) > THRESH ? 1 : 0;
  }
  const erode = (m) => {
    const o = new Uint8Array(w * h);
    for (let y = 1; y < h - 1; y++)
      for (let x = 1; x < w - 1; x++) {
        let ok = 1;
        for (let dy = -1; dy <= 1 && ok; dy++) for (let dx = -1; dx <= 1; dx++) if (!m[(y + dy) * w + x + dx]) { ok = 0; break; }
        o[y * w + x] = ok;
      }
    return o;
  };
  mask = erode(erode(mask));
  // connected components
  const seen = new Uint8Array(w * h);
  const boxes = [];
  for (let s = 0; s < w * h; s++) {
    if (!mask[s] || seen[s]) continue;
    const stack = [s]; seen[s] = 1;
    let minx = w, miny = h, maxx = 0, maxy = 0, area = 0;
    while (stack.length) {
      const p = stack.pop(); const x = p % w, y = (p / w) | 0;
      area++; if (x < minx) minx = x; if (x > maxx) maxx = x; if (y < miny) miny = y; if (y > maxy) maxy = y;
      for (const q of [p - 1, p + 1, p - w, p + w]) if (q >= 0 && q < w * h && mask[q] && !seen[q]) { seen[q] = 1; stack.push(q); }
    }
    if (area > 900 && maxx - minx > 25 && maxy - miny > 12) boxes.push({ minx, miny, maxx, maxy });
  }
  // reading order: rows then columns
  boxes.sort((a, b) => (Math.abs(a.miny - b.miny) < 30 ? a.minx - b.minx : a.miny - b.miny));
  let k = 0;
  for (const b of boxes) {
    const pad = 2; // erosion shrank the box by ~2 mask px; add it back
    const left = Math.max(0, (b.minx - pad) * DS), top = Math.max(0, (b.miny - pad) * DS);
    const width = Math.min(meta.width - left, (b.maxx - b.minx + 1 + pad * 2) * DS);
    const height = Math.min(meta.height - top, (b.maxy - b.miny + 1 + pad * 2) * DS);
    await sharp(path.join(pages, f)).extract({ left, top, width, height }).toFile(path.join(items, `p${String(pageNo).padStart(2, "0")}-${k++}.png`));
  }
  console.log("page", pageNo, "items", k);
}
