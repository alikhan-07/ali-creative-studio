import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// TODO: Paste your Google Sheets Web App URL here after publishing the Apps Script
const GOOGLE_SHEETS_URL = "https://script.google.com/macros/s/AKfycbz4IrtKlimnoQMlRqZYWhzBrBa5keFbDyUexaDIMUvnwQq6_4U_Kp4AgZnHm9gOIILW4w/exec";

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    businessName: "",
    email: "",
    contactNo: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    if (!GOOGLE_SHEETS_URL || GOOGLE_SHEETS_URL === "YOUR_GOOGLE_SHEETS_URL") {
      // If URL is not configured yet, simulate success for preview
      setTimeout(() => {
        setStatus("success");
        setFormData({ name: "", businessName: "", email: "", contactNo: "" });
      }, 1500);
      return;
    }

    try {
      await fetch(GOOGLE_SHEETS_URL, {
        method: "POST",
        mode: "no-cors", // Opaque request to bypass CORS preflight restriction
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      setStatus("success");
      setFormData({ name: "", businessName: "", email: "", contactNo: "" });
    } catch (error) {
      console.error("Submission error:", error);
      setStatus("error");
    }
  };

  return (
    <section 
      id="contact" 
      className="py-32 px-6 md:px-12 relative z-10 max-w-7xl mx-auto min-h-[90vh] flex items-center"
      style={{ background: "#050505" }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 w-full items-center">
        {/* Left Side: Copy and Trust Points */}
        <div className="lg:col-span-6 flex flex-col justify-center text-left">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Section identifier */}
            <div className="text-[10px] uppercase tracking-[0.3em] text-white/20 mb-8 font-mono">
              (04) — Initiate
            </div>

            {/* Trust point pill */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/[0.03] border border-white/8 text-xs text-white/80 font-medium tracking-wide mb-8 w-fit">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              Trusted by Startups & Growing Brands
            </div>

            {/* Heading */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-white mb-6 leading-[1.15]">
              Let’s Build Designs That <br className="hidden md:block" />
              <span className="italic text-white/80 font-serif">Actually</span> Grow Your Brand
            </h2>

            {/* Subheading */}
            <p className="text-base md:text-lg text-white/50 font-light leading-relaxed max-w-xl mb-8">
              Tell us about your project — we’ll help you create visuals that attract attention, build trust & drive results.
            </p>
          </motion.div>
        </div>

        {/* Right Side: Contact Form Card */}
        <div className="lg:col-span-6 w-full">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            className="bg-white/[0.01] border border-white/8 rounded-2xl p-8 md:p-10 backdrop-blur-xl relative overflow-hidden"
          >
            {/* Top decorative glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4/5 h-[1px] bg-gradient-to-r from-transparent via-blue-500/25 to-transparent" />

            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="py-16 text-center flex flex-col items-center justify-center"
                >
                  {/* Custom Success Checkmark SVG */}
                  <div className="w-16 h-16 bg-blue-500/10 border border-blue-500/20 rounded-full flex items-center justify-center mb-6 text-blue-400">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-light tracking-tight text-white mb-3">
                    Thank You!
                  </h3>
                  <p className="text-white/60 font-light text-sm max-w-xs mx-auto leading-relaxed">
                    We've received your request. Our strategy specialist will reach out to you shortly.
                  </p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="mt-8 text-xs uppercase tracking-widest text-white/40 hover:text-white transition-colors"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name Field */}
                    <div className="flex flex-col text-left">
                      <label className="text-[10px] uppercase tracking-wider text-white/50 mb-2 font-mono" htmlFor="name">
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        required
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="bg-white/[0.02] border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-blue-500/60 focus:bg-white/[0.04] transition-all duration-300 w-full"
                      />
                    </div>

                    {/* Business Name Field */}
                    <div className="flex flex-col text-left">
                      <label className="text-[10px] uppercase tracking-wider text-white/50 mb-2 font-mono" htmlFor="businessName">
                        Business Name
                      </label>
                      <input
                        type="text"
                        id="businessName"
                        required
                        placeholder="Acme Corp"
                        value={formData.businessName}
                        onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                        className="bg-white/[0.02] border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-blue-500/60 focus:bg-white/[0.04] transition-all duration-300 w-full"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Email Field */}
                    <div className="flex flex-col text-left">
                      <label className="text-[10px] uppercase tracking-wider text-white/50 mb-2 font-mono" htmlFor="email">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        required
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="bg-white/[0.02] border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-blue-500/60 focus:bg-white/[0.04] transition-all duration-300 w-full"
                      />
                    </div>

                    {/* Contact Number Field */}
                    <div className="flex flex-col text-left">
                      <label className="text-[10px] uppercase tracking-wider text-white/50 mb-2 font-mono" htmlFor="contactNo">
                        Contact No.
                      </label>
                      <input
                        type="tel"
                        id="contactNo"
                        required
                        placeholder="+1 (555) 000-0000"
                        value={formData.contactNo}
                        onChange={(e) => setFormData({ ...formData, contactNo: e.target.value })}
                        className="bg-white/[0.02] border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-blue-500/60 focus:bg-white/[0.04] transition-all duration-300 w-full"
                      />
                    </div>
                  </div>

                  {status === "error" && (
                    <p className="text-xs text-red-400 font-light text-left select-none pb-2 font-mono">
                      ⚠ Submission failed. Please try again.
                    </p>
                  )}

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={status === "submitting"}
                      className="w-full bg-white text-black font-semibold text-xs uppercase tracking-widest py-4.5 rounded-lg border border-transparent hover:bg-black hover:text-white hover:border-white transition-all duration-300 focus:outline-none flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {status === "submitting" ? (
                        <>
                          <svg className="animate-spin h-4 w-4 text-black" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          Processing...
                        </>
                      ) : (
                        "Book Free Strategy Discussion"
                      )}
                    </button>
                  </div>

                  {/* Privacy Policy Disclaimer */}
                  <p className="text-[11px] text-white/30 tracking-wide font-light text-center select-none pt-1">
                    Your information stays private & secure.
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

