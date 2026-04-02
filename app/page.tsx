"use client";

import Hero from "./component/Hero";
import { Navbar } from "./component/Navbar";


export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 px-20">
      {/* Navbar: full width, but content max-w-4xl */}
      <header className="sticky top-0 z-50    ">
        <div className="mx-auto max-w-3 flex items-center justify-between px-5 py-3 ">
        <Navbar/>
        </div>
      </header>

      {/* Hero Section: content max-w-7xl */}
      <section
        id="hero"
        className="h-screen text-white flex items-center justify-center "
      >
        <div className="w-full px-5 max-w-full">
          <Hero />
        </div>
      </section>

     
    </main>
  );
}