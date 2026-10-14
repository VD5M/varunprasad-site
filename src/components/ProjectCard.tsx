import Link from "next/link";
import { imgSrc, imgSize, type Project } from "@/content/projects";
import Reveal from "./Reveal";

export default function ProjectCard({ p, wide }: { p: Project; wide?: boolean }) {
  const { cover } = p;
  const [w, h] = imgSize(p.slug, cover.n);
  return (
    <Reveal className={wide ? "md:col-span-2" : ""}>
      <Link href={`/work/${p.slug}/`} className="card group block hover:text-ink">
        <div
          className={`relative overflow-hidden rounded-[20px] ${wide ? "aspect-[4/3] md:aspect-[21/9]" : "aspect-[4/3] md:aspect-[16/11]"}`}
          style={{ background: p.panel }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imgSrc(p.slug, cover.n)}
            width={w}
            height={h}
            alt={cover.alt}
            loading="lazy"
            decoding="async"
            className={`card-img absolute inset-0 h-full w-full ${
              cover.fit === "cover" ? "object-cover object-top" : "object-contain p-6 md:p-10"
            }`}
            style={cover.blend ? { mixBlendMode: "multiply" } : undefined}
          />
        </div>
        <div className="mt-5 flex flex-col gap-2">
          <p className="label text-muted">{p.label}</p>
          <h3 className="font-display text-3xl font-bold leading-tight md:text-4xl">{p.title}</h3>
          <p className="max-w-[52ch] text-muted">{p.outcome}</p>
          <p className="mt-1 text-[15px] font-medium transition-colors group-hover:text-accent-ink">View project →</p>
        </div>
      </Link>
    </Reveal>
  );
}
