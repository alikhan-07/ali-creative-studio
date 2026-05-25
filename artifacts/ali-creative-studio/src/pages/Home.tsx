import React, { useEffect } from "react";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { GlowBackground } from "@/components/ui/GlowBackground";
import { Hero } from "@/components/sections/Hero";
import { Work } from "@/components/sections/Work";
import { Services } from "@/components/sections/Services";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  useEffect(() => {
    // Add smooth scrolling to html
    document.documentElement.style.scrollBehavior = "smooth";
    return () => {
      document.documentElement.style.scrollBehavior = "auto";
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/30 selection:text-white">
      <GlowBackground />
      <Nav />
      
      <main>
        <Hero />
        <Work />
        <Services />
        <About />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
