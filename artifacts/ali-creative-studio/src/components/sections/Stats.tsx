import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
  {
    label: "Client Satisfaction",
    value: "100%",
    desc: "Trusted by growing\ndigital teams",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M9 2L11.5 7L17 7.8L13 11.7L14 17L9 14.3L4 17L5 11.7L1 7.8L6.5 7Z" stroke="currentColor" strokeWidth="1" fill="none" />
      </svg>
    ),
    offset: 0,
  },
  {
    label: "Experience",
    value: "8+",
    sub: "Years",
    desc: "Designing scalable\ndigital products",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <circle cx="9" cy="9" r="3" stroke="currentColor" strokeWidth="1" />
        <path d="M9 1V3M9 15V17M1 9H3M15 9H17M3.2 3.2L4.6 4.6M13.4 13.4L14.8 14.8M14.8 3.2L13.4 4.6M4.6 13.4L3.2 14.8" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      </svg>
    ),
    offset: 60,
  },
  {
    label: "Delivered Projects",
    value: "60+",
    desc: "Across SaaS, AI &\ndigital platforms",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M5 9L8 12L13 6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="1.5" y="1.5" width="15" height="15" rx="3" stroke="currentColor" strokeWidth="1" />
      </svg>
    ),
    offset: 0,
  },
  {
    label: "Growth Impact",
    value: "+40%",
    desc: "Average ROI growth\nafter new design",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M9 1V17M1 9H17M3.5 3.5L14.5 14.5M14.5 3.5L3.5 14.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      </svg>
    ),
    offset: 60,
  },
];

function CountUp({ value, inView }: { value: string; inView: boolean }) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {value}
    </motion.span>
  );
}

export function Stats() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="relative w-full overflow-hidden"
      style={{ background: "#050505", paddingTop: "6rem", paddingBottom: "6rem" }}
    >
      {/* Subtle top rule */}
      <div className="w-full h-[1px] bg-white/5 absolute top-0 left-0" />

      <div
        className="mx-auto"
        style={{ maxWidth: "1200px", paddingLeft: "clamp(1.5rem, 5vw, 4rem)", paddingRight: "clamp(1.5rem, 5vw, 4rem)" }}
      >
        {/* Cards grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5 items-start">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.08 * i, ease: [0.16, 1, 0.3, 1] }}
              style={{ marginTop: stat.offset }}
            >
              <div
                className="relative flex flex-col justify-between group"
                style={{
                  background: "rgba(255,255,255,0.025)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: "10px",
                  padding: "clamp(1.2rem, 2.5vw, 1.8rem)",
                  minHeight: "220px",
                  transition: "border-color 0.3s ease, background 0.3s ease",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.14)";
                  (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.07)";
                  (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.025)";
                }}
              >
                {/* Top: red dot + label */}
                <div>
                  <div className="flex items-center gap-2 mb-6">
                    <div
                      className="flex items-center justify-center"
                      style={{
                        width: 14,
                        height: 14,
                        background: "rgba(239,68,68,0.15)",
                        border: "1px solid rgba(239,68,68,0.4)",
                        borderRadius: "3px",
                      }}
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                    </div>
                    <span
                      className="text-white/35 font-medium uppercase tracking-[0.22em]"
                      style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: "7.5px" }}
                    >
                      {stat.label}
                    </span>
                  </div>

                  {/* Number */}
                  <div>
                    <span
                      className="text-white font-bold block leading-none"
                      style={{
                        fontFamily: "'Inter Tight', sans-serif",
                        fontSize: "clamp(2.6rem, 5vw, 3.6rem)",
                        letterSpacing: "-0.04em",
                      }}
                    >
                      <CountUp value={stat.value} inView={inView} />
                    </span>
                    {stat.sub && (
                      <span
                        className="text-white/40 font-light block mt-1"
                        style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: "13px", letterSpacing: "0.08em" }}
                      >
                        {stat.sub}
                      </span>
                    )}
                  </div>
                </div>

                {/* Bottom: desc + icon */}
                <div className="flex items-end justify-between mt-6 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                  <p
                    className="text-white/30 font-light leading-snug"
                    style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: "11px", letterSpacing: "0.03em", whiteSpace: "pre-line" }}
                  >
                    {stat.desc}
                  </p>
                  <div className="text-white/15 ml-4 flex-shrink-0 group-hover:text-white/30 transition-colors duration-300">
                    {stat.icon}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom rule */}
      <div className="w-full h-[1px] bg-white/5 absolute bottom-0 left-0" />
    </section>
  );
}
