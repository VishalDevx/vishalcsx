"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowUpRight,
  Github,
  GitCommitHorizontal,
  BookOpen,
  Boxes,
  Brain,
  Rocket,
  FolderGit2,
  Activity,
} from "lucide-react";

const activityFeed = [
  {
    index: "01",
    slug: "school-management-system-work",
    category: "Building",
    label: "Product System",
    title: "Expanding the School Management System",
    description:
      "Continuing work on the multi-tenant school platform with stronger module structure, workflow clarity, and production-focused backend decisions.",
    tags: [
      "Next.js",
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "Prisma",
      "Redis",
    ],
    points: [
      "Refining admin, staff, and student workflows",
      "Improving modular API structure for long-term maintainability",
      "Thinking around scale, auth, and production-readiness instead of demo code",
    ],
    type: "building",
  },
  {
    index: "02",
    slug: "dao-framework-research",
    category: "Learning",
    label: "Protocol Engineering",
    title: "Pushing Deeper into DAO Framework Architecture",
    description:
      "Working through Rust, Solana, plugin-based governance design, and protocol-level system thinking beyond standard web app development.",
    tags: ["Rust", "Solana", "Anchor", "DAO", "Web3", "Governance"],
    points: [
      "Exploring plugin-based architecture for extensibility",
      "Studying snapshot voting and dynamic quorum logic",
      "Using Rust to sharpen lower-level engineering discipline",
    ],
    type: "learning",
  },
  {
    index: "03",
    slug: "portfolio-system-iteration",
    category: "Designing",
    label: "Brand + Frontend",
    title: "Turning the Portfolio into a Structured Product",
    description:
      "Building the portfolio like an actual system — not a random personal site — with reusable sections, better positioning, and stronger frontend structure.",
    tags: ["Next.js", "Tailwind CSS", "Framer Motion", "UI Systems"],
    points: [
      "Creating consistent page structure across sections",
      "Improving frontend quality without adding fluff",
      "Positioning work around engineering depth instead of generic self-promotion",
    ],
    type: "designing",
  },
  {
    index: "04",
    slug: "system-design-learning",
    category: "Studying",
    label: "Engineering Thinking",
    title: "Studying Production-Grade System Design",
    description:
      "Going deeper into scalability, caching, architecture trade-offs, API design, horizontal scaling, and failure-aware backend engineering.",
    tags: ["System Design", "Redis", "Scaling", "Caching", "Architecture"],
    points: [
      "Learning when to use and when not to use caching",
      "Thinking through scaling models instead of copying buzzwords",
      "Focusing on real trade-offs in backend architecture",
    ],
    type: "studying",
  },
  {
    index: "05",
    slug: "opensource-contribution",
    category: "Open Source",
    label: "Public Work",
    title: "Contributing Through Public Code and Engineering Learning",
    description:
      "Using GitHub and open source as proof of actual work, experimentation, and exposure to better engineering practices.",
    tags: ["GitHub", "Open Source", "Collaboration", "Code Reading"],
    points: [
      "Learning from real repositories instead of isolated tutorial projects",
      "Improving code quality by reading stronger engineering patterns",
      "Treating open source as a real training ground",
    ],
    type: "opensource",
  },
  {
    index: "06",
    slug: "ai-ml-exploration",
    category: "Exploring",
    label: "Next Frontier",
    title: "Learning More About AI, ML, and Intelligent Systems",
    description:
      "Exploring AI and ML concepts to understand how modern software systems are shifting beyond traditional CRUD applications.",
    tags: ["AI", "ML", "Search", "Embeddings", "Intelligent Systems"],
    points: [
      "Trying to understand AI systems from an engineering angle",
      "Connecting backend/system thinking with modern AI product directions",
      "Learning the fundamentals instead of pretending to be an expert already",
    ],
    type: "exploring",
  },
];

const snapshots = [
  {
    name: "Building Systems",
    type: "Current Focus",
    description:
      "Backend-heavy products, multi-tenant architecture, and maintainable full-stack systems.",
    tech: ["APIs", "RBAC", "Modules"],
  },
  {
    name: "Learning in Public",
    type: "Ongoing",
    description:
      "Rust, Solana, system design, AI concepts, and stronger production engineering habits.",
    tech: ["Rust", "Solana", "System Design"],
  },
  {
    name: "Open Source Direction",
    type: "Proof of Work",
    description:
      "Using GitHub work and repository exploration as a visible trail of engineering growth.",
    tech: ["GitHub", "Code Reading", "OSS"],
  },
];

