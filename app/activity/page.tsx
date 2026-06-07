"use client";

import Link from "next/link";
import { useMemo, useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { ArrowUpRight, Github, Activity as ActivityIcon, Boxes, Brain, Rocket, BookOpen, FolderGit2, GitCommitHorizontal } from "lucide-react";
import { useData } from "@/lib/use-data";

const TimelineRiver = dynamic(() => import("@/components/3d/TimelineRiver").then(mod => ({ default: mod.TimelineRiver })), { ssr: false });

function StatCounter({ value, label, isInfinity }: { value: number; label: string; isInfinity: boolean }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isInfinity) return;
    const duration = 1000;
    const steps = 40;
    const increment = value / steps;
    let current = 0;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      current = Math.min(current + increment, value);
      setCount(Math.round(current));
      if (step >= steps) { setCount(value); clearInterval(timer); }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [value, isInfinity]);

  return (
    <div ref={ref} className="flex flex-col items-start gap-1 lg:items-end">
      <span className="text-[28px] font-bold leading-none text-[var(--text-primary)] sm:text-[34px] lg:text-[40px]" style={{ fontFamily: "'Syne', sans-serif" }}>
        {isInfinity ? "∞" : count}
      </span>
      <span className="text-[9px] uppercase tracking-[0.15em] text-[var(--text-muted)] sm:text-[10px]" style={{ fontFamily: "'DM Mono', monospace" }}>{label}</span>
    </div>
  );
}

function getActivityIcon(type: string) {
  switch (type) {
    case "building": return Boxes;
    case "learning": return Brain;
    case "designing": return Rocket;
    case "studying": return BookOpen;
    case "opensource": return FolderGit2;
    case "exploring": return GitCommitHorizontal;
    default: return ActivityIcon;
  }
}

