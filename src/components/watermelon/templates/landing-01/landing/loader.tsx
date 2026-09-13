"use client";

import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "motion/react";
import { NthtakeMark } from "@/assets/nthtake-mark";
import { useLoaderGate } from "./loader-context";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Loader() {
  const reduced = useReducedMotion();
  const { setOverlayOpen, setMarkReady } = useLoaderGate();
  const [visible, setVisible] = useState(true);
  const [drawn, setDrawn] = useState(false);
  const [progress, setProgress] = useState(0);
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("nthtake-loader")) {
      setVisible(false);
      setMarkReady(true);
      setOverlayOpen(false);
      return;
    }

    setMarkReady(false);
    setOverlayOpen(true);

    if (reduced) {
      setDrawn(true);
      setProgress(1);
      setMarkReady(true);
      const t = window.setTimeout(() => {
        sessionStorage.setItem("nthtake-loader", "1");
        setVisible(false);
        setOverlayOpen(false);
      }, 200);
      return () => window.clearTimeout(t);
    }

    const t1 = window.setTimeout(() => setDrawn(true), 40);
    const t2 = window.setTimeout(() => setProgress(0.55), 340);
    const t3 = window.setTimeout(() => {
      setProgress(1);
      setPulse(true);
    }, 720);
    const t4 = window.setTimeout(() => {
      sessionStorage.setItem("nthtake-loader", "1");
      setMarkReady(true);
      setVisible(false);
    }, 980);
    const t5 = window.setTimeout(() => setOverlayOpen(false), 1320);

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
      window.clearTimeout(t4);
      window.clearTimeout(t5);
    };
  }, [reduced, setMarkReady, setOverlayOpen]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[80] flex flex-col items-center justify-center bg-[#101010] font-mono"
          role="status"
          aria-live="polite"
          aria-label="Unlocking studio"
          initial={{ opacity: 1 }}
          exit={
            reduced
              ? { opacity: 0, transition: { duration: 0.2 } }
              : {
                  clipPath: "inset(0 0 100% 0)",
                  transition: { duration: 0.34, ease: EASE },
                }
          }
          style={{ clipPath: "inset(0 0 0% 0)" }}
        >
          <motion.div
            layoutId={reduced ? undefined : "nthtake-mark"}
            className="flex h-16 w-16 items-center justify-center text-white"
            animate={pulse && !reduced ? { scale: [1, 1.08, 1] } : { scale: 1 }}
            transition={{ duration: 0.22, ease: EASE }}
          >
            <NthtakeMark
              drawn={drawn}
              progress={progress}
              reduced={!!reduced}
              className="h-14 w-14"
            />
          </motion.div>
          <p className="text-primary mt-8 text-[11px] tracking-[0.42em]">
            TAKE 00
          </p>
          <p className="mt-3 font-sans text-4xl tracking-tight text-white md:text-5xl">
            Nthtake
          </p>
          <div className="mt-6 h-px w-32 overflow-hidden bg-white/10">
            <motion.div
              className="bg-primary h-full origin-left"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: Math.max(progress, drawn ? 0.18 : 0) }}
              transition={{ duration: 0.28, ease: EASE }}
            />
          </div>
          <p className="mt-3 text-[11px] tracking-widest text-white/40 uppercase">
            {progress >= 1 ? "Master unlocked" : "Unlocking take"}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
