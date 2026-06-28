import React from "react";
import { motion } from "framer-motion";

// TODO: Replace '919999999999' with your actual WhatsApp phone number (with country code, e.g. 91 for India, no spaces or +)
const WHATSAPP_NUMBER = "917999819568";
const PREFILLED_MESSAGE = "Hi Ali Creative Studio, I'm interested in discussing a design project for my brand.";

export function WhatsAppButton() {
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(PREFILLED_MESSAGE)}`;

  if (WHATSAPP_NUMBER === "919999999999") {
    // If it's the placeholder, we can log a warning in development
    console.warn("Please configure your WHATSAPP_NUMBER in src/components/ui/WhatsAppButton.tsx");
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 pointer-events-auto">
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, duration: 0.5, type: "spring", stiffness: 260, damping: 20 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white shadow-lg hover:shadow-[0_0_20px_rgba(37,211,102,0.4)] transition-shadow duration-300"
        title="Chat on WhatsApp"
      >
        {/* Pulse effect */}
        <span className="absolute inset-0 rounded-full bg-[#25D366]/20 animate-ping pointer-events-none" />

        {/* Premium SVG WhatsApp Icon */}
        <svg
          className="w-7 h-7 fill-current"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.963C16.528 2.028 14.07 1.001 11.993 1c-5.439 0-9.865 4.37-9.87 9.8-.001 1.774.475 3.42 1.378 4.894L2.482 21.03l5.521-1.446c.002-.001.002-.001.003-.001-.001 0 0 0 0 0zM17.13 13.9c-.28-.14-1.65-.81-1.91-.9-.25-.1-.44-.15-.62.12-.18.27-.7.9-.86 1.08-.16.18-.33.2-.61.06-.28-.14-1.18-.43-2.25-1.39-.83-.74-1.39-1.66-1.55-1.94-.17-.28-.02-.43.12-.57.13-.13.28-.33.42-.49.14-.16.19-.28.29-.46.1-.18.05-.33-.02-.47-.08-.14-.62-1.5-.85-2.06-.22-.53-.44-.46-.62-.47-.16-.01-.35-.01-.54-.01-.19 0-.5.07-.76.35-.26.28-1 1-1 2.44 0 1.44 1.06 2.83 1.2 3.02.15.19 2.08 3.18 5.04 4.46.7.3 1.25.48 1.68.62.71.22 1.35.19 1.86.12.57-.08 1.65-.67 1.88-1.32.23-.65.23-1.2.16-1.32-.07-.12-.25-.19-.53-.33z" />
        </svg>
      </motion.a>
    </div>
  );
}
