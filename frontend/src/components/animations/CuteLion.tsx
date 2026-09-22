import React from 'react';
import { motion } from 'framer-motion';

export const CuteLion: React.FC = () => {
  return (
    <div className="relative w-64 h-64 mx-auto">
      <motion.svg 
        viewBox="0 0 200 200" 
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-2xl"
        initial={{ y: 0 }}
        animate={{ y: [0, 8, 0] }}
        transition={{ 
          duration: 4, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      >
        {/* Mane (Slowly rotating/breathing) */}
        <motion.path
          d="M100 20 C140 20, 180 50, 180 100 C180 150, 140 180, 100 180 C60 180, 20 150, 20 100 C20 50, 60 20, 100 20 Z"
          fill="#F59E0B"
          animate={{ 
            scale: [1, 1.05, 1],
            rotate: [0, 2, -2, 0]
          }}
          transition={{ 
            duration: 6, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        />
        
        {/* Face */}
        <circle cx="100" cy="105" r="50" fill="#FCD34D" />
        
        {/* Ears */}
        <circle cx="65" cy="75" r="15" fill="#FCD34D" />
        <circle cx="135" cy="75" r="15" fill="#FCD34D" />
        <circle cx="65" cy="75" r="8" fill="#F59E0B" />
        <circle cx="135" cy="75" r="8" fill="#F59E0B" />

        {/* Sleepy Eyes (Sluggish Blink) */}
        <motion.path 
          d="M 75 100 Q 85 95 95 100" 
          stroke="#78350F" 
          strokeWidth="4" 
          strokeLinecap="round" 
          fill="transparent"
          animate={{
            d: [
              "M 75 100 Q 85 95 95 100", // Open-ish
              "M 75 102 Q 85 105 95 102", // Closed
              "M 75 102 Q 85 105 95 102", // Stay closed
              "M 75 100 Q 85 95 95 100", // Open-ish
            ]
          }}
          transition={{ duration: 5, repeat: Infinity, times: [0, 0.1, 0.9, 1] }}
        />
        <motion.path 
          d="M 105 100 Q 115 95 125 100" 
          stroke="#78350F" 
          strokeWidth="4" 
          strokeLinecap="round" 
          fill="transparent"
          animate={{
            d: [
              "M 105 100 Q 115 95 125 100", // Open-ish
              "M 105 102 Q 115 105 125 102", // Closed
              "M 105 102 Q 115 105 125 102", // Stay closed
              "M 105 100 Q 115 95 125 100", // Open-ish
            ]
          }}
          transition={{ duration: 5, repeat: Infinity, times: [0, 0.1, 0.9, 1] }}
        />

        {/* Nose */}
        <path d="M 90 115 L 110 115 L 100 125 Z" fill="#78350F" />

        {/* Mouth (Sad/Sluggish) */}
        <path d="M 95 130 Q 100 135 105 130" stroke="#78350F" strokeWidth="3" strokeLinecap="round" fill="transparent" />

        {/* Zzzzzs */}
        <motion.g
          initial={{ opacity: 0, x: 130, y: 50, scale: 0.5 }}
          animate={{ 
            opacity: [0, 1, 0], 
            x: [130, 150, 160], 
            y: [50, 20, 0],
            scale: [0.5, 1, 1.5]
          }}
          transition={{ duration: 4, repeat: Infinity, delay: 0 }}
        >
          <text x="0" y="0" fill="#FCD34D" fontSize="24" fontWeight="bold">Z</text>
        </motion.g>
        <motion.g
          initial={{ opacity: 0, x: 130, y: 50, scale: 0.5 }}
          animate={{ 
            opacity: [0, 1, 0], 
            x: [130, 140, 150], 
            y: [50, 30, 10],
            scale: [0.5, 0.8, 1.2]
          }}
          transition={{ duration: 4, repeat: Infinity, delay: 2 }}
        >
          <text x="0" y="0" fill="#FCD34D" fontSize="18" fontWeight="bold">z</text>
        </motion.g>

      </motion.svg>
    </div>
  );
};
