"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, type Variants } from "motion/react";
import Container from "./container";
import Heading from "./heading";
import { site } from "@/content/site";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import TakePlayer from "./take-player";

const HOLD_MS = 900;

export default function HoldToUnlock() {
  const [progress, setProgress] = useState(0);
  const [locked, setLocked] = useState(true);
  const [reduced, setReduced] = useState(false);
  const raf = useRef(0);
  const start = useRef<number | null>(null);
  const value = useRef(0);
  const holding = useRef(false);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  const tick = useCallback((now: number, reverse: boolean) => {
    if (start.current == null) start.current = now;
    const delta = (now - start.current) / HOLD_MS;
    start.current = now;
    value.current = reverse
      ? Math.max(0, value.current - delta * 1.35)
      : Math.min(1, value.current + delta);
    setProgress(value.current);
    if (!reverse && value.current >= 1) {
      holding.current = false;
      setLocked(false);
      return;
    }
    if (reverse && value.current <= 0) return;
    raf.current = requestAnimationFrame((t) => tick(t, reverse));
  }, []);

  function beginHold() {
    if (!locked || holding.current) return;
    holding.current = true;
    cancelAnimationFrame(raf.current);
    start.current = null;
    raf.current = requestAnimationFrame((t) => tick(t, false));
  }

  function stopHold() {
    if (!holding.current) return;
    holding.current = false;
    cancelAnimationFrame(raf.current);
    start.current = null;
    if (value.current < 1) {
      raf.current = requestAnimationFrame((t) => tick(t, true));
    }
  }

  useEffect(() => {
    const up = () => stopHold();
    window.addEventListener("pointerup", up);
    window.addEventListener("pointercancel", up);
    return () => {
      window.removeEventListener("pointerup", up);
      window.removeEventListener("pointercancel", up);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.2, 0, 0, 1] },
    },
  };

  return (
    <section id="unlock" className="relative overflow-hidden bg-[#101010] py-24 font-mono scroll-mt-20 md:py-32">
      <div className="absolute top-0 left-0 hidden w-full border-t border-white/5 lg:block" />
      <Container className="relative z-10 mx-auto">
        <motion.div
          className="mb-8 flex flex-col items-start text-left md:items-center md:text-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div
            variants={itemVariants}
            className="mb-4 inline-flex items-center text-xs font-bold tracking-widest text-white/50 uppercase"
          >
            <span className="text-primary mr-3">{"//"}</span>
            {site.unlock.kicker}
          </motion.div>
          <motion.div variants={itemVariants}>
            <Heading as="h2" variant="big" className="text-foreground font-sans text-balance">
              {site.unlock.titleBefore}
              <span className="text-primary">{site.unlock.titleAccent}</span>
            </Heading>
          </motion.div>
          <motion.p
            variants={itemVariants}
            className="mt-6 max-w-2xl font-mono text-sm tracking-widest text-white/50 uppercase"
          >
            {site.unlock.body}
          </motion.p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative mx-auto w-full max-w-4xl border border-white/10 bg-black/40"
        >
          <div className="absolute top-0 left-0 h-2 w-2 border-t border-l border-white/40" />
          <div className="absolute top-0 right-0 h-2 w-2 border-t border-r border-white/40" />
          <div className="absolute bottom-0 left-0 h-2 w-2 border-b border-l border-white/40" />
          <div className="absolute right-0 bottom-0 h-2 w-2 border-r border-b border-white/40" />

          <div className="flex h-12 items-center border-b border-white/10 bg-white/5 px-4">
            <div className="flex gap-2">
              <div className="h-2 w-2 bg-white/20" />
              <div className="h-2 w-2 bg-white/20" />
              <div className="h-2 w-2 bg-white/20" />
            </div>
            <p className="flex-1 text-center font-mono text-[10px] tracking-widest text-white/50 uppercase">
              {site.unlock.url}
            </p>
            <div className="w-10" />
          </div>

          <TakePlayer
            locked={locked}
            progress={progress}
            reduced={reduced}
            lockedLabel={site.unlock.lockedLabel}
            unlockedLabel={site.unlock.unlockedLabel}
            onHoldStart={() => {
              if (reduced) {
                value.current = 1;
                setProgress(1);
                setLocked(false);
                return;
              }
              beginHold();
            }}
            onHoldEnd={stopHold}
          />

          <div className="flex flex-wrap items-center gap-4 border-t border-white/10 p-4">
            {locked ? (
              <button
                type="button"
                className="relative min-w-[220px] overflow-hidden border border-white/20 px-6 py-3 text-xs font-bold tracking-widest text-white uppercase"
                onPointerDown={() => {
                  if (reduced) {
                    value.current = 1;
                    setProgress(1);
                    setLocked(false);
                    return;
                  }
                  beginHold();
                }}
              >
                <span
                  className="bg-primary absolute inset-0 origin-left"
                  style={{ transform: `scaleX(${progress})` }}
                />
                <span className="relative mix-blend-difference">{site.unlock.holdLabel}</span>
              </button>
            ) : (
              <ShimmerButton
                type="button"
                className="rounded-none px-6 py-3 text-xs font-bold tracking-widest uppercase"
                onClick={() => {
                  setLocked(true);
                  value.current = 0;
                  setProgress(0);
                }}
              >
                Lock preview
              </ShimmerButton>
            )}
            <p className="font-mono text-[10px] tracking-widest text-white/40 uppercase">
              {locked
                ? reduced
                  ? "Click once to unlock."
                  : "Hold ~0.9s. Release early to ease back."
                : "Watermark off. Lock to preview again."}
            </p>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
