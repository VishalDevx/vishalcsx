"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowUpRight,
  Github,
  Braces,
  Database,
  Server,
  LayoutPanelTop,
  Cpu,
  ShieldCheck,
  Boxes,
} from "lucide-react";

const skillGroups = [
  {
    index: "01",
    slug: "full-stack-engineering",
    category: "Full-Stack",
    label: "Shipping Systems",
    title: "Full-Stack Engineering",
    description:
      "I build end-to-end products with strong backend structure, clean frontend systems, and production-focused engineering decisions.",
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "Node.js",
      "Express",
      "PostgreSQL",
    ],
    points: [
      "Building full-stack applications with clear module boundaries",
      "Combining UI architecture with backend workflow design",
      "Writing scalable APIs and frontend systems that stay maintainable",
    ],
    tools: [
      "Next.js",
      "React",
      "TypeScript",
      "Node.js",
      "Express",
      "REST APIs",
      "Tailwind CSS",
      "Framer Motion",
    ],
    icon: LayoutPanelTop,
  },
  {
    index: "02",
    slug: "backend-systems",
    category: "Backend",
    label: "Core Strength",
    title: "Backend & System Design",
    description:
      "Backend-heavy engineering around modular APIs, auth, validation, performance, and scalable architecture for real-world usage.",
    stack: [
      "Node.js",
      "Express",
      "PostgreSQL",
      "Redis",
      "Prisma",
      "Docker",
    ],
    points: [
      "Designing role-based and multi-tenant backend systems",
      "Validation-first API design using schema-driven contracts",
      "Thinking in services, scaling, caching, monitoring, and maintainability",
    ],
    tools: [
      "Node.js",
      "Express",
      "PostgreSQL",
      "Redis",
      "Prisma",
      "JWT",
      "Zod",
      "Docker",
      "System Design",
      "Caching",
      "RBAC",
    ],
    icon: Server,
  },
  {
    index: "03",
    slug: "database-data-layer",
    category: "Database",
    label: "Data Architecture",
    title: "Database & Data Layer",
    description:
      "Strong focus on relational modeling, schema design, query structure, and storage decisions that support long-term product growth.",
    stack: ["PostgreSQL", "MongoDB", "Prisma", "Redis"],
    points: [
      "Designing normalized relational models for product workflows",
      "Using Prisma and SQL-backed thinking for clean data access",
      "Choosing cache and persistence strategies based on workload patterns",
    ],
    tools: [
      "PostgreSQL",
      "MongoDB",
      "Prisma",
      "Redis",
      "Schema Design",
      "Relations",
      "Indexing",
      "Query Optimization",
    ],
    icon: Database,
  },
  {
    index: "04",
    slug: "frontend-ui-engineering",
    category: "Frontend",
    label: "Interface Systems",
    title: "Frontend & UI Engineering",
    description:
      "I don’t just build pages — I build reusable UI systems, consistent sections, and frontend structure that can scale with the product.",
    stack: ["React", "Next.js", "Tailwind CSS", "Framer Motion"],
    points: [
      "Building reusable section-based UI architecture",
      "Creating developer-focused portfolio and product interfaces",
      "Balancing visual polish with code cleanliness and maintainability",
    ],
    tools: [
      "React",
      "Next.js",
      "Tailwind CSS",
      "Framer Motion",
      "Responsive Design",
      "Component Design",
      "UI Systems",
    ],
    icon: Braces,
  },
  {
    index: "05",
    slug: "devops-infra",
    category: "Infra",
    label: "Production Thinking",
    title: "DevOps & Deployment Thinking",
    description:
      "Still growing here, but already working with deployment, containers, CI/CD thinking, infra basics, and production-minded workflows.",
    stack: ["Docker", "CI/CD", "Monitoring", "Deployment"],
    points: [
      "Using Docker for local consistency and deployment readiness",
      "Thinking about observability, scaling, and release workflows",
      "Building with production constraints instead of demo-only assumptions",
    ],
    tools: [
      "Docker",
      "CI/CD",
      "GitHub Actions",
      "Linux",
      "Deployment",
      "Monitoring",
      "Horizontal Scaling",
    ],
    icon: Boxes,
  },
  {
    index: "06",
    slug: "web3-rust-learning",
    category: "Web3",
    label: "Advanced Learning",
    title: "Rust, Solana & Protocol Engineering",
    description:
      "I’m actively pushing into lower-level and protocol-oriented engineering through Rust, Solana, DAO frameworks, and governance systems.",
    stack: ["Rust", "Solana", "Anchor", "TypeScript", "Web3"],
    points: [
      "Working on plugin-based DAO framework architecture",
      "Learning protocol-level design with governance and voting logic",
      "Using Rust to strengthen systems thinking beyond typical web stacks",
    ],
    tools: [
      "Rust",
      "Solana",
      "Anchor",
      "DAO Design",
      "Snapshot Voting",
      "Dynamic Quorum",
      "Web3.js",
    ],
    icon: Cpu,
  },
];

