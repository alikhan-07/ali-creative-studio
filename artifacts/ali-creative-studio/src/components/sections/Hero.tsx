import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { GlowBackground } from "@/components/ui/GlowBackground";
import { Nav } from "@/components/layout/Nav";

const PARTICLE_COUNT = 28;

function randomBetween(a: number, b: number) {
  return a + Math.random() * (b - a);
}

interface Particle {
  id: number;
  x: number;
  size: number;
  delay: number;
  duration: number;
  opacity: number;
}

const particles: Particle[] = Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
  id: i,
  x: randomBetween(2, 98),
  size: randomBetween(1, 2.5),
  delay: randomBetween(0, 8),
  duration: randomBetween(7, 18),
  opacity: randomBetween(0.12, 0.35),
}));

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  // Raw pixel cursor position (for nav display)
  const [cursorX, setCursorX] = useState(0);
  const [cursorY, setCursorY] = useState(0);

  // Motion values for gradient blobs (absolute px within hero)
  const mouseX = useMotionValue(
    typeof window !== "undefined" ? window.innerWidth / 2 : 640
  );
  const mouseY = useMotionValue(
    typeof window !== "undefined" ? window.innerHeight / 2 : 360
  );

  // Parallax for headline (very subtle)
  const headX = useSpring(useMotionValue(0), { stiffness: 20, damping: 35 });
  const headY = useSpring(useMotionValue(0), { stiffness: 20, damping: 35 });

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      // Absolute position within hero for gradient blobs
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
      // Pixel position for nav display
      setCursorX(e.clientX);
      setCursorY(e.clientY);
      // Subtle parallax offset for headline
      const cx = (e.clientX - rect.width / 2) * 0.012;
      const cy = (e.clientY - rect.height / 2) * 0.012;
      headX.set(cx);
      headY.set(cy);
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [mouseX, mouseY, headX, headY]);

  const words = ["We craft", "visually powerful", "digital experiences."];

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{ height: "100svh", minHeight: "600px" }}
      data-testid="hero-section"
    >
      {/* Gradient + dot matrix background */}
      <GlowBackground mouseX={mouseX} mouseY={mouseY} />

      {/* Nav — sits over the hero gradient */}
      <Nav cursorX={cursorX} cursorY={cursorY} />

      {/* Antigravity floating particles */}
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
              y: [0, -window.innerHeight - 20],
              opacity: [0, p.opacity, p.opacity * 0.6, 0],
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

      {/* Main headline — centered */}
      <div className="absolute inset-0 flex items-center justify-center z-20 px-6">
        <motion.div
          className="text-center"
          style={{ x: headX, y: headY }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {words.map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 38 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1.1,
                delay: 0.5 + i * 0.14,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <span
                className="block text-white font-light leading-[1.12] tracking-tight select-none"
                style={{
                  fontSize: "clamp(2.4rem, 6.5vw, 6rem)",
                  textShadow: "0 2px 40px rgba(0,0,0,0.5)",
                  fontFamily: "'Inter Tight', sans-serif",
                }}
              >
                {line}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Bottom info bar */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 z-30 px-7 md:px-10 pb-7 pt-5"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.2 }}
        style={{
          background:
            "linear-gradient(to top, rgba(5,5,5,0.75) 0%, transparent 100%)",
        }}
      >
        <div className="flex items-end justify-between gap-4">
          {/* Left toggle + metadata */}
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
                    className="text-[10px] font-medium text-white/90 tracking-[0.1em]"
                    style={{ fontFamily: "'Inter Tight', sans-serif" }}
                  >
                    {item.top}
                  </span>
                  <span
                    className="text-[10px] font-light text-white/45 tracking-[0.08em]"
                    style={{ fontFamily: "'Inter Tight', sans-serif" }}
                  >
                    {item.bottom}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Scroll arrow */}
          <motion.div
            data-testid="hero-scroll-arrow"
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="text-white/60 cursor-pointer"
            onClick={() => {
              const el = document.getElementById("work");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <svg
              width="14"
              height="22"
              viewBox="0 0 14 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line x1="7" y1="0" x2="7" y2="18" stroke="currentColor" strokeWidth="1" />
              <path d="M1 13 L7 20 L13 13" stroke="currentColor" strokeWidth="1" fill="none" />
            </svg>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
