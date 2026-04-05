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
  BrainCircuit,
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
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Reusable UI Systems"],
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
        className="min-h-screen bg-[#09090b] text-white relative overflow-x-hidden"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        <div className="pointer-events-none fixed inset-0 z-0">
          <div className="absolute top-0 left-[10%] w-[500px] h-[400px] rounded-full bg-blue-500/[0.05] blur-[120px]" />
          <div className="absolute bottom-0 right-[8%] w-[420px] h-[420px] rounded-full bg-blue-500/[0.03] blur-[110px]" />
        </div>

        <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-8 pb-24">
          {/* HEADER */}
          <header className="pt-16 md:pt-20 pb-14 border-b border-white/[0.07] mb-16 grid grid-cols-1 lg:grid-cols-[1fr_auto] items-end gap-8">
            <div>
              <div
                className="flex items-center gap-3 mb-5 text-[11px] uppercase tracking-[0.2em] text-zinc-500"
                style={{ fontFamily: "'DM Mono', monospace" }}
              >
                <span className="w-6 h-px bg-zinc-700 block" />
                About Me
              </div>

              <h1
                className="text-[clamp(42px,7vw,82px)] font-extrabold leading-[0.92] tracking-[-0.03em] text-white"
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

              <p className="mt-6 text-base leading-[1.9] text-zinc-500 font-light max-w-[760px]">
                I’m Vishal Singh — a full-stack developer currently pursuing
                B.Tech in Computer Science under Dr. A.P.J. Abdul Kalam Technical
                University (AKTU), with a school background from UP Board. I am
                focused on building backend-heavy systems, scalable full-stack
                products, and stronger engineering depth through real projects,
                open-source learning, and continuous study in AI, ML, and system
                design.
              </p>
            </div>

            <div className="hidden lg:flex flex-col items-end gap-4 pb-1">
              {[
                { num: "CS", label: "B.Tech CSE" },
                { num: "FS", label: "Full-Stack" },
                { num: "AI", label: "Learning path" },
              ].map(({ num, label }, i) => (
                <div key={i} className="flex flex-col items-end gap-1">
                  {i > 0 && <div className="w-px h-10 bg-white/[0.1] self-center mb-1" />}
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

          {/* QUICK FACTS */}
          <section className="mb-16">
            <div className="flex items-center gap-4 mb-7">
              <span
                className="text-[11px] uppercase tracking-[0.2em] text-zinc-600 whitespace-nowrap"
                style={{ fontFamily: "'DM Mono', monospace" }}
              >
                Quick facts
              </span>
              <div className="flex-1 h-px bg-white/[0.07]" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/[0.07] border border-white/[0.07] rounded-2xl overflow-hidden">
              {quickFacts.map((item) => (
                <div key={item.label} className="bg-[#09090b] p-7">
                  <div
                    className="flex items-center gap-2 text-[10px] uppercase tracking-[0.14em] text-blue-400 mb-4"
                    style={{ fontFamily: "'DM Mono', monospace" }}
                  >
                    {item.icon}
                    {item.label}
                  </div>

                  <h3
                    className="text-[22px] font-bold tracking-[-0.02em] text-white mb-2"
                    style={{ fontFamily: "'Syne', sans-serif" }}
                  >
                    {item.value}
                  </h3>

                  <p className="text-[14px] leading-[1.8] text-zinc-500 font-light">
                    {item.sub}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* INTRO */}
          <section className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-px bg-white/[0.07] border border-white/[0.07] rounded-2xl overflow-hidden mb-16">
            <div className="bg-[#09090b] p-8 md:p-10">
              <div
                className="flex items-center gap-3 mb-5 text-[10px] uppercase tracking-[0.16em] text-blue-400"
                style={{ fontFamily: "'DM Mono', monospace" }}
              >
                <Code2 size={13} />
                What I do
              </div>

              <h2
                className="text-[30px] md:text-[38px] font-bold tracking-[-0.03em] leading-[1.05] text-white mb-5"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                I build across
                <br />
                frontend, backend,
                <br />
                and system design
              </h2>

              <p className="text-[15px] leading-[1.9] text-zinc-500 font-light max-w-[640px]">
                My work is not limited to one layer. I build frontend systems
                with better structure, backend systems with clear architecture,
                and full-stack products where APIs, workflows, data models, and
                interfaces actually fit together. I care about software that
                works in real usage, not just in demos.
              </p>
            </div>

            <div className="bg-[#0d0d10] p-8 md:p-10 flex flex-col justify-between">
              <div>
                <div
                  className="text-[10px] uppercase tracking-[0.16em] text-zinc-600 mb-5"
                  style={{ fontFamily: "'DM Mono', monospace" }}
                >
                  Short profile
                </div>

                <div className="space-y-4">
                  {profilePoints.map((point) => (
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

              <div className="pt-8 mt-8 border-t border-white/[0.07]">
                <div
                  className="text-[9px] uppercase tracking-[0.14em] text-zinc-600 mb-3"
                  style={{ fontFamily: "'DM Mono', monospace" }}
                >
                  Current direction
                </div>
                <p className="text-sm text-zinc-400 leading-[1.8]">
                  Building stronger proof through better projects, sharper
                  system thinking, more serious open-source learning, and deeper
                  technical understanding across backend, full-stack systems,
                  AI/ML, and production-grade engineering.
                </p>
              </div>
            </div>
          </section>

          {/* IDENTITY */}
          <section className="mb-16">
            <div className="flex items-center gap-4 mb-7">
              <span
                className="text-[11px] uppercase tracking-[0.2em] text-zinc-600 whitespace-nowrap"
                style={{ fontFamily: "'DM Mono', monospace" }}
              >
                More about me
              </span>
              <div className="flex-1 h-px bg-white/[0.07]" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/[0.07] border border-white/[0.07] rounded-2xl overflow-hidden">
              {identityCards.map((item) => (
                <div key={item.title} className="bg-[#09090b] p-7">
                  <div
                    className="flex items-center gap-2 mb-4 text-[10px] uppercase tracking-[0.14em] text-blue-400"
                    style={{ fontFamily: "'DM Mono', monospace" }}
                  >
                    {item.icon}
                    {item.label}
                  </div>

                  <h3
                    className="text-[20px] font-bold tracking-[-0.02em] text-white mb-3"
                    style={{ fontFamily: "'Syne', sans-serif" }}
                  >
                    {item.title}
                  </h3>

                  <p className="text-[14px] leading-[1.8] text-zinc-500 font-light">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* FOCUS AREAS */}
          <section className="mb-16">
            <div className="flex items-center gap-4 mb-7">
              <span
                className="text-[11px] uppercase tracking-[0.2em] text-zinc-600 whitespace-nowrap"
                style={{ fontFamily: "'DM Mono', monospace" }}
              >
                Focus areas
              </span>
              <div className="flex-1 h-px bg-white/[0.07]" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/[0.07] border border-white/[0.07] rounded-2xl overflow-hidden">
              {focusAreas.map((area) => (
                <div key={area.title} className="bg-[#09090b] p-7">
                  <span
                    className="inline-flex mb-4 text-[10px] uppercase tracking-[0.14em] text-blue-400 bg-blue-500/10 border border-blue-500/20 rounded px-2 py-[4px]"
                    style={{ fontFamily: "'DM Mono', monospace" }}
                  >
                    {area.label}
                  </span>

                  <h3
                    className="text-[18px] font-bold tracking-[-0.02em] text-white mb-3"
                    style={{ fontFamily: "'Syne', sans-serif" }}
                  >
                    {area.title}
                  </h3>

                  <p className="text-[14px] leading-[1.8] text-zinc-500 font-light">
                    {area.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* CURRENT WORK */}
          <section className="mb-16">
            <div className="flex items-center gap-4 mb-7">
              <span
                className="text-[11px] uppercase tracking-[0.2em] text-zinc-600 whitespace-nowrap"
                style={{ fontFamily: "'DM Mono', monospace" }}
              >
                What I am doing now
              </span>
              <div className="flex-1 h-px bg-white/[0.07]" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/[0.07] border border-white/[0.07] rounded-2xl overflow-hidden">
              {currentWork.map((item) => (
                <div key={item.title} className="bg-[#09090b] p-7">
                  <span
                    className="inline-flex mb-4 text-[10px] uppercase tracking-[0.14em] text-blue-400 bg-blue-500/10 border border-blue-500/20 rounded px-2 py-[4px]"
                    style={{ fontFamily: "'DM Mono', monospace" }}
                  >
                    {item.tag}
                  </span>
                  <h3
                    className="text-[18px] font-bold tracking-[-0.02em] text-white mb-3"
                    style={{ fontFamily: "'Syne', sans-serif" }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-[14px] leading-[1.8] text-zinc-500 font-light">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* STACK */}
          <section className="mb-16">
            <div className="flex items-center gap-4 mb-7">
              <span
                className="text-[11px] uppercase tracking-[0.2em] text-zinc-600 whitespace-nowrap"
                style={{ fontFamily: "'DM Mono', monospace" }}
              >
                Tools and stack
              </span>
              <div className="flex-1 h-px bg-white/[0.07]" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-px bg-white/[0.07] border border-white/[0.07] rounded-2xl overflow-hidden">
              {stackGroups.map((group) => (
                <div key={group.title} className="bg-[#09090b] p-7">
                  <div className="flex items-center justify-between mb-4">
                    <h3
                      className="text-[17px] font-bold tracking-[-0.02em] text-white"
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
                        className="text-[10px] text-zinc-500 bg-zinc-900 border border-white/[0.07] rounded px-2 py-[4px] tracking-[0.05em]"
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
          <section className="mb-16">
            <div className="flex items-center gap-4 mb-7">
              <span
                className="text-[11px] uppercase tracking-[0.2em] text-zinc-600 whitespace-nowrap"
                style={{ fontFamily: "'DM Mono', monospace" }}
              >
                What I am learning now
              </span>
              <div className="flex-1 h-px bg-white/[0.07]" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-px bg-white/[0.07] border border-white/[0.07] rounded-2xl overflow-hidden">
              {learningNow.map((item, index) => (
                <div key={item} className="bg-[#09090b] p-6">
                  <div
                    className="text-[10px] uppercase tracking-[0.12em] text-zinc-600 mb-3"
                    style={{ fontFamily: "'DM Mono', monospace" }}
                  >
                    0{index + 1}
                  </div>
                  <div className="flex items-start gap-3 text-[15px] text-zinc-300 leading-[1.7]">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2.5 flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* OPEN SOURCE */}
          <section className="mb-16">
            <div className="flex items-center gap-4 mb-7">
              <span
                className="text-[11px] uppercase tracking-[0.2em] text-zinc-600 whitespace-nowrap"
                style={{ fontFamily: "'DM Mono', monospace" }}
              >
                Open source
              </span>
              <div className="flex-1 h-px bg-white/[0.07]" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/[0.07] border border-white/[0.07] rounded-2xl overflow-hidden">
              {openSourceItems.map((item) => (
                <div key={item.title} className="bg-[#09090b] p-7">
                  <div
                    className="flex items-center gap-2 mb-4 text-[10px] uppercase tracking-[0.14em] text-blue-400"
                    style={{ fontFamily: "'DM Mono', monospace" }}
                  >
                    <GitBranch size={12} />
                    {item.label}
                  </div>
                  <h3
                    className="text-[20px] font-bold tracking-[-0.02em] text-white mb-3"
                    style={{ fontFamily: "'Syne', sans-serif" }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-[14px] leading-[1.8] text-zinc-500 font-light">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* JOURNEY */}
          <section className="mb-20">
            <div className="flex items-center gap-4 mb-7">
              <span
                className="text-[11px] uppercase tracking-[0.2em] text-zinc-600 whitespace-nowrap"
                style={{ fontFamily: "'DM Mono', monospace" }}
              >
                Journey
              </span>
              <div className="flex-1 h-px bg-white/[0.07]" />
            </div>

            <div className="flex flex-col gap-px bg-white/[0.07] border border-white/[0.07] rounded-2xl overflow-hidden">
              {journey.map((item) => (
                <div
                  key={item.title}
                  className="grid grid-cols-[120px_1fr] md:grid-cols-[170px_1fr] bg-[#09090b] hover:bg-[#111113] transition-colors"
                >
                  <div className="p-6 md:p-7 border-r border-white/[0.07]">
                    <span
                      className="text-[10px] uppercase tracking-[0.14em] text-blue-400"
                      style={{ fontFamily: "'DM Mono', monospace" }}
                    >
                      {item.year}
                    </span>
                  </div>

                  <div className="p-6 md:p-7">
                    <h3
                      className="text-[20px] font-bold tracking-[-0.02em] text-white mb-3"
                      style={{ fontFamily: "'Syne', sans-serif" }}
                    >
                      {item.title}
                    </h3>
                    <p className="text-[14px] leading-[1.8] text-zinc-500 font-light max-w-[760px]">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="grid grid-cols-1 md:grid-cols-[1fr_auto] items-center gap-8 p-10 border border-white/[0.07] rounded-2xl">
            <div>
              <h3
                className="text-[28px] font-bold tracking-[-0.02em] text-white leading-tight"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                Want proof beyond the intro?
                <br />
                <span className="text-zinc-500 font-normal">
                  Look at the projects, systems, and code direction.
                </span>
              </h3>
            </div>

            <div className="flex gap-3 flex-shrink-0 flex-wrap">
              <Link
                href="/projects"
                className="flex items-center gap-2 text-[11px] uppercase tracking-[0.1em] px-5 py-3 rounded-md bg-white text-black hover:bg-zinc-200 transition-colors font-medium"
                style={{ fontFamily: "'DM Mono', monospace" }}
              >
                View projects <ArrowUpRight size={12} />
              </Link>

              <Link
                href="/system"
                className="flex items-center gap-2 text-[11px] uppercase tracking-[0.1em] px-5 py-3 rounded-md border border-white/[0.07] text-zinc-500 hover:text-white hover:border-white/[0.12] hover:bg-white/[0.03] transition-all"
                style={{ fontFamily: "'DM Mono', monospace" }}
              >
                <Server size={12} />
                Systems
              </Link>

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
          </section>
        </div>
      </main>
    </>
  );
}