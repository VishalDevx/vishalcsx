"use client";

import { TerminalSection } from "./TerminalSection";

type ResumeItem = { k: string; v: string };

const SUMMARY: ResumeItem[] = [
  { k: "name", v: "Vishal Singh" },
  { k: "headline", v: "Senior Backend Engineer • Senior Full-Stack Engineer " },
  { k: "location", v: "India (open to remote)" },
  { k: "email", v: "vishalcsx@gmail.com" },
  { k: "github", v: "github.com/VishalDevx" },
];

const EDUCATION = [
  {
    when: "2022 — present",
    what: "B.Tech (Science/Engineering track)",
    where: "AKTU (Dr. A.P.J. Abdul Kalam Technical University)",
    note: "Currently pursuing; interested in systems + applied science.",
  },
  { when: "2019 — 2021", what: "10th & 12th", where: "UP Board", note: "Completed." },
];

export function ResumeSection() {
  return (
    <section id="about" className="scroll-mt-24">
      <TerminalSection title="cat ./resume.txt" subtitle="about • education • summary">
        <div className="space-y-6 text-sm text-zinc-200/90">
          <div className="space-y-2">
            {SUMMARY.map((r) => (
              <div key={r.k} className="flex flex-col gap-1 sm:flex-row sm:gap-3">
                <span className="text-zinc-400 sm:w-28">{r.k}</span>
                <span className="text-zinc-100">{r.v}</span>
              </div>
            ))}
            <div className="pt-2 text-xs text-zinc-500">
            
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
            <div className="text-xs text-zinc-400">about</div>
            <p className="mt-2 leading-relaxed text-zinc-200/90">
              I build backend-heavy products and scalable systems: clean service
              boundaries, pragmatic data models, and reliability-first design.
              I care about correctness, latency budgets, and observability because
              that’s what makes software survive in the real world.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
            <div className="text-xs text-zinc-400">cs + math/physics</div>
            <div className="mt-2 grid gap-2 sm:grid-cols-2">
              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
                <div className="font-semibold text-zinc-100">computer science</div>
                <div className="mt-1 text-xs text-zinc-300/90">
                  DS&A • OS • DBMS • Computer Networks • Distributed systems basics
                </div>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
                <div className="font-semibold text-zinc-100">math + physics</div>
                <div className="mt-1 text-xs text-zinc-300/90">
                  calculus • linear algebra • probability • mechanics • E&M
                </div>
              </div>
            </div>
            <div className="mt-3 text-xs text-zinc-400">
              I try to communicate like an engineer: define constraints, state assumptions, and validate with evidence.
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
            <div className="text-xs text-zinc-400">education</div>
            <ul className="mt-3 space-y-3">
              {EDUCATION.map((e) => (
                <li key={`${e.when}-${e.what}`} className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
                  <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-start">
                    <div>
                      <div className="text-sm font-semibold text-zinc-100">{e.what}</div>
                      <div className="text-xs text-zinc-400">{e.where}</div>
                    </div>
                    <div className="font-mono text-xs text-zinc-400">{e.when}</div>
                  </div>
                  {e.note ? <div className="mt-2 text-xs text-zinc-300/90">{e.note}</div> : null}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </TerminalSection>
    </section>
  );
}

