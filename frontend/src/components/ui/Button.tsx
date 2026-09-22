"use client";

import React, { useRef, useState } from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/utils/helpers";

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: "primary" | "ghost" | "icon";
  size?: "default" | "sm" | "lg" | "icon";
  children: React.ReactNode;
  magnetic?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "default", children, magnetic = true, ...props }, ref) => {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);

    const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!magnetic || !buttonRef.current) return;
      const rect = buttonRef.current.getBoundingClientRect();
      const h = rect.width / 2;
      const v = rect.height / 2;
      const cx = e.clientX - rect.left - h;
      const cy = e.clientY - rect.top - v;
      
      // Max pull of 8px
      setX((cx / h) * 8);
      setY((cy / v) * 8);
    };

    const handleMouseLeave = () => {
      setX(0);
      setY(0);
    };

    const variants = {
      primary: "relative overflow-hidden bg-primary-500 text-white shadow-soft-sm hover:shadow-glow-primary transition-all duration-300 hover:-translate-y-[2px] active:scale-[0.97]",
      ghost: "bg-transparent text-text-secondary hover:text-text-primary hover:bg-text-primary/5 transition-all duration-300 hover:-translate-y-[1px] active:scale-[0.97]",
      icon: "rounded-full bg-glass-fill-01 border border-glass-border hover:shadow-glow-primary transition-all duration-300 hover:border-glass-border-strong text-text-secondary hover:text-primary-400 active:scale-[0.97]",
    };

    const sizes = {
      default: "px-6 py-3 rounded-md text-button",
      sm: "px-4 py-2 rounded-sm text-button",
      lg: "px-8 py-4 rounded-lg text-button",
      icon: "w-10 h-10 flex items-center justify-center",
    };

    return (
      <motion.button
        ref={(node) => {
          // @ts-ignore
          buttonRef.current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) (ref as any).current = node;
        }}
        className={cn(
          "inline-flex items-center justify-center font-medium ring-offset-bg-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan focus-visible:ring-offset-3 disabled:pointer-events-none disabled:opacity-50",
          variants[variant],
          sizes[size],
          className
        )}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        animate={{ x, y }}
        transition={{ type: "spring", stiffness: 260, damping: 22, mass: 0.9 }}
        {...props}
      >
        <span className="relative z-10 flex items-center gap-2">{children}</span>
      </motion.button>
    );
  }
);
Button.displayName = "Button";
