"use client";

export function Hero() {
  return (
    <div className="max-w-6xl pt-6">
      
      {/* Intro */}
      <div className="text-zinc-400 text-lg">
        Hi, I'm <span className="text-blue-400 font-medium">Vishal Singh</span>
      </div>

      {/* Main Line */}
      <div className="text-white text-3xl md:text-4xl font-semibold mt-2 leading-tight">
        I build{" "}
        <span className="text-blue-500">
          real systems
        </span>{" "}
        that solve real problems
      </div>

    </div>
  );
}