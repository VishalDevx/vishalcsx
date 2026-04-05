"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowUpRight,
  Github,
  ExternalLink,
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
                Activity Log
              </div>

              <h1
                className="text-[clamp(48px,7vw,88px)] font-extrabold leading-[0.92] tracking-[-0.03em] text-white"
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

              <p className="mt-6 text-base leading-[1.75] text-zinc-500 font-light max-w-[580px]">
                A live view of what I&apos;m building, learning, exploring, and
                improving — from product systems and backend architecture to open
                source, protocol engineering, and AI/ML curiosity.
              </p>
            </div>

            {/* Stats */}
            <div className="hidden lg:flex flex-col items-end gap-4 pb-1">
              {[
                { num: "6", label: "Active Tracks" },
                { num: "3", label: "Core Focuses" },
                { num: "∞", label: "Improvement Loop" },
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
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`text-[11px] uppercase tracking-[0.12em] px-4 py-[6px] rounded border transition-all ${
                  activeFilter === filter
                    ? "border-blue-500 text-blue-400 bg-blue-500/10"
                    : "border-white/[0.07] text-zinc-500 bg-transparent hover:border-white/[0.12] hover:text-zinc-200 hover:bg-white/[0.03]"
                }`}
                style={{ fontFamily: "'DM Mono', monospace" }}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* FEED */}
          <div className="flex flex-col gap-px bg-white/[0.07] border border-white/[0.07] rounded-2xl overflow-hidden mb-20">
            {filteredFeed.map((item) => {
              const isOpen = expandedSlug === item.slug;
              const Icon = getActivityIcon(item.type);

              return (
                <article
                  key={item.slug}
                  onClick={() => toggleCard(item.slug)}
                  className={`grid grid-cols-[72px_1fr] lg:grid-cols-[72px_1fr_190px] items-stretch cursor-pointer transition-colors ${
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
                      {item.index}
                    </span>
                  </div>

                  {/* Body */}
                  <div className="p-7 lg:p-8">
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <span
                        className="text-[10px] uppercase tracking-[0.15em] text-blue-400 bg-blue-500/10 border border-blue-500/25 rounded px-2 py-[3px]"
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
                      <div className="w-11 h-11 rounded-xl border border-white/[0.08] bg-white/[0.02] flex items-center justify-center shrink-0">
                        <Icon size={18} className="text-blue-400" />
                      </div>

                      <div className="flex-1">
                        <h2
                          className="text-[22px] font-bold tracking-[-0.02em] text-white leading-tight mb-3"
                          style={{ fontFamily: "'Syne', sans-serif" }}
                        >
                          {item.title}
                        </h2>

                        <p className="text-sm leading-relaxed text-zinc-500 font-light max-w-[650px] mb-4">
                          {item.description}
                        </p>

                        <div className="flex flex-wrap gap-[6px]">
                          {item.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-[10px] text-zinc-500 bg-zinc-900 border border-white/[0.07] rounded px-2 py-[3px] tracking-[0.05em]"
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
                        className="mt-6 pt-6 border-t border-white/[0.07] grid grid-cols-1 md:grid-cols-3 gap-4"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {item.points.map((point) => (
                          <div
                            key={point}
                            className="flex gap-3 text-sm text-zinc-500 font-light leading-relaxed"
                          >
                            <span className="w-1 h-1 rounded-full bg-blue-500 flex-shrink-0 mt-[9px]" />
                            <span>{point}</span>
                          </div>
                        ))}
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
                        isOpen ? "opacity-100" : "opacity-70"
                      }`}
                    />

                    <div className="flex flex-col gap-[8px] items-end">
                      <div
                        className="text-[10px] uppercase tracking-[0.1em] text-zinc-600"
                        style={{ fontFamily: "'DM Mono', monospace" }}
                      >
                        Status
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-blue-500" />
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
          <div className="flex items-center gap-4 mb-7">
            <span
              className="text-[11px] uppercase tracking-[0.2em] text-zinc-600 whitespace-nowrap"
              style={{ fontFamily: "'DM Mono', monospace" }}
            >
              Quick Snapshots
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
            {snapshots.map((item) => (
              <div
                key={item.name}
                className="bg-[#09090b] p-6 hover:bg-[#111113] transition-colors group block"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-8 h-8 border border-white/[0.12] rounded-lg flex items-center justify-center">
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
                  className="text-[15px] font-bold text-white mb-2 tracking-[-0.01em]"
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
              </div>
            ))}
          </div>

          {/* TIMELINE */}
          <section className="mb-20">
            <div className="flex items-center gap-4 mb-7">
              <span
                className="text-[11px] uppercase tracking-[0.2em] text-zinc-600 whitespace-nowrap"
                style={{ fontFamily: "'DM Mono', monospace" }}
              >
                Progress Direction
              </span>
              <div className="flex-1 h-px bg-white/[0.07]" />
            </div>

            <div className="border border-white/[0.07] rounded-2xl overflow-hidden">
              {timeline.map((item, idx) => (
                <div
                  key={item.title}
                  className={`grid grid-cols-1 md:grid-cols-[130px_1fr] gap-6 p-6 md:p-7 ${
                    idx !== timeline.length - 1 ? "border-b border-white/[0.07]" : ""
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
                      className="text-[20px] font-bold tracking-[-0.02em] text-white leading-tight mb-2"
                      style={{ fontFamily: "'Syne', sans-serif" }}
                    >
                      {item.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-zinc-500 font-light max-w-[760px]">
                      {item.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-[1fr_auto] items-center gap-8 p-10 border border-white/[0.07] rounded-2xl">
            <div>
              <h3
                className="text-[28px] font-bold tracking-[-0.02em] text-white leading-tight"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                Want to follow the work
                <br />
                <span className="text-zinc-500 font-normal">
                  or build something serious together?
                </span>
              </h3>
            </div>

            <div className="flex gap-3 flex-shrink-0">
              <a
                href="mailto:vishal@example.com"
                className="flex items-center gap-2 text-[11px] uppercase tracking-[0.1em] px-5 py-3 rounded-md bg-white text-black hover:bg-zinc-200 transition-colors font-medium"
                style={{ fontFamily: "'DM Mono', monospace" }}
              >
                Contact Me <ArrowUpRight size={12} />
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