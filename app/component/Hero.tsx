"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { BsTwitter, BsLinkedin, BsGithub } from "react-icons/bs";
import { SiGmail } from "react-icons/si";
import { ArrowUpRight, Download } from "lucide-react";

const ROLES = [
  "Full-Stack Engineer",
  "Backend Architect",
  "Systems Builder",
  "Open Source Dev",
];

const stats = [
  { label: "Projects", value: "10+" },
  { label: "Years Exp.", value: "2+" },
  { label: "Open Source", value: "Active" },
];

const articles = [
  {
    title: "What is Vector Search?",
    desc: "Exploring AI search systems, embeddings, and their applications.",
    date: "Apr 2026",
  },
  {
    title: "Context Memory in AI Systems",
    desc: "Improving LLM apps through layered memory architectures.",
    date: "Mar 2026",
  },
];

const socials = [
  { Icon: BsGithub, href: "https://github.com/VishalDevx", label: "GitHub" },
  { Icon: BsLinkedin, href: "#", label: "LinkedIn" },
  { Icon: BsTwitter, href: "#", label: "Twitter" },
  { Icon: SiGmail, href: "mailto:vishal@example.com", label: "Email" },
];

export function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setRoleIndex((i) => (i + 1) % ROLES.length);
        setVisible(true);
      }, 300);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Font import */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:wght@300;400;500&family=DM+Sans:wght@300;400;500&display=swap');
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes roleIn {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes roleOut {
          from { opacity: 1; transform: translateY(0); }
          to   { opacity: 0; transform: translateY(-6px); }
        }
        .hero-fade { animation: fadeUp 0.6s ease both; }
        .role-in  { animation: roleIn  0.3s ease both; }
        .role-out { animation: roleOut 0.3s ease both; }
      `}</style>

      <section
        className="relative min-h-screen bg-[#09090b] overflow-hidden"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        {/* Subtle background glow — static, no animation */}
        <div className="pointer-events-none absolute inset-0 z-0">
          <div className="absolute top-[-80px] left-[5%] w-[480px] h-[480px] rounded-full bg-blue-500/[0.05] blur-[140px]" />
          <div className="absolute bottom-0 right-[10%] w-[360px] h-[360px] rounded-full bg-blue-500/[0.03] blur-[120px]" />
        </div>

        <div className="relative z-10 max-w-[1200px] mx-auto px-8">

          {/* ── TOP NAV STATUS BAR ── */}
          <div
            className="flex items-center justify-between pt-8 pb-0 border-b border-white/[0.06]"
            style={{ fontFamily: "'DM Mono', monospace" }}
          >
            <span className="text-[11px] uppercase tracking-[0.2em] text-zinc-600">
              vishal.dev
            </span>
            <div className="flex items-center gap-2">
              <span className="w-[6px] h-[6px] rounded-full bg-emerald-500" />
              <span className="text-[11px] uppercase tracking-[0.15em] text-zinc-500">
                Open to work
              </span>
            </div>
          </div>

          {/* ── MAIN GRID ── */}
          <div className="grid lg:grid-cols-[1fr_380px] gap-16 pt-20 pb-16 items-start">

            {/* LEFT */}
            <div className="flex flex-col gap-10">

              {/* Role badge */}
              <div
                className="hero-fade"
                style={{ animationDelay: "0.05s" }}
              >
                <div
                  className="inline-flex items-center gap-3 border border-white/[0.07] rounded px-3 py-[6px]"
                  style={{ fontFamily: "'DM Mono', monospace" }}
                >
                  <span className="text-[10px] uppercase tracking-[0.18em] text-zinc-600">
                    Role
                  </span>
                  <span className="w-px h-3 bg-white/[0.1]" />
                  <span
                    key={roleIndex}
                    className={`text-[11px] uppercase tracking-[0.14em] text-blue-400 ${visible ? "role-in" : "role-out"}`}
                  >
                    {ROLES[roleIndex]}
                  </span>
                </div>
              </div>

              {/* Name */}
              <div
                className="hero-fade"
                style={{ animationDelay: "0.12s" }}
              >
                <h1
                  className="text-[clamp(52px,8vw,96px)] font-extrabold leading-[0.9] tracking-[-0.04em] text-white"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  Vishal
                  <br />
                  <span
                    className="text-transparent"
                    style={{ WebkitTextStroke: "1.5px rgba(255,255,255,0.22)" }}
                  >
                    Singh
                  </span>
                </h1>
              </div>

              {/* Tagline */}
              <div
                className="hero-fade"
                style={{ animationDelay: "0.2s" }}
              >
                <p className="text-xl md:text-2xl text-zinc-400 leading-relaxed font-light max-w-[520px]">
                  I design &amp; build{" "}
                  <span className="text-white font-normal">scalable systems</span>{" "}
                  and tackle{" "}
                  <span className="text-blue-400 font-normal">
                    complex backend challenges
                  </span>
                </p>
              </div>

              {/* Description */}
              <div
                className="hero-fade"
                style={{ animationDelay: "0.26s" }}
              >
                <p className="text-sm md:text-base text-zinc-600 leading-[1.8] font-light max-w-[480px]">
                  Full-stack engineer focused on distributed systems, backend
                  architecture, and production-grade platforms. I ship
                  high-performance, multi-tenant applications that scale under
                  real-world load.
                </p>
              </div>

              {/* Stats row */}
              <div
                className="hero-fade flex gap-px border border-white/[0.07] rounded-xl overflow-hidden w-fit"
                style={{ animationDelay: "0.32s" }}
              >
                {stats.map((s, i) => (
                  <div
                    key={s.label}
                    className={`px-7 py-4 bg-[#09090b] hover:bg-[#111113] transition-colors
                      ${i < stats.length - 1 ? "border-r border-white/[0.07]" : ""}`}
                  >
                    <p
                      className="text-2xl md:text-3xl font-bold text-white leading-none"
                      style={{ fontFamily: "'Syne', sans-serif" }}
                    >
                      {s.value}
                    </p>
                    <p
                      className="text-[10px] uppercase tracking-[0.14em] text-zinc-600 mt-1"
                      style={{ fontFamily: "'DM Mono', monospace" }}
                    >
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>

              {/* CTA buttons */}
              <div
                className="hero-fade flex flex-wrap gap-3"
                style={{ animationDelay: "0.38s" }}
              >
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-white text-black text-[11px] uppercase tracking-[0.1em] font-medium hover:bg-zinc-200 transition-colors"
                  style={{ fontFamily: "'DM Mono', monospace" }}
                >
                  View Work <ArrowUpRight size={13} />
                </Link>
     <a
  href="/cv/Vishal-Resume.pdf"
  download="Vishal-Singh-Resume.pdf"
  className="inline-flex items-center gap-2 px-6 py-3 rounded-md border border-white/[0.07] text-zinc-500 text-[11px] uppercase tracking-[0.1em] hover:text-white hover:border-white/[0.14] hover:bg-white/[0.03] transition-all"
>
  <Download size={12} />
  Resume
</a>
              </div>

              {/* Socials */}
              <div
                className="hero-fade flex items-center gap-1"
                style={{ animationDelay: "0.44s" }}
              >
                {socials.map(({ Icon, href, label }) => (
                  <Link
                    key={label}
                    href={href}
                    target="_blank"
                    aria-label={label}
                    className="flex items-center justify-center w-9 h-9 rounded-md border border-white/[0.07] text-zinc-600 hover:text-white hover:border-white/[0.14] hover:bg-white/[0.03] transition-all"
                  >
                    <Icon size={15} />
                  </Link>
                ))}
              </div>
            </div>

            {/* RIGHT — Profile card */}
            <div
              className="hero-fade hidden lg:flex flex-col gap-4"
              style={{ animationDelay: "0.18s" }}
            >
              {/* Image card */}
              <div className="border border-white/[0.07] rounded-2xl overflow-hidden bg-[#111113]">
                <div className="relative w-full aspect-square">
                  <Image
                    src="https://avatars.githubusercontent.com/VishalDevx"
                    alt="Vishal Singh"
                    fill
                    className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
                    priority
                  />
                  {/* Overlay label */}
                  <div
                    className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent"
                  >
                    <p
                      className="text-[10px] uppercase tracking-[0.18em] text-zinc-400"
                      style={{ fontFamily: "'DM Mono', monospace" }}
                    >
                      Vishal Singh — Muzaffarnagar, IN
                    </p>
                  </div>
                </div>
              </div>

              {/* Skill tags */}
              <div className="border border-white/[0.07] rounded-xl p-4 bg-[#09090b]">
                <p
                  className="text-[10px] uppercase tracking-[0.18em] text-zinc-600 mb-3"
                  style={{ fontFamily: "'DM Mono', monospace" }}
                >
                  Core Stack
                </p>
                <div className="flex flex-wrap gap-[6px]">
                  {[
                    "Next.js", "TypeScript", "Node.js",
                    "PostgreSQL", "Prisma", "Redis",
                    "Rust", "Solana", "Docker",
                  ].map((tech) => (
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

              {/* Quick availability */}
              <div
                className="border border-white/[0.07] rounded-xl p-4 bg-[#09090b] flex items-center justify-between"
              >
                <div>
                  <p
                    className="text-[10px] uppercase tracking-[0.18em] text-zinc-600 mb-1"
                    style={{ fontFamily: "'DM Mono', monospace" }}
                  >
                    Availability
                  </p>
                  <p className="text-sm text-white font-light">
                    Open to full-time &amp; freelance
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span
                    className="text-[10px] uppercase tracking-[0.12em] text-emerald-600"
                    style={{ fontFamily: "'DM Mono', monospace" }}
                  >
                    Now
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ── ARTICLES SECTION ── */}
          <div className="pb-24">
            <div className="flex items-center gap-4 mb-8">
              <span
                className="text-[11px] uppercase tracking-[0.2em] text-zinc-600 whitespace-nowrap"
                style={{ fontFamily: "'DM Mono', monospace" }}
              >
                Latest Articles
              </span>
              <div className="flex-1 h-px bg-white/[0.06]" />
              <Link
                href="/blog"
                className="text-[10px] uppercase tracking-[0.1em] text-zinc-600 border border-white/[0.07] rounded px-3 py-[5px] hover:text-white hover:border-white/[0.12] transition-all whitespace-nowrap"
                style={{ fontFamily: "'DM Mono', monospace" }}
              >
                All Posts <ArrowUpRight size={9} className="inline ml-1" />
              </Link>
            </div>

            <div className="grid md:grid-cols-2 gap-px bg-white/[0.06] border border-white/[0.06] rounded-xl overflow-hidden">
              {articles.map((post, i) => (
                <article
                  key={post.title}
                  className={`bg-[#09090b] hover:bg-[#111113] transition-colors p-7 cursor-pointer group
                    ${i === 0 ? "border-r border-white/[0.06]" : ""}`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className="text-[10px] uppercase tracking-[0.15em] text-zinc-600"
                      style={{ fontFamily: "'DM Mono', monospace" }}
                    >
                      {post.date}
                    </span>
                    <ArrowUpRight
                      size={14}
                      className="text-zinc-700 group-hover:text-blue-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                    />
                  </div>
                  <h4
                    className="text-[18px] font-bold text-white leading-tight mb-2 tracking-[-0.01em] group-hover:text-blue-400 transition-colors"
                    style={{ fontFamily: "'Syne', sans-serif" }}
                  >
                    {post.title}
                  </h4>
                  <p className="text-sm text-zinc-600 leading-relaxed font-light">
                    {post.desc}
                  </p>
                </article>
              ))}
            </div>
          </div>

        </div>
      </section>
    </>
  );
}