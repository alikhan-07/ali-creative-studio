import React from "react";

export function Footer() {
  return (
    <footer className="py-12 px-6 md:px-12 border-t border-white/5 relative z-10 flex flex-col md:flex-row items-center justify-between text-[10px] uppercase tracking-widest text-foreground/50">
      <div>© {new Date().getFullYear()} Ali Creative Studio. All Rights Reserved.</div>
      <div className="flex items-center gap-6 mt-6 md:mt-0">
        <a href="#" className="hover:text-foreground transition-colors duration-300">Twitter</a>
        <a href="#" className="hover:text-foreground transition-colors duration-300">Instagram</a>
        <a href="#" className="hover:text-foreground transition-colors duration-300">LinkedIn</a>
      </div>
    </footer>
  );
}
