import ProjectCard from "@/components/ProjectCard";
import ContactForm from "@/components/ContactForm";
import Reveal from "@/components/Reveal";
import { projects, groups, capabilities, clients, alsoBuilt } from "@/content/projects";

export default function Home() {
  return (
    <>
      <section className="wrap pb-[120px] pt-16 md:pt-28">
        <p className="label mb-8 text-muted">Varun Prasad — Digital Designer, Melbourne</p>
        <h1 className="font-display text-[clamp(64px,11vw,168px)] font-extrabold leading-[0.9]">Craft that ships.</h1>
        <p className="mt-10 max-w-[34ch] text-xl text-muted md:text-2xl md:leading-snug">
          I design websites, brands and campaigns for SaaS and consumer brands — and build them too.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <a href="#work" className="rounded-full bg-ink px-6 py-3 font-medium text-canvas transition-colors hover:bg-accent-ink hover:text-canvas">
            View the work ↓
          </a>
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-sm">
            <span className="h-2 w-2 rounded-full bg-accent" aria-hidden /> Available now
          </span>
        </div>
      </section>

      <section id="work" className="wrap pb-[120px]">
        <h2 className="sr-only">Selected work</h2>
        {groups.map((g) => {
          const list = projects.filter((p) => p.group === g);
          return (
            <div key={g} className="mb-24 last:mb-0">
              <h3 className="label mb-8 border-b border-border pb-4 text-muted">{g}</h3>
              <div className="grid gap-x-8 gap-y-14 md:grid-cols-2">
                {list.map((p, idx) => (
                  <ProjectCard key={p.slug} p={p} wide={idx === 0 || (idx === list.length - 1 && list.length % 2 === 0)} />
                ))}
              </div>
            </div>
          );
        })}
      </section>

      <section className="wrap pb-[120px]">
        <h2 className="label mb-8 border-b border-border pb-4 text-muted">Capabilities</h2>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {capabilities.map((c) => (
            <Reveal key={c.title}>
              <h3 className="font-display text-3xl font-bold">{c.title}</h3>
              <ul className="mt-4 grid gap-1.5 text-muted">
                {c.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="wrap pb-[120px]" aria-labelledby="clients">
        <h2 id="clients" className="label mb-8 border-b border-border pb-4 text-muted">Clients</h2>
        <ul className="font-display flex flex-wrap gap-x-4 gap-y-2 text-3xl font-bold leading-tight text-ink/50 md:text-5xl">
          {clients.map((c, i) => (
            <li key={c}>
              {c}
              {i < clients.length - 1 && <span aria-hidden className="ml-4">·</span>}
            </li>
          ))}
        </ul>
        <p className="mt-10 text-muted">
          Also designed &amp; built:{" "}
          {alsoBuilt.map((a, i) => (
            <span key={a.name}>
              <a href={a.href} target="_blank" rel="noopener" className="text-ink underline underline-offset-4">{a.name} ↗</a>
              {i < alsoBuilt.length - 1 ? ", " : ""}
            </span>
          ))}
        </p>
      </section>

      <section id="contact" className="wrap pb-[120px]">
        <h2 className="font-display text-[clamp(44px,7vw,104px)] font-extrabold leading-[0.95]">
          Like what you see? Let&apos;s talk.
        </h2>
        <div className="mt-10 grid gap-12 md:grid-cols-2">
          <div>
            <a
              href="mailto:vazdesu@gmail.com"
              className="font-display text-3xl font-bold underline decoration-2 underline-offset-8 md:text-5xl"
            >
              vazdesu@gmail.com
            </a>
            <p className="mt-8 text-muted">Based in Melbourne, VIC</p>
            <p className="mt-2">
              <a href="https://www.linkedin.com/in/varun-design/" target="_blank" rel="noopener" className="underline underline-offset-4">LinkedIn ↗</a>
            </p>
          </div>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
