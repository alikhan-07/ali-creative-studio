import React, { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface GlowBackgroundProps {
  mouseX: ReturnType<typeof useMotionValue<number>>;
  mouseY: ReturnType<typeof useMotionValue<number>>;
}

export function GlowBackground({ mouseX, mouseY }: GlowBackgroundProps) {
  // Primary blob — fast follow (liquid lead)
  const px = useSpring(mouseX, { stiffness: 80, damping: 22 });
  const py = useSpring(mouseY, { stiffness: 80, damping: 22 });

  // Secondary blob — slower, lags behind (liquid trail)
  const sx = useSpring(mouseX, { stiffness: 30, damping: 28 });
  const sy = useSpring(mouseY, { stiffness: 30, damping: 28 });

  // Tertiary blob — very slow (liquid shadow)
  const tx = useSpring(mouseX, { stiffness: 12, damping: 32 });
  const ty = useSpring(mouseY, { stiffness: 12, damping: 32 });

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Dark base */}
      <div className="absolute inset-0" style={{ background: "#050505" }} />

      {/* Dot matrix grid */}
      <div
        className="absolute inset-0 z-[2]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.13) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Primary liquid blob — follows cursor tightly */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: "38vw",
          height: "38vw",
          x: px,
          y: py,
          translateX: "-50%",
          translateY: "-50%",
          background:
            "radial-gradient(circle, rgba(200,45,10,0.85) 0%, rgba(160,30,8,0.6) 35%, transparent 70%)",
          filter: "blur(55px)",
          opacity: 0.75,
          zIndex: 3,
        }}
      />

      {/* Secondary liquid blob — lags, creates liquid stretch */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: "30vw",
          height: "30vw",
          x: sx,
          y: sy,
          translateX: "-50%",
          translateY: "-50%",
          background:
            "radial-gradient(circle, rgba(230,60,15,0.7) 0%, rgba(180,40,10,0.4) 45%, transparent 70%)",
          filter: "blur(70px)",
          opacity: 0.6,
          zIndex: 3,
        }}
      />

      {/* Tertiary blob — deep blue, very slow */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: "28vw",
          height: "28vw",
          x: tx,
          y: ty,
          translateX: "-30%",
          translateY: "-70%",
          background:
            "radial-gradient(circle, rgba(10,60,180,0.6) 0%, rgba(5,30,110,0.35) 50%, transparent 70%)",
          filter: "blur(80px)",
          opacity: 0.55,
          zIndex: 3,
        }}
      />

      {/* Static ambient — top-left faint blue anchor */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: "35vw",
          height: "35vw",
          top: "-8vw",
          left: "-8vw",
          background:
            "radial-gradient(circle, rgba(15,50,150,0.35) 0%, transparent 70%)",
          filter: "blur(90px)",
          opacity: 0.45,
          zIndex: 2,
        }}
      />

      {/* Grain overlay — filmic texture */}
      <div
        className="absolute inset-0 z-[8]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
          opacity: 0.13,
          mixBlendMode: "overlay",
        }}
      />

      {/* Top vignette */}
      <div
        className="absolute inset-0 z-[9]"
        style={{
          background:
            "linear-gradient(to bottom, rgba(5,5,5,0.82) 0%, transparent 22%, transparent 72%, rgba(5,5,5,0.88) 100%)",
        }}
      />
    </div>
  );
}
