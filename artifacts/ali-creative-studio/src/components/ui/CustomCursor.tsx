import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

export function CustomCursor() {
  const cursorX = useMotionValue(-200);
  const cursorY = useMotionValue(-200);
  const angle = useMotionValue(0);
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);

  const prevPos = useRef({ x: -200, y: -200 });
  const smoothAngle = useRef(0);

  const springX = useSpring(cursorX, { stiffness: 600, damping: 45, mass: 0.3 });
  const springY = useSpring(cursorY, { stiffness: 600, damping: 45, mass: 0.3 });

  // Overlay ring follows with a slight lag for a nice peel effect
  const ringX = useSpring(cursorX, { stiffness: 180, damping: 22, mass: 0.6 });
  const ringY = useSpring(cursorY, { stiffness: 180, damping: 22, mass: 0.6 });

  const springAngle = useSpring(angle, { stiffness: 130, damping: 20, mass: 0.5 });

  useEffect(() => {
    const HOVER_SELECTORS = "a, button, [role='button'], input, textarea, select, label, [data-cursor], [tabindex]";

    const handleMove = (e: MouseEvent) => {
      const dx = e.clientX - prevPos.current.x;
      const dy = e.clientY - prevPos.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      if (dist > 3) {
        const raw = Math.atan2(dy, dx) * (180 / Math.PI) + 45;
        let delta = raw - smoothAngle.current;
        while (delta > 180) delta -= 360;
        while (delta < -180) delta += 360;
        smoothAngle.current += delta;
        angle.set(smoothAngle.current);
      }

      prevPos.current = { x: e.clientX, y: e.clientY };
    };

    const handleOver = (e: MouseEvent) => {
      if ((e.target as Element)?.closest(HOVER_SELECTORS)) {
        setHovering(true);
      }
    };

    const handleOut = (e: MouseEvent) => {
      if ((e.target as Element)?.closest(HOVER_SELECTORS)) {
        setHovering(false);
      }
    };

    const handleEnter = () => setVisible(true);
    const handleLeave = () => { setVisible(false); setHovering(false); };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseover", handleOver);
    window.addEventListener("mouseout", handleOut);
    document.documentElement.addEventListener("mouseenter", handleEnter);
    document.documentElement.addEventListener("mouseleave", handleLeave);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseover", handleOver);
      window.removeEventListener("mouseout", handleOut);
      document.documentElement.removeEventListener("mouseenter", handleEnter);
      document.documentElement.removeEventListener("mouseleave", handleLeave);
    };
  }, [cursorX, cursorY, angle]);

  return (
    <>
      <style>{`*, *::before, *::after { cursor: none !important; }`}</style>

      {/* ── Hover overlay ring — lagging behind cursor ── */}
      <motion.div
        className="fixed top-0 left-0 z-[9998] pointer-events-none rounded-full"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: hovering ? 52 : 0,
          height: hovering ? 52 : 0,
          opacity: hovering ? 1 : 0,
          border: hovering
            ? "1.5px solid rgba(255,255,255,0.55)"
            : "1.5px solid rgba(255,255,255,0)",
          backgroundColor: hovering
            ? "rgba(255,255,255,0.06)"
            : "rgba(255,255,255,0)",
        }}
        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* ── Outer glow pulse on hover ── */}
      <AnimatePresence>
        {hovering && (
          <motion.div
            className="fixed top-0 left-0 z-[9997] pointer-events-none rounded-full"
            style={{
              x: ringX,
              y: ringY,
              translateX: "-50%",
              translateY: "-50%",
              border: "1px solid rgba(255,255,255,0.18)",
            }}
            initial={{ width: 52, height: 52, opacity: 0.6 }}
            animate={{ width: 72, height: 72, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55, ease: "easeOut", repeat: Infinity, repeatDelay: 0.3 }}
          />
        )}
      </AnimatePresence>

      {/* ── Main arrow cursor ── */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: visible ? 1 : 0,
        }}
      >
        <motion.div
          style={{ rotate: springAngle }}
          animate={{ scale: hovering ? 0.7 : 1 }}
          transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
        >
          <div
            style={{
              width: 10,
              height: 10,
              transform: "scale(4)",
              transformOrigin: "center",
              imageRendering: "pixelated",
            }}
          >
            <img
              src="/cursor-arrow.png"
              alt=""
              width={10}
              height={10}
              style={{
                imageRendering: "pixelated",
                display: "block",
                width: "100%",
                height: "100%",
                mixBlendMode: "screen",
                filter: "brightness(1.1) contrast(1.2)",
              }}
            />
          </div>
        </motion.div>
      </motion.div>
    </>
  );
}
