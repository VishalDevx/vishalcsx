"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FaGithub } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

// Unique, lesser-known projects
const projects = [
  {
    title: "Nebula Notes",
    date: "July 2024",
    category: ["Productivity", "Web App"],
    description:
      "A minimal note-taking web app that uses AI to summarize your notes, highlight key points, and create daily learning schedules.",
    tech: "Technologies: Next.js, Tailwind CSS, OpenAI API",
    image:
      "https://api.microlink.io/?url=https://nebulanotes.io&screenshot=true&meta=false&embed=screenshot.url",
    live: "https://nebulanotes.io",
    github: "https://github.com/vishaldevsx/nebula-notes",
  },
  {
    title: "PixelTrail",
    date: "October 2024",
    category: ["Art", "Community"],
    description:
      "A platform for digital artists to showcase pixel art, collaborate on challenges, and earn badges for creativity.",
    tech: "Technologies: React, Firebase, Tailwind CSS",
    image:
      "https://api.microlink.io/?url=https://pixeltrail.art&screenshot=true&meta=false&embed=screenshot.url",
    live: "https://pixeltrail.art",
    github: "https://github.com/vishaldevsx/pixeltrail",
  },
  {
    title: "EcoQuest",
    date: "December 2024",
    category: ["Gaming", "Environmental"],
    description:
      "A web-based game that educates players about climate change, renewable energy, and sustainability through interactive quests and rewards.",
    tech: "Technologies: Phaser.js, Next.js, Tailwind CSS",
    image:
      "https://api.microlink.io/?url=https://ecoquest.world&screenshot=true&meta=false&embed=screenshot.url",
    live: "https://ecoquest.world",
    github: "https://github.com/vishaldevsx/ecoquest",
  },
  {
    title: "MindGarden",
    date: "March 2025",
    category: ["Health", "AI"],
    description:
      "An AI-powered journaling and mental wellness app that suggests mindfulness exercises based on your mood entries.",
    tech: "Technologies: Next.js, Supabase, OpenAI API, Tailwind CSS",
    image:
      "https://api.microlink.io/?url=https://mindgarden.app&screenshot=true&meta=false&embed=screenshot.url",
    live: "https://mindgarden.app",
    github: "https://github.com/vishaldevsx/mindgarden",
  },
];

export default function Project() {
  const [page, setPage] = useState(0);
  const projectsPerPage = 3;
  const totalPages = Math.ceil(projects.length / projectsPerPage);
  const start = page * projectsPerPage;
  const visibleProjects = projects.slice(start, start + projectsPerPage);

  return (
    <section
      className="relative py-24 px-6 sm:px-12 lg:px-24 text-white overflow-hidden"
      style={{
        background:
          "radial-gradient(circle at top left, #0b0015, #0b0018 50%, #000 100%)",
      }}
    >
      <div className="text-center mb-16">
        <h2 className="text-5xl sm:text-6xl font-extrabold bg-gradient-to-r from-red-500 via-blue-500 to-indigo-500 bg-clip-text text-transparent drop-shadow-md">
          My Projects
        </h2>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={page}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-24"
        >
          {visibleProjects.map((p, index) => (
            <div
              key={p.title}
              className={`flex flex-col md:flex-row items-center justify-between gap-10 ${
                index % 2 === 1 ? "md:flex-row-reverse" : ""
              }`}
            >
              <div className="flex-1 max-w-xl space-y-4">
                <div className="flex flex-wrap gap-2">
                  {p.category.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-gradient-to-r from-blue-500 to-indigo-500 px-3 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="text-4xl font-bold">{p.title}</h3>
                <p className="text-sm text-gray-400">{p.date}</p>
                <p className="text-gray-300 leading-relaxed">{p.description}</p>
                <p className="text-gray-400 text-sm">{p.tech}</p>

                <div className="flex gap-4 mt-6">
                  <a
                    href={p.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-red-500 via-blue-500 to-indigo-600 hover:opacity-90 hover:scale-105 transition-all duration-300 font-semibold shadow-md shadow-indigo-800/40"
                  >
                    <FiExternalLink className="text-lg" /> Live Website
                  </a>
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-2 rounded-full border border-gray-500 hover:bg-gray-800/40 transition-all duration-300 font-semibold"
                  >
                    <FaGithub className="text-lg" /> GitHub
                  </a>
                </div>
              </div>

              <div className="flex-1 relative group">
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-red-600 via-blue-600 to-indigo-600 opacity-25 blur-2xl group-hover:opacity-50 transition-opacity duration-500"></div>
                <Image
                  src={p.image}
                  alt={p.title}
                  width={600}
                  height={400}
                  unoptimized
                  className="relative rounded-3xl w-full shadow-2xl border border-white/10 transition-transform duration-700 transform group-hover:scale-105"
                />
              </div>
            </div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Pagination */}
      <div className="flex justify-center mt-16 gap-6 items-center">
        <button
          disabled={page === 0}
          onClick={() => setPage(page - 1)}
          className={`px-5 py-2 rounded-full font-semibold border border-gray-600 transition-all duration-300 ${
            page === 0
              ? "opacity-30 cursor-not-allowed"
              : "hover:bg-gradient-to-r from-blue-500 to-indigo-600 hover:text-white"
          }`}
        >
          ← Prev
        </button>

        <div className="flex items-center gap-2">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                page === i
                  ? "bg-gradient-to-r from-red-500 via-blue-500 to-indigo-500 scale-125"
                  : "bg-gray-600 hover:scale-110"
              }`}
            />
          ))}
        </div>

        <button
          disabled={page === totalPages - 1}
          onClick={() => setPage(page + 1)}
          className={`px-5 py-2 rounded-full font-semibold border border-gray-600 transition-all duration-300 ${
            page === totalPages - 1
              ? "opacity-30 cursor-not-allowed"
              : "hover:bg-gradient-to-r from-red-500 via-blue-500 to-indigo-600 hover:text-white"
          }`}
        >
          Next →
        </button>
      </div>
    </section>
  );
}
