"use client";

import Link from "next/link";
import { ArrowUpRight, Github, Server, Code2, GraduationCap, BookOpen, Cpu, Workflow, Monitor, Database, Boxes, GitBranch } from "lucide-react";
import { useData } from "@/lib/use-data";

const iconMap: Record<string, React.ReactNode> = {
  GraduationCap: <GraduationCap size={16} />,
  BookOpen: <BookOpen size={16} />,
  Code2: <Code2 size={16} />,
  Workflow: <Workflow size={16} />,
  Cpu: <Cpu size={16} />,
  Monitor: <Monitor size={16} />,
  Server: <Server size={16} />,
  Database: <Database size={16} />,
  Boxes: <Boxes size={16} />,
};

export default function AboutPage() {
  const { data: about, loading } = useData<any>("about");
  const { data: profile } = useData<any>("profile");

  if (loading) return (
    <main className="flex min-h-screen items-center justify-center pt-14" style={{ backgroundColor: "var(--bg-primary)" }}>
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-[var(--accent)] border-t-transparent" />
    </main>
  );

  if (!about) return null;

  const { header, quickFacts, introSection, identityCards, focusAreas, currentWork, stackGroups, learningNow, openSourceItems, journey } = about;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:wght@300;400;500&family=DM+Sans:wght@300;400;500&display=swap');
      `}</style>
      <main className="relative min-h-screen overflow-x-hidden pt-14" style={{ backgroundColor: "var(--bg-primary)", color: "var(--text-primary)", transition: "background-color 0.3s ease, color 0.3s ease", fontFamily: "'DM Sans', sans-serif" }}>
        <div className="pointer-events-none fixed inset-0 z-0">
          <div className="absolute left-[-80px] top-[-30px] h-[240px] w-[240px] rounded-full bg-blue-500/[0.05] blur-[80px] sm:left-[4%] sm:top-0 sm:h-[340px] sm:w-[340px] sm:blur-[100px] lg:left-[10%] lg:h-[500px] lg:w-[400px] lg:blur-[120px]" />
          <div className="absolute bottom-[-20px] right-[-60px] h-[220px] w-[220px] rounded-full bg-blue-500/[0.03] blur-[80px] sm:right-[4%] sm:bottom-0 sm:h-[300px] sm:w-[300px] sm:blur-[95px] lg:right-[8%] lg:h-[420px] lg:w-[420px] lg:blur-[110px]" />
        </div>
        <div className="relative z-10 mx-auto max-w-[1200px] px-4 pb-16 sm:px-6 sm:pb-20 md:px-8 lg:pb-24">
          <header className="mb-12 grid grid-cols-1 gap-8 border-b border-[var(--border-color)] pb-10 pt-12 sm:mb-14 sm:pb-12 sm:pt-14 lg:mb-16 lg:grid-cols-[1fr_auto] lg:items-end lg:pb-14 lg:pt-20">
            <div>
              <div className="mb-4 flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-[var(--text-secondary)] sm:mb-5 sm:text-[11px]" style={{ fontFamily: "'DM Mono', monospace" }}>
                <span className="block h-px w-5 bg-[var(--divider-line)] sm:w-6" /> About Me
              </div>
              <h1 className="text-[clamp(34px,11vw,82px)] font-extrabold leading-[0.96] tracking-[-0.035em] text-[var(--text-primary)]" style={{ fontFamily: "'Syne', sans-serif" }}>
                {header.title}<br /><span className="text-transparent" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.28)" }}>{header.subtitle}</span>
              </h1>
              <p className="mt-5 max-w-[760px] text-sm font-light leading-7 text-[var(--text-secondary)] sm:mt-6 sm:text-[15px] sm:leading-8 md:text-base md:leading-[1.9]">{header.description}</p>
            </div>
            <div className="grid grid-cols-3 gap-4 sm:gap-5 lg:flex lg:flex-col lg:items-end lg:gap-4 lg:pb-1">
              {header.badges?.map((badge: any, i: number) => (
                <div key={i} className="flex flex-col items-start gap-1 lg:items-end">
                  <span className="text-[28px] font-bold leading-none text-[var(--text-primary)] sm:text-[34px] lg:text-[40px]" style={{ fontFamily: "'Syne', sans-serif" }}>{badge.num}</span>
                  <span className="text-[9px] uppercase tracking-[0.15em] text-[var(--text-muted)] sm:text-[10px]" style={{ fontFamily: "'DM Mono', monospace" }}>{badge.label}</span>
                </div>
              ))}
            </div>
          </header>

          <section className="mb-12 sm:mb-14 lg:mb-16">
            <div className="mb-6 flex items-center gap-4 sm:mb-7">
              <span className="whitespace-nowrap text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)] sm:text-[11px]" style={{ fontFamily: "'DM Mono', monospace" }}>Quick facts</span>
              <div className="h-px flex-1 bg-[var(--card-border)]" />
            </div>
            <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-[var(--border-color)] bg-[var(--card-border)] md:grid-cols-3">
              {quickFacts?.map((item: any) => (
                <div key={item.label} className="bg-[var(--bg-primary)] p-5 sm:p-6 lg:p-7">
                  <div className="mb-3 flex items-center gap-2 text-[10px] uppercase tracking-[0.14em] text-[var(--accent-text)] sm:mb-4" style={{ fontFamily: "'DM Mono', monospace" }}>{iconMap[item.icon]} {item.label}</div>
                  <h3 className="mb-2 text-[20px] font-bold tracking-[-0.02em] text-[var(--text-primary)] sm:text-[22px]" style={{ fontFamily: "'Syne', sans-serif" }}>{item.value}</h3>
                  <p className="text-[13px] font-light leading-7 text-[var(--text-secondary)] sm:text-[14px] sm:leading-[1.8]">{item.sub}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-12 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-[var(--border-color)] bg-[var(--card-border)] lg:mb-16 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="bg-[var(--bg-primary)] p-6 sm:p-8 md:p-10">
              <div className="mb-4 flex items-center gap-3 text-[10px] uppercase tracking-[0.16em] text-[var(--accent-text)] sm:mb-5" style={{ fontFamily: "'DM Mono', monospace" }}><Code2 size={13} /> What I do</div>
              <h2 className="mb-4 text-[26px] font-bold leading-[1.06] tracking-[-0.03em] text-[var(--text-primary)] sm:text-[32px] md:text-[38px] sm:mb-5" style={{ fontFamily: "'Syne', sans-serif" }}>{introSection?.title || "I build across frontend, backend, and system design"}</h2>
              <p className="max-w-[640px] text-[14px] font-light leading-7 text-[var(--text-secondary)] sm:text-[15px] sm:leading-[1.9]">{introSection?.description}</p>
            </div>
            <div className="flex flex-col justify-between bg-[var(--bg-secondary)] p-6 sm:p-8 md:p-10">
              <div>
                <div className="mb-4 text-[10px] uppercase tracking-[0.16em] text-[var(--text-muted)] sm:mb-5" style={{ fontFamily: "'DM Mono', monospace" }}>Short profile</div>
                <div className="space-y-4">
                  {introSection?.profilePoints?.map((point: string) => (
                    <div key={point} className="flex gap-3 text-sm font-light leading-relaxed text-[var(--text-secondary)]">
                      <span className="mt-[9px] h-1 w-1 flex-shrink-0 rounded-full bg-blue-500" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-7 border-t border-[var(--border-color)] pt-7 sm:mt-8 sm:pt-8">
                <div className="mb-3 text-[9px] uppercase tracking-[0.14em] text-[var(--text-muted)]" style={{ fontFamily: "'DM Mono', monospace" }}>Current direction</div>
                <p className="text-sm leading-[1.8] text-[var(--text-secondary)]">{introSection?.currentDirection}</p>
              </div>
            </div>
          </section>

          <section className="mb-12 sm:mb-14 lg:mb-16">
            <div className="mb-6 flex items-center gap-4 sm:mb-7">
              <span className="whitespace-nowrap text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)] sm:text-[11px]" style={{ fontFamily: "'DM Mono', monospace" }}>More about me</span>
              <div className="h-px flex-1 bg-[var(--card-border)]" />
            </div>
            <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-[var(--border-color)] bg-[var(--card-border)] md:grid-cols-2 xl:grid-cols-3">
              {identityCards?.map((item: any) => (
                <div key={item.title} className="bg-[var(--bg-primary)] p-5 sm:p-6 lg:p-7">
                  <div className="mb-3 flex items-center gap-2 text-[10px] uppercase tracking-[0.14em] text-[var(--accent-text)] sm:mb-4" style={{ fontFamily: "'DM Mono', monospace" }}>{iconMap[item.icon]} {item.label}</div>
                  <h3 className="mb-3 text-[18px] font-bold tracking-[-0.02em] text-[var(--text-primary)] sm:text-[20px]" style={{ fontFamily: "'Syne', sans-serif" }}>{item.title}</h3>
                  <p className="text-[13px] font-light leading-7 text-[var(--text-secondary)] sm:text-[14px] sm:leading-[1.8]">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-12 sm:mb-14 lg:mb-16">
            <div className="mb-6 flex items-center gap-4 sm:mb-7">
              <span className="whitespace-nowrap text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)] sm:text-[11px]" style={{ fontFamily: "'DM Mono', monospace" }}>Focus areas</span>
              <div className="h-px flex-1 bg-[var(--card-border)]" />
            </div>
            <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-[var(--border-color)] bg-[var(--card-border)] md:grid-cols-2 xl:grid-cols-3">
              {focusAreas?.map((area: any) => (
                <div key={area.title} className="bg-[var(--bg-primary)] p-5 sm:p-6 lg:p-7">
                  <span className="mb-4 inline-flex rounded border border-[var(--accent)] bg-[var(--accent-bg)] px-2 py-[4px] text-[10px] uppercase tracking-[0.14em] text-[var(--accent-text)]" style={{ fontFamily: "'DM Mono', monospace" }}>{area.label}</span>
                  <h3 className="mb-3 text-[17px] font-bold tracking-[-0.02em] text-[var(--text-primary)] sm:text-[18px]" style={{ fontFamily: "'Syne', sans-serif" }}>{area.title}</h3>
                  <p className="text-[13px] font-light leading-7 text-[var(--text-secondary)] sm:text-[14px] sm:leading-[1.8]">{area.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-12 sm:mb-14 lg:mb-16">
            <div className="mb-6 flex items-center gap-4 sm:mb-7">
              <span className="whitespace-nowrap text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)] sm:text-[11px]" style={{ fontFamily: "'DM Mono', monospace" }}>What I am doing now</span>
              <div className="h-px flex-1 bg-[var(--card-border)]" />
            </div>
            <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-[var(--border-color)] bg-[var(--card-border)] md:grid-cols-2">
              {currentWork?.map((item: any) => (
                <div key={item.title} className="bg-[var(--bg-primary)] p-5 sm:p-6 lg:p-7">
                  <span className="mb-4 inline-flex rounded border border-[var(--accent)] bg-[var(--accent-bg)] px-2 py-[4px] text-[10px] uppercase tracking-[0.14em] text-[var(--accent-text)]" style={{ fontFamily: "'DM Mono', monospace" }}>{item.tag}</span>
                  <h3 className="mb-3 text-[17px] font-bold tracking-[-0.02em] text-[var(--text-primary)] sm:text-[18px]" style={{ fontFamily: "'Syne', sans-serif" }}>{item.title}</h3>
                  <p className="text-[13px] font-light leading-7 text-[var(--text-secondary)] sm:text-[14px] sm:leading-[1.8]">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-12 sm:mb-14 lg:mb-16">
            <div className="mb-6 flex items-center gap-4 sm:mb-7">
              <span className="whitespace-nowrap text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)] sm:text-[11px]" style={{ fontFamily: "'DM Mono', monospace" }}>Tools and stack</span>
              <div className="h-px flex-1 bg-[var(--card-border)]" />
            </div>
            <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-[var(--border-color)] bg-[var(--card-border)] sm:grid-cols-2 xl:grid-cols-4">
              {stackGroups?.map((group: any) => (
                <div key={group.title} className="bg-[var(--bg-primary)] p-5 sm:p-6 lg:p-7">
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-[16px] font-bold tracking-[-0.02em] text-[var(--text-primary)] sm:text-[17px]" style={{ fontFamily: "'Syne', sans-serif" }}>{group.title}</h3>
                    <div className="text-[var(--accent-text)]">{iconMap[group.icon]}</div>
                  </div>
                  <div className="flex flex-wrap gap-[6px]">
                    {group.items?.map((item: string) => (
                      <span key={item} className="rounded border border-[var(--border-color)] bg-[var(--bg-secondary)] px-2 py-[4px] text-[10px] tracking-[0.05em] text-[var(--text-secondary)]" style={{ fontFamily: "'DM Mono', monospace" }}>{item}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-12 sm:mb-14 lg:mb-16">
            <div className="mb-6 flex items-center gap-4 sm:mb-7">
              <span className="whitespace-nowrap text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)] sm:text-[11px]" style={{ fontFamily: "'DM Mono', monospace" }}>What I am learning now</span>
              <div className="h-px flex-1 bg-[var(--card-border)]" />
            </div>
            <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-[var(--border-color)] bg-[var(--card-border)] sm:grid-cols-2 xl:grid-cols-4">
              {learningNow?.map((item: string, index: number) => (
                <div key={item} className="bg-[var(--bg-primary)] p-5 sm:p-6">
                  <div className="mb-3 text-[10px] uppercase tracking-[0.12em] text-[var(--text-muted)]" style={{ fontFamily: "'DM Mono', monospace" }}>{String(index + 1).padStart(2, "0")}</div>
                  <div className="flex items-start gap-3 text-[14px] leading-[1.7] text-[var(--text-primary)] sm:text-[15px]">
                    <span className="mt-2.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-500" />
                    <span>{item}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-12 sm:mb-14 lg:mb-16">
            <div className="mb-6 flex items-center gap-4 sm:mb-7">
              <span className="whitespace-nowrap text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)] sm:text-[11px]" style={{ fontFamily: "'DM Mono', monospace" }}>Open source</span>
              <div className="h-px flex-1 bg-[var(--card-border)]" />
            </div>
            <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-[var(--border-color)] bg-[var(--card-border)] md:grid-cols-2">
              {openSourceItems?.map((item: any) => (
                <div key={item.title} className="bg-[var(--bg-primary)] p-5 sm:p-6 lg:p-7">
                  <div className="mb-4 flex items-center gap-2 text-[10px] uppercase tracking-[0.14em] text-[var(--accent-text)]" style={{ fontFamily: "'DM Mono', monospace" }}><GitBranch size={12} /> {item.label}</div>
                  <h3 className="mb-3 text-[18px] font-bold tracking-[-0.02em] text-[var(--text-primary)] sm:text-[20px]" style={{ fontFamily: "'Syne', sans-serif" }}>{item.title}</h3>
                  <p className="text-[13px] font-light leading-7 text-[var(--text-secondary)] sm:text-[14px] sm:leading-[1.8]">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-16 sm:mb-18 lg:mb-20">
            <div className="mb-6 flex items-center gap-4 sm:mb-7">
              <span className="whitespace-nowrap text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)] sm:text-[11px]" style={{ fontFamily: "'DM Mono', monospace" }}>Journey</span>
              <div className="h-px flex-1 bg-[var(--card-border)]" />
            </div>
            <div className="flex flex-col gap-px overflow-hidden rounded-2xl border border-[var(--border-color)] bg-[var(--card-border)]">
              {journey?.map((item: any) => (
                <div key={item.title} className="grid grid-cols-1 bg-[var(--bg-primary)] transition-colors hover:bg-[var(--bg-secondary)] md:grid-cols-[160px_1fr]">
                  <div className="border-b border-[var(--border-color)] p-5 md:border-b-0 md:border-r md:p-7">
                    <span className="text-[10px] uppercase tracking-[0.14em] text-[var(--accent-text)]" style={{ fontFamily: "'DM Mono', monospace" }}>{item.year}</span>
                  </div>
                  <div className="p-5 md:p-7">
                    <h3 className="mb-3 text-[18px] font-bold tracking-[-0.02em] text-[var(--text-primary)] sm:text-[20px]" style={{ fontFamily: "'Syne', sans-serif" }}>{item.title}</h3>
                    <p className="max-w-[760px] text-[13px] font-light leading-7 text-[var(--text-secondary)] sm:text-[14px] sm:leading-[1.8]">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="grid grid-cols-1 gap-6 rounded-2xl border border-[var(--border-color)] p-6 sm:gap-8 sm:p-8 lg:grid-cols-[1fr_auto] lg:items-center lg:p-10">
            <div>
              <h3 className="text-[22px] font-bold leading-tight tracking-[-0.02em] text-[var(--text-primary)] sm:text-[26px] lg:text-[28px]" style={{ fontFamily: "'Syne', sans-serif" }}>Want proof beyond the intro?<br /><span className="font-normal text-[var(--text-secondary)]">Look at the projects, systems, and code direction.</span></h3>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap lg:justify-end">
              <Link href="/projects" className="flex items-center justify-center gap-2 rounded-md bg-[var(--btn-bg)] px-5 py-3 text-[11px] font-medium uppercase tracking-[0.1em] text-[var(--btn-text)] transition-colors hover:bg-[var(--btn-hover)]" style={{ fontFamily: "'DM Mono', monospace" }}>View projects <ArrowUpRight size={12} /></Link>
              <Link href="/system" className="flex items-center justify-center gap-2 rounded-md border border-[var(--border-color)] px-5 py-3 text-[11px] uppercase tracking-[0.1em] text-[var(--text-secondary)] transition-all hover:border-[var(--border-color)] hover:bg-[var(--card-hover)] hover:text-[var(--text-primary)]" style={{ fontFamily: "'DM Mono', monospace" }}><Server size={12} /> Systems</Link>
              <Link href={profile?.socialLinks?.find((s: any) => s.platform === "github")?.url || "https://github.com/VishalDevx"} target="_blank" className="flex items-center justify-center gap-2 rounded-md border border-[var(--border-color)] px-5 py-3 text-[11px] uppercase tracking-[0.1em] text-[var(--text-secondary)] transition-all hover:border-[var(--border-color)] hover:bg-[var(--card-hover)] hover:text-[var(--text-primary)]" style={{ fontFamily: "'DM Mono', monospace" }}><Github size={12} /> GitHub</Link>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
