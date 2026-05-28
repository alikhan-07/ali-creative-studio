import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const SERVICES = [
  {
    index: "01",
    title: "Branding",
    desc: "Identity systems, logos & visual language",
  },
  {
    index: "02",
    title: "Social Media Creatives",
    desc: "Scroll-stopping content for every platform",
  },
  {
    index: "03",
    title: "Promotion Designs",
    desc: "Campaigns, ads & launch visuals",
  },
  {
    index: "04",
    title: "Packaging Designs",
    desc: "Shelf-ready packaging that sells",
  },
  {
    index: "05",
    title: "Brochure Design",
    desc: "Print & digital collateral that converts",
  },
];

export function Services() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section
      id="services"
      ref={ref}
      className="relative w-full"
      style={{ background: "#050505" }}
    >
      {/* Top rule */}
      <div className="w-full h-[1px] bg-white/8" />

      <div
        style={{
          paddingLeft: "clamp(1.5rem,4vw,3.5rem)",
          paddingRight: "clamp(1.5rem,4vw,3.5rem)",
        }}
      >
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          style={{
            display: "grid",
            gridTemplateColumns: "1fr auto",
            alignItems: "end",
            paddingTop: "clamp(3rem,6vw,5rem)",
            paddingBottom: "clamp(2rem,4vw,3.5rem)",
            gap: "2rem",
          }}
        >
          {/* Left — big editorial label */}
          <h2
            className="text-white leading-none select-none"
            style={{
              fontFamily: "'Inter Tight', sans-serif",
              fontSize: "clamp(3.5rem,10vw,11rem)",
              fontWeight: 200,
              letterSpacing: "-0.03em",
              lineHeight: 0.9,
            }}
          >
            Services
          </h2>

          {/* Right — section meta */}
          <div
            className="flex flex-col items-end gap-1 pb-2 flex-shrink-0"
          >
            <span
              className="text-white/25 uppercase"
              style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontSize: "9px",
                letterSpacing: "0.3em",
                fontWeight: 500,
              }}
            >
              (02) — Capabilities
            </span>
            <span
              className="text-white/15"
              style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontSize: "9px",
                letterSpacing: "0.15em",
                fontWeight: 300,
              }}
            >
              {SERVICES.length} Disciplines
            </span>
          </div>
        </motion.div>

        {/* Divider */}
        <motion.div
          className="h-[1px] bg-white/6"
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformOrigin: "left", marginBottom: 0 }}
        />

        {/* Service rows */}
        {SERVICES.map((svc, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.65,
              delay: 0.15 + i * 0.07,
              ease: [0.16, 1, 0.3, 1],
            }}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            style={{
              display: "grid",
              gridTemplateColumns: "3rem 1fr auto",
              alignItems: "center",
              gap: "0 2rem",
              paddingTop: "clamp(1.1rem,2.2vw,1.75rem)",
              paddingBottom: "clamp(1.1rem,2.2vw,1.75rem)",
              borderBottom: "1px solid rgba(255,255,255,0.06)",
              cursor: "default",
              transition: "background 0.25s",
              background:
                hovered === i
                  ? "rgba(255,255,255,0.025)"
                  : "transparent",
            }}
          >
            {/* Index */}
            <span
              style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontSize: "9px",
                fontWeight: 400,
                letterSpacing: "0.2em",
                color:
                  hovered === i
                    ? "rgba(255,255,255,0.4)"
                    : "rgba(255,255,255,0.18)",
                transition: "color 0.25s",
              }}
            >
              {svc.index}
            </span>

            {/* Service name */}
            <span
              style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontSize: "clamp(1.25rem,3vw,2.5rem)",
                fontWeight: hovered === i ? 300 : 200,
                letterSpacing: "-0.02em",
                lineHeight: 1,
                color:
                  hovered === i
                    ? "rgba(255,255,255,0.95)"
                    : "rgba(255,255,255,0.55)",
                transition: "color 0.25s, font-weight 0.25s",
              }}
            >
              {svc.title}
            </span>

            {/* Descriptor — right aligned, only visible on hover */}
            <span
              style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontSize: "clamp(0.6rem,0.9vw,0.78rem)",
                fontWeight: 300,
                letterSpacing: "0.04em",
                color: "rgba(255,255,255,0.28)",
                textAlign: "right",
                opacity: hovered === i ? 1 : 0,
                transition: "opacity 0.25s",
                whiteSpace: "nowrap",
              }}
            >
              {svc.desc}
            </span>
          </motion.div>
        ))}

        {/* Bottom spacing */}
        <div style={{ paddingBottom: "clamp(3rem,6vw,5rem)" }} />
      </div>
    </section>
  );
}
