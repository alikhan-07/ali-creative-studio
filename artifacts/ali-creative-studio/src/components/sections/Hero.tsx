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
        className="absolute inset-0 z-20 flex flex-col justify-center"
        style={{ paddingLeft: "clamp(2rem, 6vw, 7rem)", paddingRight: "clamp(2rem, 6vw, 7rem)", paddingTop: "5rem", paddingBottom: "6rem" }}
      >
        <motion.div style={{ x: headX, y: headY }}>

          {/* Eyebrow label — Swiss rule */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex items-center gap-4 mb-6"
          >
            <div className="w-8 h-[1px] bg-white/60" />
            <span
              className="text-[10px] uppercase tracking-[0.35em] font-medium text-white/60"
              style={{ fontFamily: "'Inter Tight', sans-serif" }}
            >
              Creative Agency — Est. 2024
            </span>
          </motion.div>

          {/* Main headline — editorial, elegant, mixed weight */}
          <div>
            {[
              { text: "We craft visually", weight: "300", italic: false },
              { text: "powerful digital", weight: "400", italic: true },
              { text: "experiences.", weight: "300", italic: false },
            ].map((line, i) => (
              <div key={i} style={{ overflow: "hidden" }}>
                <motion.span
                  className="block text-white select-none"
                  initial={{ y: "105%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  transition={{
                    duration: 0.7,
                    delay: 0.1 + i * 0.08,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  style={{
                    fontSize: "clamp(2rem, 4.8vw, 5.4rem)",
                    fontWeight: line.weight,
                    fontStyle: line.italic ? "italic" : "normal",
                    fontFamily: "'Inter Tight', sans-serif",
                    lineHeight: 1.1,
                    letterSpacing: "-0.02em",
                  }}
                >
                  {line.text}
                </motion.span>
              </div>
            ))}
          </div>

          {/* Divider line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: "left" }}
            className="mt-8 mb-6 h-[1px] bg-white/20 w-full max-w-lg"
          />

          {/* Descriptor — light weight, Swiss grid offset */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.05 }}
            className="text-white/50 font-light leading-relaxed max-w-sm"
            style={{
              fontSize: "clamp(0.75rem, 1.1vw, 0.9rem)",
              fontFamily: "'Inter Tight', sans-serif",
              letterSpacing: "0.02em",
            }}
          >
            Digital experiences for modern brands
            <br />with bold vision and precise execution.
          </motion.p>
        </motion.div>
      </div>

      {/* Bottom info bar */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 z-30 px-7 md:px-10 pb-7 pt-5"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.2 }}
        style={{
          background: "linear-gradient(to top, rgba(5,5,5,0.75) 0%, transparent 100%)",
        }}
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
