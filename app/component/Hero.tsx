"use client";

import Link from "next/link";
import { BsTwitter, BsLinkedin, BsGithub } from "react-icons/bs";
import { SiGmail } from "react-icons/si";

export function Hero() {
  return (
    <section className="max-w-5xl pt-10 flex flex-col gap-6">
      
      {/* Intro */}
      <div className="flex flex-col gap-2">
        <p className="text-zinc-400 text-base">
          Hi, I'm{" "}
          <span className="text-blue-400 font-semibold">
            Vishal Singh
          </span>
        </p>

        <h1 className="text-white text-3xl md:text-5xl font-semibold leading-tight">
          I love{" "}
          <span className="text-blue-500">solving</span>{" "}
          hard{" "}
          <span className="text-green-500">engineering</span>{" "}
          problems
        </h1>
      </div>

      {/* Description */}
      <div className="flex flex-col gap-3 max-w-3xl">
        <p className="text-lg text-zinc-400 leading-relaxed">
          Full-stack Developer, System Builder, and Problem Solver.
          Focused on backend architecture, scalable systems, and
          real-world products.
        </p>

        <p className="text-sm text-zinc-500">
          OSS Contributor{" "}
          <Link
            href="https://github.com/calcom/cal.com"
            className="text-blue-500 hover:underline"
          >
            @calcom
          </Link>{" "}
          — building multi-tenant systems and exploring AI-driven solutions
        </p>
      </div>

      {/* Socials */}
      <div className="flex items-center gap-15 pt-8 text-zinc-400 text-4xl">
        <Link
          href="https://x.com/VishalCsx"
          className="hover:text-white transition"
        >
          <BsTwitter />
        </Link>

        <Link
          href="https://www.linkedin.com/in/vishal-singh-779054260/"
          className="hover:text-white transition"
        >
          <BsLinkedin />
        </Link>

        <Link
          href="https://github.com/VishalDevx"
          className="hover:text-white transition"
        >
          <BsGithub />
        </Link>

        <Link
          href="mailto:vishalcsx@gmail.com"
          className="hover:text-white transition"
        >
          <SiGmail />
        </Link>
      </div>

<div id="articals">
<h1 className="text-xl font-bold p-3">Latest Articles</h1>
  


</div>
    </section>
  );
}