const skillSnapshots = [
  {
    name: "TypeScript",
    type: "Core",
    description:
      "Primary language for most of my backend and frontend work.",
    tech: ["APIs", "React", "Next.js"],
    href: "https://github.com/VishalDevx",
  },
  {
    name: "PostgreSQL",
    type: "Core",
    description:
      "Main database choice for structured systems and scalable product workflows.",
    tech: ["Schema Design", "Relations", "Queries"],
    href: "https://github.com/VishalDevx",
  },
  {
    name: "Node.js",
    type: "Core",
    description:
      "Used for backend services, modular APIs, auth flows, and business logic.",
    tech: ["Express", "Services", "Auth"],
    href: "https://github.com/VishalDevx",
  },
];

const filters = [
  "All",
  "Full-Stack",
  "Backend",
  "Frontend",
  "Database",
  "Infra",
  "Web3",
];

export default function SkillsPage() {
  const [expandedSlug, setExpandedSlug] = useState<string | null>(
    "backend-systems"
  );
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredSkills = useMemo(() => {
    if (activeFilter === "All") return skillGroups;
    return skillGroups.filter((skill) => skill.category === activeFilter);
  }, [activeFilter]);

  const toggleCard = (slug: string) => {
    setExpandedSlug((prev) => (prev === slug ? null : slug));
  };

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
          <div className="absolute top-0 left-[10%] h-[260px] w-[260px] rounded-full bg-blue-500/[0.05] blur-[90px] sm:h-[360px] sm:w-[360px] md:h-[420px] md:w-[420px] md:blur-[120px]" />
          <div className="absolute bottom-0 right-[8%] h-[220px] w-[220px] rounded-full bg-blue-500/[0.03] blur-[80px] sm:h-[320px] sm:w-[320px] md:h-[380px] md:w-[380px] md:blur-[100px]" />
        </div>

        <div className="relative z-10 mx-auto max-w-[1200px] px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8 lg:pb-24">
          {/* HEADER */}
          <header className="mb-12 grid grid-cols-1 items-end gap-8 border-b border-white/[0.07] pb-10 pt-12 sm:mb-14 sm:pb-12 sm:pt-16 md:pt-20 lg:grid-cols-[1fr_auto]">
            <div>
              <div
                className="mb-4 flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-zinc-500 sm:mb-5 sm:text-[11px]"
                style={{ fontFamily: "'DM Mono', monospace" }}
              >
                <span className="block h-px w-5 bg-zinc-700 sm:w-6" />
                Technical Skills
              </div>

              <h1
                className="text-[clamp(2.75rem,10vw,5.5rem)] font-extrabold leading-[0.92] tracking-[-0.03em] text-white"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                Stack
                <br />
                I&apos;m{" "}
                <span
                  className="text-transparent"
                  style={{ WebkitTextStroke: "1px rgba(255,255,255,0.28)" }}
                >
                  building
                </span>
              </h1>

              <p className="mt-5 max-w-[560px] text-sm font-light leading-7 text-zinc-500 sm:mt-6 sm:text-base sm:leading-[1.75]">
                Full-stack engineering with a strong{" "}
                <span className="font-normal text-zinc-200">
                  backend and systems
                </span>{" "}
                core — shaped by product building, architecture work,
                open-source learning, and real implementation.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-2 lg:flex lg:flex-col lg:items-end lg:gap-4 lg:pb-1">
              {[
                { num: "6", label: "Skill Groups" },
                { num: "15+", label: "Core Tools" },
                { num: "24/7", label: "Learning Mode" },
              ].map(({ num, label }, i) => (
                <div
                  key={i}
                  className="flex flex-col rounded-xl border border-white/[0.07] bg-white/[0.02] px-3 py-4 text-center lg:items-end lg:border-0 lg:bg-transparent lg:px-0 lg:py-0 lg:text-right"
                >
                  <span
                    className="text-2xl font-bold leading-none text-white sm:text-3xl lg:text-[40px]"
                    style={{ fontFamily: "'Syne', sans-serif" }}
                  >
                    {num}
                  </span>
                  <span
                    className="mt-1 text-[9px] uppercase tracking-[0.15em] text-zinc-600 sm:text-[10px]"
                    style={{ fontFamily: "'DM Mono', monospace" }}
                  >
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </header>

          {/* FILTERS */}
          <div className="mb-8 flex flex-wrap gap-2 sm:mb-10">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`rounded px-3 py-2 text-[10px] uppercase tracking-[0.12em] transition-all sm:px-4 sm:py-[6px] sm:text-[11px] ${
                  activeFilter === f
                    ? "border border-blue-500 bg-blue-500/10 text-blue-400"
                    : "border border-white/[0.07] bg-transparent text-zinc-500 hover:border-white/[0.12] hover:bg-white/[0.03] hover:text-zinc-200"
                }`}
                style={{ fontFamily: "'DM Mono', monospace" }}
              >
                {f}
              </button>
            ))}
          </div>

          {/* SKILLS LIST */}
          <div className="mb-16 overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.07] sm:mb-20">
            {filteredSkills.map((skill, idx) => {
              const isOpen = expandedSlug === skill.slug;
              const Icon = skill.icon;

              return (
                <article
                  key={skill.slug}
                  onClick={() => toggleCard(skill.slug)}
                  className={`grid cursor-pointer grid-cols-[56px_1fr] transition-colors sm:grid-cols-[64px_1fr] lg:grid-cols-[72px_1fr_200px] ${
                    isOpen
                      ? "border-l-2 border-blue-500 bg-[#111113]"
                      : "bg-[#09090b] hover:bg-[#111113]"
                  } ${idx !== filteredSkills.length - 1 ? "border-b border-white/[0.07]" : ""}`}
                >
                  {/* Index */}
                  <div className="flex items-start justify-center border-r border-white/[0.07] pt-5 sm:pt-6 lg:pt-7">
                    <span
                      className="text-[10px] tracking-[0.1em] text-zinc-600 sm:text-[11px]"
                      style={{ fontFamily: "'DM Mono', monospace" }}
                    >
                      {skill.index}
                    </span>
                  </div>

                  {/* Body */}
                  <div className="p-4 sm:p-6 lg:p-8">
                    <div className="mb-3 flex flex-wrap items-center gap-2 sm:gap-3">
                      <span
                        className="rounded border border-blue-500/25 bg-blue-500/10 px-2 py-[3px] text-[9px] uppercase tracking-[0.15em] text-blue-400 sm:text-[10px]"
                        style={{ fontFamily: "'DM Mono', monospace" }}
                      >
                        {skill.category}
                      </span>
                      <span
                        className="text-[9px] uppercase tracking-[0.12em] text-zinc-600 sm:text-[10px]"
                        style={{ fontFamily: "'DM Mono', monospace" }}
                      >
                        {skill.label}
                      </span>
                    </div>

                    <div className="flex items-start gap-3 sm:gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.02] sm:h-11 sm:w-11">
                        <Icon size={18} className="text-blue-400" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="mb-3 flex items-start justify-between gap-3 lg:block">
                          <h2
                            className="text-[18px] font-bold leading-tight tracking-[-0.02em] text-white sm:text-[20px] lg:text-[22px]"
                            style={{ fontFamily: "'Syne', sans-serif" }}
                          >
                            {skill.title}
                          </h2>

                          <ArrowUpRight
                            size={18}
                            className={`mt-1 shrink-0 text-zinc-600 transition-all lg:hidden ${
                              isOpen ? "rotate-45 text-blue-400" : ""
                            }`}
                          />
                        </div>

                        <p className="mb-4 max-w-[650px] text-sm font-light leading-relaxed text-zinc-500">
                          {skill.description}
                        </p>

                        <div className="flex flex-wrap gap-2">
                          {skill.stack.map((tech) => (
                            <span
                              key={tech}
                              className="rounded border border-white/[0.07] bg-zinc-900 px-2 py-[3px] text-[10px] tracking-[0.05em] text-zinc-500"
                              style={{ fontFamily: "'DM Mono', monospace" }}
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Expanded */}
                    {isOpen && (
                      <div
                        className="mt-5 grid grid-cols-1 gap-6 border-t border-white/[0.07] pt-5 lg:mt-6 lg:grid-cols-[1.2fr_1fr] lg:gap-8 lg:pt-6"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div>
                          <div
                            className="mb-4 text-[10px] uppercase tracking-[0.16em] text-zinc-600"
                            style={{ fontFamily: "'DM Mono', monospace" }}
                          >
                            What this means in practice
                          </div>

                          <div className="grid grid-cols-1 gap-4">
                            {skill.points.map((point) => (
                              <div
                                key={point}
                                className="flex gap-3 text-sm font-light leading-relaxed text-zinc-500"
                              >
                                <span className="mt-[9px] h-1 w-1 flex-shrink-0 rounded-full bg-blue-500" />
                                <span>{point}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <div
                            className="mb-4 text-[10px] uppercase tracking-[0.16em] text-zinc-600"
                            style={{ fontFamily: "'DM Mono', monospace" }}
                          >
                            Tools & concepts
                          </div>

                          <div className="flex flex-wrap gap-2">
                            {skill.tools.map((tool) => (
                              <span
                                key={tool}
                                className="rounded border border-blue-500/20 bg-blue-500/[0.07] px-2 py-[4px] text-[10px] tracking-[0.05em] text-zinc-400"
                                style={{ fontFamily: "'DM Mono', monospace" }}
                              >
                                {tool}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Right panel */}
                  <div
                    className="hidden flex-col justify-between border-l border-white/[0.07] p-7 lg:flex"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ArrowUpRight
                      size={20}
                      className={`self-end text-zinc-600 transition-all ${
                        isOpen ? "translate-x-0 translate-y-0 opacity-100" : "opacity-70"
                      }`}
                    />

                    <div className="flex flex-col items-end gap-[8px]">
                      <div
                        className="text-[10px] uppercase tracking-[0.1em] text-zinc-600"
                        style={{ fontFamily: "'DM Mono', monospace" }}
                      >
                        Focus Area
                      </div>
                      <div
                        className="max-w-[140px] text-right text-sm leading-relaxed text-zinc-400"
                        style={{ fontFamily: "'DM Sans', sans-serif" }}
                      >
                        {skill.label}
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {/* CORE SNAPSHOTS */}
          <div className="mb-6 flex flex-col gap-4 sm:mb-7 sm:flex-row sm:items-center">
            <div className="flex items-center gap-4 min-w-0 flex-1">
              <span
                className="whitespace-nowrap text-[10px] uppercase tracking-[0.2em] text-zinc-600 sm:text-[11px]"
                style={{ fontFamily: "'DM Mono', monospace" }}
              >
                Core Stack Snapshots
              </span>
              <div className="h-px flex-1 bg-white/[0.07]" />
            </div>

            <Link
              href="https://github.com/VishalDevx"
              target="_blank"
              className="inline-flex w-fit items-center gap-2 whitespace-nowrap rounded border border-white/[0.07] px-3 py-[6px] text-[10px] uppercase tracking-[0.1em] text-zinc-500 transition-all hover:border-white/[0.12] hover:bg-white/[0.03] hover:text-white"
              style={{ fontFamily: "'DM Mono', monospace" }}
            >
              View GitHub <ArrowUpRight size={10} />
            </Link>
          </div>

          <div className="mb-16 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-white/[0.07] bg-white/[0.07] md:grid-cols-3 sm:mb-20">
            {skillSnapshots.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                target="_blank"
                className="group block bg-[#09090b] p-5 transition-colors hover:bg-[#111113] sm:p-6"
              >
                <div className="mb-4 flex items-start justify-between">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.12]">
                    <ShieldCheck size={14} className="text-zinc-500" />
                  </div>
                  <span
                    className="text-[9px] uppercase tracking-[0.15em] text-zinc-600"
                    style={{ fontFamily: "'DM Mono', monospace" }}
                  >
                    {item.type}
                  </span>
                </div>

                <h4
                  className="mb-2 text-[15px] font-bold tracking-[-0.01em] text-white transition-colors group-hover:text-blue-400"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  {item.name}
                </h4>

                <p className="mb-4 text-[13px] font-light leading-relaxed text-zinc-500">
                  {item.description}
                </p>

                <div className="flex flex-wrap gap-[5px]">
                  {item.tech.map((t) => (
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

          {/* NOW LEARNING */}
          <section className="mb-16 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1.1fr] lg:gap-8 sm:mb-20">
            <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6 sm:p-8">
              <div
                className="mb-4 text-[10px] uppercase tracking-[0.16em] text-zinc-600"
                style={{ fontFamily: "'DM Mono', monospace" }}
              >
                Current Direction
              </div>

              <h3
                className="mb-4 text-[24px] font-bold leading-tight tracking-[-0.02em] text-white sm:text-[28px]"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                What I&apos;m learning now
              </h3>

              <p className="max-w-[560px] text-sm font-light leading-7 text-zinc-500 sm:leading-[1.9]">
                Right now I&apos;m pushing deeper into Rust, Solana, protocol
                design, stronger system design thinking, and more production-grade
                engineering patterns. I&apos;m also refining frontend quality so my
                work doesn&apos;t just function well — it also presents clearly.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {[
                "Rust",
                "Solana",
                "Anchor",
                "Advanced System Design",
                "Caching Strategy",
                "CI/CD",
                "Open Source",
                "AI / ML Learning",
                "Scalable APIs",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-xl border border-white/[0.07] bg-[#0d0d10] px-4 py-4 text-sm text-zinc-400 transition-all hover:border-blue-500/30 hover:bg-blue-500/[0.04] hover:text-white"
                  style={{ fontFamily: "'DM Mono', monospace" }}
                >
                  {item}
                </div>
              ))}
            </div>
          </section>

          {/* FOOTER CTA */}
          <div className="mt-16 grid grid-cols-1 gap-6 rounded-2xl border border-white/[0.07] p-6 sm:gap-8 sm:p-8 md:grid-cols-[1fr_auto] md:items-center lg:mt-20 lg:p-10">
            <div>
              <h3
                className="text-[24px] font-bold leading-tight tracking-[-0.02em] text-white sm:text-[28px]"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                Need an engineer who can
                <br />
                <span className="font-normal text-zinc-500">
                  think in systems and still ship product?
                </span>
              </h3>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap md:justify-end">
              <a
                href="mailto:vishal@example.com"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-white px-5 py-3 text-[11px] font-medium uppercase tracking-[0.1em] text-black transition-colors hover:bg-zinc-200"
                style={{ fontFamily: "'DM Mono', monospace" }}
              >
                Get in touch <ArrowUpRight size={12} />
              </a>

              <Link
                href="https://github.com/VishalDevx"
                target="_blank"
                className="inline-flex items-center justify-center gap-2 rounded-md border border-white/[0.07] px-5 py-3 text-[11px] uppercase tracking-[0.1em] text-zinc-500 transition-all hover:border-white/[0.12] hover:bg-white/[0.03] hover:text-white"
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