import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
  {
    index: "01",
    label: "Client Satisfaction",
    value: "100%",
    desc: "Trusted by every team we've worked with",
  },
  {
    index: "02",
    label: "Years of Experience",
    value: "5+",
    desc: "Designing scalable digital products since 2021",
  },
  {
    index: "03",
    label: "Delivered Projects",
    value: "100+",
    desc: "Across SaaS, AI & digital platforms",
  },
  {
    index: "04",
    label: "Average Growth Impact",
    value: "+40%",
    desc: "ROI growth reported after redesign",
  },
];

export function Stats() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
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
        {/* Column header row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          style={{
            display: "grid",
            gridTemplateColumns: "3rem 1fr 1fr 1fr",
            gap: "0 2rem",
            paddingTop: "1.25rem",
            paddingBottom: "1.25rem",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          {["—", "Metric", "Value", "Context"].map((h, i) => (
            <span
              key={i}
              className="text-white/20 uppercase"
              style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontSize: "7.5px",
                letterSpacing: "0.28em",
                fontWeight: 500,
              }}
            >
              {h}
            </span>
          ))}
        </motion.div>

        {/* Stat rows */}
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.08 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
            style={{
              display: "grid",
              gridTemplateColumns: "3rem 1fr 1fr 1fr",
              gap: "0 2rem",
              alignItems: "center",
              paddingTop: "clamp(1.5rem,3vw,2.25rem)",
              paddingBottom: "clamp(1.5rem,3vw,2.25rem)",
              borderBottom: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            {/* Index */}
            <span
              className="text-white/18"
              style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontSize: "10px",
                letterSpacing: "0.18em",
                fontWeight: 400,
              }}
            >
              {stat.index}
            </span>

            {/* Label */}
            <span
              className="text-white/45"
              style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontSize: "clamp(0.7rem,1vw,0.82rem)",
                fontWeight: 300,
                letterSpacing: "0.04em",
              }}
            >
              {stat.label}
            </span>

            {/* Value — the big typographic hero */}
            <span
              className="text-white"
              style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontSize: "clamp(2.8rem,5.5vw,5rem)",
                fontWeight: 200,
                letterSpacing: "-0.04em",
                lineHeight: 1,
              }}
            >
              {stat.value}
            </span>

            {/* Description */}
            <span
              className="text-white/30"
              style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontSize: "clamp(0.65rem,0.9vw,0.78rem)",
                fontWeight: 300,
                letterSpacing: "0.02em",
                lineHeight: 1.55,
              }}
            >
              {stat.desc}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
