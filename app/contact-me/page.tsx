"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight, Github, Mail, Linkedin } from "lucide-react";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

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

        <div className="relative z-10 mx-auto max-w-[1100px] px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20 lg:pb-24">
          {/* HEADER */}
          <header className="mb-10 border-b border-white/[0.07] pb-10 pt-24 sm:mb-12 sm:pb-12 sm:pt-28 lg:mb-16 lg:pb-16 lg:pt-20">
            <div
              className="mb-4 flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-zinc-500 sm:mb-5 sm:text-[11px]"
              style={{ fontFamily: "'DM Mono', monospace" }}
            >
              <span className="block h-px w-5 bg-zinc-700 sm:w-6" />
              Contact
            </div>

            <h1
              className="text-[clamp(34px,10vw,80px)] font-extrabold leading-[0.95] tracking-[-0.03em]"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Let’s build
              <br />
              <span
                className="text-transparent"
                style={{ WebkitTextStroke: "1px rgba(255,255,255,0.28)" }}
              >
                something real
              </span>
            </h1>

            <p className="mt-5 max-w-[520px] text-sm leading-7 text-zinc-500 sm:mt-6 sm:text-[15px] sm:leading-[1.8] md:text-base">
              I’m open to serious work — backend-heavy systems, full-stack products,
              or anything that involves real engineering challenges. If it’s just a
              quick clone project or low-quality work, I’m not interested.
            </p>
          </header>

          {/* MAIN GRID */}
          <section className="grid grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:gap-12">
            {/* LEFT — FORM */}
            <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5 sm:p-6 md:p-8">
              <div
                className="mb-5 text-[10px] uppercase tracking-[0.16em] text-zinc-600 sm:mb-6"
                style={{ fontFamily: "'DM Mono', monospace" }}
              >
                Send a message
              </div>

              <form className="flex flex-col gap-5 sm:gap-6">
                <div>
                  <label className="mb-2 block text-xs text-zinc-500">
                    Name
                  </label>
                  <input
                    type="text"
                    placeholder="Your name"
                    value={form.name}
                    onChange={(e) =>
                      setForm({ ...form, name: e.target.value })
                    }
                    className="w-full rounded-md border border-white/[0.07] bg-[#0d0d10] px-4 py-3 text-sm text-white focus:border-blue-500/40 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs text-zinc-500">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    className="w-full rounded-md border border-white/[0.07] bg-[#0d0d10] px-4 py-3 text-sm text-white focus:border-blue-500/40 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs text-zinc-500">
                    Message
                  </label>
                  <textarea
                    rows={5}
                    placeholder="What are you building? What do you need?"
                    value={form.message}
                    onChange={(e) =>
                      setForm({ ...form, message: e.target.value })
                    }
                    className="w-full resize-none rounded-md border border-white/[0.07] bg-[#0d0d10] px-4 py-3 text-sm text-white focus:border-blue-500/40 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-md bg-white px-5 py-3 text-[11px] font-medium uppercase tracking-[0.1em] text-black transition-colors hover:bg-zinc-200 sm:mt-4 sm:w-auto sm:self-start"
                  style={{ fontFamily: "'DM Mono', monospace" }}
                >
                  Send Message <ArrowUpRight size={12} />
                </button>
              </form>
            </div>

            {/* RIGHT — DIRECT CONTACT */}
            <div className="flex flex-col gap-6">
              <div className="rounded-2xl border border-white/[0.07] bg-[#0d0d10] p-5 sm:p-6">
                <div
                  className="mb-3 text-[10px] uppercase tracking-[0.16em] text-zinc-600"
                  style={{ fontFamily: "'DM Mono', monospace" }}
                >
                  Direct Contact
                </div>

                <div className="flex flex-col gap-3 sm:gap-4">
                  <a
                    href="mailto:vishal@example.com"
                    className="flex items-center justify-between gap-3 rounded-md border border-white/[0.07] px-4 py-3 transition-all hover:border-white/[0.12] hover:bg-white/[0.03]"
                  >
                    <div className="flex min-w-0 items-center gap-3 text-sm text-zinc-400">
                      <Mail size={16} className="shrink-0" />
                      <span className="truncate">Email</span>
                    </div>
                    <ArrowUpRight size={14} className="shrink-0 text-zinc-500" />
                  </a>

                  <Link
                    href="https://github.com/VishalDevx"
                    target="_blank"
                    className="flex items-center justify-between gap-3 rounded-md border border-white/[0.07] px-4 py-3 transition-all hover:border-white/[0.12] hover:bg-white/[0.03]"
                  >
                    <div className="flex min-w-0 items-center gap-3 text-sm text-zinc-400">
                      <Github size={16} className="shrink-0" />
                      <span className="truncate">GitHub</span>
                    </div>
                    <ArrowUpRight size={14} className="shrink-0 text-zinc-500" />
                  </Link>

                  <Link
                    href="https://linkedin.com"
                    target="_blank"
                    className="flex items-center justify-between gap-3 rounded-md border border-white/[0.07] px-4 py-3 transition-all hover:border-white/[0.12] hover:bg-white/[0.03]"
                  >
                    <div className="flex min-w-0 items-center gap-3 text-sm text-zinc-400">
                      <Linkedin size={16} className="shrink-0" />
                      <span className="truncate">LinkedIn</span>
                    </div>
                    <ArrowUpRight size={14} className="shrink-0 text-zinc-500" />
                  </Link>
                </div>
              </div>

              {/* Availability */}
              <div className="rounded-2xl border border-white/[0.07] p-5 sm:p-6">
                <div
                  className="mb-3 text-[10px] uppercase tracking-[0.16em] text-zinc-600"
                  style={{ fontFamily: "'DM Mono', monospace" }}
                >
                  Availability
                </div>

                <p className="text-sm leading-relaxed text-zinc-500">
                  Currently open to:
                </p>

                <ul className="mt-4 flex flex-col gap-3 text-sm text-zinc-400">
                  <li>• Backend / API engineering work</li>
                  <li>• Full-stack product development</li>
                  <li>• System design & architecture discussions</li>
                  <li>• Open source collaboration</li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}