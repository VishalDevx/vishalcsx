"use client";

import { TerminalSection } from "./TerminalSection";

const ROWS: Array<{ k: string; v: string }> = [
  { 
    k: "roles", 
    v: "Senior Backend Engineer • Full-Stack Engineer (Backend-heavy)" 
  },
  { 
    k: "core", 
    v: "Scalable system design, API architecture, data modeling, performance optimization, fault tolerance" 
  },
  { 
    k: "backend", 
    v: "Node.js (production-grade), TypeScript, REST/GraphQL APIs, authentication (JWT/OAuth), background jobs (queues), caching (Redis), logging & observability" 
  },
  { 
    k: "frontend", 
    v: "React/Next.js (App Router), state management (Zustand/Redux), SSR/SSG, performance optimization, responsive UI with Tailwind CSS" 
  },
  { 
    k: "data", 
    v: "PostgreSQL (indexing, query optimization), schema design, migrations, transactional integrity, consistency trade-offs" 
  },
  { 
    k: "cloud", 
    v: "Docker, CI/CD pipelines, Linux, reverse proxies (NGINX), deployment strategies, basic cloud infra" 
  },
];

export function SystemSnapshot() {
  return (
    <section id="systems" className="scroll-mt-24">
      <TerminalSection title="cat ./profile.system" subtitle="designing for failure, then for scale">
        <div className="grid grid-cols-[120px_1fr] gap-y-2 gap-x-3 text-sm text-zinc-200/90">
          {ROWS.map((r) => (
            <div key={r.k} className="contents">
              <span className="text-zinc-400">{r.k}</span>
              <span className="text-zinc-100">{r.v}</span>
            </div>
          ))}
          
          <span className="text-zinc-400">principles</span>
          <span className="pt-2 text-xs text-zinc-400">
            simple interfaces • explicit contracts • defend invariants • measure everything • automate the boring
          </span>
        </div>
      </TerminalSection>
    </section>
  );
}