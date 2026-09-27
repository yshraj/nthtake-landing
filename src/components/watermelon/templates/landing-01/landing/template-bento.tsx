"use client";

import { useState } from "react";
import { motion, type Variants, AnimatePresence } from "motion/react";
import Heading from "./heading";
import Container from "./container";
import { ContinuousTabs } from "@/components/ui/continuous-tabs";
import { site } from "@/content/site";
import TakePlate, { TAKE_FRAMES } from "./take-plate";

const TAKE_TABS = [
  { id: "02", label: site.takes.before },
  { id: "03", label: site.takes.after },
];

function TemplateCard({ variants, children }: { variants: Variants; children: React.ReactNode }) {
  return (
    <motion.div variants={variants} className="w-full aspect-[4/5] max-h-[720px] md:aspect-[16/10] md:max-h-none border border-white/10 bg-black/40 backdrop-blur-md relative group hover:bg-white/2 transition-colors duration-300">
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/40"></div>
      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/40"></div>
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/40"></div>
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/40"></div>
      {children}
    </motion.div>
  );
}

function BrowserMockup({ children, url }: { children: React.ReactNode; url: string }) {
  return (
    <div className="w-full h-full flex flex-col">
      <div className="h-12 border-b border-white/10 bg-white/5 flex items-center px-4 md:px-6 gap-2 md:gap-4 w-full">
        <div className="flex gap-2">
          <div className="w-2 h-2 bg-white/20 group-hover:bg-destructive/80 transition-colors" />
          <div className="w-2 h-2 bg-white/20 group-hover:bg-yellow-500/80 transition-colors" />
          <div className="w-2 h-2 bg-white/20 group-hover:bg-primary/80 transition-colors" />
        </div>
        <div className="ml-2 md:ml-4 flex-1 flex justify-center min-w-0">
            <div className="px-2 md:px-4 py-1 text-[10px] md:text-xs border border-white/10 text-white/50 font-mono w-full max-w-[280px] md:w-76 text-center tracking-widest uppercase truncate">
              {url}
            </div>
        </div>
        <div className="w-6 md:w-10"></div>
      </div>

      <div className="flex-1 w-full flex flex-col items-center justify-center p-2 md:p-4 relative overflow-hidden min-h-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-size-[24px_24px]"></div>
        {children}
      </div>
    </div>
  );
}

const TAKES = {
  "02": {
    frame: TAKE_FRAMES[1],
    overlay: "PREVIEW",
    locked: false,
    watermarked: true,
  },
  "03": {
    frame: TAKE_FRAMES[2],
    overlay: "LOCKED",
    locked: true,
    watermarked: true,
  },
} as const;

export default function TemplateBento() {
  const [activeTake, setActiveTake] = useState<"02" | "03">("02");
  const take = TAKES[activeTake];

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

  return (
    <section id="feedback" className="py-24 md:py-32 relative overflow-hidden bg-[#101010] font-mono scroll-mt-20">
      <div className="hidden lg:block absolute top-0 left-0 w-full border-t border-white/5" />

      <Container className="relative z-10 mx-auto">
        <motion.div
          className="mb-16 flex flex-col items-start md:items-center text-left md:text-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div variants={itemVariants} className="inline-flex items-center text-xs font-bold text-white/50 mb-8 tracking-widest uppercase">
            <span className="text-primary mr-3">{"//"}</span>
            {site.takes.kicker}
          </motion.div>
          <motion.div variants={itemVariants}>
            <Heading as="h2" variant="big" className="text-balance text-foreground font-sans">
              {site.takes.titleBefore}
              <span className="text-primary">{site.takes.titleAccent}</span>
            </Heading>
          </motion.div>
          <motion.p variants={itemVariants} className="mt-6 text-sm text-white/50 text-pretty max-w-2xl font-mono uppercase tracking-widest leading-relaxed">
            {site.updates.titleBefore}
            <span className="text-primary">{site.updates.titleAccent}</span>
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          <TemplateCard variants={itemVariants}>
            <BrowserMockup url="[ NTHTAKE.STUDIO / TAKES ]">
              <div className="flex-1 w-full border border-white/20 flex flex-col items-center justify-center bg-black relative z-10 overflow-hidden min-h-0 group-hover:border-primary/50 transition-colors duration-500">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTake}
                    initial={{ opacity: 0, scale: 0.98, filter: "blur(4px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, scale: 1.02, filter: "blur(4px)" }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="relative flex h-full w-full flex-col items-center justify-center p-4 md:p-8"
                  >
                    <p className="pointer-events-none absolute inset-0 flex items-center justify-center font-sans text-[clamp(1.5rem,8vw,4.5rem)] tracking-[0.35em] text-white/10">
                      {take.overlay}
                    </p>
                    <div className="relative z-10 w-[92%] max-w-2xl">
                      <TakePlate
                        n={take.frame.n}
                        label={take.frame.label}
                        src={take.frame.src}
                        alt={take.frame.alt}
                        locked={take.locked}
                        watermarked={take.watermarked}
                        showNumber={false}
                      />
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="mt-2 md:mt-4 relative z-10 flex w-full flex-col items-center overflow-hidden">
                <ContinuousTabs
                  tabs={TAKE_TABS}
                  defaultActiveId="02"
                  onChange={(id) => setActiveTake(id as "02" | "03")}
                />
              </div>
            </BrowserMockup>
          </TemplateCard>
        </motion.div>
      </Container>
    </section>
  );
}
