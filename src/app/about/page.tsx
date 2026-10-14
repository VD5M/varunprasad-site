import type { Metadata } from "next";
import { aboutCopy, career } from "@/content/projects";

export const metadata: Metadata = {
  title: "About — Varun Prasad",
  description: "Melbourne-based digital designer with 10 years' experience across websites, campaigns, social and product marketing.",
};

export default function About() {
  return (
    <div className="wrap pb-[120px] pt-12 md:pt-20">
      <h1 className="font-display text-[clamp(44px,8vw,120px)] font-extrabold leading-[0.95]">About</h1>
      <div className="mt-14 grid gap-12 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-20">
        {/* TODO(Varun): replace this placeholder with a portrait (public/portrait.webp) */}
        <div
          role="img"
          aria-label="Portrait placeholder"
          className="flex aspect-[4/5] items-center justify-center rounded-[20px] border border-dashed border-muted/50 bg-surface text-center"
        >
          <span className="label text-muted">TODO — portrait<br />(swap in)</span>
        </div>
        <div>
          <div className="grid max-w-[60ch] gap-6 text-xl leading-relaxed">
            {aboutCopy.map((t) => (
              <p key={t}>{t}</p>
            ))}
          </div>
          <h2 className="label mb-2 mt-16 text-muted">Career</h2>
          <ul>
            {career.map((c) => (
              <li key={c.role} className="flex flex-col gap-1 border-b border-border py-4 sm:flex-row sm:items-baseline sm:justify-between">
                <span>
                  <span className="font-medium">{c.role}</span>
                  {c.org && <span className="text-muted"> — {c.org}</span>}
                </span>
                <span className="text-sm text-muted">{c.years}</span>
              </li>
            ))}
          </ul>
          <a
            href="/Varun_Prasad_Resume.pdf"
            download
            className="mt-10 inline-block rounded-full bg-ink px-6 py-3 font-medium text-canvas transition-colors hover:bg-accent-ink hover:text-canvas"
          >
            Download resume
          </a>
        </div>
      </div>
    </div>
  );
}
