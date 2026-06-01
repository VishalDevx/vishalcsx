"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import {
  ArrowUpRight, Github, ShieldCheck,
  LayoutPanelTop, Server, Database, Braces, Boxes, Cpu,
} from "lucide-react";
import { useData } from "@/lib/use-data";

const SkillsGraph = dynamic(() => import("@/components/3d/SkillsGraph").then(mod => ({ default: mod.SkillsGraph })), { ssr: false });

const iconMap: Record<string, React.ComponentType<{ size?: number }>> = {
  LayoutPanelTop, Server, Database, Braces, Boxes, Cpu,
};

export default function SkillsPage() {
  const { data: skillGroups, loading } = useData<any[]>("skills");
  const { data: profile } = useData<any>("profile");
  const { data: site } = useData<any>("site");
  const [expandedSlug, setExpandedSlug] = useState<string | null>("backend-systems");
  const [activeFilter, setActiveFilter] = useState("All");

  const filters = site?.skillCategories || ["All", "Full-Stack", "Backend", "Frontend", "Database", "Infra", "Web3"];

  const filteredSkills = useMemo(() => {
    if (!skillGroups) return [];
    if (activeFilter === "All") return skillGroups;
    return skillGroups.filter((skill: any) => skill.category === activeFilter);
  }, [skillGroups, activeFilter]);

  const toggleCard = (slug: string) => setExpandedSlug((prev) => (prev === slug ? null : slug));

  const skillSnapshots = [
    { name: "TypeScript", type: "Core", description: "Primary language for most of my backend and frontend work.", tech: ["APIs", "React", "Next.js"], href: profile?.socialLinks?.find((s: any) => s.platform === "github")?.url || "https://github.com/VishalDevx" },
    { name: "PostgreSQL", type: "Core", description: "Main database choice for structured systems and scalable product workflows.", tech: ["Schema Design", "Relations", "Queries"], href: profile?.socialLinks?.find((s: any) => s.platform === "github")?.url || "https://github.com/VishalDevx" },
    { name: "Node.js", type: "Core", description: "Used for backend services, modular APIs, auth flows, and business logic.", tech: ["Express", "Services", "Auth"], href: profile?.socialLinks?.find((s: any) => s.platform === "github")?.url || "https://github.com/VishalDevx" },
  ];

  const learningItems = ["Rust", "Solana", "Anchor", "Advanced System Design", "Caching Strategy", "CI/CD", "Open Source", "AI / ML Learning", "Scalable APIs"];

  if (loading) return (
    <main className="flex min-h-screen items-center justify-center pt-14" style={{ backgroundColor: "var(--bg-primary)" }}>
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-[var(--accent)] border-t-transparent" />
    </main>
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:wght@300;400;500&family=DM+Sans:wght@300;400;500&display=swap');
      `}</style>
      <main className="relative min-h-screen overflow-x-hidden pt-14" style={{ backgroundColor: "var(--bg-primary)", color: "var(--text-primary)", transition: "background-color 0.3s ease, color 0.3s ease", fontFamily: "'DM Sans', sans-serif" }}>
        <div className="pointer-events-none fixed inset-0 z-0">
          <div className="absolute inset-0 opacity-20">
            <SkillsGraph />
          </div>
          <div className="absolute top-0 left-[10%] h-[260px] w-[260px] rounded-full bg-[var(--glow)] blur-[90px] sm:h-[360px] sm:w-[360px] md:h-[420px] md:w-[420px] md:blur-[120px]" />
          <div className="absolute bottom-0 right-[8%] h-[220px] w-[220px] rounded-full bg-[var(--glow)] blur-[80px] sm:h-[320px] sm:w-[320px] md:h-[380px] md:w-[380px] md:blur-[100px]" />
        </div>
        <div className="relative z-10 mx-auto max-w-[1200px] px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8 lg:pb-24">
          <header className="mb-12 grid grid-cols-1 items-end gap-8 border-b border-[var(--border-color)] pb-10 pt-12 sm:mb-14 sm:pb-12 sm:pt-16 md:pt-20 lg:grid-cols-[1fr_auto]">
            <div>
              <div className="mb-4 flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-[var(--text-secondary)] sm:mb-5 sm:text-[11px]" style={{ fontFamily: "'DM Mono', monospace" }}>
                <span className="block h-px w-5 bg-zinc-700 sm:w-6" /> Technical Skills
              </div>
              <h1 className="text-[clamp(2.75rem,10vw,5.5rem)] font-extrabold leading-[0.92] tracking-[-0.03em] text-[var(--text-primary)]" style={{ fontFamily: "'Syne', sans-serif" }}>
                Stack<br />I&apos;m <span className="text-transparent" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.28)" }}>building</span>
              </h1>
              <p className="mt-5 max-w-[560px] text-sm font-light leading-7 text-[var(--text-secondary)] sm:mt-6 sm:text-base sm:leading-[1.75]">
                Full-stack engineering with a strong <span className="font-normal text-[var(--text-primary)]">backend and systems</span> core — shaped by product building, architecture work, open-source learning, and real implementation.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-4 pt-2 lg:flex lg:flex-col lg:items-end lg:gap-4 lg:pb-1">
              {[{ num: String(skillGroups?.length || 6), label: "Skill Groups" }, { num: "15+", label: "Core Tools" }, { num: "24/7", label: "Learning Mode" }].map(({ num, label }, i) => (
                <div key={i} className="flex flex-col rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)] px-3 py-4 text-center lg:items-end lg:border-0 lg:bg-transparent lg:px-0 lg:py-0 lg:text-right">
                  <span className="text-2xl font-bold leading-none text-[var(--text-primary)] sm:text-3xl lg:text-[40px]" style={{ fontFamily: "'Syne', sans-serif" }}>{num}</span>
                  <span className="mt-1 text-[9px] uppercase tracking-[0.15em] text-[var(--text-muted)] sm:text-[10px]" style={{ fontFamily: "'DM Mono', monospace" }}>{label}</span>
                </div>
              ))}
            </div>
          </header>

          <div className="mb-8 flex flex-wrap gap-2 sm:mb-10">
            {filters.map((f: string) => (
              <button key={f} onClick={() => setActiveFilter(f)}
                className={`rounded px-3 py-2 text-[10px] uppercase tracking-[0.12em] transition-all sm:px-4 sm:py-[6px] sm:text-[11px] ${activeFilter === f ? "border border-[var(--accent)] bg-[var(--accent-bg)] text-[var(--accent-text)]" : "border border-[var(--border-color)] bg-transparent text-[var(--text-secondary)] hover:border-[var(--border-color)] hover:bg-[var(--card-hover)] hover:text-[var(--text-primary)]"}`}
                style={{ fontFamily: "'DM Mono', monospace" }}>{f}</button>
            ))}
          </div>

          <div className="mb-16 overflow-hidden rounded-2xl border border-[var(--border-color)] bg-[var(--card-border)] sm:mb-20">
            {filteredSkills.map((skill: any, idx: number) => {
              const isOpen = expandedSlug === skill.slug;
              const Icon = iconMap[skill.icon] || null;

              return (
                <article key={skill.slug} onClick={() => toggleCard(skill.slug)}
                  className={`grid cursor-pointer grid-cols-[56px_1fr] transition-colors sm:grid-cols-[64px_1fr] lg:grid-cols-[72px_1fr_200px] ${isOpen ? "border-l-2 border-[var(--accent)] bg-[var(--bg-secondary)]" : "bg-[var(--bg-primary)] hover:bg-[var(--bg-secondary)]"} ${idx !== filteredSkills.length - 1 ? "border-b border-[var(--border-color)]" : ""}`}>
                  <div className="flex items-start justify-center border-r border-[var(--border-color)] pt-5 sm:pt-6 lg:pt-7">
                    <span className="text-[10px] tracking-[0.1em] text-[var(--text-muted)] sm:text-[11px]" style={{ fontFamily: "'DM Mono', monospace" }}>{skill.index}</span>
                  </div>
                  <div className="p-4 sm:p-6 lg:p-8">
                    <div className="mb-3 flex flex-wrap items-center gap-2 sm:gap-3">
                      <span className="rounded border border-[var(--accent)] bg-[var(--accent-bg)] px-2 py-[3px] text-[9px] uppercase tracking-[0.15em] text-[var(--accent-text)] sm:text-[10px]" style={{ fontFamily: "'DM Mono', monospace" }}>{skill.category}</span>
                      <span className="text-[9px] uppercase tracking-[0.12em] text-[var(--text-muted)] sm:text-[10px]" style={{ fontFamily: "'DM Mono', monospace" }}>{skill.label}</span>
                    </div>
                    <div className="flex items-start gap-3 sm:gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)] sm:h-11 sm:w-11">
                        {Icon && <Icon size={18} />}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="mb-3 flex items-start justify-between gap-3 lg:block">
                          <h2 className="text-[18px] font-bold leading-tight tracking-[-0.02em] text-[var(--text-primary)] sm:text-[20px] lg:text-[22px]" style={{ fontFamily: "'Syne', sans-serif" }}>{skill.title}</h2>
                          <ArrowUpRight size={18} className={`mt-1 shrink-0 text-[var(--text-muted)] transition-all lg:hidden ${isOpen ? "rotate-45 text-[var(--accent-text)]" : ""}`} />
                        </div>
                        <p className="mb-4 max-w-[650px] text-sm font-light leading-relaxed text-[var(--text-secondary)]">{skill.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {skill.stack?.map((tech: string) => (
                            <span key={tech} className="rounded border border-[var(--border-color)] bg-[var(--bg-secondary)] px-2 py-[3px] text-[10px] tracking-[0.05em] text-[var(--text-secondary)]" style={{ fontFamily: "'DM Mono', monospace" }}>{tech}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                    {isOpen && (
                      <div className="mt-5 grid grid-cols-1 gap-6 border-t border-[var(--border-color)] pt-5 lg:mt-6 lg:grid-cols-[1.2fr_1fr] lg:gap-8 lg:pt-6" onClick={(e) => e.stopPropagation()}>
                        <div>
                          <div className="mb-4 text-[10px] uppercase tracking-[0.16em] text-[var(--text-muted)]" style={{ fontFamily: "'DM Mono', monospace" }}>What this means in practice</div>
                          <div className="grid grid-cols-1 gap-4">
                            {skill.points?.map((point: string) => (
                              <div key={point} className="flex gap-3 text-sm font-light leading-relaxed text-[var(--text-secondary)]">
                                <span className="mt-[9px] h-1 w-1 flex-shrink-0 rounded-full bg-blue-500" />
                                <span>{point}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <div className="mb-4 text-[10px] uppercase tracking-[0.16em] text-[var(--text-muted)]" style={{ fontFamily: "'DM Mono', monospace" }}>Tools & concepts</div>
                          <div className="flex flex-wrap gap-2">
                            {skill.tools?.map((tool: string) => (
                              <span key={tool} className="rounded border border-[var(--accent)]/20 bg-blue-500/[0.07] px-2 py-[4px] text-[10px] tracking-[0.05em] text-[var(--text-secondary)]" style={{ fontFamily: "'DM Mono', monospace" }}>{tool}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="hidden flex-col justify-between border-l border-[var(--border-color)] p-7 lg:flex" onClick={(e) => e.stopPropagation()}>
                    <ArrowUpRight size={20} className={`self-end text-[var(--text-muted)] transition-all ${isOpen ? "translate-x-0 translate-y-0 opacity-100" : "opacity-70"}`} />
                    <div className="flex flex-col items-end gap-[8px]">
                      <div className="text-[10px] uppercase tracking-[0.1em] text-[var(--text-muted)]" style={{ fontFamily: "'DM Mono', monospace" }}>Focus Area</div>
                      <div className="max-w-[140px] text-right text-sm leading-relaxed text-[var(--text-secondary)]">{skill.label}</div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="mb-6 flex flex-col gap-4 sm:mb-7 sm:flex-row sm:items-center">
            <div className="flex items-center gap-4 min-w-0 flex-1">
              <span className="whitespace-nowrap text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)] sm:text-[11px]" style={{ fontFamily: "'DM Mono', monospace" }}>Core Stack Snapshots</span>
              <div className="h-px flex-1 bg-[var(--card-border)]" />
            </div>
            <Link href={profile?.socialLinks?.find((s: any) => s.platform === "github")?.url || "https://github.com/VishalDevx"} target="_blank" className="inline-flex w-fit items-center gap-2 whitespace-nowrap rounded border border-[var(--border-color)] px-3 py-[6px] text-[10px] uppercase tracking-[0.1em] text-[var(--text-secondary)] transition-all hover:border-[var(--border-color)] hover:bg-[var(--card-hover)] hover:text-[var(--text-primary)]" style={{ fontFamily: "'DM Mono', monospace" }}>View GitHub <ArrowUpRight size={10} /></Link>
          </div>

          <div className="mb-16 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-[var(--border-color)] bg-[var(--card-border)] md:grid-cols-3 sm:mb-20">
            {skillSnapshots.map((item) => (
              <Link key={item.name} href={item.href} target="_blank" className="group block bg-[var(--bg-primary)] p-5 transition-colors hover:bg-[var(--bg-secondary)] sm:p-6">
                <div className="mb-4 flex items-start justify-between">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--border-color)]"><ShieldCheck size={14} className="text-[var(--text-secondary)]" /></div>
                  <span className="text-[9px] uppercase tracking-[0.15em] text-[var(--text-muted)]" style={{ fontFamily: "'DM Mono', monospace" }}>{item.type}</span>
                </div>
                <h4 className="mb-2 text-[15px] font-bold tracking-[-0.01em] text-[var(--text-primary)] transition-colors group-hover:text-[var(--accent-text)]" style={{ fontFamily: "'Syne', sans-serif" }}>{item.name}</h4>
                <p className="mb-4 text-[13px] font-light leading-relaxed text-[var(--text-secondary)]">{item.description}</p>
                <div className="flex flex-wrap gap-[5px]">
                  {item.tech.map((t: string) => (
                    <span key={t} className="rounded-sm border border-[var(--border-color)] px-[7px] py-[2px] text-[10px] text-[var(--text-muted)]" style={{ fontFamily: "'DM Mono', monospace" }}>{t}</span>
                  ))}
                </div>
              </Link>
            ))}
          </div>

          <section className="mb-16 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1.1fr] lg:gap-8 sm:mb-20">
            <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-secondary)] p-6 sm:p-8">
              <div className="mb-4 text-[10px] uppercase tracking-[0.16em] text-[var(--text-muted)]" style={{ fontFamily: "'DM Mono', monospace" }}>Current Direction</div>
              <h3 className="mb-4 text-[24px] font-bold leading-tight tracking-[-0.02em] text-[var(--text-primary)] sm:text-[28px]" style={{ fontFamily: "'Syne', sans-serif" }}>What I&apos;m learning now</h3>
              <p className="max-w-[560px] text-sm font-light leading-7 text-[var(--text-secondary)] sm:leading-[1.9]">Right now I&apos;m pushing deeper into Rust, Solana, protocol design, stronger system design thinking, and more production-grade engineering patterns. I&apos;m also refining frontend quality so my work doesn&apos;t just function well — it also presents clearly.</p>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {learningItems.map((item) => (
                <div key={item} className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)] px-4 py-4 text-sm text-[var(--text-secondary)] transition-all hover:border-[var(--accent)] hover:bg-[var(--accent-bg)] hover:text-[var(--text-primary)]" style={{ fontFamily: "'DM Mono', monospace" }}>{item}</div>
              ))}
            </div>
          </section>

          <div className="mt-16 grid grid-cols-1 gap-6 rounded-2xl border border-[var(--border-color)] p-6 sm:gap-8 sm:p-8 md:grid-cols-[1fr_auto] md:items-center lg:mt-20 lg:p-10">
            <div>
              <h3 className="text-[24px] font-bold leading-tight tracking-[-0.02em] text-[var(--text-primary)] sm:text-[28px]" style={{ fontFamily: "'Syne', sans-serif" }}>Need an engineer who can<br /><span className="font-normal text-[var(--text-secondary)]">think in systems and still ship product?</span></h3>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap md:justify-end">
              <a href={`mailto:${profile?.email || "vishalcsx@gmail.com"}`} className="inline-flex items-center justify-center gap-2 rounded-md bg-[var(--btn-bg)] px-5 py-3 text-[11px] font-medium uppercase tracking-[0.1em] text-[var(--btn-text)] transition-colors hover:bg-[var(--btn-hover)]" style={{ fontFamily: "'DM Mono', monospace" }}>Get in touch <ArrowUpRight size={12} /></a>
              <Link href={profile?.socialLinks?.find((s: any) => s.platform === "github")?.url || "https://github.com/VishalDevx"} target="_blank" className="inline-flex items-center justify-center gap-2 rounded-md border border-[var(--border-color)] px-5 py-3 text-[11px] uppercase tracking-[0.1em] text-[var(--text-secondary)] transition-all hover:border-[var(--border-color)] hover:bg-[var(--card-hover)] hover:text-[var(--text-primary)]" style={{ fontFamily: "'DM Mono', monospace" }}><Github size={12} /> GitHub</Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
