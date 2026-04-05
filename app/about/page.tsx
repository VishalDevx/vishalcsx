"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  Github,
  Database,
  Workflow,
  Server,
  Code2,
  GraduationCap,
  Boxes,
  Monitor,
  GitBranch,
  Cpu,
  BookOpen,
} from "lucide-react";

const quickFacts = [
  {
    label: "Current Education",
    value: "B.Tech in Computer Science",
    sub: "Dr. A.P.J. Abdul Kalam Technical University (AKTU)",
    icon: <GraduationCap size={16} />,
  },
  {
    label: "Class 12",
    value: "Higher Secondary",
    sub: "UP Board",
    icon: <BookOpen size={16} />,
  },
  {
    label: "Class 10",
    value: "Secondary Education",
    sub: "UP Board",
    icon: <BookOpen size={16} />,
  },
];

const identityCards = [
  {
    label: "Who I am",
    title: "Full-stack developer with strong backend focus",
    desc: "I build across frontend, backend, APIs, database design, and overall product structure. My strongest interest is in backend-heavy systems, scalable architecture, and full-stack products that solve real problems instead of looking good only in screenshots.",
    icon: <Code2 size={16} />,
  },
  {
    label: "What I care about",
    title: "Clean systems, clear structure, real engineering",
    desc: "I care about authentication, validation, role-based access, multi-tenant architecture, frontend consistency, API structure, database design, and maintainable code that does not collapse when complexity grows.",
    icon: <Workflow size={16} />,
  },
  {
    label: "Where I am going",
    title: "Toward deeper production-grade engineering",
    desc: "Right now I am pushing deeper into system design, backend architecture, infrastructure thinking, AI and ML learning, open-source contribution quality, and stronger engineering discipline across the full stack.",
    icon: <Cpu size={16} />,
  },
];

const focusAreas = [
  {
    label: "Backend Engineering",
    title: "APIs, auth, data flow, architecture",
    desc: "A lot of my work is centered on modular backend systems, role-based access, tenant-aware design, validation-first APIs, service structure, PostgreSQL design, caching, and scalability thinking.",
  },
  {
    label: "Frontend Engineering",
    title: "Structured UI that supports the product",
    desc: "I build frontend with reusable sections, proper hierarchy, strong spacing, clean typography, and better consistency. I do not see frontend as decoration. It is part of the engineering quality of the product.",
  },
  {
    label: "System Thinking",
    title: "Beyond coding into architecture and scale",
    desc: "I spend time understanding system design tradeoffs, security boundaries, caching strategy, horizontal scaling, performance thinking, deployment direction, and how real systems behave under pressure.",
  },
];

const currentWork = [
  {
    tag: "Building now",
    title: "Multi-tenant school management system",
    desc: "A full-stack school management platform for admin, staff, and students with modular APIs, role-based workflows, academic operations, fee handling, and production-minded backend structure.",
  },
  {
    tag: "Learning now",
    title: "AI and ML concepts",
    desc: "I am actively learning AI and ML concepts to understand how intelligent systems work, how models and data fit into real products, and how these ideas connect with backend engineering and product systems.",
  },
  {
    tag: "Exploring now",
    title: "Rust, Solana, and DAO architecture",
    desc: "I am also exploring a plugin-based DAO framework on Solana, going deeper into Rust, protocol constraints, on-chain architecture, and system-level design decisions.",
  },
  {
    tag: "Improving now",
    title: "Portfolio and engineering presentation",
    desc: "I am improving how I present my work, making my portfolio feel like a structured product system with better technical storytelling, better UI quality, and clearer engineering proof.",
  },
];

const stackGroups = [
  {
    title: "Frontend",
    icon: <Monitor size={15} />,
    items: [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "Reusable UI Systems",
    ],
  },
  {
    title: "Backend",
    icon: <Server size={15} />,
    items: ["Node.js", "Express", "REST APIs", "Authentication", "Authorization", "Zod"],
  },
  {
    title: "Data & Infra",
    icon: <Database size={15} />,
    items: ["PostgreSQL", "Prisma", "Redis", "Docker", "Caching", "Scalability"],
  },
  {
    title: "Exploration",
    icon: <Boxes size={15} />,
    items: ["Rust", "Solana", "Anchor", "System Design", "Plugin Architecture", "Web3"],
  },
];

const learningNow = [
  "Advanced backend architecture",
  "System design tradeoffs",
  "AI and machine learning fundamentals",
  "Scalability patterns and caching",
  "Production-ready frontend systems",
  "Rust and Solana development",
  "DevOps and deployment thinking",
  "Open-source contribution quality",
];

