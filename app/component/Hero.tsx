"use client";

import Image from "next/image";
import Link from "next/link";
import { BsTwitter, BsLinkedin, BsGithub } from "react-icons/bs";
import { SiGmail } from "react-icons/si";
import { motion } from "framer-motion";

export function Hero() {
  const stats = [
    { label: "Projects", value: "10+" },
    { label: "Experience", value: "2+" },
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

  const socials = [BsTwitter, BsLinkedin, BsGithub, SiGmail];

  return (
    <section className="relative max-w-7xl mx-auto -mt-25 px-6 pt-10 md:pt-32 grid md:grid-cols-2 gap-24 items-start">

      {/* Animated Background Glow */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 opacity-20 blur-[120px] pointer-events-none"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      />

      {/* LEFT - Intro & Stats */}
      <div className="flex flex-col gap-8 relative z-10">

        {/* Intro */}
        <div className="space-y-4">
          <p className="text-sm tracking-widest text-zinc-400 uppercase">
            Full-Stack & Backend Engineer
          </p>
<h1 className="text-6xl md:text-7xl font-extrabold text-white leading-tight flex flex-wrap items-center">
  Vishal{" "}
  <span className="relative ml-2">
    {/* Semi-transparent blue background block behind Singh with rotation */}
    <span className="absolute inset-0 bg-blue-500/30 transform rotate-170 -z-10 rounded-lg shadow-lg" />
    <span className="relative px-4 py-1 text-white">
      Singh
    </span>
  </span>
</h1>    <h2 className="text-xl md:text-2xl text-zinc-300 leading-relaxed max-w-4xl">
            I design & build{" "}
            <span className="text-blue-500 font-medium">scalable systems</span>{" "}
            and tackle{" "}
            <span className="text-emerald-400 font-medium">complex backend challenges</span>
          </h2>
        </div>

        {/* Description */}
        <p className="text-zinc-400 text-base md:text-lg leading-relaxed max-w-xl">
          Full-stack engineer focused on distributed systems, backend architecture, and production-grade platforms. I ship high-performance, multi-tenant applications that scale under real-world load.
        </p>

        {/* Stats */}
        <div className="flex gap-12 pt-4">
          {stats.map((item) => (
            <div key={item.label}>
              <p className="text-white text-lg md:text-3xl font-bold">{item.value}</p>
              <p className="text-zinc-500 text-sm md:text-base">{item.label}</p>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex gap-5 pt-6">
          <Link
            href="/projects"
            className="px-8 py-3 rounded-xl bg-blue-600 text-white font-semibold text-sm md:text-base hover:bg-blue-500 transition"
          >
            View Work
          </Link>

          <Link
            href="/resume.pdf"
            className="px-8 py-3 rounded-xl border border-zinc-700 text-zinc-300 font-medium text-sm md:text-base hover:border-zinc-500 hover:text-white transition"
          >
            Download Resume
          </Link>
        </div>

        {/* Socials */}
        <div className="flex items-center gap-6 pt-6 text-zinc-500 text-2xl">
          {socials.map((Icon, i) => (
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

      {/* RIGHT - Profile + Animated Badges */}
      <div className="relative flex flex-col justify-center md:justify-end items-center gap-4">

        {/* Profile Image */}
        <div className="relative w-40 h-40 md:w-48 md:h-48 lg:w-72 lg:h-72 rounded-2xl overflow-hidden border-4 border-zinc-800 shadow-lg">
          <Image
            src="https://avatars.githubusercontent.com/VishalDevx"
            alt="Vishal Singh"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Role Badge */}
        <motion.div
          className="text-center text-gray-300 font-mono text-lg md:text-xl"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          Full-Stack Web Developer | Backend Engineer 
        </motion.div>

        {/* Open-to-Work / Welcome Badge */}
        <motion.div
          className="px-5 py-2 rounded-full bg-blue-600 text-white text-sm md:text-base font-medium shadow-lg mt-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          👋 Welcome to my profile — Open to Work
        </motion.div>
      </div>

      {/* Latest Articles */}
      <div className="col-span-2 -mt-10">
        <h3 className="text-white text-2xl font-semibold mb-8 border-b border-zinc-800 pb-3">
          Latest Articles
        </h3>

        <div className="grid md:grid-cols-2 gap-6">
          {articles.map((post) => (
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