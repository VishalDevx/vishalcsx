"use client";

import { useState } from "react";
import Image from "next/image";
import { TerminalSection } from "./TerminalSection";

export function ContributionGraph() {
  const [open, setOpen] = useState(false);

  return (
    <section id="activity" className="scroll-mt-24">
      <TerminalSection title="git log --graph --calendar" subtitle="consistency (public signal)">
      <div className="space-y-3">
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[11px] text-zinc-300 hover:bg-white/10"
        >
          {open ? "hide graph" : "show graph"}
        </button>

        {open ? (
          <div className="overflow-x-auto rounded-xl border border-white/10 bg-black/30 p-3">
            <Image
              src="https://ghchart.rshah.org/VishalDevx"
              alt="GitHub contribution graph for Vishal Singh"
              width={920}
              height={160}
              unoptimized
              className="min-w-[800px]"
            />
          </div>
        ) : (
          <div className="text-sm text-zinc-400">
            tip: open to preview my GitHub activity heatmap.
          </div>
        )}
      </div>
      </TerminalSection>
    </section>
  );
}
