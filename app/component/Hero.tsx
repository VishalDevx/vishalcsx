"use client";

import { Download } from "lucide-react";

const HERO_IMAGE = "/hero.png"

export default function Hero() {
  return (
   <div className=" flex justify-between">
    <div className="flex">
  <div className="image w-12 h-12 rounded-3xl border-2 border-white">
      <img  className="rounded-4xl" src={HERO_IMAGE} alt="profile image" />
    </div>
    <div className="ml-5">
<h1 className="text-l font-bold">Vishal Singh </h1>
<span className="text-gray-400 text-sm font-sans"> I  Make system Scalable </span>
    </div>
    </div>
    <Link>
  <Download />
    </Link>
   </div>
  );
}
