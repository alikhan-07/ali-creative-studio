import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { GlowBackground } from "@/components/ui/GlowBackground";
import { Nav } from "@/components/layout/Nav";

const PARTICLE_COUNT = 24;

const particles = Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
  id: i,
  x: 2 + Math.random() * 96,
  size: 1 + Math.random() * 1.8,
  delay: Math.random() * 10,
  duration: 8 + Math.random() * 14,
  opacity: 0.1 + Math.random() * 0.22,
}));

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [cursorX, setCursorX] = useState(0);
  const [cursorY, setCursorY] = useState(0);

  const mouseX = useMotionValue(
    typeof window !== "undefined" ? window.innerWidth / 2 : 640
  );
  const mouseY = useMotionValue(
    typeof window !== "undefined" ? window.innerHeight / 2 : 360
  );

  const headX = useSpring(useMotionValue(0), { stiffness: 18, damping: 35 });
  const headY = useSpring(useMotionValue(0), { stiffness: 18, damping: 35 });

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
      setCursorX(e.clientX);
      setCursorY(e.clientY);
      headX.set((e.clientX - rect.width / 2) * 0.01);
      headY.set((e.clientY - rect.height / 2) * 0.01);
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [mouseX, mouseY, headX, headY]);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{ height: "100svh", minHeight: "600px" }}
      data-testid="hero-section"
    >
      <GlowBackground mouseX={mouseX} mouseY={mouseY} />
      <Nav cursorX={cursorX} cursorY={cursorY} />

      {/* Antigravity particles */}
      <div className="absolute inset-0 z-[15] pointer-events-none overflow-hidden">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-white"
            style={{
              left: `${p.x}%`,
              bottom: "-4px",
              width: p.size,
              height: p.size,
              opacity: 0,
            }}
            animate={{
              y: [0, -(typeof window !== "undefined" ? window.innerHeight : 800) - 20],
              opacity: [0, p.opacity, p.opacity * 0.5, 0],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Swiss grid headline — strict left-aligned, high contrast */}
      <div
        className="absolute inset-0 z-20"
        style={{ paddingTop: "4.5rem", paddingBottom: "6rem" }}
      >
        {/* Top grid rule */}
        <motion.div
          className="absolute left-0 right-0 h-[1px] bg-white/8"
          style={{ top: "4.5rem" }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        />

        <motion.div style={{ x: headX, y: headY }} className="h-full flex">

          {/* ── LEFT META COLUMN ── */}
          <motion.div
            className="hidden md:flex flex-col justify-between"
            style={{
              width: "clamp(90px, 12vw, 150px)",
              minWidth: 90,
              borderRight: "1px solid rgba(255,255,255,0.07)",
              paddingLeft: "clamp(1.2rem, 3vw, 2.5rem)",
              paddingTop: "clamp(1.5rem, 3vh, 2.5rem)",
              paddingBottom: "clamp(1.5rem, 3vh, 2.5rem)",
              paddingRight: "clamp(0.8rem, 2vw, 1.5rem)",
            }}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            {/* Top: reference number */}
            <div className="flex flex-col gap-1">
              <span
                className="text-white/20 font-light"
                style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: "9px", letterSpacing: "0.3em", textTransform: "uppercase" }}
              >
                No.
              </span>
              <span
                className="text-white/50 font-light"
                style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: "11px", letterSpacing: "0.15em" }}
              >
                01
              </span>
            </div>

            {/* Middle: studio name stacked */}
            <div className="flex flex-col gap-[3px]">
              {["ALI", "CREATIVE", "STUDIO"].map((w, i) => (
                <span
                  key={i}
                  className="text-white/25 font-light"
                  style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: "8px", letterSpacing: "0.28em" }}
                >
                  {w}
                </span>
              ))}
            </div>

            {/* Bottom: location + year */}
            <div className="flex flex-col gap-[3px]">
              <span
                className="text-white/20 font-light"
                style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: "8px", letterSpacing: "0.25em", textTransform: "uppercase" }}
              >
                India
              </span>
              <span
                className="text-white/15 font-light"
                style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: "8px", letterSpacing: "0.25em" }}
              >
                2024
              </span>
            </div>
          </motion.div>

          {/* ── RIGHT HEADLINE COLUMN ── */}
          <div
            className="flex-1 flex flex-col justify-center"
            style={{
              paddingLeft: "clamp(1.5rem, 4vw, 4rem)",
              paddingRight: "clamp(1.5rem, 5vw, 6rem)",
            }}
          >
            {/* Eyebrow row */}
            <motion.div
              className="flex items-center gap-3 mb-6"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="w-5 h-[1px] bg-white/35" />
              <span
                className="text-white/35 font-medium"
                style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: "8px", letterSpacing: "0.38em", textTransform: "uppercase" }}
              >
                Creative Agency — Est. 2024
              </span>
            </motion.div>

            {/* Display headline — Swiss grid rhythm */}
            <div>
              {[
                { text: "We craft",        size: "clamp(2rem,   4.8vw, 5.2rem)", weight: "200" },
                { text: "visually",        size: "clamp(3rem,   7vw,   8rem)",   weight: "700" },
                { text: "powerful digital",size: "clamp(1.6rem, 3.6vw, 4rem)",   weight: "200" },
                { text: "experiences.",    size: "clamp(2rem,   4.8vw, 5.2rem)", weight: "200" },
              ].map((line, i) => (
                <div key={i} style={{ overflow: "hidden" }}>
                  <motion.span
                    className="block text-white select-none leading-none"
                    initial={{ y: "105%", opacity: 0 }}
                    animate={{ y: "0%", opacity: 1 }}
                    transition={{ duration: 0.65, delay: 0.22 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                      fontFamily: "'Inter Tight', sans-serif",
                      fontSize: line.size,
                      fontWeight: line.weight,
                      letterSpacing: line.weight === "700" ? "-0.035em" : "-0.01em",
                      lineHeight: line.weight === "700" ? 1.0 : 1.18,
                      paddingBottom: "0.08em",
                    }}
                  >
                    {line.text}
                  </motion.span>
                </div>
              ))}
            </div>

            {/* Horizontal rule */}
            <motion.div
              className="h-[1px] bg-white/10 mt-6 mb-4"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformOrigin: "left", maxWidth: "28rem" }}
            />

            {/* Descriptor */}
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.62 }}
              className="text-white/30 font-light"
              style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontSize: "clamp(0.65rem, 0.9vw, 0.78rem)",
                letterSpacing: "0.05em",
                lineHeight: 1.65,
                maxWidth: "22rem",
              }}
            >
              Digital experiences for modern brands<br />with bold vision and precise execution.
            </motion.p>
          </div>
        </motion.div>
      </div>

      {/* Bottom info bar */}
      <motion.div
        className="absolute left-0 right-0 z-30 px-7 md:px-10 pb-4 pt-3"
        style={{ bottom: "1.5rem", background: "linear-gradient(to top, rgba(5,5,5,0.75) 0%, transparent 100%)" }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <div className="flex items-end justify-between gap-4">
          <div className="flex items-end gap-7 md:gap-10">
            <motion.button
              whileHover={{ scale: 1.15 }}
              className="flex flex-col gap-[3px] mb-0.5 cursor-pointer"
              data-testid="hero-menu-toggle"
            >
              <div className="w-5 h-[1.5px] bg-white/70 rounded-full" />
              <div className="w-3 h-[1.5px] bg-white/40 rounded-full" />
            </motion.button>

            <div className="hidden md:flex items-end gap-10 md:gap-16">
              {[
                { top: "Based in India", bottom: "Born in Creativity" },
                { top: "Design-driven", bottom: "creative studio" },
                { top: "Branding, digital", bottom: "and experiences" },
              ].map((item, i) => (
                <div key={i} className="flex flex-col gap-[2px]">
                  <span
                    className="text-[10px] font-medium text-white/90 tracking-[0.12em] uppercase"
                    style={{ fontFamily: "'Inter Tight', sans-serif" }}
                  >
                    {item.top}
                  </span>
                  <span
                    className="text-[10px] font-light text-white/40 tracking-[0.08em]"
                    style={{ fontFamily: "'Inter Tight', sans-serif" }}
                  >
                    {item.bottom}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <motion.div
            data-testid="hero-scroll-arrow"
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="text-white/50 cursor-pointer"
            onClick={() => {
              const el = document.getElementById("work");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <svg width="14" height="22" viewBox="0 0 14 22" fill="none">
              <line x1="7" y1="0" x2="7" y2="18" stroke="currentColor" strokeWidth="1" />
              <path d="M1 13 L7 20 L13 13" stroke="currentColor" strokeWidth="1" fill="none" />
            </svg>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
