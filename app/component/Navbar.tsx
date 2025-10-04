"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaXTwitter } from "react-icons/fa6";

export default function Navbar() {
  const [active, setActive] = useState("hero");

  const navLinks = [
    { name: "Home", href: "#hero" },
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Hobbies", href: "#hobbies" },
    { name: "Contact", href: "#contact" },
  ];

  // Detect active section
  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");

    const handleScroll = () => {
      const scrollY = window.scrollY + 120; // navbar offset
      sections.forEach((sec) => {
        const section = sec as HTMLElement;
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute("id");
        if (sectionId) {
          if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            setActive(sectionId);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      className="fixed top-0 left-0 w-full z-50 bg-black/20 backdrop-blur-2xl"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.4, ease: "easeInOut" }}
        className="max-w-7xl mx-auto flex justify-between items-center px-6 py-5"
      >
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <a
            href="#hero"
            className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-red-500 via-purple-500 to-indigo-500 
              bg-clip-text text-transparent hover:opacity-90 transition-all duration-500"
          >
            Vishal<span className="text-white">Csx.</span>
          </a>
        </motion.div>

        {/* Nav Links */}
        <motion.div
          className="hidden md:flex items-center gap-3"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 1.2 }}
        >
          {navLinks.map((link) => (
            <motion.div
              key={link.name}
              whileHover={{
                scale: 1.1,
                textShadow: "0px 0px 12px rgba(147, 51, 234, 0.8)",
              }}
              transition={{ type: "spring", stiffness: 250, damping: 12 }}
            >
              <button
                onClick={(e) => {
                  e.preventDefault();
                  const target = document.querySelector(link.href) as HTMLElement;
                  if (target) {
                    const offset = 100; // navbar height offset
                    const top = target.offsetTop - offset;
                    window.scrollTo({ top, behavior: "smooth" });
                  }
                }}
                className={`px-6 py-2 rounded-full transition-all duration-500 ${
                  active === link.href.slice(1)
                    ? "bg-purple-600 text-white shadow-[0_0_15px_rgba(147,51,234,0.6)]"
                    : "text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-red-600 hover:via-purple-600 hover:to-indigo-700 hover:shadow-[0_0_20px_rgba(147,51,234,0.4)]"
                }`}
              >
                {link.name}
              </button>
            </motion.div>
          ))}
        </motion.div>

        {/* Social Icons */}
        <motion.div
          className="flex items-center gap-6 text-2xl text-gray-300"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1, duration: 1 }}
        >
          <motion.a
            href="https://github.com/VishalDevx"
            target="_blank"
            whileHover={{ scale: 1.2, color: "#ffffff", textShadow: "0px 0px 20px #9333ea" }}
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
          >
            <FaGithub />
          </motion.a>

          <motion.a
            href="https://x.com/VishalCsx"
            target="_blank"
            whileHover={{ scale: 1.2, color: "#ffffff", textShadow: "0px 0px 20px #9333ea" }}
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
          >
            <FaXTwitter />
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Glow Bar */}
      <motion.div
        className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-purple-500/60 to-transparent"
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: 2, delay: 1 }}
      />
    </motion.nav>
  );
}
