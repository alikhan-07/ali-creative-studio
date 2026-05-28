import React, { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

const projects = [
  {
    num: "01", title: "Aura Dynamics", category: "Brand Identity", year: "2024",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop",
    corner: "A",
  },
  {
    num: "02", title: "Neuro Engine", category: "Digital Platform", year: "2023",
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=800&auto=format&fit=crop",
    corner: "2",
  },
  {
    num: "03", title: "Syndicate X", category: "Identity & Web3", year: "2023",
    image: "https://images.unsplash.com/photo-1634986666676-ec8fd927c23d?q=80&w=800&auto=format&fit=crop",
    corner: "3",
  },
  {
    num: "04", title: "Pulse Studio", category: "UI/UX Design", year: "2024",
    image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=800&auto=format&fit=crop",
    corner: "4",
  },
  {
    num: "05", title: "Orbital Labs", category: "Motion & 3D", year: "2023",
    image: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=800&auto=format&fit=crop",
    corner: "5",
  },
  {
    num: "06", title: "Cipher Works", category: "Web Development", year: "2024",
    image: "https://images.unsplash.com/photo-1604076913837-52ab5629fde7?q=80&w=800&auto=format&fit=crop",
    corner: "6",
  },
];

const UNIT = projects.length;
// Repeat 5× so infinite loop feels seamless
const CARDS = [...projects, ...projects, ...projects, ...projects, ...projects];

const CARD_W = 210;
const CARD_H = 300;
const GAP = 20;
const STRIDE = CARD_W + GAP;
const ACTIVE_SCALE = 1.30;
const SCROLL_SPEED = 0.55; // px per frame

function Suit() {
  return (
    <svg width="8" height="8" viewBox="0 0 8 8" fill="currentColor">
      <path d="M4 0 L8 4 L4 8 L0 4 Z" />
    </svg>
  );
}

export function Work() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const isHoveringRef = useRef(false);

  const inView = useInView(sectionRef, { once: true, margin: "-60px" });

  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null); // project index 0–5
  const [centerIdx, setCenterIdx] = useState(0);                     // project index 0–5

  /* ── Init scroll to middle copy so we can loop both directions ── */
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollLeft = STRIDE * UNIT * 2; // start at 3rd copy
  }, []);

  /* ── Auto-scroll + centre detection via real DOM positions ── */
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const singleBand = STRIDE * UNIT;

    const tick = () => {
      if (!isHoveringRef.current && el) {
        el.scrollLeft += SCROLL_SPEED;
        if (el.scrollLeft >= singleBand * 4) el.scrollLeft -= singleBand;
        if (el.scrollLeft < singleBand) el.scrollLeft += singleBand;
      }

      // Always re-detect centre from real bounding rects for accuracy
      const containerRect = el.getBoundingClientRect();
      const containerCenter = containerRect.left + containerRect.width / 2;
      const cards = el.querySelectorAll<HTMLElement>("[data-card-proj]");
      let closestIdx = 0;
      let closestDist = Infinity;
      cards.forEach(card => {
        const r = card.getBoundingClientRect();
        const cardCenter = r.left + r.width / 2;
        const dist = Math.abs(cardCenter - containerCenter);
        if (dist < closestDist) {
          closestDist = dist;
          closestIdx = parseInt(card.dataset.cardProj ?? "0");
        }
      });
      setCenterIdx(closestIdx);

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const activeProjectIdx = hoveredIdx !== null ? hoveredIdx : centerIdx;

  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative w-full"
      style={{ background: "#050505", paddingTop: "5rem", paddingBottom: "5rem", overflowX: "clip" }}
    >
      {/* ── Huge headline ── */}
      <div
        className="overflow-hidden"
        style={{ paddingLeft: "clamp(1.5rem,4vw,3.5rem)", paddingRight: "clamp(1.5rem,4vw,3.5rem)", marginBottom: "3rem" }}
      >
        <motion.div
          initial={{ y: "105%" }}
          animate={inView ? { y: "0%" } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-end justify-between"
        >
          <h2
            className="text-white uppercase leading-none select-none"
            style={{
              fontFamily: "'Inter Tight', sans-serif",
              fontSize: "clamp(3.5rem,10vw,11rem)",
              fontWeight: 200,
              letterSpacing: "-0.02em",
              lineHeight: 0.9,
            }}
          >
            Selected Work
          </h2>
          <div className="flex flex-col items-end pb-2 gap-1 flex-shrink-0 ml-6">
            <span className="text-white/25 font-medium uppercase tracking-[0.3em]"
              style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: "9px" }}>
              (01) — Index
            </span>
            <span className="text-white/15 font-light"
              style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: "9px", letterSpacing: "0.15em" }}>
              {UNIT} Projects
            </span>
          </div>
        </motion.div>
      </div>

      {/* Rule */}
      <motion.div
        className="h-[1px] bg-white/6"
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformOrigin: "left", marginBottom: "2.5rem" }}
      />

      {/* ── Scrolling card track ── */}
      <div
        ref={scrollRef}
        className="flex overflow-x-auto"
        style={{
          gap: GAP,
          paddingLeft: "clamp(1.5rem,4vw,3.5rem)",
          paddingRight: "clamp(1.5rem,4vw,3.5rem)",
          paddingTop: 40,
          paddingBottom: 110,  // CARD_H * (ACTIVE_SCALE-1) = 300*0.30 = 90px + buffer
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          userSelect: "none",
        }}
        onMouseEnter={() => { isHoveringRef.current = true; }}
        onMouseLeave={() => { isHoveringRef.current = false; setHoveredIdx(null); }}
      >
        {CARDS.map((project, i) => {
          const projIdx = i % UNIT;
          const isActive = projIdx === activeProjectIdx;

          return (
            <div
              key={i}
              className="flex-shrink-0 flex flex-col"
              style={{ width: CARD_W, position: "relative", zIndex: isActive ? 10 : 1 }}
              onMouseEnter={() => setHoveredIdx(projIdx)}
              onMouseLeave={() => setHoveredIdx(null)}
            >
              {/* Card — scale from top */}
              <motion.div
                data-card-proj={projIdx}
                animate={{ scale: isActive ? ACTIVE_SCALE : 1 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  width: CARD_W,
                  height: CARD_H,
                  originX: 0.5,
                  originY: 0,        /* grow downward from top edge */
                  position: "relative",
                  borderRadius: 12,
                  overflow: "hidden",
                  background: "#0c0c0c",
                  border: isActive
                    ? "1px solid rgba(255,255,255,0.2)"
                    : "1px solid rgba(255,255,255,0.07)",
                  cursor: "pointer",
                  flexShrink: 0,
                  transition: "border-color 0.3s",
                }}
              >
                {/* Top-left corner */}
                <div className="absolute top-3 left-3 z-20 flex flex-col items-center gap-[2px]"
                  style={{ color: isActive ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.45)" }}>
                  <span style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: 13, fontWeight: 700, lineHeight: 1 }}>
                    {project.corner}
                  </span>
                  <Suit />
                </div>

                {/* Bottom-right corner (rotated) */}
                <div className="absolute bottom-3 right-3 z-20 flex flex-col items-center gap-[2px]"
                  style={{ color: isActive ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.45)", transform: "rotate(180deg)" }}>
                  <span style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: 13, fontWeight: 700, lineHeight: 1 }}>
                    {project.corner}
                  </span>
                  <Suit />
                </div>

                {/* Image */}
                <img
                  src={project.image}
                  alt={project.title}
                  style={{
                    width: "100%", height: "100%", objectFit: "cover",
                    filter: isActive
                      ? "brightness(0.8) contrast(1.15) grayscale(0%)"
                      : "brightness(0.5) contrast(1.05) grayscale(35%)",
                    transition: "filter 0.4s ease",
                  }}
                />

                {/* Active glow */}
                {isActive && (
                  <div className="absolute inset-0 z-10 pointer-events-none"
                    style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.08) 0%, transparent 65%)" }} />
                )}
              </motion.div>
            </div>
          );
        })}
      </div>

      <style>{`.overflow-x-auto::-webkit-scrollbar{display:none}`}</style>
    </section>
  );
}
