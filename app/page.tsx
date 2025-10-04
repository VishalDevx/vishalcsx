"use client";

import { motion } from "framer-motion";
import AboutSection from "./component/About";
import ContactForm from "./component/Contact";
import Footer from "./component/Footer";
import Hero from "./component/Hero";
import Hobbies from "./component/Hobbies";
import Project from "./component/Project";
import Skill from "./component/Skill";

export default function Home() {
  const sectionMotion = {
    initial: { opacity: 0, y: 50 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8 },
  };

  return (
    <main className="min-h-screen bg-black text-gray-100 scroll-smooth">
      <motion.section id="hero" {...sectionMotion}>
        <Hero />
      </motion.section>

      <motion.section id="about" {...sectionMotion}>
        <AboutSection />
      </motion.section>

      <motion.section id="skills" {...sectionMotion}>
        <Skill />
      </motion.section>

      <motion.section id="projects" {...sectionMotion}>
        <Project />
      </motion.section>

      <motion.section id="hobbies" {...sectionMotion}>
        <Hobbies />
      </motion.section>

      <motion.section id="contact" {...sectionMotion}>
        <ContactForm />
      </motion.section>

      <Footer />
    </main>
  );
}
