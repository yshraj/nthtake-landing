"use client";

import { useState } from "react";
import { motion, type Variants, AnimatePresence } from "motion/react";
import { Play } from "lucide-react";
import Heading from "./heading";
import Container from "./container";
import { cn } from "@/lib/utils";
import { site } from "@/content/site";
import TakePlate, { TAKE_FRAMES } from "./take-plate";

const MARKERS = [
  { id: 1, x: "38%", y: "45%", text: "Make the lighting slightly darker here.", time: "00:18" },
  { id: 2, x: "62%", y: "28%", text: "Can we shift this focus earlier?", time: "00:32" },
  { id: 3, x: "50%", y: "70%", text: "Color grade feels a bit too warm.", time: "00:47" },
];

export default function ComponentsBento() {
  const [activeMarker, setActiveMarker] = useState<number>(1);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
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

  const frame = TAKE_FRAMES[2]; // Night exterior

  return (
    <section id="feedback" className="relative overflow-hidden bg-[#101010] py-24 font-mono scroll-mt-20 md:py-32">
      <div className="absolute top-0 left-0 hidden w-full border-t border-white/5 lg:block" />
      <div className="absolute bottom-0 left-0 hidden w-full border-b border-white/5 lg:block" />

      <Container className="relative z-10 mx-auto">
        <motion.div
          className="mb-12 flex flex-col items-start text-left md:items-center md:text-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div
            variants={itemVariants}
            className="mb-8 inline-flex items-center text-xs font-bold tracking-widest text-white/50 uppercase"
          >
            <span className="text-primary mr-3">{"//"}</span>
            {site.review.kicker}
          </motion.div>
          <motion.div variants={itemVariants}>
            <Heading as="h2" variant="big" className="text-balance font-sans text-foreground">
              {site.review.titleBefore}
              <span className="text-primary">{site.review.titleAccent}</span>
            </Heading>
          </motion.div>
          <motion.p
            variants={itemVariants}
            className="mt-6 max-w-lg text-pretty font-mono text-sm tracking-widest text-white/50 uppercase leading-relaxed"
          >
            {site.review.body}
          </motion.p>
        </motion.div>

        <motion.div
          className="mx-auto w-full max-w-4xl"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          <motion.div
            variants={itemVariants}
            className="group relative border border-white/10 bg-black/40 backdrop-blur-md transition-colors duration-300 hover:bg-white/2"
          >
            <div className="absolute top-0 left-0 h-2 w-2 border-t border-l border-white/40"></div>
            <div className="absolute top-0 right-0 h-2 w-2 border-t border-r border-white/40"></div>
            <div className="absolute bottom-0 left-0 h-2 w-2 border-b border-l border-white/40"></div>
            <div className="absolute bottom-0 right-0 h-2 w-2 border-b border-r border-white/40"></div>

            <div className="p-4 md:p-8">
              <div className="relative w-full shadow-2xl">
                <TakePlate
                  n={frame.n}
                  label={frame.label}
                  src={frame.src}
                  alt={frame.alt}
                  locked={false}
                  watermarked={true}
                  unlocked={false}
                  showNumber={false}
                  className="w-full"
                />
                
                {/* Overlay for markers */}
                <div className="absolute inset-0 pointer-events-none p-1.5">
                  <div className="relative w-full h-full pointer-events-auto">
                    {MARKERS.map((marker) => (
                      <button
                        key={marker.id}
                        onClick={() => setActiveMarker(marker.id)}
                        className={cn(
                          "absolute flex h-6 w-6 md:h-8 md:w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-[10px] md:text-xs font-bold transition-all shadow-lg",
                          activeMarker === marker.id
                            ? "bg-primary text-primary-foreground scale-110 z-20 shadow-primary/20 ring-4 ring-primary/20"
                            : "bg-black/60 text-white hover:bg-black/80 hover:scale-105 z-10 backdrop-blur-md border border-white/20"
                        )}
                        style={{ left: marker.x, top: marker.y }}
                      >
                        {marker.id}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Comment Panel Overlay */}
                <div className="absolute bottom-4 left-4 right-4 md:bottom-8 md:left-8 md:right-auto pointer-events-none z-30">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeMarker}
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="pointer-events-auto w-full md:w-80 flex flex-col gap-2 rounded-sm border border-white/10 bg-black/80 backdrop-blur-xl p-4 shadow-2xl"
                    >
                      <div className="flex items-center justify-between border-b border-white/10 pb-3">
                        <div className="flex items-center gap-2">
                          <span className="flex h-5 w-5 items-center justify-center rounded-sm bg-primary/20 text-[10px] font-bold text-primary">
                            {activeMarker}
                          </span>
                          <span className="text-[10px] font-bold tracking-widest text-white/50 uppercase">
                            Client Comment
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 rounded-full bg-white/5 px-2 py-0.5 border border-white/10">
                          <Play className="h-2.5 w-2.5 fill-white/40 text-white/40" />
                          <span className="text-[10px] font-mono tracking-wider text-white/40">
                            {MARKERS.find((m) => m.id === activeMarker)?.time}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm font-sans text-white/90 leading-snug">
                        "{MARKERS.find((m) => m.id === activeMarker)?.text}"
                      </p>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>

            <div className="border-t border-white/10 bg-black/20 p-4 md:px-8">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold tracking-widest text-primary uppercase">
                    Take 03
                  </span>
                  <span className="text-xs tracking-widest text-white/50 uppercase mt-1">
                    Every comment stays with its version.
                  </span>
                </div>
                <div className="flex gap-2">
                  {MARKERS.map((m) => (
                    <button
                      key={m.id}
                      onClick={() => setActiveMarker(m.id)}
                      className={cn(
                        "flex h-8 w-8 items-center justify-center rounded-sm border transition-colors",
                        activeMarker === m.id
                          ? "border-primary/50 bg-primary/10 text-primary"
                          : "border-white/10 bg-white/5 text-white/40 hover:bg-white/10"
                      )}
                    >
                      {m.id}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
