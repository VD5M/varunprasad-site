// Image pipeline: raw assets in _source/ → public/work/<slug>/NN.webp (+ src/content/image-sizes.json).
// Run: node scripts/papparich-crops.mjs (once, needs poppler) then node scripts/images.mjs
// WebP q82, max 2400px wide (1200px for phone screenshots). Very tall captures are split into ~2400px slices.
// Order of each list below = the NN numbering that src/content/projects.ts refers to.
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const SRC = "_source";
const OUT = "public/work";
const V = (f) => ({ src: `ventraip/${f}` });
const VS = (d, t) => V(`Screen Shot 2021-${d} at ${t}.png`);
const phone = (d) => ({ ...d, phone: true });
const P = (id) => ({ src: `papparich_items/${id}.png` });
const OR = (f) => ({ src: `oldrepo/${f}` });

// d.slice = [from, count] → split tall image into ~2400px slices and keep those.
const projects = {
  "pronto-rebrand": [
    { src: "figma/concept.png" },
    { src: "figma/dev1.png" },
    { src: "figma/dev2.png" },
    { final: "light" },
    { final: "dark" },
    { final: "red" },
  ],
  "now-switch": [
    V("switch-cover.png"), V("switch-macbook.png"),
    VS("02-18", "6.00.04 pm"), VS("02-18", "6.00.27 pm"),
    VS("02-19", "6.06.43 pm"), VS("02-19", "6.07.16 pm"),
    VS("02-21", "4.14.09 pm"), VS("02-21", "4.14.54 pm"),
    V("switch-cover(1).png"),
    phone(V("IMG_7723.PNG")), phone(V("IMG_7940.PNG")),
    phone(VS("02-24", "7.31.08 am")), phone(VS("02-24", "7.31.23 am")),
    phone(VS("02-24", "7.42.20 am")), phone(VS("02-24", "7.42.36 am")),
  ],
  "free-au-domains": [
    V("tgadng-cover.png"), V("tgadng-ipad.png"),
    VS("02-23", "8.18.09 am"), VS("02-23", "8.18.28 am"),
    VS("02-22", "9.00.31 pm"),
    phone(VS("02-21", "5.22.09 pm")), phone(VS("02-21", "5.25.09 pm")),
    phone(V("IMG_4321.PNG")), phone(V("IMG_7907.PNG")), phone(V("IMG_7972.PNG")),
  ],
  "ventraip-hosting": [
    V("hosting-cover-1.png"), V("hosting-cover.png"),
    V("ent-cover-1.png"), V("ent-cover-2.png"),
    VS("02-24", "8.23.29 am"), VS("03-08", "11.30.54 am"), VS("03-08", "11.31.20 am"), VS("02-21", "4.28.05 pm"),
    phone(VS("02-23", "8.40.51 am")), phone(VS("02-24", "7.19.46 am")), phone(VS("02-24", "7.58.38 am")),
    phone(VS("02-24", "7.59.57 am")), phone(VS("02-24", "8.00.16 am")), phone(VS("03-08", "11.47.27 am")),
    phone(VS("03-08", "11.47.41 am")), phone(VS("03-08", "12.08.09 pm")),
    phone(VS("02-23", "8.41.16 am")), phone(VS("02-24", "7.20.12 am")),
    phone(VS("03-08", "3.40.14 pm")), phone(VS("03-08", "3.44.40 pm")),
  ],
  mercury: [
    OR("mercury-white-label/cover.webp"),
    OR("mercury-white-label/visual-design-components.webp"),
    OR("mercury-white-label/colour-schemes-1.webp"),
    OR("mercury-white-label/colour-schemes-2.webp"),
    ...[1, 2, 3, 4, 5, 6].map((n) => OR(`mercury-white-label/mobile-ready-${n}.webp`)),
  ],
  "pronto-visual-system": [
    { src: "oldrepo/pronto-design-system/hero.svg" },
    OR("pronto-design-system/ui-cleanup.webp"),
    OR("pronto-design-system/final-design.webp"),
    OR("pronto-design-system/adoption.webp"),
    phone(OR("pronto-design-system/visual-language-1.webp")),
    phone({ src: "oldrepo/pronto-design-system/visual-language-2.svg" }),
    phone(OR("pronto-design-system/visual-language-3.webp")),
    phone(OR("pronto-design-system/token-architecture-1.webp")),
    phone(OR("pronto-design-system/token-architecture-2.webp")),
    phone(OR("pronto-design-system/token-architecture-3.webp")),
  ],
  "pronto-website": [
    { src: "pronto-site/desktop.png", crop: { top: 0, height: 2450 } },
    { src: "figma/site.png", slice: [0, 2] },
    ...[0, 1, 2].map((i) => phone({ src: "pronto-site/mobile.png", crop: { top: 0, height: 6900 }, slice: [i, 1], sliceOf: 3 })),
    { src: "figma/specs.png" },
  ],
  "circular-media-group": [
    { src: "circularmediagroup.com.au_.png", slice: [0, 3] },
    { src: "screencapture-circularmediagroup-au-enquiry-website-design-build-2022-04-12-08_14_55.png" },
    ...[0, 1, 2].map((i) => phone({ src: "screencapture-circularmediagroup-au-2022-04-12-08_38_25.png", crop: { top: 0, height: 7200 }, slice: [i, 1], sliceOf: 3 })),
  ].map((d) => (d.src.startsWith("ventraip/") || d.src.startsWith("figma") || d.src.startsWith("pronto") ? d : { ...d, src: `ventraip/${d.src}` })),
  papparich: [
    // Hokkaido
    "p06-0", "p08-1", "p08-2", "p09-4", "p09-1", "p10-0", "p12-0", "p12-1", "p12-2", "p11-0",
    "p14-1", "p15-0", "p15-1", "p17-4", "p18-0", "p18-1", "p21-0", "p21-1",
    // PAFU
    "p22-0", "p23-0", "p24-0", "p27-0", "p27-1", "p27-2", "p26-0", "p28-1", "p28-2", "p29-0", "p29-1", "p32-0", "p25-0",
    "p30-0", "p30-1", "p30-2",
    // Kurimu
    "p34-0", "p35-0", "p35-1", "p36-0", "p36-1",
  ].map(P),
};

