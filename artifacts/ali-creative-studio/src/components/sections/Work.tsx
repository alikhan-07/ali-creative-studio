import React, { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

const projects = [
  { num: "01", title: "Aura Dynamics", category: "Brand Identity", year: "2024", image: "/portfolio/01.webp", corner: "A" },
  { num: "02", title: "Neuro Engine", category: "Digital Platform", year: "2024", image: "/portfolio/02.webp", corner: "N" },
  { num: "03", title: "Syndicate X", category: "Identity & Web3", year: "2024", image: "/portfolio/03.webp", corner: "S" },
  { num: "04", title: "Pulse Studio", category: "UI/UX Design", year: "2024", image: "/portfolio/4.webp", corner: "P" },
  { num: "05", title: "Orbital Labs", category: "Motion & 3D", year: "2024", image: "/portfolio/5.webp", corner: "O" },
  { num: "06", title: "Cipher Works", category: "Web Development", year: "2024", image: "/portfolio/6.webp", corner: "C" },
  { num: "07", title: "Aether Brand", category: "Visual System", year: "2024", image: "/portfolio/7.webp", corner: "E" },
  { num: "08", title: "Vortex Core", category: "Motion Graphics", year: "2024", image: "/portfolio/8.webp", corner: "V" },
  { num: "09", title: "Apex Studio", category: "Graphic Design", year: "2024", image: "/portfolio/9.webp", corner: "X" },
  { num: "10", title: "Helix Design", category: "Creative Identity", year: "2024", image: "/portfolio/10.webp", corner: "H" },
  { num: "11", title: "Spectra Tech", category: "Digital Product", year: "2024", image: "/portfolio/11.webp", corner: "T" },
  { num: "12", title: "Nexus Media", category: "Social Creatives", year: "2024", image: "/portfolio/12.webp", corner: "M" },
  { num: "13", title: "Luminary Arts", category: "Packaging Design", year: "2024", image: "/portfolio/13.webp", corner: "L" },
  { num: "14", title: "Quantum Labs", category: "Identity & Web3", year: "2024", image: "/portfolio/14.webp", corner: "Q" },
  { num: "15", title: "Ignite Brand", category: "Campaign Design", year: "2024", image: "/portfolio/15.webp", corner: "I" },
  { num: "16", title: "Zenith Studio", category: "UI/UX Design", year: "2024", image: "/portfolio/16.webp", corner: "Z" },
  { num: "17", title: "Nova Platform", category: "Visual Brand", year: "2024", image: "/portfolio/17.webp", corner: "W" },
  { num: "18", title: "Echo Design", category: "Packaging Art", year: "2024", image: "/portfolio/18.webp", corner: "K" },
  { num: "19", title: "Vector Core", category: "Motion Graphics", year: "2024", image: "/portfolio/19.webp", corner: "R" },
  { num: "20", title: "Obsidian Art", category: "Creative Strategy", year: "2024", image: "/portfolio/20.webp", corner: "B" },
  { num: "21", title: "Summit Design", category: "Brand Experience", year: "2024", image: "/portfolio/21.webp", corner: "S" },
  { num: "22", title: "Velocity Platform", category: "Digital Strategy", year: "2024", image: "/portfolio/22.webp", corner: "Y" },
  { num: "23", title: "Vanguard Studio", category: "Campaign Identity", year: "2024", image: "/portfolio/23.webp", corner: "G" },
  { num: "24", title: "Elysian Labs", category: "UI/UX Architecture", year: "2024", image: "/portfolio/24.webp", corner: "F" },
  { num: "25", title: "Astra Media", category: "Visual Narrative", year: "2024", image: "/portfolio/25.webp", corner: "A" },
  { num: "26", title: "Synthesis X", category: "Platform Design", year: "2024", image: "/portfolio/26.webp", corner: "H" },
  { num: "27", title: "Krypton Labs", category: "Blockchain Interface", year: "2024", image: "/portfolio/27.webp", corner: "K" },
  { num: "28", title: "Chroma Agency", category: "Color & Identity", year: "2024", image: "/portfolio/28.webp", corner: "M" },
  { num: "29", title: "Ember Graphics", category: "Marketing Collateral", year: "2024", image: "/portfolio/29.webp", corner: "E" },
  { num: "30", title: "Matrix Core", category: "Development & Design", year: "2024", image: "/portfolio/30.webp", corner: "X" },
  { num: "31", title: "Pinnacle Brands", category: "Packaging Systems", year: "2024", image: "/portfolio/31.webp", corner: "P" },
  { num: "32", title: "Atlas Creative", category: "Corporate Identity", year: "2024", image: "/portfolio/32.webp", corner: "T" },
  { num: "33", title: "Solstice Studio", category: "Creative Campaign", year: "2024", image: "/portfolio/33.webp", corner: "D" },
  { num: "34", title: "Prism Digital", category: "Interactive Systems", year: "2024", image: "/portfolio/34.webp", corner: "W" },
  { num: "35", title: "Stellar Brand", category: "Visual Systems", year: "2024", image: "/portfolio/35.webp", corner: "R" },
  { num: "36", title: "Mirage Labs", category: "Design Concept", year: "2024", image: "/portfolio/36.webp", corner: "V" },
  { num: "37", title: "Nucleus Design", category: "Identity Systems", year: "2024", image: "/portfolio/38.webp", corner: "N" },
  { num: "38", title: "Omni Brand", category: "Digital Growth", year: "2024", image: "/portfolio/39.webp", corner: "O" },
  { num: "39", title: "Aero Media", category: "Marketing Visuals", year: "2024", image: "/portfolio/40.webp", corner: "A" },
  { num: "40", title: "Genesis Lab", category: "Web Architecture", year: "2024", image: "/portfolio/41.webp", corner: "G" },
  { num: "41", title: "Volt Studio", category: "Interactive Design", year: "2024", image: "/portfolio/42.webp", corner: "U" },
  { num: "42", title: "Apex Visuals", category: "Digital Content", year: "2024", image: "/portfolio/43.webp", corner: "V" },
  { num: "43", title: "Tectonic Identity", category: "Corporate Branding", year: "2024", image: "/portfolio/44.webp", corner: "F" },
  { num: "44", title: "Element Designs", category: "Minimalist Branding", year: "2024", image: "/portfolio/45.webp", corner: "M" },
  { num: "45", title: "Fluid Concept", category: "Fluid Brand Systems", year: "2024", image: "/portfolio/46.webp", corner: "E" },
];

const UNIT = projects.length;
// Repeat 5× so infinite loop feels seamless
const CARDS = [...projects, ...projects, ...projects, ...projects, ...projects];

const CARD_W = 240;
const CARD_H = 300;
const GAP = 20;
const STRIDE = CARD_W + GAP;
const ACTIVE_SCALE = 1.30;
const SCROLL_SPEED = 1.0; // Increased speed (px per frame)

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

  const [isMouseDown, setIsMouseDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    const el = scrollRef.current;
    if (!el) return;
    setIsMouseDown(true);
    isHoveringRef.current = true; // Stop auto-scrolling
    setStartX(e.pageX - el.offsetLeft);
    setScrollLeftState(el.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsMouseDown(false);
    isHoveringRef.current = false; // Resume auto-scrolling
    setHoveredIdx(null);
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
    isHoveringRef.current = false; // Resume auto-scrolling
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isMouseDown) return;
    const el = scrollRef.current;
    if (!el) return;
    e.preventDefault();
    const x = e.pageX - el.offsetLeft;
    const walk = (x - startX) * 1.5; // Drag speed multiplier
    el.scrollLeft = scrollLeftState - walk;
  };

  useEffect(() => {
    if (!isMouseDown) return;

    const handleGlobalMouseUp = () => {
      setIsMouseDown(false);
      isHoveringRef.current = false;
    };

    window.addEventListener("mouseup", handleGlobalMouseUp);
    return () => {
      window.removeEventListener("mouseup", handleGlobalMouseUp);
    };
  }, [isMouseDown]);

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
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => { isHoveringRef.current = true; }}
        className="flex overflow-x-auto cursor-grab active:cursor-grabbing select-none"
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
                {/* Image */}
                <img
                  src={project.image}
                  alt={project.title}
                  draggable="false"
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