export default function ActivityPage() {
  const { data: activity, loading } = useData<any>("activity");
  const { data: profile } = useData<any>("profile");
  const [expandedSlug, setExpandedSlug] = useState<string | null>("school-management-system-work");
  const [activeFilter, setActiveFilter] = useState("All");

  const feed = activity?.feed || [];
  const snapshots = activity?.snapshots || [];
  const timeline = activity?.timeline || [];
  const filters = activity?.filters || ["All", "Building", "Learning", "Designing", "Studying", "Open Source", "Exploring"];

  const filteredFeed = useMemo(() => {
    if (activeFilter === "All") return feed;
    return feed.filter((item: any) => item.category === activeFilter);
  }, [feed, activeFilter]);

  const toggleCard = (slug: string) => setExpandedSlug((prev) => (prev === slug ? null : slug));

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
          <div className="absolute inset-0 opacity-25">
            <TimelineRiver />
          </div>
          <div className="absolute left-[-80px] top-[-20px] h-[240px] w-[240px] rounded-full bg-[var(--glow)] blur-[80px] sm:left-[4%] sm:top-0 sm:h-[320px] sm:w-[320px] sm:blur-[100px] lg:left-[10%] lg:h-[500px] lg:w-[400px] lg:blur-[120px]" />
          <div className="absolute bottom-[-30px] right-[-60px] h-[220px] w-[220px] rounded-full bg-[var(--glow)] blur-[80px] sm:right-[4%] sm:bottom-0 sm:h-[300px] sm:w-[300px] sm:blur-[95px] lg:right-[8%] lg:h-[400px] lg:w-[400px] lg:blur-[100px]" />
        </div>
        <div className="relative z-10 mx-auto max-w-[1200px] px-4 pb-16 sm:px-6 sm:pb-20 md:px-8 lg:pb-24">
          <header className="mb-12 grid grid-cols-1 gap-8 border-b border-[var(--border-color)] pb-10 pt-12 sm:mb-14 sm:pb-12 sm:pt-14 lg:mb-16 lg:grid-cols-[1fr_auto] lg:items-end lg:pb-14 lg:pt-20">
            <div>
              <div className="mb-4 flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-[var(--text-secondary)] sm:mb-5 sm:text-[11px]" style={{ fontFamily: "'DM Mono', monospace" }}>
                <span className="block h-px w-5 bg-[var(--divider-line)] sm:w-6" /> Activity Log
              </div>
              <h1 className="text-[clamp(36px,11vw,88px)] font-extrabold leading-[0.95] tracking-[-0.03em] text-[var(--text-primary)]" style={{ fontFamily: "'Syne', sans-serif" }}>
                What I&apos;m<br /><span className="text-transparent" style={{ WebkitTextStroke: "1px var(--stroke)" }}>doing now</span>
              </h1>
              <p className="mt-5 max-w-[580px] text-sm font-light leading-7 text-[var(--text-secondary)] sm:mt-6 sm:text-[15px] sm:leading-8 md:text-base md:leading-[1.75]">
                A live view of what I&apos;m building, learning, exploring, and improving — from product systems and backend architecture to open source, AI/ML engineering, and LLM integration.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-4 sm:gap-5 lg:flex lg:flex-col lg:items-end lg:gap-4 lg:pb-1">
              {[
                { num: feed.length, label: "Active Tracks", isInfinity: false },
                { num: 3, label: "Core Focuses", isInfinity: false },
                { num: 0, label: "Improvement Loop", isInfinity: true },
              ].map(({ num, label, isInfinity }, i) => (
                <StatCounter key={i} value={num} label={label} isInfinity={isInfinity} />
              ))}
            </div>
          </header>

          <div className="mb-8 flex flex-wrap gap-2 sm:mb-10">
            {filters.map((filter: string) => (
              <button key={filter} onClick={() => setActiveFilter(filter)}
                className={`rounded border px-3 py-[7px] text-[10px] uppercase tracking-[0.12em] transition-all duration-200 sm:px-4 sm:text-[11px] ${activeFilter === filter ? "bg-cyan-500 text-[#050505] border-cyan-500" : "border-[var(--border-color)] bg-transparent text-[var(--text-secondary)] hover:border-[var(--border-color)] hover:bg-[var(--card-hover)] hover:text-[var(--text-primary)]"}`}
                style={{ fontFamily: "'DM Mono', monospace" }}>{filter}</button>
            ))}
          </div>

            <div className="mb-16 flex flex-col gap-px overflow-hidden rounded-2xl border border-[var(--border-color)] bg-[var(--card-border)] sm:mb-20">
            {filteredFeed.map((item: any) => {
              const isOpen = expandedSlug === item.slug;
              const Icon = getActivityIcon(item.type);
              return (
                <motion.article
                  key={item.slug}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  onClick={() => toggleCard(item.slug)}
                  className={`grid cursor-pointer grid-cols-1 transition-colors md:grid-cols-[64px_1fr] lg:grid-cols-[72px_1fr_170px] ${isOpen ? "border-l-2 border-[var(--accent)] bg-[var(--bg-secondary)]" : "bg-[var(--bg-primary)] hover:bg-[var(--bg-secondary)]"}`}>
                  <div className="flex items-center justify-between border-b border-[var(--border-color)] px-5 py-4 md:hidden">
                    <span className="text-[10px] tracking-[0.1em] text-[var(--text-muted)]" style={{ fontFamily: "'DM Mono', monospace" }}>{item.index}</span>
                    <div className="flex items-center gap-2">
                      <span className="rounded border border-[var(--accent)] bg-[var(--accent-bg)] px-2 py-[3px] text-[10px] uppercase tracking-[0.15em] text-[var(--accent-text)]" style={{ fontFamily: "'DM Mono', monospace" }}>{item.category}</span>
                      <ArrowUpRight size={16} className={`text-[var(--text-muted)] transition-all ${isOpen ? "rotate-45 text-[var(--accent-text)]" : ""}`} />
                    </div>
                  </div>
                  <div className="hidden items-start justify-center border-r border-[var(--border-color)] pt-7 md:flex">
                    <span className="text-[11px] tracking-[0.1em] text-[var(--text-muted)]" style={{ fontFamily: "'DM Mono', monospace" }}>{item.index}</span>
                  </div>
                  <div className="p-5 sm:p-6 lg:p-8">
                    <div className="mb-3 hidden flex-wrap items-center gap-3 md:flex">
                      <span className="rounded border border-[var(--accent)] bg-[var(--accent-bg)] px-2 py-[3px] text-[10px] uppercase tracking-[0.15em] text-[var(--accent-text)]" style={{ fontFamily: "'DM Mono', monospace" }}>{item.category}</span>
                      <span className="text-[10px] uppercase tracking-[0.12em] text-[var(--text-muted)]" style={{ fontFamily: "'DM Mono', monospace" }}>{item.label}</span>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)] sm:h-11 sm:w-11">
                        <Icon size={18} className="text-[var(--accent-text)]" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="mb-3 md:hidden">
                          <span className="text-[10px] uppercase tracking-[0.12em] text-[var(--text-muted)]" style={{ fontFamily: "'DM Mono', monospace" }}>{item.label}</span>
                        </div>
                        <h2 className="mb-3 text-[19px] font-bold leading-tight tracking-[-0.02em] text-[var(--text-primary)] sm:text-[21px] lg:text-[22px]" style={{ fontFamily: "'Syne', sans-serif" }}>{item.title}</h2>
                        <p className="mb-4 max-w-[650px] text-sm font-light leading-relaxed text-[var(--text-secondary)]">{item.description}</p>
                        <div className="flex flex-wrap gap-[6px]">
                          {item.tags?.map((tag: string) => (
                            <span key={tag} className="rounded border border-[var(--border-color)] bg-[var(--bg-secondary)] px-2 py-[3px] text-[10px] tracking-[0.05em] text-[var(--text-secondary)]" style={{ fontFamily: "'DM Mono', monospace" }}>{tag}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                    {isOpen && (
                      <div className="mt-5 grid grid-cols-1 gap-4 border-t border-[var(--border-color)] pt-5 md:mt-6 md:pt-6 xl:grid-cols-3" onClick={(e) => e.stopPropagation()}>
                        {item.points?.map((point: string) => (
                          <div key={point} className="flex gap-3 text-sm font-light leading-relaxed text-[var(--text-secondary)]">
                            <span className="mt-[9px] h-1 w-1 flex-shrink-0 rounded-full bg-blue-500" />
                            <span>{point}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="hidden border-l border-[var(--border-color)] p-7 lg:flex lg:flex-col lg:items-end lg:justify-between" onClick={(e) => e.stopPropagation()}>
                    <ArrowUpRight size={20} className={`text-[var(--text-muted)] transition-all ${isOpen ? "opacity-100 text-[var(--accent-text)]" : "opacity-70"}`} />
                    <div className="flex flex-col items-end gap-[8px]">
                      <div className="text-[10px] uppercase tracking-[0.1em] text-[var(--text-muted)]" style={{ fontFamily: "'DM Mono', monospace" }}>Status</div>
                      <div className="flex items-center gap-2">
                        <span className="relative flex h-2 w-2">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-500 opacity-75" />
                          <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-500" />
                        </span>
                        <span className="text-[11px] uppercase tracking-[0.1em] text-[var(--text-secondary)]" style={{ fontFamily: "'DM Mono', monospace" }}>Active</span>
                      </div>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>

          <div className="mb-6 flex items-center gap-4 sm:mb-7">
            <span className="whitespace-nowrap text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)] sm:text-[11px]" style={{ fontFamily: "'DM Mono', monospace" }}>Quick Snapshots</span>
            <div className="h-px flex-1 bg-[var(--card-border)]" />
            <Link href={profile?.socialLinks?.find((s: any) => s.platform === "github")?.url || "https://github.com/VishalDevx"} target="_blank" className="hidden items-center gap-2 whitespace-nowrap rounded border border-[var(--border-color)] px-3 py-[6px] text-[10px] uppercase tracking-[0.1em] text-[var(--text-secondary)] transition-all hover:border-[var(--border-color)] hover:bg-[var(--card-hover)] hover:text-[var(--text-primary)] sm:flex" style={{ fontFamily: "'DM Mono', monospace" }}>View GitHub <ArrowUpRight size={10} /></Link>
          </div>

          <div className="mb-16 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-[var(--border-color)] bg-[var(--card-border)] sm:mb-20 md:grid-cols-2 xl:grid-cols-3">
            {snapshots.map((item: any) => (
              <div key={item.name} className="group block bg-[var(--bg-primary)] p-5 transition-colors hover:bg-[var(--bg-secondary)] sm:p-6">
                <div className="mb-4 flex items-start justify-between">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--border-color)]"><ActivityIcon size={14} className="text-[var(--text-secondary)]" /></div>
                  <span className="text-[9px] uppercase tracking-[0.15em] text-[var(--text-muted)]" style={{ fontFamily: "'DM Mono', monospace" }}>{item.type}</span>
                </div>
                <h4 className="mb-2 text-[15px] font-bold tracking-[-0.01em] text-[var(--text-primary)]" style={{ fontFamily: "'Syne', sans-serif" }}>{item.name}</h4>
                <p className="mb-4 text-[13px] font-light leading-relaxed text-[var(--text-secondary)]">{item.description}</p>
                <div className="flex flex-wrap gap-[5px]">
                  {item.tech?.map((t: string) => (
                    <span key={t} className="rounded-sm border border-[var(--border-color)] px-[7px] py-[2px] text-[10px] text-[var(--text-muted)]" style={{ fontFamily: "'DM Mono', monospace" }}>{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <section className="mb-16 sm:mb-20">
            <div className="mb-6 flex items-center gap-4 sm:mb-7">
              <span className="whitespace-nowrap text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)] sm:text-[11px]" style={{ fontFamily: "'DM Mono', monospace" }}>Progress Direction</span>
              <div className="h-px flex-1 bg-[var(--card-border)]" />
            </div>
            <div className="overflow-hidden rounded-2xl border border-[var(--border-color)]">
              {timeline.map((item: any, idx: number) => (
                <div key={item.title} className={`grid grid-cols-1 gap-4 p-5 sm:gap-6 sm:p-6 md:grid-cols-[130px_1fr] md:p-7 ${idx !== timeline.length - 1 ? "border-b border-[var(--border-color)]" : ""}`}>
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.15em] text-[var(--accent-text)]" style={{ fontFamily: "'DM Mono', monospace" }}>{item.period}</span>
                  </div>
                  <div>
                    <h3 className="mb-2 text-[18px] font-bold leading-tight tracking-[-0.02em] text-[var(--text-primary)] sm:text-[20px]" style={{ fontFamily: "'Syne', sans-serif" }}>{item.title}</h3>
                    <p className="max-w-[760px] text-sm font-light leading-relaxed text-[var(--text-secondary)]">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <div className="mt-16 grid grid-cols-1 gap-6 rounded-2xl border border-[var(--border-color)] p-6 sm:mt-20 sm:gap-8 sm:p-8 md:grid-cols-[1fr_auto] md:items-center lg:p-10">
            <div>
              <h3 className="text-[22px] font-bold leading-tight tracking-[-0.02em] text-[var(--text-primary)] sm:text-[26px] lg:text-[28px]" style={{ fontFamily: "'Syne', sans-serif" }}>Want to follow the work<br /><span className="font-normal text-[var(--text-secondary)]">or build something serious together?</span></h3>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap md:justify-end">
              <a href={`mailto:${profile?.email || "vishalcsx@gmail.com"}`} className="flex items-center justify-center gap-2 rounded-md bg-[var(--btn-bg)] px-5 py-3 text-[11px] font-medium uppercase tracking-[0.1em] text-[var(--btn-text)] transition-colors hover:bg-[var(--btn-hover)]" style={{ fontFamily: "'DM Mono', monospace" }}>Contact Me <ArrowUpRight size={12} /></a>
              <Link href={profile?.socialLinks?.find((s: any) => s.platform === "github")?.url || "https://github.com/VishalDevx"} target="_blank" className="flex items-center justify-center gap-2 rounded-md border border-[var(--border-color)] px-5 py-3 text-[11px] uppercase tracking-[0.1em] text-[var(--text-secondary)] transition-all hover:border-[var(--border-color)] hover:bg-[var(--card-hover)] hover:text-[var(--text-primary)]" style={{ fontFamily: "'DM Mono', monospace" }}><Github size={12} /> GitHub</Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
