import React from "react";
import { motion } from "framer-motion";

export function About() {
  return (
    <section id="about" className="py-32 px-6 md:px-12 relative z-10">
      <div className="flex flex-col md:flex-row gap-16 md:gap-24 items-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="w-full md:w-1/2 aspect-[3/4] relative overflow-hidden rounded-sm"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent z-10 opacity-60" />
          <img 
            src="https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2670&auto=format&fit=crop" 
            alt="Studio atmosphere" 
            className="w-full h-full object-cover grayscale opacity-70 mix-blend-luminosity"
          />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="w-full md:w-1/2"
        >
          <div className="text-[10px] uppercase tracking-widest text-foreground/50 mb-8">
            (03) — The Studio
          </div>
          
          <h2 className="text-3xl md:text-5xl font-light tracking-tight mb-8 leading-tight">
            We are a small, elite team of designers and engineers building the next generation of the web.
          </h2>
          
          <p className="text-base md:text-lg text-foreground/50 font-light leading-relaxed mb-8">
            Founded on the belief that digital experiences should feel as meticulously crafted as physical objects. We don't use templates. We don't cut corners. We build from the ground up to create something entirely yours.
          </p>

          <button className="group relative overflow-hidden px-8 py-4 border border-white/20 text-xs uppercase tracking-widest hover:border-white/50 transition-colors">
            <span className="relative z-10">Meet the Team</span>
            <div className="absolute inset-0 bg-white/5 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
