import React from 'react';
import { motion } from "framer-motion";

interface HeroProfileProps {
  developerName?: string;
}

export function HeroProfile({ developerName = "PRINCE ARYAN" }: HeroProfileProps) {
  const nameString = `• ${developerName.toUpperCase()} `.repeat(4);
  return (
    <div className="relative w-full h-full min-h-[400px] md:min-h-[600px] flex items-center justify-center pointer-events-none">
      {/* Ambient background glow - removed for cleaner aesthetic */}

      {/* Profile Picture Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="relative z-10 w-64 h-64 md:w-80 md:h-80 lg:w-[400px] lg:h-[400px] rounded-full p-2"
      >
        {/* Animated Gradient Border */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#9D5CFF] via-[#5A7BFF] to-[#FF6CAB] opacity-70 blur-sm"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 rounded-full bg-gradient-to-br from-[#FF6CAB] via-[#9D5CFF] to-[#5A7BFF] opacity-50 blur-md"
        />

        {/* Image wrapper */}
        <div className="relative w-full h-full rounded-full overflow-hidden bg-bg-base/80 backdrop-blur-xl border border-glass-border shadow-glow-primary flex items-center justify-center">
          <img
            src="/Profile-Light.png"
            alt="Developer Profile Light"
            className="absolute inset-0 w-full h-full object-cover rounded-full profile-light transition-opacity duration-500"
            style={{
              pointerEvents: 'auto',
              filter: 'contrast(1.1) brightness(0.9) saturate(1.2)'
            }}
          />
          <img
            src="/Profile-Dark.png"
            alt="Developer Profile Dark"
            className="absolute inset-0 w-full h-full object-cover rounded-full profile-dark transition-opacity duration-500"
            style={{
              pointerEvents: 'auto',
              filter: 'contrast(1.1) brightness(0.9) saturate(1.2)'
            }}
          />
          {/* Subtle overlay for tech/hacker aesthetic */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary-500/5 to-primary-500/10 mix-blend-overlay pointer-events-none" />
        </div>

        {/* Circular Animated Text */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute inset-[-15%] md:inset-[-20%] pointer-events-none z-20"
        >
          <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
            <path
              id="circularTextPath"
              d="M 50, 50 m -42, 0 a 42,42 0 1,1 84,0 a 42,42 0 1,1 -84,0"
              fill="none"
            />
            <text
              className="font-bold uppercase text-text-primary transition-colors duration-1000 ease-in-out"
              fill="currentColor"
              fontSize="6.8"
              letterSpacing="0.25em"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              <textPath href="#circularTextPath" startOffset="0%" textAnchor="start" textLength="263" lengthAdjust="spacing">
                {nameString}
              </textPath>
            </text>
          </svg>
        </motion.div>
      </motion.div>
    </div>
  );
}
