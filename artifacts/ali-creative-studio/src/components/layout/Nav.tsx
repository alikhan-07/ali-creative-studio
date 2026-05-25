import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

function useClock(timeZone: string) {
  const [time, setTime] = useState(() =>
    new Intl.DateTimeFormat("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      timeZone,
    }).format(new Date())
  );
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      timeZone,
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [timeZone]);
  return time;
}

const navCols = [
  [
    { label: "HOME", id: "hero", active: true },
    { label: "WORK", id: "work", active: false },
    { label: "SERVICES", id: "services", active: false },
  ],
  [
    { label: "ABOUT", id: "about", active: false },
    { label: "CONTACT", id: "contact", active: false },
  ],
];

export function Nav() {
  const mumbai = useClock("Asia/Kolkata");
  const london = useClock("Europe/London");
  const ny = useClock("America/New_York");

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, delay: 0.3 }}
      className="absolute top-0 left-0 right-0 z-50 px-7 py-6 md:px-10 flex items-start justify-between"
      data-testid="nav"
    >
      {/* Brand */}
      <div
        className="text-[11px] uppercase tracking-[0.22em] font-medium text-white/90 mt-0.5 flex items-center gap-2"
        data-testid="nav-brand"
      >
        <span>Ali Creative Studio</span>
        <span className="text-white/30 text-[9px]">|</span>
        <span className="text-white/50 normal-case tracking-[0.1em] text-[9px]">India</span>
      </div>

      {/* Nav columns — center */}
      <div className="hidden md:flex items-start gap-10">
        {navCols.map((col, ci) => (
          <div key={ci} className="flex flex-col gap-[6px]">
            {col.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                data-testid={`nav-link-${item.id}`}
                className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.22em] font-medium text-left cursor-pointer transition-colors duration-200"
                style={{ color: item.active ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.5)" }}
              >
                {item.active && (
                  <span className="text-[8px] text-white/80">▶</span>
                )}
                {item.label}
              </button>
            ))}
          </div>
        ))}
      </div>

      {/* Clocks — right */}
      <div
        className="hidden md:flex flex-col items-end gap-[5px]"
        data-testid="nav-clocks"
      >
        <div className="text-[10px] tracking-[0.18em] font-medium text-white/90">{mumbai}</div>
        <div className="text-[10px] tracking-[0.18em] font-medium text-white/40">{london}</div>
        <div className="text-[10px] tracking-[0.18em] font-medium text-white/40">{ny}</div>
      </div>
    </motion.nav>
  );
}
