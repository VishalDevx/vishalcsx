"use client";

import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaTwitter ,Fa500Px} from "react-icons/fa";
import { SiGmail } from "react-icons/si";


export default function Footer() {
  return (
    <footer className="bg-black text-white py-12 px-6 md:px-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6"
      >
        {/* Brand */}
        <div className="text-2xl font-bold bg-gradient-to-r from-red-500 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
          VishalCsx .
        </div>

        {/* Social Links */}
        <div className="flex gap-6 text-xl">
          <motion.a
            whileHover={{ scale: 1.2, color: "#9333EA" }}
            href="https://github.com/VishalDevx"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <FaGithub />
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.2, color: "#0A66C2" }}
            href="https://www.linkedin.com/in/vishal-singh-779054260/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <FaLinkedin />
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.2, color: "#1DA1F2" }}
            href="https://x.com/VishalCsx"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
          >
            <FaTwitter />
          </motion.a>
            <motion.a
            whileHover={{ scale: 1.2, color: "#e22d2f" }}
           href="mailto:vishalcsx@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Gmail"
          >
            <SiGmail />
          </motion.a>
        </div>
      </motion.div>

      {/* Copyright */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 1 }}
        className="text-center text-gray-500 mt-8 text-sm"
      >
        © {new Date().getFullYear()} VishalCsx. All rights reserved.
      </motion.p>
    </footer>
  );
}
