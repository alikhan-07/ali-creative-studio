import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const cursorX = useMotionValue(-200);
  const cursorY = useMotionValue(-200);
  const angle = useMotionValue(0);
  const [visible, setVisible] = useState(false);

  const prevPos = useRef({ x: -200, y: -200 });
  const smoothAngle = useRef(0);

  // Smooth position — tight spring so it feels responsive
  const springX = useSpring(cursorX, { stiffness: 500, damping: 40, mass: 0.4 });
  const springY = useSpring(cursorY, { stiffness: 500, damping: 40, mass: 0.4 });

  // Smooth rotation spring
  const springAngle = useSpring(angle, { stiffness: 120, damping: 18, mass: 0.6 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const dx = e.clientX - prevPos.current.x;
      const dy = e.clientY - prevPos.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      // Only update direction when moving meaningfully
      if (dist > 3) {
        const raw = Math.atan2(dy, dx) * (180 / Math.PI);
        // +90 because SVG arrow points up (north = 0°), atan2 right = 0°
        const target = raw + 90;

        // Unwrap angle to avoid spinning the long way around
        let delta = target - smoothAngle.current;
        while (delta > 180) delta -= 360;
        while (delta < -180) delta += 360;
        smoothAngle.current += delta;
        angle.set(smoothAngle.current);
      }

      prevPos.current = { x: e.clientX, y: e.clientY };
    };

    const handleEnter = () => setVisible(true);
    const handleLeave = () => setVisible(false);

    window.addEventListener("mousemove", handleMove);
    document.documentElement.addEventListener("mouseenter", handleEnter);
    document.documentElement.addEventListener("mouseleave", handleLeave);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      document.documentElement.removeEventListener("mouseenter", handleEnter);
      document.documentElement.removeEventListener("mouseleave", handleLeave);
    };
  }, [cursorX, cursorY, angle]);

  return (
    <>
      <style>{`
        *, *::before, *::after { cursor: none !important; }
      `}</style>

      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: visible ? 1 : 0,
        }}
        animate={{ opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      >
        <motion.div style={{ rotate: springAngle }}>
          <svg
            width="22"
            height="30"
            viewBox="0 0 22 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Arrow tip */}
            <path
              d="M11 1 L20 26 L11 20 L2 26 Z"
              fill="rgba(255,255,255,0.92)"
              stroke="rgba(0,0,0,0.35)"
              strokeWidth="1.2"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
      </motion.div>
    </>
  );
}
