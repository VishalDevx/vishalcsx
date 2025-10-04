"use client";

import React, { JSX } from "react";
import { motion } from "framer-motion";
import {
  SiJavascript,
  SiTypescript,
  SiNodedotjs,
  SiExpress,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiRecoil,
  SiPostgresql,
  SiMongodb,
  SiRedis,
  SiApachekafka,
  SiDocker,
  SiKubernetes,
  SiAmazon,
  SiJest,
  SiMocha,
  SiServerless,
} from "react-icons/si";

// --- Skills Array ---
const mySkill = [
  "JavaScript",
  "TypeScript",
  "Node.js",
  "Express.js",
  "React",
  "Next.js",
  "Tailwind CSS",
  "Recoil",
  "PostgreSQL",
  "MongoDB",
  "Redis",
  "Kafka",
  "Docker",
  "Kubernetes",
  "AWS",
  "Jest",
  "Mocha",
  "Serverless",
];

// --- Skill Colors & Gradients ---
const skillColors: Record<
  string,
  { color: string; gradient: string; icon: JSX.Element }
> = {
  JavaScript: {
    color: "#F7DF1E",
    gradient: "from-yellow-400 to-yellow-300",
    icon: <SiJavascript size={50} />,
  },
  TypeScript: {
    color: "#3178C6",
    gradient: "from-sky-500 to-sky-400",
    icon: <SiTypescript size={50} />,
  },
  "Node.js": {
    color: "#3C873A",
    gradient: "from-green-600 to-green-400",
    icon: <SiNodedotjs size={50} />,
  },
  "Express.js": {
    color: "#FFFFFF",
    gradient: "from-gray-700 to-gray-500",
    icon: <SiExpress size={50} />,
  },
  React: {
    color: "#61DAFB",
    gradient: "from-cyan-400 to-blue-400",
    icon: <SiReact size={50} />,
  },
  "Next.js": {
    color: "#FFFFFF",
    gradient: "from-gray-700 to-gray-500",
    icon: <SiNextdotjs size={50} />,
  },
  "Tailwind CSS": {
    color: "#38BDF8",
    gradient: "from-sky-400 to-cyan-400",
    icon: <SiTailwindcss size={50} />,
  },
  Recoil: {
    color: "#3578E5",
    gradient: "from-blue-600 to-blue-400",
    icon: <SiRecoil size={28} />,
  },
  PostgreSQL: {
    color: "#336791",
    gradient: "from-blue-700 to-blue-400",
    icon: <SiPostgresql size={50} />,
  },
  MongoDB: {
    color: "#47A248",
    gradient: "from-green-600 to-green-400",
    icon: <SiMongodb size={50} />,
  },
  Redis: {
    color: "#DC382D",
    gradient: "from-red-600 to-red-400",
    icon: <SiRedis size={50} />,
  },
  Kafka: {
    color: "#231F20",
    gradient: "from-gray-800 to-gray-600",
    icon: <SiApachekafka size={50} />,
  },
  Docker: {
    color: "#2496ED",
    gradient: "from-blue-500 to-blue-400",
    icon: <SiDocker size={50} />,
  },
  Kubernetes: {
    color: "#326CE5",
    gradient: "from-blue-600 to-blue-400",
    icon: <SiKubernetes size={50} />,
  },
  AWS: {
    color: "#FF9900",
    gradient: "from-yellow-500 to-orange-400",
    icon: <SiAmazon size={50} />,
  },
  Jest: {
    color: "#C21325",
    gradient: "from-red-600 to-red-400",
    icon: <SiJest size={50} />,
  },
  Mocha: {
    color: "#8D6748",
    gradient: "from-amber-700 to-amber-500",
    icon: <SiMocha size={50} />,
  },
  Serverless: {
    color: "#FF3C00",
    gradient: "from-orange-600 to-red-500",
    icon: <SiServerless size={50} />,
  },
};

// --- Skill Card Component ---
const SkillCard = ({
  name,
  color,
  gradient,
  icon,
}: {
  name: string;
  color: string;
  gradient: string;
  icon: JSX.Element;
}) => (
  <motion.div
    className="flex flex-col items-center justify-center p-4 w-28 h-28 sm:w-32 sm:h-32 rounded-3xl
               bg-black/40 backdrop-blur-md border border-gray-800 cursor-pointer 
               relative overflow-hidden shadow-[0_0_10px_rgba(255,255,255,0.05)]"
    style={{ borderColor: color }}
    whileHover={{
      scale: 1.1,
      boxShadow: `0 0 25px ${color}`,
      transition: { duration: 0.3 },
    }}
    initial={{ opacity: 0, scale: 0.8, y: 40 }}
    whileInView={{ opacity: 1, scale: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
  >
    {/* Gradient Glow Behind Icon */}
    <motion.div
      className={`absolute -top-4 -left-4 w-36 h-36 rounded-full bg-gradient-to-r ${gradient} opacity-25 blur-3xl z-0`}
      whileHover={{ scale: 1.2, opacity: 0.5 }}
      transition={{ duration: 0.5 }}
    />

    {/* Icon */}
    <div className="relative z-10 flex items-center justify-center h-12 w-12 mb-2" style={{ color }}>
      {icon}
    </div>

    <p className="relative z-10 text-gray-200 text-sm sm:text-base font-semibold text-center mt-1">
      {name}
    </p>
  </motion.div>
);

// --- Main Skill Component ---
export default function Skill() {
  return (
    <section
      id="skills"
      className="py-24 text-white text-center relative overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, rgba(0,0,0,0.95) 0%, rgba(15,0,40,0.95) 50%, rgba(0,0,0,1) 100%)",
      }}
    >
      <motion.h2
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-5xl sm:text-6xl font-extrabold mb-16 bg-gradient-to-r from-red-500 via-blue-500 to-indigo-500 bg-clip-text text-transparent"
      >
        My Skills
      </motion.h2>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap justify-center gap-12">
        {mySkill.map((skill, index) => {
          const style = skillColors[skill];
          if (!style) return null;
          return (
            <motion.div
              key={skill}
              initial={{ opacity: 0, scale: 0.8, y: 40 }}
              whileInView={{
                opacity: 1,
                scale: 1,
                y: 0,
                transition: { delay: index * 0.05, duration: 0.4 },
              }}
              viewport={{ once: true }}
            >
              <SkillCard {...style} name={skill} />
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
