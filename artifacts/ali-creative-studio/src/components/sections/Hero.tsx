import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { GlowBackground } from "@/components/ui/GlowBackground";
import { Nav } from "@/components/layout/Nav";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const orbX = useSpring(mouseX, { stiffness: 15, damping: 30 });
  const orbY = useSpring(mouseY, { stiffness: 15, damping: 30 });

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = (e.clientX - rect.left - rect.width / 2) * 0.025;
      const cy = (e.clientY - rect.top - rect.height / 2) * 0.025;
      mouseX.set(cx);
      mouseY.set(cy);
    };
    el.addEventListener("mousemove", handleMove);
    return () => el.removeEventListener("mousemove", handleMove);
  }, [mouseX, mouseY]);

  const words = ["We craft", "visually powerful", "digital experiences."];

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{ height: "100svh", minHeight: "600px" }}
      data-testid="hero-section"
    >
      {/* Gradient background */}
      <GlowBackground />

      {/* Nav — inside hero so it sits over the gradient */}
      <Nav />

      {/* Main headline — centered */}
      <div className="absolute inset-0 flex items-center justify-center z-20 px-6">
        <motion.div
          className="text-center"
          style={{ x: orbX, y: orbY }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {words.map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1.1,
                delay: 0.5 + i * 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <span
                className="block text-white font-light leading-[1.12] tracking-tight select-none"
                style={{
                  fontSize: "clamp(2.4rem, 6.5vw, 6rem)",
                  textShadow: "0 2px 40px rgba(0,0,0,0.4)",
                  fontFamily: "'Inter Tight', sans-serif",
                }}
              >
                {line}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Floating glass orb */}
      <motion.div
        className="absolute z-30 pointer-events-none"
        style={{
          width: "clamp(100px, 16vw, 220px)",
          height: "clamp(100px, 16vw, 220px)",
          left: "38%",
          top: "42%",
          x: orbX,
          y: orbY,
        }}
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.6, delay: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Outer ring */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            border: "1px solid rgba(255,255,255,0.18)",
            boxShadow: "inset 0 0 40px rgba(255,255,255,0.04), 0 0 60px rgba(0,0,0,0.2)",
            backdropFilter: "blur(6px)",
            background:
              "radial-gradient(circle at 35% 35%, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.02) 50%, transparent 70%)",
          }}
        />
        {/* Inner highlight arc */}
        <div
          className="absolute rounded-full"
          style={{
            top: "8%",
            left: "12%",
            width: "40%",
            height: "35%",
            background:
              "radial-gradient(ellipse, rgba(255,255,255,0.22) 0%, transparent 80%)",
            filter: "blur(4px)",
            transform: "rotate(-20deg)",
          }}
        />
        {/* Reflection dot */}
        <div
          className="absolute rounded-full"
          style={{
            top: "18%",
            left: "22%",
            width: "8%",
            height: "8%",
            background: "rgba(255,255,255,0.55)",
            filter: "blur(2px)",
          }}
        />
      </motion.div>

      {/* Bottom info bar */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 z-30 px-7 md:px-10 pb-7 pt-5"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.2 }}
        style={{
          background:
            "linear-gradient(to top, rgba(5,4,12,0.6) 0%, transparent 100%)",
        }}
      >
        <div className="flex items-end justify-between gap-4">
          {/* Left toggle icon */}
          <div className="flex items-end gap-7 md:gap-10">
            <motion.button
              whileHover={{ scale: 1.15 }}
              className="flex flex-col gap-[3px] mb-0.5 cursor-pointer"
              data-testid="hero-menu-toggle"
            >
              <div className="w-5 h-[1.5px] bg-white/70 rounded-full" />
              <div className="w-3 h-[1.5px] bg-white/40 rounded-full" />
            </motion.button>

            {/* Metadata columns */}
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
                    className="text-[10px] font-light text-white/50 tracking-[0.08em]"
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
            className="text-white/70 cursor-pointer"
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
              <line
                x1="7"
                y1="0"
                x2="7"
                y2="18"
                stroke="currentColor"
                strokeWidth="1"
              />
              <path
                d="M1 13 L7 20 L13 13"
                stroke="currentColor"
                strokeWidth="1"
                fill="none"
              />
            </svg>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
