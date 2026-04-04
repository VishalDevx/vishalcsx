"use client";

import Image from "next/image";
import Link from "next/link";
import { BsTwitter, BsLinkedin, BsGithub } from "react-icons/bs";
import { SiGmail } from "react-icons/si";

export function Hero() {
  return (
    <section className="relative max-w-7xl mx-auto pt-5 px-6 grid md:grid-cols-2 gap-20 items-center">

      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-blue-600/10 blur-[140px] pointer-events-none" />

      {/* LEFT - Intro & Stats */}
      <div className="flex flex-col gap-8 relative z-10">

        {/* Intro */}
        <div className="space-y-4">
          <p className="text-xs tracking-[0.3em] text-zinc-500 uppercase">
            Software Engineer
          </p>

          <h1 className="text-6xl md:text-7xl font-semibold text-white leading-tight">
            Vishal Singh
          </h1>

          <h2 className="text-xl md:text-2xl text-zinc-300 leading-relaxed max-w-xl">
            I design & build{" "}
            <span className="text-blue-500 font-medium">scalable systems</span>{" "}
            and solve{" "}
            <span className="text-emerald-400 font-medium">complex backend problems</span>
          </h2>
        </div>

        {/* Description */}
        <p className="text-zinc-400 leading-relaxed text-base md:text-lg max-w-xl">
          Full-stack engineer focused on backend architecture, distributed systems, and production-grade applications. I build multi-tenant platforms, optimize performance, and ship systems that scale under real-world load.
        </p>

        {/* Stats */}
        <div className="flex gap-12 pt-4">
          {[
            { label: "Projects", value: "10+" },
            { label: "Experience", value: "2+" },
            { label: "Open Source", value: "Active" },
          ].map((item) => (
            <div key={item.label}>
              <p className="text-white text-2xl font-semibold">{item.value}</p>
              <p className="text-zinc-500 text-sm">{item.label}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="flex gap-5 pt-6">
          <Link
            href="/projects"
            className="px-7 py-3 rounded-xl bg-blue-600 text-white text-sm font-medium hover:bg-blue-500 transition"
          >
            View Work
          </Link>

          <Link
            href="/resume.pdf"
            className="px-7 py-3 rounded-xl border border-zinc-700 text-sm text-zinc-300 hover:border-zinc-500 hover:text-white transition"
          >
            Resume
          </Link>
        </div>

        {/* Socials */}
        <div className="flex items-center gap-6 pt-6 text-zinc-500 text-xl">
          {[BsTwitter, BsLinkedin, BsGithub, SiGmail].map((Icon, i) => (
            <Link
              key={i}
              href="#"
              className="hover:text-white transition transform hover:-translate-y-1"
            >
              <Icon />
            </Link>
          ))}
        </div>
      </div>

      {/* RIGHT - Profile Image + Hero Badge */}
      <div className="relative max-w-full flex flex-col justify-center md:justify-end items-center gap-6">

        {/* Glow */}
        <div className="absolute w-[500px] h-[500px] bg-indigo-500/20 blur-[140px] rounded-full"></div>

        {/* Profile Image */}
        <div className="relative w-[120px] md:w-[220px] lg:w-[300px] aspect-square">
          <Image
            src="https://avatars.githubusercontent.com/VishalDevx"
            alt="Vishal Singh"
            fill
            className="object-cover rounded-3xl border border-zinc-800 shadow-2xl"
            priority
          />
        </div>

      
      </div>

      {/* ARTICLES */}
      <div className="col-span-2 mt-16">
        <h3 className="text-white text-2xl font-semibold mb-8 border-b pb-3 border-zinc-800">
          Latest Articles
        </h3>

        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              title: "What is Vector Search?",
              desc: "Deep dive into modern AI search systems and embeddings.",
              date: "Apr 2026",
            },
            {
              title: "Context Memory in AI Systems",
              desc: "How memory layers improve LLM-based applications.",
              date: "Mar 2026",
            },
          ].map((post) => (
            <div
              key={post.title}
              className="group border border-zinc-800 p-6 rounded-2xl hover:border-zinc-600 transition bg-zinc-900/40"
            >
              <p className="text-xs text-zinc-500 mb-2">{post.date}</p>
              <h4 className="text-white text-lg font-medium group-hover:text-blue-400 transition">
                {post.title}
              </h4>
              <p className="text-zinc-400 text-sm mt-2">{post.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}