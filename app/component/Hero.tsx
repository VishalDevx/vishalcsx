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
  { title: "What is Vector Search?", desc: "Exploring AI search systems, embeddings, and their applications.", date: "Apr 2026" },
  { title: "Context Memory in AI Systems", desc: "Improving LLM apps through layered memory architectures.", date: "Mar 2026" },
];

const socials = [
  { Icon: BsGithub, href: "https://github.com/VishalDevx", label: "GitHub" },
  { Icon: BsLinkedin, href: "https://www.linkedin.com/in/vishal-singh-779054260/", label: "LinkedIn" },
  { Icon: BsTwitter, href: "https://www.x.com/VishalCsx", label: "Twitter" },
  { Icon: SiGmail, href: "mailto:vishalcsx@gmail.com", label: "Email" },
];

const mono = { fontFamily: "'JetBrains Mono', monospace" };
const heading = { fontFamily: "'Space Grotesk', sans-serif" };

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

      <section style={{ fontFamily: "'Space Grotesk', sans-serif", backgroundColor: "var(--bg-primary)", color: "var(--text-primary)", transition: "background-color 0.3s ease, color 0.3s ease" }} className="relative overflow-hidden pt-14">
        <div className="pointer-events-none absolute inset-0 z-0">
          <div className="absolute left-[-80px] top-[-60px] h-[260px] w-[260px] rounded-full blur-[90px] sm:left-[2%] sm:top-[-40px] sm:h-[320px] sm:w-[320px] md:h-[420px] md:w-[420px] md:blur-[120px]" style={{ background: "var(--glow)" }} />
          <div className="absolute bottom-[-40px] right-[-40px] h-[240px] w-[240px] rounded-full blur-[90px] sm:right-[6%] sm:bottom-0 sm:h-[280px] sm:w-[280px] md:h-[340px] md:w-[340px] md:blur-[120px]" style={{ background: "var(--glow)" }} />
        </div>

        <div className="relative z-10 mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-3 border-b py-4 sm:flex-row sm:items-center sm:justify-between sm:py-6" style={{ borderColor: "var(--border-subtle)" }}>
            <span style={{ fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--text-muted)", ...mono }}>vishal.dev</span>
            <div className="flex items-center gap-2 self-start sm:self-auto">
              <span className="h-[6px] w-[6px] rounded-full bg-emerald-500" />
              <span style={{ fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--text-secondary)", ...mono }}>Open to work</span>
            </div>
          </div>

          <div className="grid gap-10 pb-14 pt-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-14 lg:pb-16 lg:pt-10">
            <div className="flex min-w-0 flex-col gap-6 sm:gap-7 lg:gap-8">
              <div className="hero-fade lg:hidden" style={{ animationDelay: "0.04s" }}>
                <div className="overflow-hidden rounded-2xl border" style={{ borderColor: "var(--card-border)", backgroundColor: "var(--bg-secondary)" }}>
                  <div className="relative aspect-[4/3] w-full sm:aspect-[16/10]">
                    <Image src="https://avatars.githubusercontent.com/VishalDevx" alt="Vishal Singh" fill className="object-cover grayscale transition-all duration-500 hover:grayscale-0" priority />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                      <p style={{ fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(161,161,170,0.8)", ...mono }}>Vishal Singh — Muzaffarnagar, IN</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="hero-fade" style={{ animationDelay: "0.08s" }}>
                <div className="inline-flex max-w-full items-center gap-2 rounded-md border px-3 py-2 sm:gap-3" style={{ borderColor: "var(--border-color)", ...mono }}>
                  <span style={{ fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--text-muted)" }}>Role</span>
                  <span className="h-3 w-px" style={{ backgroundColor: "var(--border-color)" }} />
                  <span key={roleIndex} className={`truncate text-[10px] uppercase tracking-[0.14em] sm:text-[11px] ${visible ? "role-in" : "role-out"}`} style={{ color: "var(--accent-text)" }}>
                    {ROLES[roleIndex]}
                  </span>
                </div>
              </div>

              <div className="hero-fade" style={{ animationDelay: "0.14s" }}>
                <h1 className="text-[clamp(40px,15vw,96px)] leading-[0.92] tracking-[-0.05em]" style={{ ...heading, fontWeight: 800, color: "var(--text-primary)" }}>
                  Vishal<br />
                  <span className="text-transparent" style={{ WebkitTextStroke: "1.2px var(--stroke)" }}>Singh</span>
                </h1>
              </div>

              <div className="hero-fade" style={{ animationDelay: "0.2s" }}>
                <p className="max-w-[620px] text-lg font-light leading-relaxed sm:text-xl md:text-2xl" style={{ color: "var(--text-secondary)" }}>
                  I design &amp; build{" "}
                  <span className="font-normal" style={{ color: "var(--text-primary)" }}>scalable systems</span>{" "}
                  and tackle{" "}
                  <span className="font-normal" style={{ color: "var(--accent)" }}>complex backend challenges</span>
                </p>
              </div>

              <div className="hero-fade" style={{ animationDelay: "0.26s" }}>
                <p className="max-w-[560px] text-sm font-light leading-7 sm:text-[15px] md:text-base md:leading-8" style={{ color: "var(--text-muted)" }}>
                  Full-stack engineer focused on distributed systems, backend architecture, and production-grade platforms. I ship high-performance, multi-tenant applications that scale under real-world load.
                </p>
              </div>

              <div className="hero-fade grid w-full max-w-[640px] grid-cols-1 overflow-hidden rounded-xl border sm:grid-cols-3" style={{ borderColor: "var(--card-border)", animationDelay: "0.32s" }}>
                {stats.map((s, i) => (
                  <div key={s.label} className={`px-5 py-4 transition-colors hover:bg-[var(--card-hover)] sm:px-6 md:px-7 ${i < stats.length - 1 ? "border-b sm:border-b-0 sm:border-r" : ""}`} style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--card-border)" }}>
                    <p className="text-2xl font-bold leading-none sm:text-[28px] md:text-3xl" style={{ ...heading, color: "var(--text-primary)" }}>{s.value}</p>
                    <p className="mt-1 text-[10px] uppercase tracking-[0.14em]" style={{ ...mono, color: "var(--text-muted)" }}>{s.label}</p>
                  </div>
                ))}
              </div>

              <div className="hero-fade flex flex-col gap-3 sm:flex-row sm:flex-wrap" style={{ animationDelay: "0.38s" }}>
                <Link href="/projects" className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-md px-5 py-3 text-[11px] font-medium uppercase tracking-[0.1em] transition-colors hover:opacity-90 sm:px-6" style={{ backgroundColor: "var(--btn-bg)", color: "var(--btn-text)", ...mono }}>
                  View Work <ArrowUpRight size={13} />
                </Link>
                <a href="/cv/Vishal-Resume.pdf" download="Vishal-Singh-Resume.pdf" className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-md border px-5 py-3 text-[11px] uppercase tracking-[0.1em] transition-all hover:text-[var(--text-primary)] sm:px-6" style={{ borderColor: "var(--border-color)", color: "var(--text-secondary)", backgroundColor: "transparent", ...mono }}>
                  <Download size={12} /> Resume
                </a>
              </div>

              <div className="hero-fade flex flex-wrap items-center gap-2" style={{ animationDelay: "0.44s" }}>
                {socials.map(({ Icon, href, label }) => (
                  <Link key={label} href={href} target="_blank" aria-label={label} className="flex h-10 w-10 items-center justify-center rounded-md border transition-all hover:text-[var(--text-primary)]" style={{ borderColor: "var(--border-color)", color: "var(--icon-color)" }}>
                    <Icon size={15} />
                  </Link>
                ))}
              </div>
            </div>

            <div className="hero-fade hidden flex-col gap-4 lg:flex" style={{ animationDelay: "0.18s" }}>
              <div className="overflow-hidden rounded-2xl border" style={{ borderColor: "var(--card-border)", backgroundColor: "var(--bg-secondary)" }}>
                <div className="relative aspect-square w-full">
                  <Image src="https://avatars.githubusercontent.com/VishalDevx" alt="Vishal Singh" fill className="object-cover grayscale transition-all duration-500 hover:grayscale-0" priority />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                    <p style={{ fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(161,161,170,0.8)", ...mono }}>Vishal Singh — Muzaffarnagar, IN</p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border p-4" style={{ borderColor: "var(--card-border)", backgroundColor: "var(--card-bg)" }}>
                <p className="mb-3 text-[10px] uppercase tracking-[0.18em]" style={{ ...mono, color: "var(--text-muted)" }}>Core Stack</p>
                <div className="flex flex-wrap gap-[6px]">
                  {["Next.js", "TypeScript", "Node.js", "PostgreSQL", "Prisma", "Redis", "React", "Docker"].map((tech) => (
                    <span key={tech} className="rounded border px-2 py-[3px] text-[10px] tracking-[0.05em]" style={{ borderColor: "var(--border-color)", backgroundColor: "var(--bg-secondary)", color: "var(--text-secondary)", ...mono }}>{tech}</span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between rounded-xl border p-4" style={{ borderColor: "var(--card-border)", backgroundColor: "var(--card-bg)" }}>
                <div>
                  <p className="mb-1 text-[10px] uppercase tracking-[0.18em]" style={{ ...mono, color: "var(--text-muted)" }}>Availability</p>
                  <p className="text-sm font-light" style={{ color: "var(--text-primary)" }}>Open to full-time &amp; freelance</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  <span className="text-[10px] uppercase tracking-[0.12em] text-emerald-600" style={{ ...mono }}>Now</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pb-16 sm:pb-20 lg:pb-24">
            <div className="mb-6 flex flex-col gap-3 sm:mb-8 sm:flex-row sm:items-center sm:gap-4">
              <span className="whitespace-nowrap text-[11px] uppercase tracking-[0.2em]" style={{ ...mono, color: "var(--text-muted)" }}>Latest Articles</span>
              <div className="hidden h-px flex-1 sm:block" style={{ backgroundColor: "var(--divider-line)" }} />
              <Link href="/blog" className="w-fit whitespace-nowrap rounded border px-3 py-[6px] text-[10px] uppercase tracking-[0.1em] transition-all hover:text-[var(--text-primary)]" style={{ borderColor: "var(--border-color)", color: "var(--text-secondary)", ...mono }}>
                All Posts <ArrowUpRight size={9} className="ml-1 inline" />
              </Link>
            </div>

            <div className="grid gap-px overflow-hidden rounded-xl border md:grid-cols-2" style={{ borderColor: "var(--card-border)", backgroundColor: "var(--card-border)" }}>
              {articles.map((post) => (
                <article key={post.title} className="group cursor-pointer p-5 transition-colors hover:bg-[var(--card-hover)] sm:p-6 md:p-7" style={{ backgroundColor: "var(--card-bg)" }}>
                  <div className="mb-4 flex items-center justify-between gap-4">
                    <span className="text-[10px] uppercase tracking-[0.15em]" style={{ ...mono, color: "var(--text-muted)" }}>{post.date}</span>
                    <ArrowUpRight size={14} className="transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5" style={{ color: "var(--arrow-color)" }} />
                  </div>
                  <h4 className="mb-2 text-[17px] font-bold leading-tight tracking-[-0.01em] transition-colors group-hover:text-[var(--accent)] sm:text-[18px]" style={{ ...heading, color: "var(--text-primary)" }}>{post.title}</h4>
                  <p className="text-sm font-light leading-relaxed" style={{ color: "var(--text-muted)" }}>{post.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
