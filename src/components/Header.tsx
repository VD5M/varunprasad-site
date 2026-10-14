"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

const links = [
  { href: "/#work", label: "Work" },
  { href: "/about/", label: "About" },
  { href: "/Varun_Prasad_Resume.pdf", label: "Resume ↗", external: true },
  { href: "/#contact", label: "Contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <header
      className={`sticky top-0 z-50 transition-colors ${
        scrolled
          ? "bg-canvas/80 backdrop-blur-md border-b border-border"
          : "border-b border-transparent"
      }`}
    >
      <div className="wrap flex h-16 items-center justify-between">
        <Link href="/" className="font-display text-xl font-bold hover:text-ink">
          Varun Prasad
        </Link>
        <nav aria-label="Main" className="flex items-center gap-5 text-[15px] md:gap-8">
          {links.map((l) =>
            l.external ? (
              <a key={l.label} href={l.href} target="_blank" rel="noopener" className="whitespace-nowrap">
                {l.label}
              </a>
            ) : (
              <Link key={l.label} href={l.href}>
                {l.label}
              </Link>
            ),
          )}
        </nav>
      </div>
    </header>
  );
}
