"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight, Github, ExternalLink, FolderOpen } from "lucide-react";

const projects = [
  {
    index: "01",
    slug: "school-management-system",
    category: "Full-Stack Platform",
    label: "Multi-Tenant System",
    title: "School Management System",
    description:
      "Multi-tenant school platform for admin, staff, and students — structured workflows for fees, results, staff operations, and academic management.",
    stack: ["Next.js", "TypeScript", "Node.js", "PostgreSQL", "Prisma", "Redis"],
    points: [
      "Multi-role workflows for admin, staff, and students",
      "Modular APIs for fees, results, expenses, and staff ops",
      "Validation-first backend with scalable service structure",
    ],
    githubUrl: "https://github.com/VishalDevx/rgd-academy",
    liveUrl: "/",
    caseStudyLabel: "Case Study",
  },
  {
    index: "02",
    slug: "dao-framework",
    category: "Backend / Systems",
    label: "Governance Engine",
    title: "Plugin-Based DAO Framework",
    description:
      "Governance-focused Solana framework with plugin architecture — extensible voting logic, snapshot-based decisions, and dynamic quorum handling.",
    stack: ["Rust", "Solana", "Anchor", "TypeScript", "Web3"],
    points: [
      "Plugin-driven governance architecture built for extensibility",
      "Snapshot voting and dynamic quorum support on-chain",
      "Designed for protocol-level logic and long-term maintainability",
    ],
    githubUrl: "https://github.com/VishalDevx",
    liveUrl: "",
    caseStudyLabel: "Case Study",
  },
  {
    index: "03",
    slug: "portfolio-system",
    category: "Frontend / Full-Stack",
    label: "Brand + System",
    title: "Personal Portfolio System",
    description:
      "Engineering portfolio as a structured product system — case studies, technical positioning, reusable UI patterns, and clean frontend architecture.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    points: [
      "Reusable section architecture and scalable UI patterns",
      "Engineering-first visual identity instead of design fluff",
      "Built to showcase product thinking and technical work clearly",
    ],
    githubUrl: "https://github.com/VishalDevx",
    liveUrl: "/",
    caseStudyLabel: "Live Site",
  },
];

const githubProjects = [
  {
    name: "rgd-academy",
    type: "Pinned",
    description:
      "School management system with multi-role workflows and full-stack architecture.",
    tech: ["TypeScript", "Next.js", "Node.js"],
    githubUrl: "https://github.com/VishalDevx/rgd-academy",
  },
  {
    name: "backend-starter",
    type: "Project",
    description:
      "Reusable backend starter with auth, validation, modular services, and clean API structure.",
    tech: ["Node.js", "TypeScript", "PostgreSQL"],
    githubUrl: "https://github.com/VishalDevx",
  },
  {
    name: "system-design-lab",
    type: "Project",
    description:
      "Code-heavy playground for scalable backend patterns, infra ideas, and production-style architecture.",
    tech: ["Redis", "Docker", "Express"],
    githubUrl: "https://github.com/VishalDevx",
  },
];

const filters = ["All", "Full-Stack", "Backend", "Web3", "Frontend"];

