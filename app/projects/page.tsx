"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
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

  const filteredProjects = useMemo(() => {
    if (activeFilter === "All") return projects;

    return projects.filter((project) => {
      const normalized = `${project.category} ${project.label} ${project.title}`.toLowerCase();

      if (activeFilter === "Full-Stack") {
        return normalized.includes("full-stack");
      }

      if (activeFilter === "Backend") {
        return normalized.includes("backend");
      }

      if (activeFilter === "Frontend") {
        return normalized.includes("frontend");
      }

      if (activeFilter === "Web3") {
        return (
          normalized.includes("web3") ||
          normalized.includes("solana") ||
          normalized.includes("dao") ||
          normalized.includes("governance")
        );
      }

      return true;
    });
  }, [activeFilter]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:wght@300;400;500&family=DM+Sans:wght@300;400;500&display=swap');
      `}</style>

      <main
        className="relative min-h-screen overflow-x-hidden bg-[#09090b] text-white"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        {/* Background glow */}
        <div className="pointer-events-none fixed inset-0 z-0">
          <div className="absolute top-0 left-[10%] h-[260px] w-[260px] sm:h-[340px] sm:w-[340px] lg:h-[400px] lg:w-[500px] rounded-full bg-blue-500/[0.05] blur-[90px] sm:blur-[110px] lg:blur-[120px]" />
          <div className="absolute bottom-0 right-[8%] h-[220px] w-[220px] sm:h-[300px] sm:w-[300px] lg:h-[400px] lg:w-[400px] rounded-full bg-blue-500/[0.03] blur-[80px] sm:blur-[90px] lg:blur-[100px]" />
        </div>

        <div className="relative z-10 mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20 lg:pb-24">
          {/* HEADER */}
          <header className="mb-10 grid grid-cols-1 gap-8 border-b border-white/[0.07] pb-10 pt-24 sm:mb-12 sm:pb-12 sm:pt-28 lg:mb-16 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-10 lg:pb-14 lg:pt-20">
            <div>
              <div
                className="mb-4 flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-zinc-500 sm:mb-5 sm:text-[11px]"
                style={{ fontFamily: "'DM Mono', monospace" }}
              >
                <span className="block h-px w-5 bg-zinc-700 sm:w-6" />
                Selected Work
              </div>

              <h1
                className="text-[clamp(34px,10vw,88px)] font-extrabold leading-[0.92] tracking-[-0.03em] text-white"
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

              <p className="mt-5 max-w-[480px] text-sm font-light leading-7 text-zinc-500 sm:mt-6 sm:text-[15px] sm:leading-[1.8] md:text-base">
                Full-stack products &{" "}
                <span className="font-normal text-zinc-200">backend-heavy</span>{" "}
                systems — designed around architecture, workflow clarity, and
                real-world scalability.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 sm:gap-6 lg:flex lg:flex-col lg:items-end lg:gap-4 lg:pb-1">
              {[
                { num: "3", label: "Featured" },
                { num: "6+", label: "Technologies" },
                { num: "∞", label: "Ship mode" },
              ].map(({ num, label }, i) => (
                <div
                  key={i}
                  className="flex flex-col rounded-xl border border-white/[0.07] bg-white/[0.02] p-4 text-left lg:items-end lg:rounded-none lg:border-0 lg:bg-transparent lg:p-0"
                >
                  <span
                    className="text-[28px] font-bold leading-none text-white sm:text-[34px] lg:text-[40px]"
                    style={{ fontFamily: "'Syne', sans-serif" }}
                  >
                    {num}
                  </span>
                  <span
                    className="mt-2 text-[9px] uppercase tracking-[0.15em] text-zinc-600 sm:text-[10px]"
                    style={{ fontFamily: "'DM Mono', monospace" }}
                  >
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </header>

          {/* FILTER TABS */}
          <div className="mb-8 flex flex-wrap gap-2 sm:mb-10">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`rounded border px-3 py-2 text-[10px] uppercase tracking-[0.12em] transition-all sm:px-4 sm:py-[7px] sm:text-[11px] ${
                  activeFilter === f
                    ? "border-blue-500 bg-blue-500/10 text-blue-400"
                    : "border-white/[0.07] bg-transparent text-zinc-500 hover:border-white/[0.12] hover:bg-white/[0.03] hover:text-zinc-200"
                }`}
                style={{ fontFamily: "'DM Mono', monospace" }}
              >
                {f}
              </button>
            ))}
          </div>

          {/* PROJECT LIST */}
          <div className="mb-16 flex flex-col gap-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.07] sm:mb-20">
            {filteredProjects.length === 0 ? (
              <div className="bg-[#09090b] p-8 text-center sm:p-10">
                <p
                  className="mb-3 text-[11px] uppercase tracking-[0.16em] text-zinc-600"
                  style={{ fontFamily: "'DM Mono', monospace" }}
                >
                  No matching projects
                </p>
                <p className="text-sm text-zinc-500">
                  Your filter found nothing because your project data is still too thin.
                </p>
              </div>
            ) : (
              filteredProjects.map((project) => {
                const isOpen = expandedSlug === project.slug;

                return (
                  <article
                    key={project.slug}
                    onClick={() => toggleCard(project.slug)}
                    className={`group grid cursor-pointer grid-cols-1 transition-colors sm:grid-cols-[60px_1fr] lg:grid-cols-[72px_1fr_180px] ${
                      isOpen
                        ? "border-l-2 border-blue-500 bg-[#111113]"
                        : "bg-[#09090b] hover:bg-[#111113]"
                    }`}
                  >
                    {/* Index */}
                    <div className="hidden border-r border-white/[0.07] pt-7 sm:flex sm:items-start sm:justify-center">
                      <span
                        className="text-[11px] tracking-[0.1em] text-zinc-600"
                        style={{ fontFamily: "'DM Mono', monospace" }}
                      >
                        {project.index}
                      </span>
                    </div>

                    {/* Body */}
                    <div className="p-5 sm:p-6 lg:p-8">
                      <div className="mb-3 flex flex-wrap items-center gap-3">
                        <span
                          className="rounded border border-blue-500/25 bg-blue-500/10 px-2 py-[3px] text-[10px] uppercase tracking-[0.15em] text-blue-400"
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
                        className="mb-3 text-[20px] font-bold leading-tight tracking-[-0.02em] text-white sm:text-[22px]"
                        style={{ fontFamily: "'Syne', sans-serif" }}
                      >
                        {project.title}
                      </h2>

                      <p className="mb-4 max-w-[600px] text-sm font-light leading-relaxed text-zinc-500">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-[6px]">
                        {project.stack.map((tech) => (
                          <span
                            key={tech}
                            className="rounded border border-white/[0.07] bg-zinc-900 px-2 py-[3px] text-[10px] tracking-[0.05em] text-zinc-500"
                            style={{ fontFamily: "'DM Mono', monospace" }}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Mobile / tablet actions */}
                      <div
                        className="mt-5 flex flex-col gap-2 border-t border-white/[0.07] pt-5 sm:flex-row lg:hidden"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Link
                          href={project.githubUrl}
                          target="_blank"
                          className="inline-flex items-center justify-center gap-[6px] rounded-md border border-white/[0.07] px-4 py-3 text-[10px] uppercase tracking-[0.1em] text-zinc-500 transition-all hover:border-white/[0.12] hover:bg-white/[0.03] hover:text-white sm:w-auto"
                          style={{ fontFamily: "'DM Mono', monospace" }}
                        >
                          <Github size={11} />
                          GitHub
                        </Link>

                        <Link
                          href={`/projects/${project.slug}`}
                          className="inline-flex items-center justify-center gap-[6px] rounded-md border border-white/[0.07] px-4 py-3 text-[10px] uppercase tracking-[0.1em] text-zinc-500 transition-all hover:border-white/[0.12] hover:bg-white/[0.03] hover:text-white sm:w-auto"
                          style={{ fontFamily: "'DM Mono', monospace" }}
                        >
                          <ExternalLink size={11} />
                          {project.caseStudyLabel}
                        </Link>
                      </div>

                      {/* Expanded detail */}
                      {isOpen && (
                        <div
                          className="mt-5 grid grid-cols-1 gap-4 border-t border-white/[0.07] pt-5 md:grid-cols-3"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {project.points.map((point) => (
                            <div
                              key={point}
                              className="flex gap-3 text-sm font-light leading-relaxed text-zinc-500"
                            >
                              <span className="mt-[9px] h-1 w-1 flex-shrink-0 rounded-full bg-blue-500" />
                              <span>{point}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Desktop links */}
                    <div
                      className="hidden border-l border-white/[0.07] p-7 lg:flex lg:flex-col lg:items-end lg:justify-between"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ArrowUpRight
                        size={20}
                        className={`text-zinc-600 transition-all ${
                          isOpen
                            ? "translate-x-0 translate-y-0 opacity-100"
                            : "translate-y-1 -translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100"
                        }`}
                      />
                      <div className="flex flex-col items-end gap-[6px]">
                        <Link
                          href={project.githubUrl}
                          target="_blank"
                          className="flex items-center gap-[5px] rounded border border-white/[0.07] px-3 py-[5px] text-[10px] uppercase tracking-[0.1em] text-zinc-500 transition-all hover:border-white/[0.12] hover:bg-white/[0.03] hover:text-white"
                          style={{ fontFamily: "'DM Mono', monospace" }}
                        >
                          <Github size={10} />
                          GitHub
                        </Link>
                        <Link
                          href={`/projects/${project.slug}`}
                          className="flex items-center gap-[5px] rounded border border-white/[0.07] px-3 py-[5px] text-[10px] uppercase tracking-[0.1em] text-zinc-500 transition-all hover:border-white/[0.12] hover:bg-white/[0.03] hover:text-white"
                          style={{ fontFamily: "'DM Mono', monospace" }}
                        >
                          <ExternalLink size={10} />
                          {project.caseStudyLabel}
                        </Link>
                      </div>
                    </div>
                  </article>
                );
              })
            )}
          </div>

          {/* GITHUB SECTION */}
          <div className="mb-6 flex items-center gap-4 sm:mb-7">
            <span
              className="whitespace-nowrap text-[10px] uppercase tracking-[0.2em] text-zinc-600 sm:text-[11px]"
              style={{ fontFamily: "'DM Mono', monospace" }}
            >
              More from GitHub
            </span>
            <div className="h-px flex-1 bg-white/[0.07]" />
            <Link
              href="https://github.com/VishalDevx"
              target="_blank"
              className="hidden whitespace-nowrap rounded border border-white/[0.07] px-3 py-[6px] text-[10px] uppercase tracking-[0.1em] text-zinc-500 transition-all hover:border-white/[0.12] hover:bg-white/[0.03] hover:text-white sm:flex sm:items-center sm:gap-2"
              style={{ fontFamily: "'DM Mono', monospace" }}
            >
              View Profile <ArrowUpRight size={10} />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-white/[0.07] bg-white/[0.07] md:grid-cols-3">
            {githubProjects.map((repo) => (
              <Link
                key={repo.name}
                href={repo.githubUrl}
                target="_blank"
                className="group block bg-[#09090b] p-5 transition-colors hover:bg-[#111113] sm:p-6"
              >
                <div className="mb-4 flex items-start justify-between">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.12]">
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
                  className="mb-2 text-[15px] font-bold tracking-[-0.01em] text-white transition-colors group-hover:text-blue-400"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  {repo.name}
                </h4>

                <p className="mb-4 text-[13px] font-light leading-relaxed text-zinc-500">
                  {repo.description}
                </p>

                <div className="flex flex-wrap gap-[5px]">
                  {repo.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded-sm border border-white/[0.07] px-[7px] py-[2px] text-[10px] text-zinc-600"
                      style={{ fontFamily: "'DM Mono', monospace" }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>

          {/* Mobile GitHub profile button */}
          <div className="mt-4 sm:hidden">
            <Link
              href="https://github.com/VishalDevx"
              target="_blank"
              className="inline-flex items-center gap-2 rounded border border-white/[0.07] px-3 py-[8px] text-[10px] uppercase tracking-[0.1em] text-zinc-500 transition-all hover:border-white/[0.12] hover:bg-white/[0.03] hover:text-white"
              style={{ fontFamily: "'DM Mono', monospace" }}
            >
              View Profile <ArrowUpRight size={10} />
            </Link>
          </div>

          {/* FOOTER CTA */}
          <div className="mt-16 grid grid-cols-1 gap-6 rounded-2xl border border-white/[0.07] p-5 sm:mt-20 sm:gap-8 sm:p-8 md:grid-cols-[1fr_auto] md:items-center lg:p-10">
            <div>
              <h3
                className="text-[22px] font-bold leading-tight tracking-[-0.02em] text-white sm:text-[26px] lg:text-[28px]"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                Want to work together?
                <br />
                <span className="font-normal text-zinc-500">
                  Let&apos;s build something that ships.
                </span>
              </h3>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap md:justify-end">
              <a
                href="mailto:vishal@example.com"
                className="flex items-center justify-center gap-2 rounded-md bg-white px-5 py-3 text-[11px] font-medium uppercase tracking-[0.1em] text-black transition-colors hover:bg-zinc-200"
                style={{ fontFamily: "'DM Mono', monospace" }}
              >
                Get in touch <ArrowUpRight size={12} />
              </a>
              <Link
                href="https://github.com/VishalDevx"
                target="_blank"
                className="flex items-center justify-center gap-2 rounded-md border border-white/[0.07] px-5 py-3 text-[11px] uppercase tracking-[0.1em] text-zinc-500 transition-all hover:border-white/[0.12] hover:bg-white/[0.03] hover:text-white"
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