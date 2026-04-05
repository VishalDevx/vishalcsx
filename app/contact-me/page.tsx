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
      {/* Fonts */}
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

        <div className="relative z-10 max-w-[1100px] mx-auto px-8 pb-24">

          {/* HEADER */}
          <header className="pt-20 pb-16 border-b border-white/[0.07] mb-16">
            <div
              className="flex items-center gap-3 mb-5 text-[11px] uppercase tracking-[0.2em] text-zinc-500"
              style={{ fontFamily: "'DM Mono', monospace" }}
            >
              <span className="w-6 h-px bg-zinc-700 block" />
              Contact
            </div>

            <h1
              className="text-[clamp(48px,7vw,80px)] font-extrabold leading-[0.95] tracking-[-0.03em]"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Let’s build
              <br />
              <span className="text-transparent"
                style={{ WebkitTextStroke: "1px rgba(255,255,255,0.28)" }}
              >
                something real
              </span>
            </h1>

            <p className="mt-6 text-base text-zinc-500 max-w-[520px] leading-[1.8]">
              I’m open to serious work — backend-heavy systems, full-stack products,
              or anything that involves real engineering challenges.
              If it’s just a quick clone project or low-quality work, I’m not interested.
            </p>
          </header>

          {/* MAIN GRID */}
          <section className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-12">

            {/* LEFT — FORM */}
            <div className="border border-white/[0.07] rounded-2xl p-8 bg-white/[0.02]">
              <div
                className="text-[10px] uppercase tracking-[0.16em] text-zinc-600 mb-6"
                style={{ fontFamily: "'DM Mono', monospace" }}
              >
                Send a message
              </div>

              <form className="flex flex-col gap-6">

                {/* Name */}
                <div>
                  <label className="text-xs text-zinc-500 mb-2 block">
                    Name
                  </label>
                  <input
                    type="text"
                    placeholder="Your name"
                    value={form.name}
                    onChange={(e) =>
                      setForm({ ...form, name: e.target.value })
                    }
                    className="w-full bg-[#0d0d10] border border-white/[0.07] rounded-md px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500/40"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="text-xs text-zinc-500 mb-2 block">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    className="w-full bg-[#0d0d10] border border-white/[0.07] rounded-md px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500/40"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="text-xs text-zinc-500 mb-2 block">
                    Message
                  </label>
                  <textarea
                    rows={5}
                    placeholder="What are you building? What do you need?"
                    value={form.message}
                    onChange={(e) =>
                      setForm({ ...form, message: e.target.value })
                    }
                    className="w-full bg-[#0d0d10] border border-white/[0.07] rounded-md px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500/40 resize-none"
                  />
                </div>

                {/* Button */}
                <button
                  type="submit"
                  className="mt-4 flex items-center justify-center gap-2 text-[11px] uppercase tracking-[0.1em] px-5 py-3 rounded-md bg-white text-black hover:bg-zinc-200 transition-colors font-medium"
                  style={{ fontFamily: "'DM Mono', monospace" }}
                >
                  Send Message <ArrowUpRight size={12} />
                </button>
              </form>
            </div>

            {/* RIGHT — DIRECT CONTACT */}
            <div className="flex flex-col gap-6">

              <div className="border border-white/[0.07] rounded-2xl p-6 bg-[#0d0d10]">
                <div className="text-[10px] uppercase tracking-[0.16em] text-zinc-600 mb-3">
                  Direct Contact
                </div>

                <div className="flex flex-col gap-4">

                  <a
                    href="mailto:vishal@example.com"
                    className="flex items-center justify-between border border-white/[0.07] rounded-md px-4 py-3 hover:border-white/[0.12] hover:bg-white/[0.03]"
                  >
                    <div className="flex items-center gap-3 text-sm text-zinc-400">
                      <Mail size={16} /> Email
                    </div>
                    <ArrowUpRight size={14} className="text-zinc-500" />
                  </a>

                  <Link
                    href="https://github.com/VishalDevx"
                    target="_blank"
                    className="flex items-center justify-between border border-white/[0.07] rounded-md px-4 py-3 hover:border-white/[0.12] hover:bg-white/[0.03]"
                  >
                    <div className="flex items-center gap-3 text-sm text-zinc-400">
                      <Github size={16} /> GitHub
                    </div>
                    <ArrowUpRight size={14} className="text-zinc-500" />
                  </Link>

                  <Link
                    href="https://linkedin.com"
                    target="_blank"
                    className="flex items-center justify-between border border-white/[0.07] rounded-md px-4 py-3 hover:border-white/[0.12] hover:bg-white/[0.03]"
                  >
                    <div className="flex items-center gap-3 text-sm text-zinc-400">
                      <Linkedin size={16} /> LinkedIn
                    </div>
                    <ArrowUpRight size={14} className="text-zinc-500" />
                  </Link>

                </div>
              </div>

              {/* Availability */}
              <div className="border border-white/[0.07] rounded-2xl p-6">
                <div className="text-[10px] uppercase tracking-[0.16em] text-zinc-600 mb-3">
                  Availability
                </div>

                <p className="text-sm text-zinc-500 leading-relaxed">
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