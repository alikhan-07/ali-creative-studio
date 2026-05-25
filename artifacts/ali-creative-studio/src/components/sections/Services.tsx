import React from "react";
import { motion } from "framer-motion";

const services = [
  {
    number: "01",
    title: "Brand Systems",
    description: "Visual identities that transcend trends. We build foundational design systems that scale across every digital touchpoint with unmistakable clarity."
  },
  {
    number: "02",
    title: "Digital Platforms",
    description: "Cinematic, performant websites and applications. Blending precise engineering with fluid motion to create unforgettable interactive spaces."
  },
  {
    number: "03",
    title: "Creative Direction",
    description: "Guiding the overarching vision. From 3D motion design to photographic art direction, ensuring every asset serves the broader narrative."
  }
];

export function Services() {
  return (
    <section id="services" className="py-32 px-6 md:px-12 relative z-10">
      <div className="border-t border-white/10 pt-12">
        <div className="flex justify-between items-start mb-24">
          <div className="text-[10px] uppercase tracking-widest text-foreground/50 pt-2">
            (02) — Capabilities
          </div>
          <h2 className="text-4xl md:text-5xl font-light tracking-tight max-w-2xl text-right">
            We operate at the intersection of striking aesthetics and intelligent engineering.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {services.map((service, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col"
            >
              <div className="text-[10px] text-primary mb-6">{service.number}</div>
              <h3 className="text-2xl font-light mb-4">{service.title}</h3>
              <p className="text-sm text-foreground/50 leading-relaxed font-light">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
