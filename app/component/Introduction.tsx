"use client";

import { Download } from "lucide-react";

const HERO_IMAGE = "/hero.png"

export default function Hero() {
  const handleDownload = ()=>{
    const link = document.createElement('a');
    link.href = "/cv/Vishal-Resume.pdf";
    link.download="Vishal-Resume.pdf";
    link.click()
  }
  return (
   <div className=" flex justify-between">
    <div className="flex">
  <div className="image w-12 h-12 rounded-3xl border-2 border-white">
      <img  className="rounded-4xl" src="https://avatars.githubusercontent.com/u/146514857?v=4&size=64" alt="profile image" />
    </div>
    <div className="ml-5">
<h1 className="text-l font-bold">Vishal Singh </h1>
<span className="text-gray-400 text-sm font-sans"> I  Make system Scalable </span>
    </div>
    </div>
    
     <button
        onClick={handleDownload}
        className="flex items-center gap-2  hover:text-gray-700 cursor-pointer"
      >
        <Download />
        
      </button>
   
   </div>
  );
}
