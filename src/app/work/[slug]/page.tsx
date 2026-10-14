import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects, getProject, imgSrc, imgSize, type Img, type Row, type Project } from "@/content/projects";
import Reveal from "@/components/Reveal";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = getProject((await params).slug);
  if (!p) return {};
  return { title: `${p.title} — Varun Prasad`, description: p.outcome, openGraph: { title: p.title, description: p.outcome, images: [imgSrc(p.slug, p.cover.n)] } };
}

function Pic({ p, im, sizes }: { p: Project; im: Img; sizes?: string }) {
  const [w, h] = imgSize(p.slug, im.n);
  const tall = h / w > 1.1;
  return (
    <figure className="m-0">
      <div className="flex justify-center overflow-hidden rounded-[20px] p-4 md:p-10" style={{ background: p.panel }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imgSrc(p.slug, im.n)}
          width={w}
          height={h}
          alt={im.alt}
          loading="lazy"
          decoding="async"
          sizes={sizes}
          className="block h-auto w-full"
          style={{ ...(tall && sizes === undefined ? { maxWidth: "min(100%, 900px)" } : {}), ...(im.blend ? { mixBlendMode: "multiply" } : {}) }}
        />
      </div>
      {im.caption && <figcaption className="mt-3 text-sm text-muted">{im.caption}</figcaption>}
    </figure>
  );
}

function GalleryRow({ p, row }: { p: Project; row: Row }) {
  if (row.type === "stack") {
    return (
      <Reveal>
        <div className="overflow-hidden rounded-[20px] p-4 md:p-10" style={{ background: p.panel }}>
          {row.imgs.map((im) => {
            const [w, h] = imgSize(p.slug, im.n);
            // eslint-disable-next-line @next/next/no-img-element
            return <img key={im.n} src={imgSrc(p.slug, im.n)} width={w} height={h} alt={im.alt} loading="lazy" decoding="async" className="block h-auto w-full" />;
          })}
        </div>
        {row.imgs[0].caption && <p className="mt-3 text-sm text-muted">{row.imgs[0].caption}</p>}
      </Reveal>
    );
  }
  const cols = row.type === "full" ? "" : row.type === "two" ? "grid gap-4 md:grid-cols-2 md:gap-6" : "grid grid-cols-1 gap-4 sm:grid-cols-3 md:gap-6";
  return (
    <Reveal>
      <div className={cols}>
        {row.imgs.map((im) => (
          <Pic key={im.n} p={p} im={im} sizes={row.type === "full" ? undefined : "(min-width: 768px) 45vw, 100vw"} />
        ))}
      </div>
    </Reveal>
  );
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const p = getProject((await params).slug);
  if (!p) notFound();
  const idx = projects.findIndex((x) => x.slug === p.slug);
  const prev = projects[(idx - 1 + projects.length) % projects.length];
  const next = projects[(idx + 1) % projects.length];
  const meta: [string, string][] = [
    ["Client", p.client],
    ["Role", p.role],
    ...(p.year ? ([["Year", p.year]] as [string, string][]) : []),
    ["Deliverables", p.deliverables],
    ...(p.credits ? ([["Credits", p.credits]] as [string, string][]) : []),
  ];
  return (
    <article className="wrap pb-[120px] pt-12 md:pt-20">
      <p className="label text-muted">{p.label}</p>
      <h1 className="font-display mt-4 text-[clamp(44px,8vw,120px)] font-extrabold leading-[0.95]">{p.title}</h1>
      <p className="mt-8 max-w-[56ch] text-xl text-muted md:text-2xl md:leading-snug">{p.intro}</p>
      {p.link && (
        <p className="mt-5">
          <a href={p.link.href} target="_blank" rel="noopener" className="font-medium underline underline-offset-4">{p.link.text}</a>
        </p>
      )}
      <dl className="mt-12 grid gap-x-8 gap-y-6 border-t border-border pt-8 sm:grid-cols-2 lg:grid-cols-4">
        {meta.map(([k, v]) => (
          <div key={k}>
            <dt className="label text-muted">{k}</dt>
            <dd className="mt-1.5">{v}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-16 grid gap-6 md:mt-20 md:gap-8">
        {p.sections.map((s, si) => (
          <section key={si} className="grid gap-6 md:gap-8" aria-label={s.label}>
            {s.label && <h2 className="label mt-8 border-b border-border pb-3 text-muted">{s.label}</h2>}
            {s.rows.map((r, ri) => (
              <GalleryRow key={ri} p={p} row={r} />
            ))}
          </section>
        ))}
      </div>

      <nav aria-label="More projects" className="mt-[120px] border-t border-border pt-12">
        <Link href={`/work/${next.slug}/`} className="block hover:text-ink">
          <span className="label text-muted">Next project</span>
          <span className="font-display mt-3 block text-[clamp(40px,8vw,112px)] font-extrabold leading-none transition-colors hover:text-accent-ink">
            {next.title} →
          </span>
        </Link>
        <Link href={`/work/${prev.slug}/`} className="mt-10 inline-block text-lg">
          ← Previous: {prev.title}
        </Link>
      </nav>
    </article>
  );
}
