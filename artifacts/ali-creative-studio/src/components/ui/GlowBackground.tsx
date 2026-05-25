import React from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface GlowBackgroundProps {
  mouseX: ReturnType<typeof useMotionValue<number>>;
  mouseY: ReturnType<typeof useMotionValue<number>>;
}

export function GlowBackground({ mouseX, mouseY }: GlowBackgroundProps) {
  // Red blob — fast follow
  const rx = useSpring(mouseX, { stiffness: 80, damping: 22 });
  const ry = useSpring(mouseY, { stiffness: 80, damping: 22 });

  // Blue blob — medium lag
  const bx = useSpring(mouseX, { stiffness: 30, damping: 28 });
  const by = useSpring(mouseY, { stiffness: 30, damping: 28 });

  // Off-white bloom — very slow
  const wx = useSpring(mouseX, { stiffness: 12, damping: 32 });
  const wy = useSpring(mouseY, { stiffness: 12, damping: 32 });

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Base */}
      <div className="absolute inset-0" style={{ background: "#050505" }} />

      {/* Dot matrix */}
      <div
        className="absolute inset-0 z-[2]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.11) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* RED — primary, fast, tight follow */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: "34vw",
          height: "34vw",
          x: rx,
          y: ry,
          translateX: "-50%",
          translateY: "-50%",
          background:
            "radial-gradient(circle, rgba(220,30,10,0.9) 0%, rgba(170,20,5,0.55) 45%, transparent 70%)",
          filter: "blur(50px)",
          opacity: 0.8,
          zIndex: 3,
        }}
      />

      {/* BLUE — medium lag, offset left-up from cursor */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: "30vw",
          height: "30vw",
          x: bx,
          y: by,
          translateX: "-80%",
          translateY: "-80%",
          background:
            "radial-gradient(circle, rgba(15,60,220,0.85) 0%, rgba(8,35,160,0.5) 45%, transparent 70%)",
          filter: "blur(65px)",
          opacity: 0.7,
          zIndex: 3,
        }}
      />

      {/* OFF-WHITE bloom — very slow, offset below cursor */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: "22vw",
          height: "22vw",
          x: wx,
          y: wy,
          translateX: "20%",
          translateY: "20%",
          background:
            "radial-gradient(circle, rgba(240,235,220,0.45) 0%, rgba(200,195,180,0.18) 50%, transparent 72%)",
          filter: "blur(55px)",
          opacity: 0.55,
          zIndex: 3,
        }}
      />

      {/* Static ambient — faint blue anchor top-left */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: "30vw",
          height: "30vw",
          top: "-6vw",
          left: "-6vw",
          background:
            "radial-gradient(circle, rgba(10,40,160,0.3) 0%, transparent 70%)",
          filter: "blur(80px)",
          opacity: 0.4,
          zIndex: 2,
        }}
      />

      {/* Static ambient — faint red anchor bottom-right */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: "25vw",
          height: "25vw",
          bottom: "-4vw",
          right: "-4vw",
          background:
            "radial-gradient(circle, rgba(180,20,5,0.25) 0%, transparent 70%)",
          filter: "blur(70px)",
          opacity: 0.35,
          zIndex: 2,
        }}
      />

      {/* Grain overlay */}
      <div
        className="absolute inset-0 z-[8]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
          opacity: 0.12,
          mixBlendMode: "overlay",
        }}
      />

      {/* Top/bottom vignette */}
      <div
        className="absolute inset-0 z-[9]"
        style={{
          background:
            "linear-gradient(to bottom, rgba(5,5,5,0.85) 0%, transparent 20%, transparent 75%, rgba(5,5,5,0.9) 100%)",
        }}
      />
    </div>
  );
}
