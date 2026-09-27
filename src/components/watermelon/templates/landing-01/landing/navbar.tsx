"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu01Icon, Cancel01Icon } from "hugeicons-react";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { cn } from "@/lib/utils";
import { NthtakeMark } from "@/assets/nthtake-mark";
import { site } from "@/content/site";
import { useLoaderGate } from "./loader-context";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [markHover, setMarkHover] = useState(false);
  const { markReady } = useLoaderGate();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 20);
  });

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [mobileMenuOpen]);

  return (
    <header
      className={cn(
        "fixed top-0 right-0 left-0 z-50 border-b transition-all duration-300",
        scrolled
          ? "border-border/50 bg-background/80 py-3 shadow-sm backdrop-blur-md"
          : "border-transparent bg-transparent py-5",
      )}
    >
      <div className="container mx-auto flex h-12 items-center justify-between px-4 md:px-8 lg:px-12 xl:px-16">
        <Link
          href="#top"
          className="group flex items-center gap-3"
          onMouseEnter={() => setMarkHover(true)}
          onMouseLeave={() => setMarkHover(false)}
          onFocus={() => setMarkHover(true)}
          onBlur={() => setMarkHover(false)}
        >
          <div className="relative flex h-8 w-8 items-center justify-center">
            {markReady && (
              <motion.div
                layoutId="nthtake-mark"
                className="flex h-8 w-8 items-center justify-center text-primary"
                transition={{ type: "spring", stiffness: 260, damping: 26 }}
              >
                <NthtakeMark
                  state={markHover ? "locked" : "unlocked"}
                  className="h-8 w-8"
                />
              </motion.div>
            )}
          </div>
          <span className="font-mono text-sm font-bold tracking-widest uppercase">
            {site.name}
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {site.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-mono text-xs tracking-widest text-white/50 uppercase transition-colors hover:text-white focus-visible:text-white focus-visible:outline-none"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="#access"
            className="bg-primary text-primary-foreground flex h-10 items-center px-6 font-mono text-xs font-bold tracking-widest uppercase transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary active:scale-[0.96]"
          >
            {site.hero.waitlistCta}
          </Link>
        </nav>

        <div className="flex items-center gap-4 md:hidden">
          <button
            className="p-1 text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? (
              <Cancel01Icon className="h-6 w-6" />
            ) : (
              <Menu01Icon className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <>
          <button
            type="button"
            className="absolute top-full right-0 left-0 h-screen bg-black/60 md:hidden"
            aria-label="Close menu"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="absolute top-full right-0 left-0 z-10 flex flex-col gap-4 border-b border-border/50 bg-background p-4 shadow-lg md:hidden">
            {site.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="font-mono text-xs tracking-widest text-white/70 uppercase"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="#access"
              onClick={() => setMobileMenuOpen(false)}
              className="bg-primary text-primary-foreground mt-2 w-full px-4 py-4 text-center font-mono text-xs font-bold tracking-widest uppercase"
            >
              {site.hero.waitlistCta}
            </Link>
          </div>
        </>
      )}
    </header>
  );
}
