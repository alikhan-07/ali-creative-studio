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
            src="/you.png" 
            alt="About Ali Creative Studio" 
            className="w-full h-full object-cover grayscale opacity-80 hover:grayscale-0 transition-all duration-700 ease-out"
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
            We Don’t Just Design. We Build Visual Legacies.
          </h2>
          
          <div className="text-base md:text-lg text-foreground/50 font-light leading-relaxed mb-8 space-y-6">
            <p>
              At Ali Creative Studio, we believe that exceptional design is the silent ambassador of your brand. In a digital world crowded with noise, standing out requires more than just aesthetics—it requires strategy, precision, and raw creativity.
            </p>
            <p>
              Based in India and serving clients globally, we are a premier graphic design studio dedicated to turning complex brand visions into striking visual realities. Whether you are a startup launching your identity or an established enterprise scaling your marketing, we craft the visual assets that command attention and drive conversion.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