export default function ProjectsPage() {
  const [expandedSlug, setExpandedSlug] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState("All");

  const toggleCard = (slug: string) => {
    setExpandedSlug((prev) => (prev === slug ? null : slug));
  };

  return (
    <>
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:wght@300;400;500&family=DM+Sans:wght@300;400;500&display=swap');
      `}</style>

      <main
        className="min-h-screen bg-[#09090b] text-white relative overflow-x-hidden"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        {/* Background glow */}
        <div className="pointer-events-none fixed inset-0 z-0">
          <div className="absolute top-0 left-[10%] w-[500px] h-[400px] rounded-full bg-blue-500/[0.05] blur-[120px]" />
          <div className="absolute bottom-0 right-[8%] w-[400px] h-[400px] rounded-full bg-blue-500/[0.03] blur-[100px]" />
        </div>

        <div className="relative z-10 max-w-[1200px] mx-auto px-8 pb-24">

          {/* ── HEADER ── */}
          <header className="pt-16 md:pt-20 pb-14 border-b border-white/[0.07] mb-16 grid grid-cols-1 lg:grid-cols-[1fr_auto] items-end gap-8">
            <div>
              <div
                className="flex items-center gap-3 mb-5 text-[11px] uppercase tracking-[0.2em] text-zinc-500"
                style={{ fontFamily: "'DM Mono', monospace" }}
              >
                <span className="w-6 h-px bg-zinc-700 block" />
                Selected Work
              </div>

              <h1
                className="text-[clamp(48px,7vw,88px)] font-extrabold leading-[0.92] tracking-[-0.03em] text-white"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                Systems
                <br />
                I&apos;ve{" "}
                <span
                  className="text-transparent"
                  style={{ WebkitTextStroke: "1px rgba(255,255,255,0.28)" }}
                >
                  built
                </span>
              </h1>

              <p className="mt-6 text-base leading-[1.75] text-zinc-500 font-light max-w-[480px]">
                Full-stack products &{" "}
                <span className="text-zinc-200 font-normal">backend-heavy</span>{" "}
                systems — designed around architecture, workflow clarity, and
                real-world scalability.
              </p>
            </div>

            {/* Stats */}
            <div className="hidden lg:flex flex-col items-end gap-4 pb-1">
              {[
                { num: "3", label: "Featured" },
                { num: "6+", label: "Technologies" },
                { num: "∞", label: "Ship mode" },
              ].map(({ num, label }, i) => (
                <div key={i} className="flex flex-col items-end gap-1">
                  {i > 0 && (
                    <div className="w-px h-10 bg-white/[0.1] self-center mb-1" />
                  )}
                  <span
                    className="text-[40px] font-bold text-white leading-none"
                    style={{ fontFamily: "'Syne', sans-serif" }}
                  >
                    {num}
                  </span>
                  <span
                    className="text-[10px] uppercase tracking-[0.15em] text-zinc-600"
                    style={{ fontFamily: "'DM Mono', monospace" }}
                  >
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </header>

          {/* ── FILTER TABS ── */}
          <div className="flex flex-wrap gap-2 mb-10">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`text-[11px] uppercase tracking-[0.12em] px-4 py-[6px] rounded border transition-all
                  ${
                    activeFilter === f
                      ? "border-blue-500 text-blue-400 bg-blue-500/10"
                      : "border-white/[0.07] text-zinc-500 bg-transparent hover:border-white/[0.12] hover:text-zinc-200 hover:bg-white/[0.03]"
                  }`}
                style={{ fontFamily: "'DM Mono', monospace" }}
              >
                {f}
              </button>
            ))}
          </div>

          {/* ── PROJECT LIST ── */}
          <div className="flex flex-col gap-px bg-white/[0.07] border border-white/[0.07] rounded-2xl overflow-hidden mb-20">
            {projects.map((project) => {
              const isOpen = expandedSlug === project.slug;
              return (
                <article
                  key={project.slug}
                  onClick={() => toggleCard(project.slug)}
                  className={`grid grid-cols-[72px_1fr] lg:grid-cols-[72px_1fr_180px] items-stretch cursor-pointer transition-colors
                    ${isOpen ? "bg-[#111113] border-l-2 border-blue-500" : "bg-[#09090b] hover:bg-[#111113]"}`}
                >
                  {/* Index */}
                  <div className="flex items-start justify-center pt-7 border-r border-white/[0.07]">
                    <span
                      className="text-[11px] text-zinc-600 tracking-[0.1em]"
                      style={{ fontFamily: "'DM Mono', monospace" }}
                    >
                      {project.index}
                    </span>
                  </div>

                  {/* Body */}
                  <div className="p-7 lg:p-8">
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <span
                        className="text-[10px] uppercase tracking-[0.15em] text-blue-400 bg-blue-500/10 border border-blue-500/25 rounded px-2 py-[3px]"
                        style={{ fontFamily: "'DM Mono', monospace" }}
                      >
                        {project.category}
                      </span>
                      <span
                        className="text-[10px] uppercase tracking-[0.12em] text-zinc-600"
                        style={{ fontFamily: "'DM Mono', monospace" }}
                      >
                        {project.label}
                      </span>
                    </div>

                    <h2
                      className="text-[22px] font-bold tracking-[-0.02em] text-white leading-tight mb-3"
                      style={{ fontFamily: "'Syne', sans-serif" }}
                    >
                      {project.title}
                    </h2>

                    <p className="text-sm leading-relaxed text-zinc-500 font-light max-w-[600px] mb-4">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-[6px]">
                      {project.stack.map((tech) => (
                        <span
                          key={tech}
                          className="text-[10px] text-zinc-500 bg-zinc-900 border border-white/[0.07] rounded px-2 py-[3px] tracking-[0.05em]"
                          style={{ fontFamily: "'DM Mono', monospace" }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Expanded detail */}
                    {isOpen && (
                      <div
                        className="mt-5 pt-5 border-t border-white/[0.07] grid grid-cols-1 md:grid-cols-3 gap-4"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {project.points.map((point) => (
                          <div key={point} className="flex gap-3 text-sm text-zinc-500 font-light leading-relaxed">
                            <span className="w-1 h-1 rounded-full bg-blue-500 flex-shrink-0 mt-[9px]" />
                            <span>{point}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Right links — desktop */}
                  <div
                    className="hidden lg:flex flex-col items-end justify-between p-7 border-l border-white/[0.07]"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ArrowUpRight
                      size={20}
                      className={`text-zinc-600 transition-all ${isOpen ? "opacity-100 translate-x-0 translate-y-0" : "opacity-0 -translate-x-1 translate-y-1 group-hover:opacity-100"}`}
                    />
                    <div className="flex flex-col gap-[6px] items-end">
                      <Link
                        href={project.githubUrl}
                        target="_blank"
                        className="flex items-center gap-[5px] text-[10px] uppercase tracking-[0.1em] text-zinc-500 border border-white/[0.07] rounded px-3 py-[5px] hover:text-white hover:border-white/[0.12] hover:bg-white/[0.03] transition-all"
                        style={{ fontFamily: "'DM Mono', monospace" }}
                      >
                        <Github size={10} />
                        GitHub
                      </Link>
                      <Link
                        href={`/projects/${project.slug}`}
                        className="flex items-center gap-[5px] text-[10px] uppercase tracking-[0.1em] text-zinc-500 border border-white/[0.07] rounded px-3 py-[5px] hover:text-white hover:border-white/[0.12] hover:bg-white/[0.03] transition-all"
                        style={{ fontFamily: "'DM Mono', monospace" }}
                      >
                        <ExternalLink size={10} />
                        {project.caseStudyLabel}
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {/* ── GITHUB SECTION ── */}
          <div className="flex items-center gap-4 mb-7">
            <span
              className="text-[11px] uppercase tracking-[0.2em] text-zinc-600 whitespace-nowrap"
              style={{ fontFamily: "'DM Mono', monospace" }}
            >
              More from GitHub
            </span>
            <div className="flex-1 h-px bg-white/[0.07]" />
            <Link
              href="https://github.com/VishalDevx"
              target="_blank"
              className="flex items-center gap-2 text-[10px] uppercase tracking-[0.1em] text-zinc-500 border border-white/[0.07] rounded px-3 py-[6px] hover:text-white hover:border-white/[0.12] hover:bg-white/[0.03] transition-all whitespace-nowrap"
              style={{ fontFamily: "'DM Mono', monospace" }}
            >
              View Profile <ArrowUpRight size={10} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/[0.07] border border-white/[0.07] rounded-xl overflow-hidden">
            {githubProjects.map((repo) => (
              <Link
                key={repo.name}
                href={repo.githubUrl}
                target="_blank"
                className="bg-[#09090b] p-6 hover:bg-[#111113] transition-colors group block"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-8 h-8 border border-white/[0.12] rounded-lg flex items-center justify-center">
                    <FolderOpen size={14} className="text-zinc-500" />
                  </div>
                  <span
                    className="text-[9px] uppercase tracking-[0.15em] text-zinc-600"
                    style={{ fontFamily: "'DM Mono', monospace" }}
                  >
                    {repo.type}
                  </span>
                </div>

                <h4
                  className="text-[15px] font-bold text-white mb-2 tracking-[-0.01em] group-hover:text-blue-400 transition-colors"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  {repo.name}
                </h4>

                <p className="text-[13px] leading-relaxed text-zinc-500 font-light mb-4">
                  {repo.description}
                </p>

                <div className="flex flex-wrap gap-[5px]">
                  {repo.tech.map((t) => (
                    <span
                      key={t}
                      className="text-[10px] text-zinc-600 px-[7px] py-[2px] border border-white/[0.07] rounded-sm"
                      style={{ fontFamily: "'DM Mono', monospace" }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>

          {/* ── FOOTER CTA ── */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-[1fr_auto] items-center gap-8 p-10 border border-white/[0.07] rounded-2xl">
            <div>
              <h3
                className="text-[28px] font-bold tracking-[-0.02em] text-white leading-tight"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                Want to work together?
                <br />
                <span className="text-zinc-500 font-normal">
                  Let&apos;s build something that ships.
                </span>
              </h3>
            </div>
            <div className="flex gap-3 flex-shrink-0">
              <a
                href="mailto:vishal@example.com"
                className="flex items-center gap-2 text-[11px] uppercase tracking-[0.1em] px-5 py-3 rounded-md bg-white text-black hover:bg-zinc-200 transition-colors font-medium"
                style={{ fontFamily: "'DM Mono', monospace" }}
              >
                Get in touch <ArrowUpRight size={12} />
              </a>
              <Link
                href="https://github.com/VishalDevx"
                target="_blank"
                className="flex items-center gap-2 text-[11px] uppercase tracking-[0.1em] px-5 py-3 rounded-md border border-white/[0.07] text-zinc-500 hover:text-white hover:border-white/[0.12] hover:bg-white/[0.03] transition-all"
                style={{ fontFamily: "'DM Mono', monospace" }}
              >
                <Github size={12} />
                GitHub
              </Link>
            </div>
          </div>

        </div>
      </main>
    </>
  );
}