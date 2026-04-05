"use client";

import { Hero } from "./component/Hero";
import { Navbar } from "./component/Navbar";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#09090b]">

      {/* NAVBAR */}
      <Navbar />

      {/* HERO */}
      <Hero />

    </main>
  );
}