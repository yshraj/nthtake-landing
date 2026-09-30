"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // At the very top, always show
      if (currentScrollY < 50) {
        setIsVisible(true);
        setLastScrollY(currentScrollY);
        return;
      }
      
      // Threshold to prevent flickering (10px)
      if (Math.abs(currentScrollY - lastScrollY) < 10) {
        return;
      }

      if (currentScrollY > lastScrollY) {
        // Scrolling down
        setIsVisible(false);
      } else {
        // Scrolling up
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <>
      <nav className={`fixed z-50 top-6 inset-x-4 max-w-5xl mx-auto h-16 bg-background/70 backdrop-blur-md border border-border/50 rounded-full px-4 sm:px-6 flex items-center justify-between shadow-sm transition-transform duration-300 ease-in-out ${
        isVisible || isOpen ? "translate-y-0" : "-translate-y-[150%]"
      }`}>
        <Link href="/" className="flex items-center gap-2.5 relative z-50">
          {/* EditTrack V4 — Pill Playhead: rounded bars + rounded cut + circle marker */}
          <svg
            width="32"
            height="32"
            viewBox="0 0 256 256"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="EditTrack"
          >
            <defs>
              {/* Rounded negative-space cut for the playhead */}
              <mask id="navbar-playhead-cut">
                <rect x="0" y="0" width="256" height="256" fill="white"/>
                <rect x="148" y="16" width="16" height="224" rx="8" fill="black"/>
              </mask>
            </defs>
            {/* Three timeline tracks with rounded cut applied */}
            <g mask="url(#navbar-playhead-cut)">
              {/* Track 1: thin (text/title track) */}
              <rect x="24" y="52" width="208" height="24" rx="8" fill="#3A3530"/>
              {/* Track 2: primary / video track (tallest) */}
              <rect x="24" y="88" width="208" height="72" rx="8" fill="#111111"/>
              {/* Track 3: audio track */}
              <rect x="24" y="172" width="208" height="36" rx="8" fill="#3A3530"/>
            </g>
            {/* Playhead stem — pill shaped */}
            <rect x="152" y="44" width="8" height="168" rx="4" fill="#C65A32"/>
            {/* Playhead marker — circle dot */}
            <circle cx="156" cy="34" r="9" fill="#C65A32"/>
          </svg>
          <span className="text-xl tracking-tight leading-none">
            <span className="font-serif italic text-primary">Edit</span><span className="font-heading font-bold text-foreground">Track</span>
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
          <Link href="#features" className="hover:text-foreground transition-colors">Features</Link>
          <Link href="#workflow" className="hover:text-foreground transition-colors">Workflow</Link>
          <Link href="#pricing" className="hover:text-foreground transition-colors">Pricing</Link>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <a href="#cta" className="text-sm font-medium text-foreground hover:opacity-80 transition-opacity">
            Sign In
          </a>
          <a href="#cta" className="bg-foreground text-background px-5 py-2.5 rounded-full text-sm font-medium hover:bg-foreground/90 transition-colors">
            Join Waitlist
          </a>
        </div>

        {/* Mobile Toggle */}
        <button 
          onClick={toggleMenu}
          className="md:hidden relative z-50 p-2 text-foreground"
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-background pt-32 px-6 flex flex-col md:hidden h-dvh w-full overflow-y-auto">
          <div className="flex flex-col gap-6 text-xl font-medium text-muted-foreground">
            <Link href="#features" onClick={toggleMenu} className="hover:text-foreground transition-colors">Features</Link>
            <Link href="#workflow" onClick={toggleMenu} className="hover:text-foreground transition-colors">Workflow</Link>
            <Link href="#pricing" onClick={toggleMenu} className="hover:text-foreground transition-colors">Pricing</Link>
          </div>
          <div className="flex flex-col gap-4 mt-8 pt-8 border-t border-border/50">
            <a href="#cta" onClick={toggleMenu} className="w-full py-4 rounded-full border border-border text-foreground font-medium text-lg text-center">
              Sign In
            </a>
            <a href="#cta" onClick={toggleMenu} className="w-full py-4 rounded-full bg-foreground text-background font-medium text-lg text-center">
              Join Waitlist
            </a>
          </div>
        </div>
      )}
    </>
  );
}
