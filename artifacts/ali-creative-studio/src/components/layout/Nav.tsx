import React from "react";
import { motion } from "framer-motion";

export function Nav() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-8 md:px-12 flex items-center justify-between pointer-events-auto"
    >
      <div className="text-[10px] uppercase tracking-[0.2em] font-medium text-foreground/80">
        Ali Creative Studio
      </div>
      <div className="hidden md:flex items-center gap-8 text-[10px] uppercase tracking-[0.2em] font-medium text-foreground/60">
        {["home", "work", "services", "about", "contact"].map((item) => (
          <button
            key={item}
            onClick={() => scrollTo(item === "home" ? "hero" : item)}
            className="hover:text-foreground transition-colors duration-300 relative group cursor-pointer"
          >
            {item}
            <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-foreground transition-all duration-300 group-hover:w-full" />
          </button>
        ))}
      </div>
    </motion.nav>
  );
}
