"use client";

import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { useTheme } from "@/context/ThemeProvider";
import { useSmoothScroll } from "@/context/SmoothScrollProvider";
import { useAuth } from "@/context/AuthContext";
import { Sun, Moon } from "lucide-react";

const baseNavItems = [
  { name: "Work", href: "/work" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Contact", href: "/contact" },
];

import { AnimatePresence } from "framer-motion";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const lenis = useSmoothScroll();

  const navItems = user 
    ? [...baseNavItems, { name: "Admin", href: "/dashboard" }]
    : baseNavItems;

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (location.pathname === href) {
      e.preventDefault();
      if (lenis) {
        lenis.scrollTo(0, { immediate: false });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
    setMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        className="fixed top-[max(1.5rem,var(--safe-top))] left-1/2 -translate-x-1/2 z-50 max-w-[920px] w-[calc(100%-2rem)] md:w-auto"
      >
        <div
          className={`glass-2 rounded-pill flex items-center justify-between transition-all duration-300 ${scrolled ? "h-14 px-3 backdrop-blur-[28px]" : "h-16 px-4"
            }`}
        >
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 pl-3 group" onClick={(e) => handleLinkClick(e, "/")}>
            <div className="relative w-8 h-8 flex items-center justify-center overflow-hidden rounded-md">
              <motion.img
                src="/Icons/android-chrome-512x512.png"
                alt="Dash-it Logo"
                className="w-full h-full object-contain"
                whileHover={{ scale: 1.1, rotate: -5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              />
            </div>
            <span className="font-display font-bold text-[20px] tracking-widest hidden md:block uppercase mt-1 whitespace-nowrap">Dash-it</span>
          </Link>

          {/* Links */}
          <div className="hidden md:flex items-center gap-6 px-8 relative">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={(e) => handleLinkClick(e, item.href)}
                className="relative px-2 py-1 text-body-sm font-medium text-text-secondary hover:text-text-primary transition-colors z-10"
                onMouseEnter={() => setActiveItem(item.name)}
                onMouseLeave={() => setActiveItem(null)}
              >
                {activeItem === item.name && (
                  <motion.div
                    layoutId="navPill"
                    className="absolute inset-0 bg-text-primary/5 rounded-pill -z-10"
                    transition={{ type: "spring", stiffness: 260, damping: 22, mass: 0.9 }}
                  />
                )}
                {item.name}
              </Link>
            ))}
          </div>

          {/* CTA & Theme */}
          <div className="pl-8 pr-2 hidden md:flex items-center gap-4 border-l border-text-primary/10">
            <Button
              variant="ghost"
              size="icon"
              className="w-10 h-10 rounded-full"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5 text-neutral-300 hover:text-white" />
              ) : (
                <Moon className="w-5 h-5 text-neutral-700 hover:text-black" />
              )}
            </Button>
            <Button 
              variant="primary" 
              size="sm" 
              className="rounded-pill bg-gradient-aurora-blue" 
              magnetic
              onClick={() => {
                if (location.pathname === "/contact") {
                  if (lenis) lenis.scrollTo(0, { immediate: false });
                  else window.scrollTo({ top: 0, behavior: "smooth" });
                } else {
                  navigate("/contact");
                }
              }}
            >
              Start a project
            </Button>
          </div>

          {/* Mobile menu toggle */}
          <div className="md:hidden pr-2 flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="w-10 h-10 rounded-full"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5 text-neutral-300 hover:text-white" />
              ) : (
                <Moon className="w-5 h-5 text-neutral-700 hover:text-black" />
              )}
            </Button>
            <Button 
              variant="icon" 
              className="w-10 h-10 !rounded-full relative z-[60]"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle menu"
            >
              <div className="w-5 h-5 flex flex-col justify-center items-center gap-[5px]">
                <motion.span 
                  animate={mobileMenuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }} 
                  className="w-full h-[2px] bg-current rounded-full block transition-transform" 
                />
                <motion.span 
                  animate={mobileMenuOpen ? { opacity: 0 } : { opacity: 1 }} 
                  className="w-full h-[2px] bg-current rounded-full block transition-opacity" 
                />
                <motion.span 
                  animate={mobileMenuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }} 
                  className="w-full h-[2px] bg-current rounded-full block transition-transform" 
                />
              </div>
            </Button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-bg-base/80 backdrop-blur-2xl md:hidden flex flex-col pt-[calc(6rem+var(--safe-top))] px-6 pb-[calc(2rem+var(--safe-bottom))]"
          >
            <div className="flex flex-col gap-6 flex-1 justify-center">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ delay: i * 0.1, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    to={item.href}
                    onClick={(e) => handleLinkClick(e, item.href)}
                    className="text-h1 font-display block text-text-secondary hover:text-text-primary transition-colors"
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ delay: 0.4, duration: 0.4 }}
              className="mt-auto pt-8 border-t border-text-primary/10"
            >
              <Button 
                variant="primary" 
                size="lg" 
                className="w-full rounded-pill bg-gradient-aurora-blue" 
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigate("/contact");
                }}
              >
                Start a project
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
