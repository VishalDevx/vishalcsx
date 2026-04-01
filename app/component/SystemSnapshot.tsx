"use client";

import { TerminalSection } from "./TerminalSection";

const ROWS: Array<{ k: string; v: string }> = [
  { k: "roles", v: "Senior Backend Engineer • Senior Full-Stack Engineer • System Architect" },
  { k: "core", v: "API design, system design, data modeling, reliability, performance, DX" },
  { k: "backend", v: "Node.js/TypeScript, REST, queues, auth, caching, observability" },
  { k: "data", v: "PostgreSQL, indexing, migrations, query planning, consistency trade-offs" },
  { k: "cloud", v: "Docker, CI/CD, Linux, reverse proxies, deployments, infra basics" },
];

export function SystemSnapshot() {
  return (
    <section id="systems" className="scroll-mt-24">
      <TerminalSection title="cat ./profile.system" subtitle="designing for failure, then for scale">
      <div className="space-y-2 text-sm text-zinc-200/90">
        {ROWS.map((r) => (
          <div key={r.k} className="flex flex-col gap-1 sm:flex-row sm:gap-3">
            <span className="text-zinc-400 sm:w-28">{r.k}</span>
            <span className="text-zinc-100">{r.v}</span>
          </div>
        ))}
        <div className="pt-2 text-xs text-zinc-400">
          principles: simple interfaces • explicit contracts • defend invariants • measure everything • automate the boring
        </div>
      </div>
      </TerminalSection>
    </section>
  );
}

