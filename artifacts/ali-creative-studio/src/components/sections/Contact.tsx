import React from "react";
import { motion } from "framer-motion";

export function Contact() {
  return (
    <section id="contact" className="py-48 px-6 md:px-12 relative z-10 min-h-[80vh] flex flex-col items-center justify-center text-center">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="text-[10px] uppercase tracking-widest text-primary mb-12">
          (04) — Initiate
        </div>
        
        <h2 className="text-6xl md:text-8xl lg:text-[8rem] font-light tracking-tighter mb-12">
          Let's build <br className="hidden md:block"/>
          <span className="italic text-foreground/80">something</span> bold.
        </h2>
        
        <a 
          href="mailto:hello@alicreative.studio" 
          className="inline-block relative text-xl md:text-2xl font-light tracking-wide group"
        >
          hello@alicreative.studio
          <span className="absolute -bottom-2 left-0 w-full h-[1px] bg-white/20"></span>
          <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-primary transition-all duration-500 ease-out group-hover:w-full"></span>
        </a>
      </motion.div>
    </section>
  );
}
