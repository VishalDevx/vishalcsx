"use client";

const LINKS = [
  { label: "home", href: "#hero" },
  { label: "systems", href: "#systems" },
  { label: "projects", href: "#projects" },
  { label: "blogs", href: "#blogs" },
  { label: "about", href: "#about" },
  { label: "activity", href: "#activity" },
];

export function TerminalNav() {
  return (
    <div className="sticky top-0 z-50 -mx-5 mb-6 border-b border-white/10 bg-black/60 px-5 py-3 backdrop-blur">
      <div className="mx-auto flex w-full max-w-3xl items-center justify-between gap-3">
        <div className="font-mono text-xs text-zinc-400">
          <span className="text-zinc-100">$</span> portfolio 
        </div>
        <nav className="hidden flex-wrap items-center gap-2 sm:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[11px] text-zinc-200 hover:bg-white/10"
            >
              {l.label}
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
}