const openSourceItems = [
  {
    label: "Open Source",
    title: "Learning from real codebases",
    desc: "Open source matters because it exposes real standards. You see how good engineers structure systems, debug issues, review code, and handle complexity in actual software instead of isolated toy projects.",
  },
  {
    label: "Why it matters",
    title: "Better engineering, not fake contribution counts",
    desc: "My goal is not random commit numbers. It is to improve how I read mature codebases, debug faster, understand architecture better, and contribute in a way that actually improves my engineering depth.",
  },
];

const journey = [
  {
    year: "Started with",
    title: "Core full-stack development",
    desc: "I built my foundation around JavaScript, TypeScript, React, Next.js, Node.js, API development, and database-backed web applications.",
  },
  {
    year: "Moved into",
    title: "Backend-heavy systems and scalable products",
    desc: "I shifted more toward validation-first APIs, modular backend structure, PostgreSQL design, caching with Redis, multi-tenant application architecture, and scalable product thinking.",
  },
  {
    year: "Now focused on",
    title: "Real engineering proof and deeper technical growth",
    desc: "Right now I am focused on building projects that show stronger architecture, better system structure, sharper frontend execution, and more serious full-stack engineering quality.",
  },
  {
    year: "Next direction",
    title: "Production-grade depth with broader technical range",
    desc: "The next phase is stronger infrastructure knowledge, deeper AI and ML understanding, more meaningful open-source participation, and better system-level problem solving.",
  },
];

const profilePoints = [
  "Currently pursuing B.Tech in Computer Science under AKTU.",
  "Completed 10th and 12th from UP Board.",
  "Full-stack developer with strong backend and systems interest.",
  "Building real projects while learning AI, ML, system design, and open source.",
];

