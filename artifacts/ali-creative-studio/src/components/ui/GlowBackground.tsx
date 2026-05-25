import React from "react";
import { motion } from "framer-motion";

export function GlowBackground() {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden bg-background pointer-events-none">
      {/* Noise filter */}
      <svg className="hidden">
        <filter id="noiseFilter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves="3"
            stitchTiles="stitch"
          />
        </filter>
      </svg>
      <div
        className="absolute inset-0 opacity-[0.03] z-[10]"
        style={{ filter: "url(#noiseFilter)" }}
      />

      {/* Floating Orbs */}
      <motion.div
        className="absolute top-[-10%] right-[-5%] w-[40vw] h-[40vw] rounded-full blur-[120px] opacity-30"
        style={{
          background: "radial-gradient(circle, #0066FF 0%, transparent 70%)",
        }}
        animate={{
          x: [0, -30, 20, 0],
          y: [0, 40, -20, 0],
          scale: [1, 1.1, 0.9, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />

      <motion.div
        className="absolute bottom-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full blur-[140px] opacity-20"
        style={{
          background: "radial-gradient(circle, #FF6600 0%, transparent 70%)",
        }}
        animate={{
          x: [0, 40, -20, 0],
          y: [0, -30, 20, 0],
          scale: [1, 0.9, 1.1, 1],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      />

      <motion.div
        className="absolute top-[40%] left-[30%] w-[60vw] h-[20vw] rounded-full blur-[100px] opacity-20 transform -rotate-45"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(0,170,255,0.4), transparent)",
        }}
        animate={{
          x: [-100, 100, -100],
          y: [50, -50, 50],
        }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute top-[20%] right-[20%] w-[40vw] h-[15vw] rounded-full blur-[80px] opacity-10 transform rotate-12"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(255,153,0,0.4), transparent)",
        }}
        animate={{
          x: [100, -100, 100],
          y: [-30, 30, -30],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Vignette */}
      <div className="absolute inset-0 z-[5] bg-[radial-gradient(circle_at_center,transparent_0%,#050505_100%)] opacity-80" />
    </div>
  );
}
