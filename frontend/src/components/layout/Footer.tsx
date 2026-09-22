"use client";

import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { useSmoothScroll } from "@/context/SmoothScrollProvider";
import { useSiteSettings } from "@/hooks/useSiteSettings";

export function Footer() {
  const location = useLocation();
  const lenis = useSmoothScroll();
  const settings = useSiteSettings();

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (location.pathname === href) {
      e.preventDefault();
      if (lenis) {
        lenis.scrollTo(0, { immediate: false });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  return (
    <footer className="relative mt-32 pt-24 pb-12 overflow-hidden bg-bg-elevated-2 rounded-t-[3rem] border-t border-glass-border">
      <div className="absolute inset-0 bg-noise opacity-[0.03] mix-blend-overlay pointer-events-none" />
      <div className="relative z-10 max-w-[1440px] mx-auto px-5 md:px-10 lg:px-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 mb-16">
          <div className="md:col-span-4 lg:col-span-5 flex flex-col items-start h-full">
            <Link to="/" className="inline-block mb-6 group" onClick={(e) => handleLinkClick(e, "/")}>
              <span className="font-display font-bold text-[22px] tracking-[0.15em] uppercase text-text-primary group-hover:text-accent-cyan transition-colors">
                Dash-it
              </span>
            </Link>
            <p className="text-body-sm text-text-secondary max-w-[220px] leading-relaxed mb-8">
              We build websites people remember.
            </p>
            <div className="mt-auto">
              <p className="text-caption text-text-secondary mb-3 uppercase tracking-wider">Have a project in mind?</p>
              <Link to="/contact" className="group inline-flex items-center gap-2 text-button text-text-primary hover:text-accent-cyan transition-colors" onClick={(e) => handleLinkClick(e, "/contact")}>
                Let's talk
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-h6 text-text-primary mb-6">Studio</h4>
            <ul className="flex flex-col gap-3">
              <li><Link to="/work" className="text-body-sm text-text-secondary hover:text-text-primary transition-colors" onClick={(e) => handleLinkClick(e, "/work")}>Work</Link></li>
              <li><Link to="/about" className="text-body-sm text-text-secondary hover:text-text-primary transition-colors" onClick={(e) => handleLinkClick(e, "/about")}>About</Link></li>
              <li><Link to="/services" className="text-body-sm text-text-secondary hover:text-text-primary transition-colors" onClick={(e) => handleLinkClick(e, "/services")}>Services</Link></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-h6 text-text-primary mb-6">Socials</h4>
            <ul className="flex flex-col gap-3">
              <li><a href={settings.github_url} target="_blank" rel="noopener noreferrer" className="text-body-sm text-text-secondary hover:text-text-primary transition-colors group flex items-center gap-2">Github <span className="opacity-0 group-hover:opacity-100 transition-opacity text-accent-cyan transform translate-x-[-4px] group-hover:translate-x-0">↗</span></a></li>
              <li><a href={settings.linkedin_url} target="_blank" rel="noopener noreferrer" className="text-body-sm text-text-secondary hover:text-text-primary transition-colors group flex items-center gap-2">LinkedIn <span className="opacity-0 group-hover:opacity-100 transition-opacity text-accent-cyan transform translate-x-[-4px] group-hover:translate-x-0">↗</span></a></li>
              <li><a href={settings.instagram_url} target="_blank" rel="noopener noreferrer" className="text-body-sm text-text-secondary hover:text-text-primary transition-colors group flex items-center gap-2">Instagram <span className="opacity-0 group-hover:opacity-100 transition-opacity text-accent-cyan transform translate-x-[-4px] group-hover:translate-x-0">↗</span></a></li>
            </ul>
          </div>

          <div className="md:col-span-4 lg:col-span-3">
            <h4 className="text-h6 text-text-primary mb-6">Join the Team</h4>
            <p className="text-body-sm text-text-secondary mb-4">Subscribe to get notified when we are hiring for new roles.</p>
            <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-frost-line rounded-lg blur opacity-0 group-focus-within:opacity-100 transition duration-500" />
                <input
                  type="email"
                  placeholder="Email address"
                  className="relative w-full glass-2 rounded-lg px-4 py-3 text-body-sm text-text-primary focus:outline-none placeholder:text-text-secondary"
                />
              </div>
              <Button variant="primary" className="w-full bg-gradient-aurora-blue">Subscribe</Button>
            </form>
          </div>
        </div>

        <div className="relative pt-8 border-t border-glass-border flex flex-col md:flex-row items-center justify-between gap-4 pb-[var(--safe-bottom)]">
          <p className="text-caption text-text-secondary">© 2027 Dash-it. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/privacy" className="text-caption text-text-secondary hover:text-text-primary transition-colors">Privacy</Link>
            <Link to="/terms" className="text-caption text-text-secondary hover:text-text-primary transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