async function finalLockup(kind) {
  const buf = await sharp(path.join(SRC, "figma/final.png")).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { data, info } = buf;
  const bg = { light: "#ffffff", dark: "#1e1e1e", red: "#e60000" }[kind];
  // The Figma export carries an opaque #1e1e1e frame fill: knock it out, keep black/red artwork.
  for (let i = 0; i < data.length; i += 4) {
    const [r, g, b] = [data[i], data[i + 1], data[i + 2]];
    if (Math.abs(r - 30) < 10 && Math.abs(g - 30) < 10 && Math.abs(b - 30) < 10) { data[i + 3] = 0; continue; }
    const dark = r < 90 && g < 90 && b < 90;
    if (kind === "red" || (kind === "dark" && dark)) { data[i] = data[i + 1] = data[i + 2] = 255; }
  }
  const logo = await sharp(data, { raw: info }).resize({ width: 1500 }).png().toBuffer();
  return sharp({ create: { width: 2400, height: 1350, channels: 3, background: bg } })
    .composite([{ input: logo, gravity: "centre" }]).png().toBuffer();
}

async function load(d) {
  if (d.final) return [await finalLockup(d.final)];
  const file = path.join(SRC, d.src);
  let img = d.src.endsWith(".svg") ? sharp(file, { density: 300 }) : sharp(file, { limitInputPixels: false });
  const meta = await img.metadata();
  const maxW = d.phone ? 1200 : 2400;
  if (d.crop) {
    const top = d.crop.top ?? 0;
    const height = Math.min(d.crop.height ?? meta.height - top, meta.height - top);
    img = sharp(await sharp(file, { limitInputPixels: false }).extract({ left: 0, top, width: meta.width, height }).png().toBuffer());
  }
  const resized = await img.resize({ width: maxW, withoutEnlargement: !d.src.endsWith(".svg") }).flatten({ background: "#ffffff" }).png().toBuffer();
  if (!d.slice) return [resized];
  const m = await sharp(resized).metadata();
  const n = d.sliceOf ?? Math.max(1, Math.round(m.height / 2400));
  const sh = Math.floor(m.height / n);
  const [from, count] = d.slice;
  const out = [];
  for (let i = from; i < Math.min(n, from + count); i++) {
    out.push(await sharp(resized).extract({ left: 0, top: i * sh, width: m.width, height: i === n - 1 ? m.height - i * sh : sh }).png().toBuffer());
  }
  return out;
}

// Card thumbnails for the home grid (1200px wide; "cover" covers are cropped from the top).
const covers = {
  "pronto-rebrand": [6, "cover"], "now-switch": [1, "contain"], "free-au-domains": [1, "contain"], papparich: [1, "cover"],
  "pronto-website": [1, "cover"], "ventraip-hosting": [1, "contain"], mercury: [1, "contain"],
  "pronto-visual-system": [1, "cover"], "circular-media-group": [1, "cover"],
};
const sizes = {};
const index = [];
for (const [slug, list] of Object.entries(projects)) {
  const dir = path.join(OUT, slug);
  fs.rmSync(dir, { recursive: true, force: true });
  fs.mkdirSync(dir, { recursive: true });
  let n = 1;
  for (const d of list) {
    if (!d.final && !fs.existsSync(path.join(SRC, d.src))) { console.warn("MISSING", slug, d.src); continue; }
    for (const buf of await load(d)) {
      const nn = String(n++).padStart(2, "0");
      const info = await sharp(buf).webp({ quality: 82 }).toFile(path.join(dir, `${nn}.webp`));
      sizes[`${slug}/${nn}`] = [info.width, info.height];
      index.push(`${slug}/${nn}  ${info.width}x${info.height}  ${d.src ?? "final-" + d.final}${d.slice ? " slice" + d.slice : ""}`);
    }
  }
  const [cn, fit] = covers[slug];
  const cinfo = await sharp(path.join(dir, `${String(cn).padStart(2, "0")}.webp`))
    .resize(fit === "cover" ? { width: 1200, height: 860, fit: "cover", position: slug === "papparich" ? "centre" : "top" } : { width: 1200, withoutEnlargement: true })
    .webp({ quality: 80 }).toFile(path.join(dir, "card.webp"));
  sizes[`${slug}/card`] = [cinfo.width, cinfo.height];
  console.log(slug, n - 1);
}
fs.writeFileSync("src/content/image-sizes.json", JSON.stringify(sizes, null, 1));
fs.writeFileSync(path.join(SRC, "_index.txt"), index.join("\n"));