const timeline = [
  {
    period: "Now",
    title: "Building deeper engineering foundations",
    detail:
      "Focusing on system design, backend architecture, full-stack product quality, and more serious project depth.",
  },
  {
    period: "Current",
    title: "B.Tech in Computer Science",
    detail:
      "Continuing formal education while building practical projects and sharpening engineering skills outside the classroom.",
  },
  {
    period: "Ongoing",
    title: "Open source and public learning",
    detail:
      "Using GitHub, public repos, and engineering communities to improve through real code exposure.",
  },
  {
    period: "Next",
    title: "Protocol + AI systems exploration",
    detail:
      "Pushing toward Rust, Solana, governance systems, and stronger understanding of AI/ML system thinking.",
  },
];

const filters = [
  "All",
  "Building",
  "Learning",
  "Designing",
  "Studying",
  "Open Source",
  "Exploring",
];

function getActivityIcon(type: string) {
  switch (type) {
    case "building":
      return Boxes;
    case "learning":
      return Brain;
    case "designing":
      return Rocket;
    case "studying":
      return BookOpen;
    case "opensource":
      return FolderGit2;
    case "exploring":
      return GitCommitHorizontal;
    default:
      return Activity;
  }
}

export default function ActivityPage() {
  const [expandedSlug, setExpandedSlug] = useState<string | null>(
    "school-management-system-work"
  );
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredFeed = useMemo(() => {
    if (activeFilter === "All") return activityFeed;
    return activityFeed.filter((item) => item.category === activeFilter);
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
          <div className="absolute left-[-80px] top-[-20px] h-[240px] w-[240px] rounded-full bg-blue-500/[0.05] blur-[80px] sm:left-[4%] sm:top-0 sm:h-[320px] sm:w-[320px] sm:blur-[100px] lg:left-[10%] lg:h-[500px] lg:w-[400px] lg:blur-[120px]" />
          <div className="absolute bottom-[-30px] right-[-60px] h-[220px] w-[220px] rounded-full bg-blue-500/[0.03] blur-[80px] sm:right-[4%] sm:bottom-0 sm:h-[300px] sm:w-[300px] sm:blur-[95px] lg:right-[8%] lg:h-[400px] lg:w-[400px] lg:blur-[100px]" />
        </div>

        <div className="relative z-10 mx-auto max-w-[1200px] px-4 pb-16 sm:px-6 sm:pb-20 md:px-8 lg:pb-24">
          {/* HEADER */}
          <header className="mb-12 grid grid-cols-1 gap-8 border-b border-white/[0.07] pb-10 pt-12 sm:mb-14 sm:pb-12 sm:pt-14 lg:mb-16 lg:grid-cols-[1fr_auto] lg:items-end lg:pb-14 lg:pt-20">
            <div>
              <div
                className="mb-4 flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-zinc-500 sm:mb-5 sm:text-[11px]"
                style={{ fontFamily: "'DM Mono', monospace" }}
              >
                <span className="block h-px w-5 bg-zinc-700 sm:w-6" />
                Activity Log
              </div>

              <h1
                className="text-[clamp(36px,11vw,88px)] font-extrabold leading-[0.95] tracking-[-0.03em] text-white"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                What I&apos;m
                <br />
                <span
                  className="text-transparent"
                  style={{ WebkitTextStroke: "1px rgba(255,255,255,0.28)" }}
                >
                  doing now
                </span>
              </h1>

              <p className="mt-5 max-w-[580px] text-sm font-light leading-7 text-zinc-500 sm:mt-6 sm:text-[15px] sm:leading-8 md:text-base md:leading-[1.75]">
                A live view of what I&apos;m building, learning, exploring, and
                improving — from product systems and backend architecture to open
                source, protocol engineering, and AI/ML curiosity.
              </p>
            </div>

            {/* Mobile + desktop stats */}
            <div className="grid grid-cols-3 gap-4 sm:gap-5 lg:flex lg:flex-col lg:items-end lg:gap-4 lg:pb-1">
              {[
                { num: "6", label: "Active Tracks" },
                { num: "3", label: "Core Focuses" },
                { num: "∞", label: "Improvement Loop" },
              ].map(({ num, label }, i) => (
                <div key={i} className="flex flex-col items-start gap-1 lg:items-end">
                  <span
                    className="text-[28px] font-bold leading-none text-white sm:text-[34px] lg:text-[40px]"
                    style={{ fontFamily: "'Syne', sans-serif" }}
                  >
                    {num}
                  </span>
                  <span
                    className="text-[9px] uppercase tracking-[0.15em] text-zinc-600 sm:text-[10px]"
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
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`rounded border px-3 py-[7px] text-[10px] uppercase tracking-[0.12em] transition-all sm:px-4 sm:text-[11px] ${
                  activeFilter === filter
                    ? "border-blue-500 bg-blue-500/10 text-blue-400"
                    : "border-white/[0.07] bg-transparent text-zinc-500 hover:border-white/[0.12] hover:bg-white/[0.03] hover:text-zinc-200"
                }`}
                style={{ fontFamily: "'DM Mono', monospace" }}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* FEED */}
          <div className="mb-16 flex flex-col gap-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.07] sm:mb-20">
            {filteredFeed.map((item) => {
              const isOpen = expandedSlug === item.slug;
              const Icon = getActivityIcon(item.type);

              return (
                <article
                  key={item.slug}
                  onClick={() => toggleCard(item.slug)}
                  className={`grid cursor-pointer grid-cols-1 transition-colors md:grid-cols-[64px_1fr] lg:grid-cols-[72px_1fr_170px] ${
                    isOpen
                      ? "border-l-2 border-blue-500 bg-[#111113]"
                      : "bg-[#09090b] hover:bg-[#111113]"
                  }`}
                >
                  {/* mobile top row */}
                  <div className="flex items-center justify-between border-b border-white/[0.07] px-5 py-4 md:hidden">
                    <span
                      className="text-[10px] tracking-[0.1em] text-zinc-600"
                      style={{ fontFamily: "'DM Mono', monospace" }}
                    >
                      {item.index}
                    </span>

                    <div className="flex items-center gap-2">
                      <span
                        className="rounded border border-blue-500/25 bg-blue-500/10 px-2 py-[3px] text-[10px] uppercase tracking-[0.15em] text-blue-400"
                        style={{ fontFamily: "'DM Mono', monospace" }}
                      >
                        {item.category}
                      </span>
                      <ArrowUpRight
                        size={16}
                        className={`text-zinc-600 transition-all ${
                          isOpen ? "rotate-45 text-blue-400" : ""
                        }`}
                      />
                    </div>
                  </div>

                  {/* index desktop */}
                  <div className="hidden items-start justify-center border-r border-white/[0.07] pt-7 md:flex">
                    <span
                      className="text-[11px] tracking-[0.1em] text-zinc-600"
                      style={{ fontFamily: "'DM Mono', monospace" }}
                    >
                      {item.index}
                    </span>
                  </div>

                  {/* body */}
                  <div className="p-5 sm:p-6 lg:p-8">
                    <div className="mb-3 hidden flex-wrap items-center gap-3 md:flex">
                      <span
                        className="rounded border border-blue-500/25 bg-blue-500/10 px-2 py-[3px] text-[10px] uppercase tracking-[0.15em] text-blue-400"
                        style={{ fontFamily: "'DM Mono', monospace" }}
                      >
                        {item.category}
                      </span>
                      <span
                        className="text-[10px] uppercase tracking-[0.12em] text-zinc-600"
                        style={{ fontFamily: "'DM Mono', monospace" }}
                      >
                        {item.label}
                      </span>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.02] sm:h-11 sm:w-11">
                        <Icon size={18} className="text-blue-400" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="mb-3 md:hidden">
                          <span
                            className="text-[10px] uppercase tracking-[0.12em] text-zinc-600"
                            style={{ fontFamily: "'DM Mono', monospace" }}
                          >
                            {item.label}
                          </span>
                        </div>

                        <h2
                          className="mb-3 text-[19px] font-bold leading-tight tracking-[-0.02em] text-white sm:text-[21px] lg:text-[22px]"
                          style={{ fontFamily: "'Syne', sans-serif" }}
                        >
                          {item.title}
                        </h2>

                        <p className="mb-4 max-w-[650px] text-sm font-light leading-relaxed text-zinc-500">
                          {item.description}
                        </p>

                        <div className="flex flex-wrap gap-[6px]">
                          {item.tags.map((tag) => (
                            <span
                              key={tag}
                              className="rounded border border-white/[0.07] bg-zinc-900 px-2 py-[3px] text-[10px] tracking-[0.05em] text-zinc-500"
                              style={{ fontFamily: "'DM Mono', monospace" }}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {isOpen && (
                      <div
                        className="mt-5 grid grid-cols-1 gap-4 border-t border-white/[0.07] pt-5 md:mt-6 md:pt-6 xl:grid-cols-3"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {item.points.map((point) => (
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

                  {/* right panel desktop */}
                  <div
                    className="hidden border-l border-white/[0.07] p-7 lg:flex lg:flex-col lg:items-end lg:justify-between"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ArrowUpRight
                      size={20}
                      className={`text-zinc-600 transition-all ${
                        isOpen ? "opacity-100 text-blue-400" : "opacity-70"
                      }`}
                    />

                    <div className="flex flex-col items-end gap-[8px]">
                      <div
                        className="text-[10px] uppercase tracking-[0.1em] text-zinc-600"
                        style={{ fontFamily: "'DM Mono', monospace" }}
                      >
                        Status
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-blue-500" />
                        <span
                          className="text-[11px] uppercase tracking-[0.1em] text-zinc-400"
                          style={{ fontFamily: "'DM Mono', monospace" }}
                        >
                          Active
                        </span>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {/* SNAPSHOTS */}
          <div className="mb-6 flex items-center gap-4 sm:mb-7">
            <span
              className="whitespace-nowrap text-[10px] uppercase tracking-[0.2em] text-zinc-600 sm:text-[11px]"
              style={{ fontFamily: "'DM Mono', monospace" }}
            >
              Quick Snapshots
            </span>
            <div className="h-px flex-1 bg-white/[0.07]" />
            <Link
              href="https://github.com/VishalDevx"
              target="_blank"
              className="hidden items-center gap-2 whitespace-nowrap rounded border border-white/[0.07] px-3 py-[6px] text-[10px] uppercase tracking-[0.1em] text-zinc-500 transition-all hover:border-white/[0.12] hover:bg-white/[0.03] hover:text-white sm:flex"
              style={{ fontFamily: "'DM Mono', monospace" }}
            >
              View GitHub <ArrowUpRight size={10} />
            </Link>
          </div>

          <div className="mb-16 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-white/[0.07] bg-white/[0.07] sm:mb-20 md:grid-cols-2 xl:grid-cols-3">
            {snapshots.map((item) => (
              <div
                key={item.name}
                className="group block bg-[#09090b] p-5 transition-colors hover:bg-[#111113] sm:p-6"
              >
                <div className="mb-4 flex items-start justify-between">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.12]">
                    <Activity size={14} className="text-zinc-500" />
                  </div>
                  <span
                    className="text-[9px] uppercase tracking-[0.15em] text-zinc-600"
                    style={{ fontFamily: "'DM Mono', monospace" }}
                  >
                    {item.type}
                  </span>
                </div>

                <h4
                  className="mb-2 text-[15px] font-bold tracking-[-0.01em] text-white"
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
              </div>
            ))}
          </div>

          {/* TIMELINE */}
          <section className="mb-16 sm:mb-20">
            <div className="mb-6 flex items-center gap-4 sm:mb-7">
              <span
                className="whitespace-nowrap text-[10px] uppercase tracking-[0.2em] text-zinc-600 sm:text-[11px]"
                style={{ fontFamily: "'DM Mono', monospace" }}
              >
                Progress Direction
              </span>
              <div className="h-px flex-1 bg-white/[0.07]" />
            </div>

            <div className="overflow-hidden rounded-2xl border border-white/[0.07]">
              {timeline.map((item, idx) => (
                <div
                  key={item.title}
                  className={`grid grid-cols-1 gap-4 p-5 sm:gap-6 sm:p-6 md:grid-cols-[130px_1fr] md:p-7 ${
                    idx !== timeline.length - 1
                      ? "border-b border-white/[0.07]"
                      : ""
                  }`}
                >
                  <div>
                    <span
                      className="text-[10px] uppercase tracking-[0.15em] text-blue-400"
                      style={{ fontFamily: "'DM Mono', monospace" }}
                    >
                      {item.period}
                    </span>
                  </div>

                  <div>
                    <h3
                      className="mb-2 text-[18px] font-bold leading-tight tracking-[-0.02em] text-white sm:text-[20px]"
                      style={{ fontFamily: "'Syne', sans-serif" }}
                    >
                      {item.title}
                    </h3>
                    <p className="max-w-[760px] text-sm font-light leading-relaxed text-zinc-500">
                      {item.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <div className="mt-16 grid grid-cols-1 gap-6 rounded-2xl border border-white/[0.07] p-6 sm:mt-20 sm:gap-8 sm:p-8 md:grid-cols-[1fr_auto] md:items-center lg:p-10">
            <div>
              <h3
                className="text-[22px] font-bold leading-tight tracking-[-0.02em] text-white sm:text-[26px] lg:text-[28px]"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                Want to follow the work
                <br />
                <span className="font-normal text-zinc-500">
                  or build something serious together?
                </span>
              </h3>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap md:justify-end">
              <a
                href="mailto:vishalcsx@gmail.com"
                className="flex items-center justify-center gap-2 rounded-md bg-white px-5 py-3 text-[11px] font-medium uppercase tracking-[0.1em] text-black transition-colors hover:bg-zinc-200"
                style={{ fontFamily: "'DM Mono', monospace" }}
              >
                Contact Me <ArrowUpRight size={12} />
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