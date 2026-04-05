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
  {
    Icon: BsLinkedin,
    href: "https://www.linkedin.com/in/vishal-singh-779054260/",
    label: "LinkedIn",
  },
  { Icon: BsTwitter, href: "https://www.x.com/VishalCsx", label: "Twitter" },
  { Icon: SiGmail, href: "mailto:vishalcsx@gmail.com", label: "Email" },
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
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:wght@300;400;500&family=DM+Sans:wght@300;400;500&display=swap');

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes roleIn {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes roleOut {
          from { opacity: 1; transform: translateY(0); }
          to { opacity: 0; transform: translateY(-6px); }
        }

        .hero-fade { animation: fadeUp 0.6s ease both; }
        .role-in { animation: roleIn 0.3s ease both; }
        .role-out { animation: roleOut 0.3s ease both; }
      `}</style>

      <section
        className="relative overflow-hidden bg-[#09090b]"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        {/* background glow */}
        <div className="pointer-events-none absolute inset-0 z-0">
          <div className="absolute left-[-80px] top-[-60px] h-[260px] w-[260px] rounded-full bg-blue-500/[0.06] blur-[90px] sm:left-[2%] sm:top-[-40px] sm:h-[320px] sm:w-[320px] md:h-[420px] md:w-[420px] md:blur-[120px]" />
          <div className="absolute bottom-[-40px] right-[-40px] h-[240px] w-[240px] rounded-full bg-blue-500/[0.04] blur-[90px] sm:right-[6%] sm:bottom-0 sm:h-[280px] sm:w-[280px] md:h-[340px] md:w-[340px] md:blur-[120px]" />
        </div>

        <div className="relative z-10 mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          {/* top status bar */}
          <div
            className="flex flex-col gap-3 border-b border-white/[0.06] pb-4 pt-6 sm:flex-row sm:items-center sm:justify-between sm:pt-8"
            style={{ fontFamily: "'DM Mono', monospace" }}
          >
            <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-600 sm:text-[11px]">
              vishal.dev
            </span>

            <div className="flex items-center gap-2 self-start sm:self-auto">
              <span className="h-[6px] w-[6px] rounded-full bg-emerald-500" />
              <span className="text-[10px] uppercase tracking-[0.15em] text-zinc-500 sm:text-[11px]">
                Open to work
              </span>
            </div>
          </div>

          {/* main grid */}
          <div className="grid gap-12 pb-14 pt-10 md:pt-14 lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-16 lg:pb-16 lg:pt-20">
            {/* left */}
            <div className="flex min-w-0 flex-col gap-8 sm:gap-9 lg:gap-10">
              {/* mobile profile card */}
              <div
                className="hero-fade lg:hidden"
                style={{ animationDelay: "0.04s" }}
              >
                <div className="overflow-hidden rounded-2xl border border-white/[0.07] bg-[#111113]">
                  <div className="relative aspect-[4/3] w-full sm:aspect-[16/10]">
                    <Image
                      src="https://avatars.githubusercontent.com/VishalDevx"
                      alt="Vishal Singh"
                      fill
                      className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
                      priority
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                      <p
                        className="text-[10px] uppercase tracking-[0.18em] text-zinc-400"
                        style={{ fontFamily: "'DM Mono', monospace" }}
                      >
                        Vishal Singh — Muzaffarnagar, IN
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* role badge */}
              <div
                className="hero-fade"
                style={{ animationDelay: "0.08s" }}
              >
                <div
                  className="inline-flex max-w-full items-center gap-2 rounded-md border border-white/[0.07] px-3 py-2 sm:gap-3"
                  style={{ fontFamily: "'DM Mono', monospace" }}
                >
                  <span className="text-[10px] uppercase tracking-[0.18em] text-zinc-600">
                    Role
                  </span>
                  <span className="h-3 w-px bg-white/[0.1]" />
                  <span
                    key={roleIndex}
                    className={`truncate text-[10px] uppercase tracking-[0.14em] text-blue-400 sm:text-[11px] ${
                      visible ? "role-in" : "role-out"
                    }`}
                  >
                    {ROLES[roleIndex]}
                  </span>
                </div>
              </div>

              {/* name */}
              <div
                className="hero-fade"
                style={{ animationDelay: "0.14s" }}
              >
                <h1
                  className="text-[clamp(40px,15vw,96px)] leading-[0.92] tracking-[-0.05em] text-white"
                  style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800 }}
                >
                  Vishal
                  <br />
                  <span
                    className="text-transparent"
                    style={{
                      WebkitTextStroke: "1.2px rgba(255,255,255,0.22)",
                    }}
                  >
                    Singh
                  </span>
                </h1>
              </div>

              {/* tagline */}
              <div
                className="hero-fade"
                style={{ animationDelay: "0.2s" }}
              >
                <p className="max-w-[620px] text-lg font-light leading-relaxed text-zinc-400 sm:text-xl md:text-2xl">
                  I design &amp; build{" "}
                  <span className="font-normal text-white">scalable systems</span>{" "}
                  and tackle{" "}
                  <span className="font-normal text-blue-400">
                    complex backend challenges
                  </span>
                </p>
              </div>

              {/* description */}
              <div
                className="hero-fade"
                style={{ animationDelay: "0.26s" }}
              >
                <p className="max-w-[560px] text-sm font-light leading-7 text-zinc-600 sm:text-[15px] md:text-base md:leading-8">
                  Full-stack engineer focused on distributed systems, backend
                  architecture, and production-grade platforms. I ship
                  high-performance, multi-tenant applications that scale under
                  real-world load.
                </p>
              </div>

              {/* stats */}
              <div
                className="hero-fade grid w-full max-w-[640px] grid-cols-1 overflow-hidden rounded-xl border border-white/[0.07] sm:grid-cols-3"
                style={{ animationDelay: "0.32s" }}
              >
                {stats.map((s, i) => (
                  <div
                    key={s.label}
                    className={`bg-[#09090b] px-5 py-4 transition-colors hover:bg-[#111113] sm:px-6 md:px-7 ${
                      i < stats.length - 1
                        ? "border-b border-white/[0.07] sm:border-b-0 sm:border-r"
                        : ""
                    }`}
                  >
                    <p
                      className="text-2xl font-bold leading-none text-white sm:text-[28px] md:text-3xl"
                      style={{ fontFamily: "'Syne', sans-serif" }}
                    >
                      {s.value}
                    </p>
                    <p
                      className="mt-1 text-[10px] uppercase tracking-[0.14em] text-zinc-600"
                      style={{ fontFamily: "'DM Mono', monospace" }}
                    >
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>

              {/* ctas */}
              <div
                className="hero-fade flex flex-col gap-3 sm:flex-row sm:flex-wrap"
                style={{ animationDelay: "0.38s" }}
              >
                <Link
                  href="/projects"
                  className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-md bg-white px-5 py-3 text-[11px] font-medium uppercase tracking-[0.1em] text-black transition-colors hover:bg-zinc-200 sm:px-6"
                  style={{ fontFamily: "'DM Mono', monospace" }}
                >
                  View Work <ArrowUpRight size={13} />
                </Link>

                <a
                  href="/cv/Vishal-Resume.pdf"
                  download="Vishal-Singh-Resume.pdf"
                  className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-md border border-white/[0.07] px-5 py-3 text-[11px] uppercase tracking-[0.1em] text-zinc-500 transition-all hover:border-white/[0.14] hover:bg-white/[0.03] hover:text-white sm:px-6"
                  style={{ fontFamily: "'DM Mono', monospace" }}
                >
                  <Download size={12} />
                  Resume
                </a>
              </div>

              {/* socials */}
              <div
                className="hero-fade flex flex-wrap items-center gap-2"
                style={{ animationDelay: "0.44s" }}
              >
                {socials.map(({ Icon, href, label }) => (
                  <Link
                    key={label}
                    href={href}
                    target="_blank"
                    aria-label={label}
                    className="flex h-10 w-10 items-center justify-center rounded-md border border-white/[0.07] text-zinc-600 transition-all hover:border-white/[0.14] hover:bg-white/[0.03] hover:text-white"
                  >
                    <Icon size={15} />
                  </Link>
                ))}
              </div>
            </div>

            {/* right desktop card */}
            <div
              className="hero-fade hidden lg:flex lg:flex-col lg:gap-4"
              style={{ animationDelay: "0.18s" }}
            >
              <div className="overflow-hidden rounded-2xl border border-white/[0.07] bg-[#111113]">
                <div className="relative aspect-square w-full">
                  <Image
                    src="https://avatars.githubusercontent.com/VishalDevx"
                    alt="Vishal Singh"
                    fill
                    className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
                    priority
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                    <p
                      className="text-[10px] uppercase tracking-[0.18em] text-zinc-400"
                      style={{ fontFamily: "'DM Mono', monospace" }}
                    >
                      Vishal Singh — Muzaffarnagar, IN
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-white/[0.07] bg-[#09090b] p-4">
                <p
                  className="mb-3 text-[10px] uppercase tracking-[0.18em] text-zinc-600"
                  style={{ fontFamily: "'DM Mono', monospace" }}
                >
                  Core Stack
                </p>
                <div className="flex flex-wrap gap-[6px]">
                  {[
                    "Next.js",
                    "TypeScript",
                    "Node.js",
                    "PostgreSQL",
                    "Prisma",
                    "Redis",
                    "Rust",
                    "Solana",
                    "Docker",
                  ].map((tech) => (
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

              <div className="flex items-center justify-between rounded-xl border border-white/[0.07] bg-[#09090b] p-4">
                <div>
                  <p
                    className="mb-1 text-[10px] uppercase tracking-[0.18em] text-zinc-600"
                    style={{ fontFamily: "'DM Mono', monospace" }}
                  >
                    Availability
                  </p>
                  <p className="text-sm font-light text-white">
                    Open to full-time &amp; freelance
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
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

          {/* articles */}
          <div className="pb-16 sm:pb-20 lg:pb-24">
            <div className="mb-6 flex flex-col gap-3 sm:mb-8 sm:flex-row sm:items-center sm:gap-4">
              <span
                className="whitespace-nowrap text-[11px] uppercase tracking-[0.2em] text-zinc-600"
                style={{ fontFamily: "'DM Mono', monospace" }}
              >
                Latest Articles
              </span>

              <div className="hidden h-px flex-1 bg-white/[0.06] sm:block" />

              <Link
                href="/blog"
                className="w-fit whitespace-nowrap rounded border border-white/[0.07] px-3 py-[6px] text-[10px] uppercase tracking-[0.1em] text-zinc-600 transition-all hover:border-white/[0.12] hover:text-white"
                style={{ fontFamily: "'DM Mono', monospace" }}
              >
                All Posts <ArrowUpRight size={9} className="ml-1 inline" />
              </Link>
            </div>

            <div className="grid gap-px overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.06] md:grid-cols-2">
              {articles.map((post) => (
                <article
                  key={post.title}
                  className="group cursor-pointer bg-[#09090b] p-5 transition-colors hover:bg-[#111113] sm:p-6 md:p-7"
                >
                  <div className="mb-4 flex items-center justify-between gap-4">
                    <span
                      className="text-[10px] uppercase tracking-[0.15em] text-zinc-600"
                      style={{ fontFamily: "'DM Mono', monospace" }}
                    >
                      {post.date}
                    </span>

                    <ArrowUpRight
                      size={14}
                      className="text-zinc-700 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-blue-400"
                    />
                  </div>

                  <h4
                    className="mb-2 text-[17px] font-bold leading-tight tracking-[-0.01em] text-white transition-colors group-hover:text-blue-400 sm:text-[18px]"
                    style={{ fontFamily: "'Syne', sans-serif" }}
                  >
                    {post.title}
                  </h4>

                  <p className="text-sm font-light leading-relaxed text-zinc-600">
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