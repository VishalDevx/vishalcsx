"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowUpRight, Github, ExternalLink, FolderOpen } from "lucide-react";

const projects = [
  {
    index: "01",
    slug: "taskmesh",
    category: "Full-Stack",
    label: "Realtime Collaboration",
    title: "TaskMesh",
    description: "Realtime collaborative task manager with workspace management, JWT auth, and live updates — built for teams that need synchronized task tracking.",
    stack: ["Next.js", "TypeScript", "React", "PostgreSQL", "Prisma", "Redis"],
    points: ["Realtime collaboration with WebSocket-based live updates", "JWT authentication with secure workspace isolation", "Scalable architecture with Redis caching and PostgreSQL"],
    githubUrl: "https://github.com/VishalDevx/TaskMesh",
    liveUrl: "https://task-mesh-x2wh.vercel.app/workspaces",
    caseStudyLabel: "Live Demo",
  },
  {
    index: "02",
    slug: "flowforge",
    category: "Full-Stack",
    label: "Workflow Automation",
    title: "FlowForge",
    description: "Workflow automation platform for building, deploying, and managing complex pipelines — designed for developers who need flexible orchestration.",
    stack: ["TypeScript", "JavaScript", "Node.js", "REST API"],
    points: ["Visual workflow builder with drag-and-drop pipeline creation", "Extensible plugin architecture for custom integrations", "Production-ready with error handling and retry logic"],
    githubUrl: "https://github.com/VishalDevx/FlowForge",
    liveUrl: "",
    caseStudyLabel: "Case Study",
  },
  {
    index: "03",
    slug: "rgd-school",
    category: "Full-Stack",
    label: "Education Platform",
    title: "RGD School Management",
    description: "Full-featured school management system with multi-role access for admin, staff, students, and parents — handling academics, fees, and operations.",
    stack: ["Next.js", "TypeScript", "Node.js", "PostgreSQL", "Prisma"],
    points: ["Multi-role dashboards for admin, teachers, students, and parents", "Complete academic workflow from admissions to results", "Fee management, attendance tracking, and report generation"],
    githubUrl: "https://github.com/VishalDevx/rgd-academy",
    liveUrl: "https://www.rgd-modern-academy.online/",
    caseStudyLabel: "Live Site",
  },
];

const githubProjects = [
  { name: "TaskMesh", type: "Pinned", description: "Realtime collaborative task manager with workspaces and live sync.", tech: ["TypeScript", "React", "Redis", "PostgreSQL"], githubUrl: "https://github.com/VishalDevx/TaskMesh" },
  { name: "FlowForge", type: "Pinned", description: "Workflow automation platform for building and managing pipelines.", tech: ["TypeScript", "JavaScript", "Node.js"], githubUrl: "https://github.com/VishalDevx/FlowForge" },
  { name: "rgd-academy", type: "Pinned", description: "School management system with multi-role workflows and full-stack architecture.", tech: ["TypeScript", "Next.js", "PostgreSQL"], githubUrl: "https://github.com/VishalDevx/rgd-academy" },
];

const filters = ["All", "Full-Stack", "Backend", "Frontend"];
const mono = { fontFamily: "'JetBrains Mono', monospace" };
const heading = { fontFamily: "'Space Grotesk', sans-serif" };