export default function AboutPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:wght@300;400;500&family=DM+Sans:wght@300;400;500&display=swap');
      `}</style>

      <main
        className="relative min-h-screen overflow-x-hidden bg-[#09090b] text-white"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        <div className="pointer-events-none fixed inset-0 z-0">
          <div className="absolute left-[-80px] top-[-30px] h-[240px] w-[240px] rounded-full bg-blue-500/[0.05] blur-[80px] sm:left-[4%] sm:top-0 sm:h-[340px] sm:w-[340px] sm:blur-[100px] lg:left-[10%] lg:h-[500px] lg:w-[400px] lg:blur-[120px]" />
          <div className="absolute bottom-[-20px] right-[-60px] h-[220px] w-[220px] rounded-full bg-blue-500/[0.03] blur-[80px] sm:right-[4%] sm:bottom-0 sm:h-[300px] sm:w-[300px] sm:blur-[95px] lg:right-[8%] lg:h-[420px] lg:w-[420px] lg:blur-[110px]" />
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
                About Me
              </div>

              <h1
                className="text-[clamp(34px,11vw,82px)] font-extrabold leading-[0.96] tracking-[-0.035em] text-white"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                Full-stack engineer
                <br />
                building{" "}
                <span
                  className="text-transparent"
                  style={{ WebkitTextStroke: "1px rgba(255,255,255,0.28)" }}
                >
                  real systems
                </span>
              </h1>

              <p className="mt-5 max-w-[760px] text-sm font-light leading-7 text-zinc-500 sm:mt-6 sm:text-[15px] sm:leading-8 md:text-base md:leading-[1.9]">
                I’m Vishal Singh — a full-stack developer currently pursuing
                B.Tech in Computer Science under Dr. A.P.J. Abdul Kalam Technical
                University (AKTU), with a school background from UP Board. I am
                focused on building backend-heavy systems, scalable full-stack
                products, and stronger engineering depth through real projects,
                open-source learning, and continuous study in AI, ML, and system
                design.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4 sm:gap-5 lg:flex lg:flex-col lg:items-end lg:gap-4 lg:pb-1">
              {[
                { num: "CS", label: "B.Tech CSE" },
                { num: "FS", label: "Full-Stack" },
                { num: "AI", label: "Learning path" },
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

          {/* QUICK FACTS */}
          <section className="mb-12 sm:mb-14 lg:mb-16">
            <div className="mb-6 flex items-center gap-4 sm:mb-7">
              <span
                className="whitespace-nowrap text-[10px] uppercase tracking-[0.2em] text-zinc-600 sm:text-[11px]"
                style={{ fontFamily: "'DM Mono', monospace" }}
              >
                Quick facts
              </span>
              <div className="h-px flex-1 bg-white/[0.07]" />
            </div>

            <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.07] md:grid-cols-3">
              {quickFacts.map((item) => (
                <div key={item.label} className="bg-[#09090b] p-5 sm:p-6 lg:p-7">
                  <div
                    className="mb-3 flex items-center gap-2 text-[10px] uppercase tracking-[0.14em] text-blue-400 sm:mb-4"
                    style={{ fontFamily: "'DM Mono', monospace" }}
                  >
                    {item.icon}
                    {item.label}
                  </div>

                  <h3
                    className="mb-2 text-[20px] font-bold tracking-[-0.02em] text-white sm:text-[22px]"
                    style={{ fontFamily: "'Syne', sans-serif" }}
                  >
                    {item.value}
                  </h3>

                  <p className="text-[13px] font-light leading-7 text-zinc-500 sm:text-[14px] sm:leading-[1.8]">
                    {item.sub}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* INTRO */}
          <section className="mb-12 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.07] lg:mb-16 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="bg-[#09090b] p-6 sm:p-8 md:p-10">
              <div
                className="mb-4 flex items-center gap-3 text-[10px] uppercase tracking-[0.16em] text-blue-400 sm:mb-5"
                style={{ fontFamily: "'DM Mono', monospace" }}
              >
                <Code2 size={13} />
                What I do
              </div>

              <h2
                className="mb-4 text-[26px] font-bold leading-[1.06] tracking-[-0.03em] text-white sm:text-[32px] md:text-[38px] sm:mb-5"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                I build across
                <br />
                frontend, backend,
                <br />
                and system design
              </h2>

              <p className="max-w-[640px] text-[14px] font-light leading-7 text-zinc-500 sm:text-[15px] sm:leading-[1.9]">
                My work is not limited to one layer. I build frontend systems
                with better structure, backend systems with clear architecture,
                and full-stack products where APIs, workflows, data models, and
                interfaces actually fit together. I care about software that
                works in real usage, not just in demos.
              </p>
            </div>

            <div className="flex flex-col justify-between bg-[#0d0d10] p-6 sm:p-8 md:p-10">
              <div>
                <div
                  className="mb-4 text-[10px] uppercase tracking-[0.16em] text-zinc-600 sm:mb-5"
                  style={{ fontFamily: "'DM Mono', monospace" }}
                >
                  Short profile
                </div>

                <div className="space-y-4">
                  {profilePoints.map((point) => (
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

              <div className="mt-7 border-t border-white/[0.07] pt-7 sm:mt-8 sm:pt-8">
                <div
                  className="mb-3 text-[9px] uppercase tracking-[0.14em] text-zinc-600"
                  style={{ fontFamily: "'DM Mono', monospace" }}
                >
                  Current direction
                </div>
                <p className="text-sm leading-[1.8] text-zinc-400">
                  Building stronger proof through better projects, sharper
                  system thinking, more serious open-source learning, and deeper
                  technical understanding across backend, full-stack systems,
                  AI/ML, and production-grade engineering.
                </p>
              </div>
            </div>
          </section>

          {/* IDENTITY */}
          <section className="mb-12 sm:mb-14 lg:mb-16">
            <div className="mb-6 flex items-center gap-4 sm:mb-7">
              <span
                className="whitespace-nowrap text-[10px] uppercase tracking-[0.2em] text-zinc-600 sm:text-[11px]"
                style={{ fontFamily: "'DM Mono', monospace" }}
              >
                More about me
              </span>
              <div className="h-px flex-1 bg-white/[0.07]" />
            </div>

            <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.07] md:grid-cols-2 xl:grid-cols-3">
              {identityCards.map((item) => (
                <div key={item.title} className="bg-[#09090b] p-5 sm:p-6 lg:p-7">
                  <div
                    className="mb-3 flex items-center gap-2 text-[10px] uppercase tracking-[0.14em] text-blue-400 sm:mb-4"
                    style={{ fontFamily: "'DM Mono', monospace" }}
                  >
                    {item.icon}
                    {item.label}
                  </div>

                  <h3
                    className="mb-3 text-[18px] font-bold tracking-[-0.02em] text-white sm:text-[20px]"
                    style={{ fontFamily: "'Syne', sans-serif" }}
                  >
                    {item.title}
                  </h3>

                  <p className="text-[13px] font-light leading-7 text-zinc-500 sm:text-[14px] sm:leading-[1.8]">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* FOCUS AREAS */}
          <section className="mb-12 sm:mb-14 lg:mb-16">
            <div className="mb-6 flex items-center gap-4 sm:mb-7">
              <span
                className="whitespace-nowrap text-[10px] uppercase tracking-[0.2em] text-zinc-600 sm:text-[11px]"
                style={{ fontFamily: "'DM Mono', monospace" }}
              >
                Focus areas
              </span>
              <div className="h-px flex-1 bg-white/[0.07]" />
            </div>

            <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.07] md:grid-cols-2 xl:grid-cols-3">
              {focusAreas.map((area) => (
                <div key={area.title} className="bg-[#09090b] p-5 sm:p-6 lg:p-7">
                  <span
                    className="mb-4 inline-flex rounded border border-blue-500/20 bg-blue-500/10 px-2 py-[4px] text-[10px] uppercase tracking-[0.14em] text-blue-400"
                    style={{ fontFamily: "'DM Mono', monospace" }}
                  >
                    {area.label}
                  </span>

                  <h3
                    className="mb-3 text-[17px] font-bold tracking-[-0.02em] text-white sm:text-[18px]"
                    style={{ fontFamily: "'Syne', sans-serif" }}
                  >
                    {area.title}
                  </h3>

                  <p className="text-[13px] font-light leading-7 text-zinc-500 sm:text-[14px] sm:leading-[1.8]">
                    {area.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* CURRENT WORK */}
          <section className="mb-12 sm:mb-14 lg:mb-16">
            <div className="mb-6 flex items-center gap-4 sm:mb-7">
              <span
                className="whitespace-nowrap text-[10px] uppercase tracking-[0.2em] text-zinc-600 sm:text-[11px]"
                style={{ fontFamily: "'DM Mono', monospace" }}
              >
                What I am doing now
              </span>
              <div className="h-px flex-1 bg-white/[0.07]" />
            </div>

            <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.07] md:grid-cols-2">
              {currentWork.map((item) => (
                <div key={item.title} className="bg-[#09090b] p-5 sm:p-6 lg:p-7">
                  <span
                    className="mb-4 inline-flex rounded border border-blue-500/20 bg-blue-500/10 px-2 py-[4px] text-[10px] uppercase tracking-[0.14em] text-blue-400"
                    style={{ fontFamily: "'DM Mono', monospace" }}
                  >
                    {item.tag}
                  </span>
                  <h3
                    className="mb-3 text-[17px] font-bold tracking-[-0.02em] text-white sm:text-[18px]"
                    style={{ fontFamily: "'Syne', sans-serif" }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-[13px] font-light leading-7 text-zinc-500 sm:text-[14px] sm:leading-[1.8]">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* STACK */}
          <section className="mb-12 sm:mb-14 lg:mb-16">
            <div className="mb-6 flex items-center gap-4 sm:mb-7">
              <span
                className="whitespace-nowrap text-[10px] uppercase tracking-[0.2em] text-zinc-600 sm:text-[11px]"
                style={{ fontFamily: "'DM Mono', monospace" }}
              >
                Tools and stack
              </span>
              <div className="h-px flex-1 bg-white/[0.07]" />
            </div>

            <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.07] sm:grid-cols-2 xl:grid-cols-4">
              {stackGroups.map((group) => (
                <div key={group.title} className="bg-[#09090b] p-5 sm:p-6 lg:p-7">
                  <div className="mb-4 flex items-center justify-between">
                    <h3
                      className="text-[16px] font-bold tracking-[-0.02em] text-white sm:text-[17px]"
                      style={{ fontFamily: "'Syne', sans-serif" }}
                    >
                      {group.title}
                    </h3>
                    <div className="text-blue-400">{group.icon}</div>
                  </div>

                  <div className="flex flex-wrap gap-[6px]">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="rounded border border-white/[0.07] bg-zinc-900 px-2 py-[4px] text-[10px] tracking-[0.05em] text-zinc-500"
                        style={{ fontFamily: "'DM Mono', monospace" }}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* LEARNING NOW */}
          <section className="mb-12 sm:mb-14 lg:mb-16">
            <div className="mb-6 flex items-center gap-4 sm:mb-7">
              <span
                className="whitespace-nowrap text-[10px] uppercase tracking-[0.2em] text-zinc-600 sm:text-[11px]"
                style={{ fontFamily: "'DM Mono', monospace" }}
              >
                What I am learning now
              </span>
              <div className="h-px flex-1 bg-white/[0.07]" />
            </div>

            <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.07] sm:grid-cols-2 xl:grid-cols-4">
              {learningNow.map((item, index) => (
                <div key={item} className="bg-[#09090b] p-5 sm:p-6">
                  <div
                    className="mb-3 text-[10px] uppercase tracking-[0.12em] text-zinc-600"
                    style={{ fontFamily: "'DM Mono', monospace" }}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <div className="flex items-start gap-3 text-[14px] leading-[1.7] text-zinc-300 sm:text-[15px]">
                    <span className="mt-2.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-500" />
                    <span>{item}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* OPEN SOURCE */}
          <section className="mb-12 sm:mb-14 lg:mb-16">
            <div className="mb-6 flex items-center gap-4 sm:mb-7">
              <span
                className="whitespace-nowrap text-[10px] uppercase tracking-[0.2em] text-zinc-600 sm:text-[11px]"
                style={{ fontFamily: "'DM Mono', monospace" }}
              >
                Open source
              </span>
              <div className="h-px flex-1 bg-white/[0.07]" />
            </div>

            <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.07] md:grid-cols-2">
              {openSourceItems.map((item) => (
                <div key={item.title} className="bg-[#09090b] p-5 sm:p-6 lg:p-7">
                  <div
                    className="mb-4 flex items-center gap-2 text-[10px] uppercase tracking-[0.14em] text-blue-400"
                    style={{ fontFamily: "'DM Mono', monospace" }}
                  >
                    <GitBranch size={12} />
                    {item.label}
                  </div>
                  <h3
                    className="mb-3 text-[18px] font-bold tracking-[-0.02em] text-white sm:text-[20px]"
                    style={{ fontFamily: "'Syne', sans-serif" }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-[13px] font-light leading-7 text-zinc-500 sm:text-[14px] sm:leading-[1.8]">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* JOURNEY */}
          <section className="mb-16 sm:mb-18 lg:mb-20">
            <div className="mb-6 flex items-center gap-4 sm:mb-7">
              <span
                className="whitespace-nowrap text-[10px] uppercase tracking-[0.2em] text-zinc-600 sm:text-[11px]"
                style={{ fontFamily: "'DM Mono', monospace" }}
              >
                Journey
              </span>
              <div className="h-px flex-1 bg-white/[0.07]" />
            </div>

            <div className="flex flex-col gap-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.07]">
              {journey.map((item) => (
                <div
                  key={item.title}
                  className="grid grid-cols-1 bg-[#09090b] transition-colors hover:bg-[#111113] md:grid-cols-[160px_1fr]"
                >
                  <div className="border-b border-white/[0.07] p-5 md:border-b-0 md:border-r md:p-7">
                    <span
                      className="text-[10px] uppercase tracking-[0.14em] text-blue-400"
                      style={{ fontFamily: "'DM Mono', monospace" }}
                    >
                      {item.year}
                    </span>
                  </div>

                  <div className="p-5 md:p-7">
                    <h3
                      className="mb-3 text-[18px] font-bold tracking-[-0.02em] text-white sm:text-[20px]"
                      style={{ fontFamily: "'Syne', sans-serif" }}
                    >
                      {item.title}
                    </h3>
                    <p className="max-w-[760px] text-[13px] font-light leading-7 text-zinc-500 sm:text-[14px] sm:leading-[1.8]">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="grid grid-cols-1 gap-6 rounded-2xl border border-white/[0.07] p-6 sm:gap-8 sm:p-8 lg:grid-cols-[1fr_auto] lg:items-center lg:p-10">
            <div>
              <h3
                className="text-[22px] font-bold leading-tight tracking-[-0.02em] text-white sm:text-[26px] lg:text-[28px]"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                Want proof beyond the intro?
                <br />
                <span className="font-normal text-zinc-500">
                  Look at the projects, systems, and code direction.
                </span>
              </h3>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap lg:justify-end">
              <Link
                href="/projects"
                className="flex items-center justify-center gap-2 rounded-md bg-white px-5 py-3 text-[11px] font-medium uppercase tracking-[0.1em] text-black transition-colors hover:bg-zinc-200"
                style={{ fontFamily: "'DM Mono', monospace" }}
              >
                View projects <ArrowUpRight size={12} />
              </Link>

              <Link
                href="/system"
                className="flex items-center justify-center gap-2 rounded-md border border-white/[0.07] px-5 py-3 text-[11px] uppercase tracking-[0.1em] text-zinc-500 transition-all hover:border-white/[0.12] hover:bg-white/[0.03] hover:text-white"
                style={{ fontFamily: "'DM Mono', monospace" }}
              >
                <Server size={12} />
                Systems
              </Link>

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
          </section>
        </div>
      </main>
    </>
  );
}