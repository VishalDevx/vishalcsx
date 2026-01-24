"use client";

import { motion } from "framer-motion";
import AboutSection from "./component/About";
import ContactForm from "./component/Contact";
import Footer from "./component/Footer";
import Hero from "./component/Hero";
import Hobbies from "./component/Hobbies";
import Project from "./component/Project";
import Skill from "./component/Skill";

export default function Home() {
  const sectionMotion = {
    initial: { opacity: 0, y: 50 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8 },
  };

  return (
    <main className=" w-1/3 m-auto pt-10 mt-10">
      
        <Hero />
      

     
        {/* <AboutSection />
     

      
        <Skill />
    

     
        <Project />
   

     
        <Hobbies />


     
        <ContactForm />
      

      <Footer /> */}
    </main>
  );
}