export default function ProjectsPage() {
  const [expandedSlug, setExpandedSlug] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState("All");

  const toggleCard = (slug: string) => setExpandedSlug((prev) => (prev === slug ? null : slug));

  const filteredProjects = useMemo(() => {
    if (activeFilter === "All") return projects;
    return projects.filter((project) => {
      const normalized = `${project.category} ${project.label} ${project.title}`.toLowerCase();
      if (activeFilter === "Full-Stack") return normalized.includes("full-stack");
      if (activeFilter === "Backend") return normalized.includes("backend") || normalized.includes("api");
      if (activeFilter === "Frontend") return normalized.includes("frontend") || normalized.includes("ui");
      return true;
    });
  }, [activeFilter]);

  return (
    <>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-in { animation: fadeIn 0.5s ease both; }
      `}</style>

      <main style={{ fontFamily: "'Space Grotesk', sans-serif", backgroundColor: "var(--bg-primary)", color: "var(--text-primary)", minHeight: "100vh", transition: "background-color 0.3s ease, color 0.3s ease" }} className="relative overflow-x-hidden pt-14">
        <div className="pointer-events-none fixed inset-0 z-0">
          <div className="absolute top-0 left-[10%] h-[260px] w-[260px] sm:h-[340px] sm:w-[340px] lg:h-[400px] lg:w-[500px] rounded-full blur-[90px] sm:blur-[110px] lg:blur-[120px]" style={{ background: "var(--glow)" }} />
          <div className="absolute bottom-0 right-[8%] h-[220px] w-[220px] sm:h-[300px] sm:w-[300px] lg:h-[400px] lg:w-[400px] rounded-full blur-[80px] sm:blur-[90px] lg:blur-[100px]" style={{ background: "var(--glow)" }} />
        </div>

        <div className="relative z-10 mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20 lg:pb-24">
          <header className="mb-10 grid grid-cols-1 gap-8 border-b pb-10 pt-24 sm:mb-12 sm:pb-12 sm:pt-28 lg:mb-16 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-10 lg:pb-14 lg:pt-20" style={{ borderColor: "var(--border-color)" }}>
            <div>
              <div className="mb-4 flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] sm:mb-5 sm:text-[11px]" style={{ ...mono, color: "var(--text-muted)" }}>
                <span className="block h-px w-5 sm:w-6" style={{ backgroundColor: "var(--divider-line)" }} />
                Selected Work
              </div>
              <h1 className="text-[clamp(34px,10vw,88px)] font-extrabold leading-[0.92] tracking-[-0.03em]" style={{ ...heading, color: "var(--text-primary)" }}>
                Systems<br />I&apos;ve{" "}
                <span className="text-transparent" style={{ WebkitTextStroke: "1px var(--stroke)" }}>built</span>
              </h1>
              <p className="mt-5 max-w-[480px] text-sm font-light leading-7 sm:mt-6 sm:text-[15px] sm:leading-[1.8] md:text-base" style={{ color: "var(--text-secondary)" }}>
                Full-stack products &{" "}
                <span className="font-normal" style={{ color: "var(--text-primary)" }}>backend-heavy</span>{" "}
                systems — designed around architecture, workflow clarity, and real-world scalability.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4 sm:gap-6 lg:flex lg:flex-col lg:items-end lg:gap-4 lg:pb-1">
              {[{ num: "3", label: "Featured" }, { num: "6+", label: "Technologies" }, { num: "∞", label: "Ship mode" }].map(({ num, label }, i) => (
                <div key={i} className="flex flex-col rounded-xl border p-4 text-left lg:items-end lg:rounded-none lg:border-0 lg:p-0" style={{ borderColor: "var(--card-border)", backgroundColor: "var(--bg-secondary)" }}>
                  <span className="text-[28px] font-bold leading-none sm:text-[34px] lg:text-[40px]" style={{ ...heading, color: "var(--text-primary)" }}>{num}</span>
                  <span className="mt-2 text-[9px] uppercase tracking-[0.15em] sm:text-[10px]" style={{ ...mono, color: "var(--text-muted)" }}>{label}</span>
                </div>
              ))}
            </div>
          </header>

          <div className="mb-8 flex flex-wrap gap-2 sm:mb-10">
            {filters.map((f) => (
              <button key={f} onClick={() => setActiveFilter(f)} className="rounded border px-3 py-2 text-[10px] uppercase tracking-[0.12em] transition-all sm:px-4 sm:py-[7px] sm:text-[11px]" style={{ borderColor: activeFilter === f ? "var(--accent)" : "var(--border-color)", backgroundColor: activeFilter === f ? "var(--accent-bg)" : "transparent", color: activeFilter === f ? "var(--accent-text)" : "var(--text-muted)", ...mono }}>
                {f}
              </button>
            ))}
          </div>

          <div className="mb-16 flex flex-col gap-px overflow-hidden rounded-2xl border sm:mb-20" style={{ borderColor: "var(--card-border)", backgroundColor: "var(--card-border)" }}>
            {filteredProjects.length === 0 ? (
              <div className="p-8 text-center sm:p-10" style={{ backgroundColor: "var(--bg-primary)" }}>
                <p className="mb-3 text-[11px] uppercase tracking-[0.16em]" style={{ ...mono, color: "var(--text-muted)" }}>No matching projects</p>
                <p className="text-sm" style={{ color: "var(--text-secondary)" }}>Your filter found nothing — try a different category.</p>
              </div>
            ) : (
              filteredProjects.map((project) => {
                const isOpen = expandedSlug === project.slug;
                return (
                  <article key={project.slug} onClick={() => toggleCard(project.slug)} className="group grid cursor-pointer grid-cols-1 transition-colors sm:grid-cols-[60px_1fr] lg:grid-cols-[72px_1fr_180px]" style={{ borderLeft: isOpen ? "2px solid var(--accent)" : "none", backgroundColor: isOpen ? "var(--card-hover)" : "var(--card-bg)" }}>
                    <div className="hidden border-r pt-7 sm:flex sm:items-start sm:justify-center" style={{ borderColor: "var(--card-border)" }}>
                      <span className="text-[11px] tracking-[0.1em]" style={{ ...mono, color: "var(--text-muted)" }}>{project.index}</span>
                    </div>
                    <div className="p-5 sm:p-6 lg:p-8">
                      <div className="mb-3 flex flex-wrap items-center gap-3">
                        <span className="rounded border px-2 py-[3px] text-[10px] uppercase tracking-[0.15em]" style={{ borderColor: "var(--accent-bg-hover)", backgroundColor: "var(--accent-bg)", color: "var(--accent-text)", ...mono }}>{project.category}</span>
                        <span className="text-[10px] uppercase tracking-[0.12em]" style={{ ...mono, color: "var(--text-muted)" }}>{project.label}</span>
                      </div>
                      <h2 className="mb-3 text-[20px] font-bold leading-tight tracking-[-0.02em] sm:text-[22px]" style={{ ...heading, color: "var(--text-primary)" }}>{project.title}</h2>
                      <p className="mb-4 max-w-[600px] text-sm font-light leading-relaxed" style={{ color: "var(--text-secondary)" }}>{project.description}</p>
                      <div className="flex flex-wrap gap-[6px]">
                        {project.stack.map((tech) => (
                          <span key={tech} className="rounded border px-2 py-[3px] text-[10px] tracking-[0.05em]" style={{ borderColor: "var(--border-color)", backgroundColor: "var(--bg-secondary)", color: "var(--text-secondary)", ...mono }}>{tech}</span>
                        ))}
                      </div>
                      <div className="mt-5 flex flex-col gap-2 border-t pt-5 sm:flex-row lg:hidden" style={{ borderColor: "var(--card-border)" }} onClick={(e) => e.stopPropagation()}>
                        <Link href={project.githubUrl} target="_blank" className="inline-flex items-center justify-center gap-[6px] rounded-md border px-4 py-3 text-[10px] uppercase tracking-[0.1em] transition-all hover:text-[var(--text-primary)]" style={{ borderColor: "var(--border-color)", color: "var(--text-secondary)", ...mono }}><Github size={11} /> GitHub</Link>
                        <Link href={`/projects/${project.slug}`} className="inline-flex items-center justify-center gap-[6px] rounded-md border px-4 py-3 text-[10px] uppercase tracking-[0.1em] transition-all hover:text-[var(--text-primary)]" style={{ borderColor: "var(--border-color)", color: "var(--text-secondary)", ...mono }}><ExternalLink size={11} /> {project.caseStudyLabel}</Link>
                      </div>
                      {isOpen && (
                        <div className="mt-5 grid grid-cols-1 gap-4 border-t pt-5 md:grid-cols-3" style={{ borderColor: "var(--card-border)" }} onClick={(e) => e.stopPropagation()}>
                          {project.points.map((point) => (
                            <div key={point} className="flex gap-3 text-sm font-light leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                              <span className="mt-[9px] h-1 w-1 flex-shrink-0 rounded-full" style={{ backgroundColor: "var(--accent)" }} />
                              <span>{point}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="hidden border-l p-7 lg:flex lg:flex-col lg:items-end lg:justify-between" style={{ borderColor: "var(--card-border)" }} onClick={(e) => e.stopPropagation()}>
                      <ArrowUpRight size={20} className="transition-all" style={{ color: isOpen ? "var(--accent)" : "var(--arrow-color)", transform: isOpen ? "none" : "translateY(4px) translateX(-4px)", opacity: isOpen ? 1 : 0 }} />
                      <div className="flex flex-col items-end gap-[6px]">
                        <Link href={project.githubUrl} target="_blank" className="flex items-center gap-[5px] rounded border px-3 py-[5px] text-[10px] uppercase tracking-[0.1em] transition-all hover:text-[var(--text-primary)]" style={{ borderColor: "var(--border-color)", color: "var(--text-secondary)", ...mono }}><Github size={10} /> GitHub</Link>
                        <Link href={`/projects/${project.slug}`} className="flex items-center gap-[5px] rounded border px-3 py-[5px] text-[10px] uppercase tracking-[0.1em] transition-all hover:text-[var(--text-primary)]" style={{ borderColor: "var(--border-color)", color: "var(--text-secondary)", ...mono }}><ExternalLink size={10} /> {project.caseStudyLabel}</Link>
                      </div>
                    </div>
                  </article>
                );
              })
            )}
          </div>

          <div className="mb-6 flex items-center gap-4 sm:mb-7">
            <span className="whitespace-nowrap text-[10px] uppercase tracking-[0.2em] sm:text-[11px]" style={{ ...mono, color: "var(--text-muted)" }}>More from GitHub</span>
            <div className="h-px flex-1" style={{ backgroundColor: "var(--divider-line)" }} />
            <Link href="https://github.com/VishalDevx" target="_blank" className="hidden whitespace-nowrap rounded border px-3 py-[6px] text-[10px] uppercase tracking-[0.1em] transition-all hover:text-[var(--text-primary)] sm:flex sm:items-center sm:gap-2" style={{ borderColor: "var(--border-color)", color: "var(--text-secondary)", ...mono }}>View Profile <ArrowUpRight size={10} /></Link>
          </div>

          <div className="grid grid-cols-1 gap-px overflow-hidden rounded-xl border md:grid-cols-3" style={{ borderColor: "var(--card-border)", backgroundColor: "var(--card-border)" }}>
            {githubProjects.map((repo) => (
              <Link key={repo.name} href={repo.githubUrl} target="_blank" className="group block p-5 transition-colors hover:bg-[var(--card-hover)] sm:p-6" style={{ backgroundColor: "var(--card-bg)" }}>
                <div className="mb-4 flex items-start justify-between">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg border" style={{ borderColor: "var(--border-color)" }}><FolderOpen size={14} style={{ color: "var(--text-muted)" }} /></div>
                  <span className="text-[9px] uppercase tracking-[0.15em]" style={{ ...mono, color: "var(--text-muted)" }}>{repo.type}</span>
                </div>
                <h4 className="mb-2 text-[15px] font-bold tracking-[-0.01em] transition-colors group-hover:text-[var(--accent)]" style={{ ...heading, color: "var(--text-primary)" }}>{repo.name}</h4>
                <p className="mb-4 text-[13px] font-light leading-relaxed" style={{ color: "var(--text-secondary)" }}>{repo.description}</p>
                <div className="flex flex-wrap gap-[5px]">
                  {repo.tech.map((t) => (
                    <span key={t} className="rounded-sm border px-[7px] py-[2px] text-[10px]" style={{ borderColor: "var(--border-color)", color: "var(--text-muted)", ...mono }}>{t}</span>
                  ))}
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-4 sm:hidden">
            <Link href="https://github.com/VishalDevx" target="_blank" className="inline-flex items-center gap-2 rounded border px-3 py-[8px] text-[10px] uppercase tracking-[0.1em] transition-all hover:text-[var(--text-primary)]" style={{ borderColor: "var(--border-color)", color: "var(--text-secondary)", ...mono }}>View Profile <ArrowUpRight size={10} /></Link>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-6 rounded-2xl border p-5 sm:mt-20 sm:gap-8 sm:p-8 md:grid-cols-[1fr_auto] md:items-center lg:p-10" style={{ borderColor: "var(--card-border)" }}>
            <div>
              <h3 className="text-[22px] font-bold leading-tight tracking-[-0.02em] sm:text-[26px] lg:text-[28px]" style={{ ...heading, color: "var(--text-primary)" }}>
                Want to work together?<br />
                <span className="font-normal" style={{ color: "var(--text-secondary)" }}>Let&apos;s build something that ships.</span>
              </h3>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap md:justify-end">
              <a href="mailto:vishalcsx@gmail.com" className="flex items-center justify-center gap-2 rounded-md px-5 py-3 text-[11px] font-medium uppercase tracking-[0.1em] transition-colors hover:opacity-90" style={{ backgroundColor: "var(--btn-bg)", color: "var(--btn-text)", ...mono }}>Get in touch <ArrowUpRight size={12} /></a>
              <Link href="https://github.com/VishalDevx" target="_blank" className="flex items-center justify-center gap-2 rounded-md border px-5 py-3 text-[11px] uppercase tracking-[0.1em] transition-all hover:text-[var(--text-primary)]" style={{ borderColor: "var(--border-color)", color: "var(--text-secondary)", ...mono }}><Github size={12} /> GitHub</Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
