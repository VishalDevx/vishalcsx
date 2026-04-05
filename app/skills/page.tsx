"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowUpRight,
  Github,
  ExternalLink,
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
        className="min-h-screen bg-[#09090b] text-white relative overflow-x-hidden"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        {/* Background glow */}
        <div className="pointer-events-none fixed inset-0 z-0">
          <div className="absolute top-0 left-[10%] w-[500px] h-[400px] rounded-full bg-blue-500/[0.05] blur-[120px]" />
          <div className="absolute bottom-0 right-[8%] w-[400px] h-[400px] rounded-full bg-blue-500/[0.03] blur-[100px]" />
        </div>

        <div className="relative z-10 max-w-[1200px] mx-auto px-8 pb-24">
          {/* HEADER */}
          <header className="pt-16 md:pt-20 pb-14 border-b border-white/[0.07] mb-16 grid grid-cols-1 lg:grid-cols-[1fr_auto] items-end gap-8">
            <div>
              <div
                className="flex items-center gap-3 mb-5 text-[11px] uppercase tracking-[0.2em] text-zinc-500"
                style={{ fontFamily: "'DM Mono', monospace" }}
              >
                <span className="w-6 h-px bg-zinc-700 block" />
                Technical Skills
              </div>

              <h1
                className="text-[clamp(48px,7vw,88px)] font-extrabold leading-[0.92] tracking-[-0.03em] text-white"
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

              <p className="mt-6 text-base leading-[1.75] text-zinc-500 font-light max-w-[560px]">
                Full-stack engineering with a strong{" "}
                <span className="text-zinc-200 font-normal">backend and systems</span>{" "}
                core — shaped by product building, architecture work, open-source
                learning, and real implementation.
              </p>
            </div>

            {/* Stats */}
            <div className="hidden lg:flex flex-col items-end gap-4 pb-1">
              {[
                { num: "6", label: "Skill Groups" },
                { num: "15+", label: "Core Tools" },
                { num: "24/7", label: "Learning Mode" },
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

          {/* FILTERS */}
          <div className="flex flex-wrap gap-2 mb-10">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`text-[11px] uppercase tracking-[0.12em] px-4 py-[6px] rounded border transition-all ${
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

          {/* SKILLS LIST */}
          <div className="flex flex-col gap-px bg-white/[0.07] border border-white/[0.07] rounded-2xl overflow-hidden mb-20">
            {filteredSkills.map((skill) => {
              const isOpen = expandedSlug === skill.slug;
              const Icon = skill.icon;

              return (
                <article
                  key={skill.slug}
                  onClick={() => toggleCard(skill.slug)}
                  className={`grid grid-cols-[72px_1fr] lg:grid-cols-[72px_1fr_200px] items-stretch cursor-pointer transition-colors ${
                    isOpen
                      ? "bg-[#111113] border-l-2 border-blue-500"
                      : "bg-[#09090b] hover:bg-[#111113]"
                  }`}
                >
                  {/* Index */}
                  <div className="flex items-start justify-center pt-7 border-r border-white/[0.07]">
                    <span
                      className="text-[11px] text-zinc-600 tracking-[0.1em]"
                      style={{ fontFamily: "'DM Mono', monospace" }}
                    >
                      {skill.index}
                    </span>
                  </div>

                  {/* Body */}
                  <div className="p-7 lg:p-8">
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <span
                        className="text-[10px] uppercase tracking-[0.15em] text-blue-400 bg-blue-500/10 border border-blue-500/25 rounded px-2 py-[3px]"
                        style={{ fontFamily: "'DM Mono', monospace" }}
                      >
                        {skill.category}
                      </span>
                      <span
                        className="text-[10px] uppercase tracking-[0.12em] text-zinc-600"
                        style={{ fontFamily: "'DM Mono', monospace" }}
                      >
                        {skill.label}
                      </span>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-11 h-11 rounded-xl border border-white/[0.08] bg-white/[0.02] flex items-center justify-center shrink-0">
                        <Icon size={18} className="text-blue-400" />
                      </div>

                      <div className="flex-1">
                        <h2
                          className="text-[22px] font-bold tracking-[-0.02em] text-white leading-tight mb-3"
                          style={{ fontFamily: "'Syne', sans-serif" }}
                        >
                          {skill.title}
                        </h2>

                        <p className="text-sm leading-relaxed text-zinc-500 font-light max-w-[650px] mb-4">
                          {skill.description}
                        </p>

                        <div className="flex flex-wrap gap-[6px]">
                          {skill.stack.map((tech) => (
                            <span
                              key={tech}
                              className="text-[10px] text-zinc-500 bg-zinc-900 border border-white/[0.07] rounded px-2 py-[3px] tracking-[0.05em]"
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
                        className="mt-6 pt-6 border-t border-white/[0.07] grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-8"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div>
                          <div
                            className="text-[10px] uppercase tracking-[0.16em] text-zinc-600 mb-4"
                            style={{ fontFamily: "'DM Mono', monospace" }}
                          >
                            What this means in practice
                          </div>

                          <div className="grid grid-cols-1 gap-4">
                            {skill.points.map((point) => (
                              <div
                                key={point}
                                className="flex gap-3 text-sm text-zinc-500 font-light leading-relaxed"
                              >
                                <span className="w-1 h-1 rounded-full bg-blue-500 flex-shrink-0 mt-[9px]" />
                                <span>{point}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <div
                            className="text-[10px] uppercase tracking-[0.16em] text-zinc-600 mb-4"
                            style={{ fontFamily: "'DM Mono', monospace" }}
                          >
                            Tools & concepts
                          </div>

                          <div className="flex flex-wrap gap-[6px]">
                            {skill.tools.map((tool) => (
                              <span
                                key={tool}
                                className="text-[10px] text-zinc-400 bg-blue-500/[0.07] border border-blue-500/20 rounded px-2 py-[4px] tracking-[0.05em]"
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
                    className="hidden lg:flex flex-col items-end justify-between p-7 border-l border-white/[0.07]"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ArrowUpRight
                      size={20}
                      className={`text-zinc-600 transition-all ${
                        isOpen
                          ? "opacity-100 translate-x-0 translate-y-0"
                          : "opacity-70"
                      }`}
                    />

                    <div className="flex flex-col gap-[8px] items-end">
                      <div
                        className="text-[10px] uppercase tracking-[0.1em] text-zinc-600"
                        style={{ fontFamily: "'DM Mono', monospace" }}
                      >
                        Focus Area
                      </div>
                      <div
                        className="text-right text-sm text-zinc-400 leading-relaxed max-w-[140px]"
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
          <div className="flex items-center gap-4 mb-7">
            <span
              className="text-[11px] uppercase tracking-[0.2em] text-zinc-600 whitespace-nowrap"
              style={{ fontFamily: "'DM Mono', monospace" }}
            >
              Core Stack Snapshots
            </span>
            <div className="flex-1 h-px bg-white/[0.07]" />
            <Link
              href="https://github.com/VishalDevx"
              target="_blank"
              className="flex items-center gap-2 text-[10px] uppercase tracking-[0.1em] text-zinc-500 border border-white/[0.07] rounded px-3 py-[6px] hover:text-white hover:border-white/[0.12] hover:bg-white/[0.03] transition-all whitespace-nowrap"
              style={{ fontFamily: "'DM Mono', monospace" }}
            >
              View GitHub <ArrowUpRight size={10} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/[0.07] border border-white/[0.07] rounded-xl overflow-hidden mb-20">
            {skillSnapshots.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                target="_blank"
                className="bg-[#09090b] p-6 hover:bg-[#111113] transition-colors group block"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-8 h-8 border border-white/[0.12] rounded-lg flex items-center justify-center">
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
                  className="text-[15px] font-bold text-white mb-2 tracking-[-0.01em] group-hover:text-blue-400 transition-colors"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  {item.name}
                </h4>

                <p className="text-[13px] leading-relaxed text-zinc-500 font-light mb-4">
                  {item.description}
                </p>

                <div className="flex flex-wrap gap-[5px]">
                  {item.tech.map((t) => (
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

          {/* NOW LEARNING */}
          <section className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-8 mb-20">
            <div className="p-8 border border-white/[0.07] rounded-2xl bg-white/[0.02]">
              <div
                className="text-[10px] uppercase tracking-[0.16em] text-zinc-600 mb-4"
                style={{ fontFamily: "'DM Mono', monospace" }}
              >
                Current Direction
              </div>

              <h3
                className="text-[28px] font-bold tracking-[-0.02em] text-white leading-tight mb-4"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                What I&apos;m learning now
              </h3>

              <p className="text-sm leading-[1.9] text-zinc-500 font-light max-w-[560px]">
                Right now I&apos;m pushing deeper into Rust, Solana, protocol
                design, stronger system design thinking, and more production-grade
                engineering patterns. I&apos;m also refining frontend quality so my
                work doesn&apos;t just function well — it also presents clearly.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
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
                  className="px-4 py-4 rounded-xl border border-white/[0.07] bg-[#0d0d10] text-sm text-zinc-400 hover:text-white hover:border-blue-500/30 hover:bg-blue-500/[0.04] transition-all"
                  style={{ fontFamily: "'DM Mono', monospace" }}
                >
                  {item}
                </div>
              ))}
            </div>
          </section>

          {/* FOOTER CTA */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-[1fr_auto] items-center gap-8 p-10 border border-white/[0.07] rounded-2xl">
            <div>
              <h3
                className="text-[28px] font-bold tracking-[-0.02em] text-white leading-tight"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                Need an engineer who can
                <br />
                <span className="text-zinc-500 font-normal">
                  think in systems and still ship product?
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