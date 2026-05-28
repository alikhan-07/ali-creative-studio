import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

const projects = [
  {
    num: "01",
    title: "Aura Dynamics",
    category: "Brand Identity",
    year: "2024",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop",
    corner: "A",
  },
  {
    num: "02",
    title: "Neuro Engine",
    category: "Digital Platform",
    year: "2023",
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=800&auto=format&fit=crop",
    corner: "2",
  },
  {
    num: "03",
    title: "Syndicate X",
    category: "Identity & Web3",
    year: "2023",
    featured: true,
    image: "https://images.unsplash.com/photo-1634986666676-ec8fd927c23d?q=80&w=800&auto=format&fit=crop",
    corner: "3",
  },
  {
    num: "04",
    title: "Pulse Studio",
    category: "UI/UX Design",
    year: "2024",
    image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=800&auto=format&fit=crop",
    corner: "4",
  },
  {
    num: "05",
    title: "Orbital Labs",
    category: "Motion & 3D",
    year: "2023",
    image: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=800&auto=format&fit=crop",
    corner: "5",
  },
  {
    num: "06",
    title: "Cipher Works",
    category: "Web Development",
    year: "2024",
    image: "https://images.unsplash.com/photo-1604076913837-52ab5629fde7?q=80&w=800&auto=format&fit=crop",
    corner: "6",
  },
];

// Simple diamond/suit symbol
function Suit() {
  return (
    <svg width="8" height="8" viewBox="0 0 8 8" fill="currentColor">
      <path d="M4 0 L8 4 L4 8 L0 4 Z" />
    </svg>
  );
}

export function Work() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      id="work"
      ref={ref}
      className="relative w-full overflow-hidden"
      style={{ background: "#050505", paddingTop: "5rem", paddingBottom: "5rem" }}
    >
      {/* ── Big "SELECTED WORK" headline ── */}
      <div
        className="overflow-hidden"
        style={{ paddingLeft: "clamp(1.5rem, 4vw, 3.5rem)", paddingRight: "clamp(1.5rem, 4vw, 3.5rem)", marginBottom: "3rem" }}
      >
        <motion.div
          initial={{ y: "105%" }}
          animate={inView ? { y: "0%" } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-end justify-between"
        >
          <h2
            className="text-white font-black uppercase leading-none tracking-tight select-none"
            style={{
              fontFamily: "'Inter Tight', sans-serif",
              fontSize: "clamp(3.5rem, 10vw, 11rem)",
              letterSpacing: "-0.03em",
              lineHeight: 0.9,
            }}
          >
            Selected Work
          </h2>

          {/* right-side small index tag */}
          <div
            className="flex flex-col items-end pb-2 gap-1 flex-shrink-0 ml-6"
            style={{ marginBottom: "0.5rem" }}
          >
            <span
              className="text-white/25 font-medium uppercase tracking-[0.3em]"
              style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: "9px" }}
            >
              (01) — Index
            </span>
            <span
              className="text-white/15 font-light"
              style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: "9px", letterSpacing: "0.15em" }}
            >
              {projects.length} Projects
            </span>
          </div>
        </motion.div>
      </div>

      {/* Thin rule */}
      <motion.div
        className="h-[1px] bg-white/6"
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformOrigin: "left", marginBottom: "2.5rem" }}
      />

      {/* ── Horizontal scroll card row ── */}
      <div
        className="flex overflow-x-auto gap-4 pb-6"
        style={{
          paddingLeft: "clamp(1.5rem, 4vw, 3.5rem)",
          paddingRight: "clamp(1.5rem, 4vw, 3.5rem)",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          cursor: "grab",
        }}
      >
        {projects.map((project, i) => {
          const isFeatured = project.featured;
          const cardW = isFeatured ? 260 : 200;
          const cardH = isFeatured ? 380 : 290;

          return (
            <motion.div
              key={i}
              className="flex-shrink-0 flex flex-col"
              style={{ width: cardW }}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.06 * i + 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Label above card */}
              <div
                className="flex items-center gap-2 mb-2"
                style={{ opacity: 0.5 }}
              >
                <span
                  className="text-white font-medium"
                  style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: "9px", letterSpacing: "0.25em" }}
                >
                  {project.num}
                </span>
                <span
                  className="text-white/60 uppercase font-light truncate"
                  style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: "9px", letterSpacing: "0.2em", maxWidth: cardW - 32 }}
                >
                  {project.title}
                </span>
              </div>

              {/* Playing card */}
              <motion.div
                whileHover={{ y: isFeatured ? -8 : -6, scale: 1.02 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="relative overflow-hidden group"
                style={{
                  width: cardW,
                  height: cardH,
                  background: "#0c0c0c",
                  border: isFeatured
                    ? "1px solid rgba(255,255,255,0.18)"
                    : "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 12,
                  cursor: "pointer",
                }}
              >
                {/* Corner — top left */}
                <div
                  className="absolute top-3 left-3 z-20 flex flex-col items-center gap-[2px]"
                  style={{ color: isFeatured ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.5)" }}
                >
                  <span
                    style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: "13px", fontWeight: 700, lineHeight: 1 }}
                  >
                    {project.corner}
                  </span>
                  <Suit />
                </div>

                {/* Corner — bottom right (rotated) */}
                <div
                  className="absolute bottom-3 right-3 z-20 flex flex-col items-center gap-[2px]"
                  style={{
                    color: isFeatured ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.5)",
                    transform: "rotate(180deg)",
                  }}
                >
                  <span
                    style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: "13px", fontWeight: 700, lineHeight: 1 }}
                  >
                    {project.corner}
                  </span>
                  <Suit />
                </div>

                {/* Project image */}
                <motion.img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                  style={{
                    filter: "brightness(0.65) contrast(1.1) grayscale(20%)",
                    transition: "filter 0.5s ease",
                  }}
                  whileHover={{ filter: "brightness(0.8) contrast(1.15) grayscale(0%)" } as any}
                />

                {/* Bottom overlay with info */}
                <div
                  className="absolute bottom-0 left-0 right-0 z-10 p-4"
                  style={{ background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%)" }}
                >
                  <p
                    className="text-white font-medium leading-tight mb-0.5"
                    style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: isFeatured ? "14px" : "11px" }}
                  >
                    {project.title}
                  </p>
                  <p
                    className="text-white/45 font-light uppercase tracking-wider"
                    style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: "8px", letterSpacing: "0.2em" }}
                  >
                    {project.category}
                  </p>
                </div>

                {/* Hover glow */}
                <div
                  className="absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
                  style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.07) 0%, transparent 70%)" }}
                />
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      {/* Hide scrollbar */}
      <style>{`.overflow-x-auto::-webkit-scrollbar { display: none; }`}</style>
    </section>
  );
}
