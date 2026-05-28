import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

const SERVICES = [
  {
    index: "01",
    title: "Branding",
    desc: "Visual identity systems, logos & brand language built to last",
    stagger: "0rem",
  },
  {
    index: "02",
    title: "Social Media Creatives",
    desc: "Scroll-stopping content crafted for every platform",
    stagger: "7rem",
  },
  {
    index: "03",
    title: "Promotion Designs",
    desc: "Campaign visuals, ads & launch assets that convert",
    stagger: "2.5rem",
  },
  {
    index: "04",
    title: "Packaging Designs",
    desc: "Shelf-ready packaging that commands attention",
    stagger: "9rem",
  },
  {
    index: "05",
    title: "Brochure Design",
    desc: "Print & digital collateral with precision and clarity",
    stagger: "4.5rem",
  },
];

export function Services() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="services"
      ref={ref}
      className="relative w-full"
      style={{ background: "#050505" }}
    >
      <div
        style={{
          paddingLeft: "clamp(1.5rem,4vw,3.5rem)",
          paddingRight: "clamp(1.5rem,4vw,3.5rem)",
          paddingTop: "clamp(3rem,6vw,5rem)",
        }}
      >
        {/* Section eyebrow */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
          style={{
            fontFamily: "'Inter Tight', sans-serif",
            fontSize: "9px",
            fontWeight: 500,
            letterSpacing: "0.3em",
            color: "rgba(255,255,255,0.25)",
            textTransform: "uppercase",
            marginBottom: "0.75rem",
          }}
        >
          (02) — Capabilities
        </motion.p>

        {/* HUGE heading — bold like the reference */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: "'Inter Tight', sans-serif",
            fontSize: "clamp(4.5rem,14vw,16rem)",
            fontWeight: 800,
            letterSpacing: "-0.04em",
            lineHeight: 0.88,
            color: "#ffffff",
            textTransform: "uppercase",
            marginBottom: "clamp(1.5rem,3vw,2.5rem)",
          }}
        >
          Services
        </motion.h2>

        {/* Rule */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          style={{
            height: "1px",
            background: "rgba(255,255,255,0.15)",
            transformOrigin: "left",
            marginBottom: "clamp(2.5rem,5vw,4rem)",
          }}
        />

        {/* Staggered service grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            gap: "0 clamp(1rem,2vw,2rem)",
            paddingBottom: "clamp(4rem,8vw,7rem)",
            alignItems: "start",
          }}
        >
          {SERVICES.map((svc, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.7,
                delay: 0.2 + i * 0.09,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{
                paddingTop: svc.stagger,
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
            >
              {/* Index */}
              <span
                style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontSize: "9px",
                  fontWeight: 400,
                  letterSpacing: "0.2em",
                  color: "rgba(255,255,255,0.3)",
                  marginBottom: "0.25rem",
                  display: "block",
                }}
              >
                {svc.index}
              </span>

              {/* Service name — bold + em dash style */}
              <p
                style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontSize: "clamp(0.7rem,1.1vw,1rem)",
                  fontWeight: 700,
                  letterSpacing: "0.02em",
                  lineHeight: 1.25,
                  color: "rgba(255,255,255,0.9)",
                  textTransform: "uppercase",
                  margin: 0,
                }}
              >
                {svc.title} —
              </p>

              {/* Description */}
              <p
                style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontSize: "clamp(0.6rem,0.85vw,0.78rem)",
                  fontWeight: 300,
                  letterSpacing: "0.02em",
                  lineHeight: 1.55,
                  color: "rgba(255,255,255,0.35)",
                  margin: 0,
                }}
              >
                {svc.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bottom rule */}
        <div style={{ height: "1px", background: "rgba(255,255,255,0.06)" }} />
      </div>
    </section>
  );
}
