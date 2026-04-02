"use client";
import { useState } from "react";
import { FaHome, FaGithub, FaLinkedin, FaDownload } from "react-icons/fa";
import { GrSystem, GrBlog } from "react-icons/gr";
import { GoProject } from "react-icons/go";
import { FcAbout } from "react-icons/fc";
import { ActivityIcon } from "lucide-react";

const LINKS = [
  { icon: <FaHome size={20} />, href: "#hero" },
  { icon: <GrSystem size={20} />, href: "#system" },
  { icon: <GoProject size={20} />, href: "#projects" },
  { icon: <GrBlog size={20} />, href: "#blogs" },
  { icon: <FcAbout size={20} />, href: "#about" },
  { icon: <ActivityIcon size={20} />, href: "#activity" },
];

export function Navbar() {
  const [active, setActive] = useState("#hero");

  return (
    <aside className="fixed top-0 left-70 h-screen flex flex-col justify-center  text-xl items-center gap-6 pr-6 border-r border-gray-800 text-gray-500">
      {LINKS.map((link) => (
        <a
          key={link.href}
          href={link.href}
          onClick={() => setActive(link.href)}
          className={`transition-colors duration-200 ${
            active === link.href ? "text-white" : "hover:text-white/80"
          }`}
        >
          {link.icon}
        </a>
      ))}
    </aside>
  );
}