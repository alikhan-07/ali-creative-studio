import React, { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function GlowBackground() {
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const springX = useSpring(mouseX, { stiffness: 30, damping: 40 });
  const springY = useSpring(mouseY, { stiffness: 30, damping: 40 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      mouseX.set(e.clientX / window.innerWidth);
      mouseY.set(e.clientY / window.innerHeight);
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [mouseX, mouseY]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* SVG grain filter */}
      <svg className="absolute" style={{ width: 0, height: 0 }}>
        <defs>
          <filter id="grain" x="0%" y="0%" width="100%" height="100%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.68"
              numOctaves="4"
              seed="2"
              stitchTiles="stitch"
              result="noise"
            />
            <feColorMatrix type="saturate" values="0" in="noise" result="grayNoise" />
            <feBlend in="SourceGraphic" in2="grayNoise" mode="overlay" result="blend" />
            <feComposite in="blend" in2="SourceGraphic" operator="in" />
          </filter>
        </defs>
      </svg>

      {/* Dark base */}
      <div className="absolute inset-0" style={{ background: "#0a0610" }} />

      {/* Deep blue — top left */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: "80vw",
          height: "80vw",
          top: "-20vw",
          left: "-20vw",
          background: "radial-gradient(circle, #1a3a8f 0%, #0d1f5c 35%, transparent 70%)",
          filter: "blur(60px)",
          opacity: 0.9,
          x: springX,
          y: springY,
        }}
        animate={{ scale: [1, 1.05, 1], x: [0, 20, 0], y: [0, -15, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Mid-blue sweep */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: "60vw",
          height: "60vw",
          top: "10vh",
          left: "10vw",
          background: "radial-gradient(circle, #2255c8 0%, #1040a8 40%, transparent 70%)",
          filter: "blur(80px)",
          opacity: 0.7,
        }}
        animate={{ x: [0, -30, 0], y: [0, 25, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Massive orange-red blob — right side */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: "90vw",
          height: "90vw",
          top: "-10vw",
          right: "-30vw",
          background: "radial-gradient(circle, #e84420 0%, #c83010 25%, #a02008 50%, transparent 70%)",
          filter: "blur(50px)",
          opacity: 0.95,
        }}
        animate={{ scale: [1, 1.08, 0.97, 1], x: [0, -20, 10, 0], y: [0, 30, -15, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Warm amber bridge — connecting blue and orange */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: "50vw",
          height: "50vw",
          top: "30vh",
          left: "25vw",
          background: "radial-gradient(circle, #d4500a 0%, #b03a06 40%, transparent 70%)",
          filter: "blur(90px)",
          opacity: 0.5,
        }}
        animate={{ x: [0, 40, -20, 0], y: [0, -20, 30, 0] }}
        transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Deep red — bottom right */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: "60vw",
          height: "60vw",
          bottom: "-20vw",
          right: "-10vw",
          background: "radial-gradient(circle, #8b1500 0%, #600e00 50%, transparent 70%)",
          filter: "blur(60px)",
          opacity: 0.9,
        }}
        animate={{ scale: [1, 1.1, 1], x: [0, -15, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Heavy grain overlay */}
      <div
        className="absolute inset-0 z-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundSize: "180px 180px",
          opacity: 0.18,
          mixBlendMode: "overlay",
        }}
      />

      {/* Extra grain pass for more filmic texture */}
      <div
        className="absolute inset-0 z-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n2'%3E%3CfeTurbulence type='turbulence' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n2)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundSize: "120px 120px",
          opacity: 0.1,
          mixBlendMode: "overlay",
        }}
      />

      {/* Vignette — top and bottom darken */}
      <div
        className="absolute inset-0 z-20"
        style={{
          background:
            "linear-gradient(to bottom, rgba(5,4,12,0.75) 0%, transparent 18%, transparent 75%, rgba(5,4,12,0.85) 100%)",
        }}
      />
      {/* Vignette — edges */}
      <div
        className="absolute inset-0 z-20"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 50%, rgba(5,4,12,0.5) 100%)",
        }}
      />
    </div>
  );
}
