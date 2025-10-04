"use client";

import Image from "next/image";
import Navbar from "./Navbar";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section
      className="w-full min-h-screen relative overflow-hidden bg-black text-white"
      style={{
        background:
          "linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(15,15,15,0.95) 50%, rgba(0,0,0,1) 100%)",
      }}
    >
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center md:justify-between px-8 md:px-16 mt-16 gap-10">
        {/* LEFT — Text Section */}
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
          className="flex flex-col space-y-6 text-center md:text-left md:w-1/2"
        >
          <motion.h1
            className="text-6xl sm:text-7xl font-extrabold leading-tight bg-gradient-to-r from-red-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            Vishal K.
          </motion.h1>

          <motion.h2
            className="text-2xl sm:text-3xl font-semibold text-gray-300"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Full Stack Developer | Tech Enthusiast | Lifelong Learner
          </motion.h2>

          <motion.p
            className="text-lg sm:text-xl text-gray-400 leading-relaxed max-w-xl"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4 }}
          >
            I’m a passionate developer focused on creating dynamic, scalable, and visually engaging web
            applications with modern technologies.
          </motion.p>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="mt-4"
          >
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-red-500 via-purple-600 to-indigo-700 text-white px-8 py-3 rounded-bl-3xl rounded-tr-3xl font-semibold shadow-[0_0_20px_rgba(147,51,234,0.5)] hover:shadow-[0_0_30px_rgba(147,51,234,0.8)] transition-all duration-300"
            >
              Resume
            </a>
          </motion.div>
        </motion.div>

        {/* RIGHT — Image Section (Hidden on mobile) */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
          className="relative md:flex hidden md:w-1/2 justify-center items-center"
        >
          {/* Animated Glow Behind Image */}
          <motion.div
            className="absolute w-[450px] h-[450px] bg-gradient-to-tr from-purple-600 via-indigo-600 to-pink-500 rounded-full blur-[100px] opacity-40"
            animate={{
              scale: [1, 1.05, 1],
              opacity: [0.4, 0.6, 0.4],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Hero Image */}
          <motion.div
            whileHover={{ scale: 1.03, rotate: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 12 }}
            className="relative z-10"
          >
            <Image
              src="/hero.png"
              alt="Hero Image"
              width={700}
              height={600}
              className="rounded-3xl shadow-2xl"
              priority
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom subtle gradient divider */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent" />
    </section>
  );
}
