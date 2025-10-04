"use client";

import React from "react";
import { motion } from "framer-motion";

const PROFILE_IMAGE_SRC = "/about.png";

// Timeline Dot Component
const TimelineDot = ({ color }: { color: string }) => (
  <div className={`w-3 h-3 ${color} rounded-full absolute -left-1.5 top-1.5`} />
);

const timelineData = [
  {
    title: "10th & 12th",
    description: "Completed from UP Board.",
    color: "bg-purple-500",
    date: "2019–2021",
  },
  {
    title: "Frontend Development",
    description: "Learned from Akshay Saini course.",
    color: "bg-red-500",
    date: "2022–2023",
  },
  {
    title: "Full Stack Development",
    description: "Learned from Harkirat Singh cohort.",
    color: "bg-blue-500",
    date: "2023–2024",
  },
  {
    title: "DevOps Engineering",
    description: "Also learned from Harkirat Singh cohort.",
    color: "bg-teal-500",
    date: "2024–2025",
  },
  {
    title: "B.Tech Degree",
    description: "Pursued from AKTU.",
    color: "bg-yellow-500",
    date: "2022–Now",
  },
];

export default function AboutSection() {
  return (
    <section
      id="about"
      className="py-20 text-white relative"
      style={{
        background:
          "linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(20,20,20,0.95) 50%, rgba(0,0,0,1) 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col lg:flex-row lg:justify-between lg:items-start gap-20">
        {/* LEFT — Profile Image (hidden on mobile) */}
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
          className="lg:w-1/2 flex justify-center lg:justify-start relative hidden lg:flex"
        >
          <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-lg h-96 sm:h-[500px] lg:h-[600px] flex flex-col items-center">
            {/* Gradient Glow Behind Image */}
            <motion.div
              className="absolute inset-0 rounded-full blur-3xl opacity-30 bg-gradient-to-r from-indigo-500 via-red-500 to-blue-500"
              animate={{
                scale: [1, 1.05, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              style={{
                clipPath: "ellipse(50% 70% at 50% 50%)",
              }}
            />
            {/* Profile Image */}
            <motion.img
              src={PROFILE_IMAGE_SRC}
              alt="Profile"
              className="object-cover w-[85%] h-full rounded-b-3xl relative z-10 shadow-2xl"
              whileHover={{ scale: 1.03, rotate: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 10 }}
            />
          </div>
        </motion.div>

        {/* RIGHT — Timeline Section */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
          className="lg:w-1/2 flex flex-col justify-start items-start space-y-12 p-4"
        >
          <motion.h1
            className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-tight bg-gradient-to-r from-red-500 via-indigo-500 to-blue-500 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            About Me
          </motion.h1>

          {/* Timeline */}
          <ul className="relative space-y-10 w-full ml-4">
            {/* Gradient vertical line */}
            <div
              className="absolute mt-1.5 top-0 bottom-0 w-0.5 rounded"
              style={{
                background:
                  "linear-gradient(to bottom, #a855f7, #f472b6, #3b82f6, #14b8a6, #facc15)",
              }}
            />

            {timelineData.map((item, index) => (
              <motion.li
                key={index}
                className="relative pl-8"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.15,
                  ease: "easeOut",
                }}
                viewport={{ once: true }}
              >
                <TimelineDot color={item.color} />
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-bold text-white mb-1">
                    {item.title}
                  </h3>
                  <span className="text-sm text-gray-400 font-mono mt-1 whitespace-nowrap">
                    {item.date}
                  </span>
                </div>
                <span className="text-gray-400 text-base">{item.description}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
