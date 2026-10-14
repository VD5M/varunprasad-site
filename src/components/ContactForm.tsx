"use client";
import { useState } from "react";

export default function ContactForm() {
  const [state, setState] = useState<"idle" | "sending" | "ok" | "error">("idle");
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("sending");
    try {
      const res = await fetch("https://formspree.io/f/mvzeljvp", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(e.currentTarget),
      });
      if (res.ok) { setState("ok"); e.currentTarget.reset(); } else setState("error");
    } catch {
      setState("error");
    }
  }
  const field =
    "w-full rounded-[14px] border border-border bg-surface px-4 py-3 text-ink placeholder:text-muted focus-visible:outline-2";
  return (
    <form onSubmit={onSubmit} className="grid gap-4" aria-label="Contact form">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-1.5 text-sm text-muted">
          Name
          <input name="name" required autoComplete="name" className={field} />
        </label>
        <label className="grid gap-1.5 text-sm text-muted">
          Email
          <input name="email" type="email" required autoComplete="email" className={field} />
        </label>
      </div>
      <label className="grid gap-1.5 text-sm text-muted">
        Message
        <textarea name="message" required rows={5} className={field} />
      </label>
      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={state === "sending"}
          className="rounded-full bg-ink px-6 py-3 font-medium text-canvas transition-colors hover:bg-accent-ink disabled:opacity-60"
        >
          {state === "sending" ? "Sending…" : "Send message"}
        </button>
        <p role="status" className="text-sm text-muted">
          {state === "ok" && "Thanks — I'll be in touch soon."}
          {state === "error" && "Something went wrong. Please email me directly instead."}
        </p>
      </div>
    </form>
  );
}
