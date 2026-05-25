import React, { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <section 
      id="hero" 
      ref={containerRef}
      className="relative min-h-screen flex items-center px-6 md:px-12 pt-32 overflow-hidden"
    >
      <motion.div 
        style={{ y, opacity }}
        className="max-w-[90vw] md:max-w-[70vw] relative z-10"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="text-[10px] uppercase tracking-[0.3em] font-medium text-primary mb-8 ml-2">
            Visionary Design Intelligence
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl xl:text-[7rem] font-light leading-[1.05] tracking-tight text-foreground mb-8">
            We craft visually <br className="hidden md:block"/>
            <span className="italic text-foreground/80">powerful</span> digital <br className="hidden md:block"/>
            experiences.
          </h1>
          
          <p className="text-lg md:text-xl text-foreground/50 max-w-xl font-light leading-relaxed">
            Creative systems for modern brands with bold vision. We blur the line between precision engineering and cinematic atmosphere.
          </p>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-12 left-6 md:left-12 flex items-center gap-4 text-[10px] uppercase tracking-widest text-foreground/40"
      >
        <div className="w-[1px] h-12 bg-white/20 relative overflow-hidden">
          <motion.div 
            className="absolute top-0 left-0 w-full h-1/2 bg-white"
            animate={{ top: ["-50%", "100%"] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          />
        </div>
        <span className="rotate-90 origin-left translate-y-3">Scroll</span>
      </motion.div>
    </section>
  );
}
