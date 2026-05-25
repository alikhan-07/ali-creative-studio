import React from "react";
import { motion } from "framer-motion";

const projects = [
  {
    title: "Aura Dynamics",
    category: "Brand & Platform",
    year: "2024",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop", // abstract art
    align: "left"
  },
  {
    title: "Neuro Engine",
    category: "Digital Experience",
    year: "2023",
    image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2670&auto=format&fit=crop",
    align: "right"
  },
  {
    title: "Syndicate X",
    category: "Identity & Web3",
    year: "2023",
    image: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=2670&auto=format&fit=crop",
    align: "center"
  }
];

export function Work() {
  return (
    <section id="work" className="py-32 px-6 md:px-12 relative z-10">
      <div className="flex justify-between items-end mb-24">
        <h2 className="text-4xl md:text-6xl font-light tracking-tight">Selected Work</h2>
        <div className="text-[10px] uppercase tracking-widest text-foreground/50 pb-2">
          (01) — Index
        </div>
      </div>

      <div className="flex flex-col gap-32 md:gap-48">
        {projects.map((project, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className={`w-full md:w-[65%] ${
              project.align === "right" ? "ml-auto" : 
              project.align === "center" ? "mx-auto" : ""
            }`}
          >
            <div className="relative group cursor-pointer overflow-hidden aspect-[4/3] md:aspect-[16/9] mb-6 rounded-sm">
              <div className="absolute inset-0 bg-black/20 z-10 transition-opacity duration-500 group-hover:opacity-0" />
              <motion.img 
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover filter grayscale-[30%] contrast-[1.1] transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
              />
            </div>
            
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-2xl md:text-3xl font-light mb-2 group-hover:text-primary transition-colors duration-300">{project.title}</h3>
                <p className="text-[11px] uppercase tracking-widest text-foreground/50">{project.category}</p>
              </div>
              <div className="text-[11px] text-foreground/40">{project.year}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
