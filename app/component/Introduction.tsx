"use client";

import { Download } from "lucide-react";
import Image from "next/image";

export default function Introduction() {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/cv/Vishal-Resume.pdf";
    link.download = "Vishal-Resume.pdf";
    link.click();
  };
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <div className="h-12 w-12 rounded-2xl border border-white/15 bg-white/5 p-0.5">
          <Image
            className="h-full w-full rounded-xl object-cover"
            src="https://avatars.githubusercontent.com/u/146514857?v=4&size=64"
            alt="Vishal Singh profile image"
            width={48}
            height={48}
          />
        </div>
        <div>
          <h1 className="text-base font-semibold text-zinc-100">Vishal Singh</h1>
          <div className="font-mono text-xs text-zinc-400">
            senior backend • senior full‑stack  developer
          </div>
        </div>
      </div>

      <button
        onClick={handleDownload}
        className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 font-mono text-xs text-zinc-200 hover:bg-white/10"
        aria-label="Download resume"
      >
        <Download className="h-4 w-4" />
        <span className="hidden sm:inline">download cv</span>
      </button>
    </div>
  );
}
