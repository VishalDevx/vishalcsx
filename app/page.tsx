"use client";

import { Hero } from "./component/Hero";
import { Navbar } from "./component/Navbar";
import PixelEditor10x50 from "./component/PixelEditor";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950">
      
      {/* NAVBAR */}
      <header className="sticky top-0 z-50 bg-slate-950">
        <div className="mx-auto max-w-6xl flex items-center justify-between px-5 py-3">
          <Navbar />
        </div>
      </header>

      {/* PIXEL EDITOR (TOP SECTION) */}
      <section
        id="PixelEditor"
        className="flex items-start justify-center pt-6"
      >
        <div className="w-full max-w-6xl px-5">
          <PixelEditor10x50 />
        </div>
      </section>

      {/* HERO (FULL SCREEN BELOW) */}
     <section id="Hero" className="flex justify-center">
  <div className="w-full max-w-6xl px-5">
    <Hero />
  </div>
</section>

    </main>
  );
}