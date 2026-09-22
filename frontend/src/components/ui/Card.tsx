"use client";

import React from "react";
import { cn } from "@/utils/helpers";
import { motion } from "framer-motion";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  level?: 1 | 2 | 3;
  hoverable?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, level = 1, hoverable = false, children, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        className={cn(
          "relative overflow-hidden group transition-all duration-300",
          level === 1 && "glass-1 rounded-lg",
          level === 2 && "glass-2 rounded-xl",
          level === 3 && "glass-3 rounded-2xl",
          hoverable && "hover:-translate-y-1 hover:shadow-glow-primary",
          className
        )}
        {...props as any}
      >
        {children}
      </motion.div>
    );
  }
);
Card.displayName = "Card";
