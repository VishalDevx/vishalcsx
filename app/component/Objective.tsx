"use client";

import { useState } from "react";
import { TerminalSection } from "./TerminalSection";

export function Objective() {
  const [open, setOpen] = useState(true);

  return (
    <section id="objective" className="scroll-mt-24">
      <TerminalSection title="objective" subtitle="what I optimize for">
      <div className="space-y-3 text-sm text-zinc-200/90">
        <p>
          Build backend-heavy products that are easy to evolve, observable in
          production, and resilient by design — with clean APIs, predictable data
          models, and systems that fail gracefully.
        </p>

        <button
          onClick={() => setOpen((p) => !p)}
          className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[11px] text-zinc-300 hover:bg-white/10"
        >
          {open ? "hide focus areas" : "show focus areas"}
        </button>

        {open ? (
          <ul className="grid gap-2 sm:grid-cols-2">
            <li className="rounded-xl border border-white/10 bg-black/30 px-3 py-2">
              <span className="text-emerald-400">+</span>{" "}
              <span className="text-zinc-100">scalability</span>{" "}
              <span className="text-zinc-400">— capacity planning, caching, queues</span>
            </li>
            <li className="rounded-xl border border-white/10 bg-black/30 px-3 py-2">
              <span className="text-emerald-400">+</span>{" "}
              <span className="text-zinc-100">reliability</span>{" "}
              <span className="text-zinc-400">— retries, idempotency, timeouts</span>
            </li>
            <li className="rounded-xl border border-white/10 bg-black/30 px-3 py-2">
              <span className="text-emerald-400">+</span>{" "}
              <span className="text-zinc-100">data correctness</span>{" "}
              <span className="text-zinc-400">— constraints, migrations, indexes</span>
            </li>
            <li className="rounded-xl border border-white/10 bg-black/30 px-3 py-2">
              <span className="text-emerald-400">+</span>{" "}
              <span className="text-zinc-100">observability</span>{" "}
              <span className="text-zinc-400">— logs, metrics, tracing, SLOs</span>
            </li>
          </ul>
        ) : null}
      </div>
      </TerminalSection>
    </section>
  );
}
