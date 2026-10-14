# varunprasad.online

Image-led portfolio for Varun Prasad, Melbourne digital designer.

## Stack
Next.js 16 (App Router, TypeScript), Tailwind v4, static export (`output: 'export'`, `images.unoptimized`, `trailingSlash`). Deployed on Vercel (`vercel.json` pins the `nextjs` preset; output goes to `out/`). Fonts via `next/font`: Bricolage Grotesque (display, 600–800) and Inter (body).

## Design tokens (`src/app/globals.css`)
canvas `#F4F2EC`, surface `#FFFFFF`, ink `#141413`, muted `#6B6A63`, border `#E3E0D8`, accent `#FF4F1F` (sparingly: hero pill dot, hover). `--accent-ink #C7370F` is the AA-safe accent for text. No shadows. Radius 20px (cards/panels), 999px (pills). Hero headline `clamp(64px, 11vw, 168px)`, tracking -0.04em. Max width 1400px, gutters 24/40px. Motion: 12px fade-rise (`Reveal`), 1.03 card hover scale, page fade; all disabled under `prefers-reduced-motion`.

## Content
Everything lives in `src/content/projects.ts`: projects (label, outcome, intro, meta, panel colour, cover, gallery sections/rows with alt + captions), capabilities, clients, career, About copy. Galleries reference images by number (`NN` = `public/work/<slug>/NN.webp`). `src/content/image-sizes.json` is generated.

## Image pipeline
Raw assets are in `_source/` (git-ignored). `node scripts/papparich-crops.mjs` (needs poppler) renders the PappaRich PDF pages and crops artwork to `_source/papparich_items/`. `node scripts/images.mjs` (sharp) writes WebP q82, max 2400px wide (1200px for phone screenshots), slices very tall captures, and builds `card.webp` thumbnails per project. The order of the lists in `scripts/images.mjs` defines the `NN` numbering; `_source/_index.txt` maps NN back to source files. Re-run after changing any list, then update `projects.ts`.

## Other
- Resume: `public/Varun_Prasad_Resume.pdf`. OG image: `public/og.png` (screenshot of the hero at 1200×630). Favicon: `public/icon.svg`.
- Contact form posts to Formspree `mvzeljvp`.
- About portrait is a TODO placeholder in `src/app/about/page.tsx`.
- `npm run build` and `npm run lint` must stay clean.
