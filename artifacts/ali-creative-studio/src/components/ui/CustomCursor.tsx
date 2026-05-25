import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const cursorX = useMotionValue(-200);
  const cursorY = useMotionValue(-200);
  const angle = useMotionValue(0);
  const [visible, setVisible] = useState(false);

  const prevPos = useRef({ x: -200, y: -200 });
  const smoothAngle = useRef(0);

  const springX = useSpring(cursorX, { stiffness: 600, damping: 45, mass: 0.3 });
  const springY = useSpring(cursorY, { stiffness: 600, damping: 45, mass: 0.3 });
  const springAngle = useSpring(angle, { stiffness: 130, damping: 20, mass: 0.5 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const dx = e.clientX - prevPos.current.x;
      const dy = e.clientY - prevPos.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      if (dist > 3) {
        // atan2 gives: right=0°, down=90°, left=±180°, up=-90°
        // Arrow image naturally points northeast (upper-right = -45° in atan2)
        // offset = +45 so that when mouse goes right (0°), arrow points right (45° CW from NE = East)
        const raw = Math.atan2(dy, dx) * (180 / Math.PI) + 45;

        let delta = raw - smoothAngle.current;
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
      <style>{`*, *::before, *::after { cursor: none !important; }`}</style>

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
        <motion.div style={{ rotate: springAngle }}>
          {/*
            Pixelated effect: render image at 10×10 inside a 10×10 box,
            then scale the box up 4× — image-rendering: pixelated makes
            every pixel a hard square block.
          */}
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
