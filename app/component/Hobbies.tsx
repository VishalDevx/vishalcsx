"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const hobbies = [
  {
    title: "Coding",
    description:
      "Exploring new technologies, building side projects, and contributing to open-source.",
    image: "/coding.png",
  },
  {
    title: "Gaming",
    description:
      "I love strategy and simulation games that challenge my creativity and decision-making.",
    image: "/gaming.png",
  },
  {
    title: "Photography",
    description:
      "Capturing nature, architecture, and candid moments through my lens is my creative escape.",
    image: "/photography.png",
  },
  {
    title: "Music",
    description:
      "Listening to ambient, synthwave, and lo-fi music while coding or relaxing.",
    image: "/music.png",
  },
  {
    title: "Reading",
    description:
      "Reading about AI, startups, and biographies of great innovators to stay inspired.",
    image: "/reading.png",
  },
];

export default function Hobbies() {
  return (
    <section className="min-h-screen bg-black text-white py-20 px-6 md:px-20">
      {/* Header */}
      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center text-5xl font-extrabold bg-gradient-to-r from-red-500 via-purple-600 to-indigo-600 bg-clip-text text-transparent"
      >
        My Hobbies
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 1 }}
        className="text-center text-lg text-gray-400 mt-3 mb-12 max-w-3xl mx-auto"
      >
        A glimpse into what keeps me inspired, creative, and constantly learning.
      </motion.p>

      {/* Hobbies Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {hobbies.map((hobby, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: index * 0.15 }}
            viewport={{ once: true }}
            className="relative group bg-gradient-to-b from-gray-900/60 to-gray-800/40 p-6 rounded-3xl shadow-lg hover:shadow-[0_0_30px_rgba(147,51,234,0.5)] transition-all duration-500 overflow-hidden"
          >
            {/* Glow Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-red-600 via-purple-600 to-indigo-700 opacity-0 group-hover:opacity-20 blur-3xl transition-all duration-700"></div>

            {/* Hobby Image */}
            <div className="flex justify-center mb-6">
              <motion.div whileHover={{ scale: 1.1 }} transition={{ type: "spring", stiffness: 150 }}>
                <Image
                  src={hobby.image}
                  alt={hobby.title}
                  width={150}
                  height={150}
                  className="rounded-full object-cover border-2 border-purple-600 shadow-[0_0_15px_rgba(147,51,234,0.4)]"
                />
              </motion.div>
            </div>

            {/* Hobby Text */}
            <h3 className="text-2xl font-bold text-center mb-3 bg-gradient-to-r from-red-400 to-purple-400 bg-clip-text text-transparent">
              {hobby.title}
            </h3>
            <p className="text-center text-gray-300 text-base leading-relaxed">
              {hobby.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
