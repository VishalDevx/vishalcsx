"use client";

import { TerminalSection } from "./TerminalSection";

const LINES = [
  "hypothesis: systems get reliable when assumptions are testable",
  "method: measure → model → iterate (like a lab notebook, but for prod)",
  "instrumentation: logs, traces, metrics; define SLOs before tuning",
  "experiments: load tests, fault injection, canary releases",
  "results: fewer unknowns, faster debugging, calmer on-call",
  "math/physics lens: constraints, invariants, units, and boundary conditions",
];

export function ScienceFlavor() {
  return (
    <section id="science" className="scroll-mt-24">
      <TerminalSection title="lab-notes --systems" subtitle="science student energy, engineering discipline">
      <div className="space-y-3 text-sm text-zinc-200/90">
        <p className="text-zinc-300/90">
          I bring a science mindset to engineering: I like constraints, evidence,
          and repeatable results. When a system fails, I treat it as a dataset —
          then I tighten the model until the behavior is predictable.
        </p>

        <div className="rounded-xl border border-white/10 bg-black/30 px-3 py-3">
          {LINES.map((l) => (
            <div key={l} className="flex gap-2">
              <span className="text-emerald-400">$</span>
              <span className="text-zinc-100">{l}</span>
            </div>
          ))}
        </div>
      </div>
      </TerminalSection>
    </section>
  );
}

