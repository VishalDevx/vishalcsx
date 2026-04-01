"use client";

import type { ReactNode } from "react";

export function TerminalSection({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-white/[0.03] shadow-[0_0_0_1px_rgba(255,255,255,0.04)]">
      <div className="flex items-center justify-between gap-4 border-b border-white/10 px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
          </div>
          <div className="font-mono text-xs text-zinc-300">
            <span className="text-zinc-100">$</span> {title}
          </div>
        </div>

        {subtitle ? (
          <div className="hidden sm:block font-mono text-[11px] text-zinc-400">
            {subtitle}
          </div>
        ) : null}
      </div>

      <div className="px-4 py-4 font-mono">{children}</div>
    </section>
  );
}

