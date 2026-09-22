import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if the document is already loaded
    if (document.readyState === "complete") {
      // Add a small delay for a smoother transition
      const timer = setTimeout(() => setIsLoading(false), 800);
      return () => clearTimeout(timer);
    } else {
      const handleLoad = () => {
        // Add a small delay for a smoother transition
        setTimeout(() => setIsLoading(false), 800);
      };
      window.addEventListener("load", handleLoad);
      return () => window.removeEventListener("load", handleLoad);
    }
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[999] flex items-center justify-center bg-bg-base"
        >
          {/* Custom Loading Animation */}
          <div className="flex flex-col items-center gap-6">
            <div className="relative flex items-center justify-center">
              {/* Outer spinning ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-16 h-16 rounded-full border-t-2 border-r-2 border-accent-cyan opacity-80"
              />
              {/* Inner pulsing logo */}
              <motion.img
                src="/Icons/android-chrome-512x512.png"
                alt="Dash-it Logo"
                animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute w-8 h-8 object-contain"
              />
            </div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-caption text-text-secondary tracking-widest uppercase"
            >
              Almost Ready
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
