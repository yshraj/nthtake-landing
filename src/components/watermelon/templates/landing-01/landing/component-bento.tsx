"use client";

import { useState } from "react";
import { motion, type Variants } from "motion/react";
import Heading from "./heading";
import Container from "./container";
import Checkbox16 from "@/components/ui/checkbox-16";
import { Switch } from "@/components/ui/switch";
import Tabs7 from "@/components/ui/tabs-7";
import Breadcrumb7 from "@/components/ui/breadcrumb-7";
import { cn } from "@/lib/utils";
import { site } from "@/content/site";
import TakePlate, { TAKE_FRAMES } from "./take-plate";

function ComponentCard({
  title,
  variants,
  className,
  innerClassName,
  children,
}: {
  title: string;
  variants: Variants;
  className?: string;
  innerClassName?: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      variants={variants}
      className={cn(
        "h-full w-full relative border border-white/10 bg-black/40 backdrop-blur-md group hover:bg-white/2 transition-colors duration-300",
        className
      )}
    >
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/40"></div>
      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/40"></div>
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/40"></div>
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/40"></div>

      <div className="w-full h-full flex flex-col items-center justify-center p-6 relative overflow-hidden text-center">
        <div className="absolute top-6 left-6 z-10">
          <span className="text-white/40 text-[10px] font-mono uppercase tracking-widest group-hover:text-white/80 transition-colors">
            {title}
          </span>
        </div>
        <div className={cn("origin-center flex justify-center w-full mt-6", innerClassName)}>
          {children}
        </div>
      </div>
    </motion.div>
  );
}

function WatermarkLock() {
  const [watermarked, setWatermarked] = useState(true);
  const frame = TAKE_FRAMES[2];

  return (
    <div className="flex w-full max-w-sm flex-col items-center gap-4">
      <div className="w-[70%]">
        <TakePlate
          n={frame.n}
          label={watermarked ? "Watermark on" : "Clean preview"}
          src={frame.src}
          alt={frame.alt}
          locked={watermarked}
          watermarked={watermarked}
          unlocked={!watermarked}
          showNumber={false}
        />
      </div>
      <label className="flex items-center gap-3 font-mono text-[10px] tracking-widest text-white/60 uppercase">
        <Switch
          checked={watermarked}
          onCheckedChange={setWatermarked}
          aria-label="Toggle watermark"
        />
        Watermark
      </label>
    </div>
  );
}

export default function ComponentsBento() {
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
    <section id="review" className="py-24 md:py-32 relative overflow-hidden bg-[#101010] font-mono scroll-mt-20">
      <div className="hidden lg:block absolute top-0 left-0 w-full border-t border-white/5" />
      <div className="hidden lg:block absolute bottom-0 left-0 w-full border-b border-white/5" />

      <Container className="relative z-10 mx-auto">
        <motion.div
          className="mb-12 flex flex-col items-start md:items-center text-left md:text-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div variants={itemVariants} className="inline-flex items-center text-xs font-bold text-white/50 mb-8 tracking-widest uppercase">
            <span className="text-primary mr-3">{"//"}</span>
            {site.review.kicker}
          </motion.div>
          <motion.div variants={itemVariants}>
            <Heading as="h2" variant="big" className="text-balance text-foreground font-sans">
              {site.review.titleBefore}
              <span className="text-primary">{site.review.titleAccent}</span>
            </Heading>
          </motion.div>
          <motion.p variants={itemVariants} className="mt-6 text-sm text-white/50 text-pretty max-w-lg font-mono uppercase tracking-widest leading-relaxed">
            {site.review.body}
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 auto-rows-[360px]"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          <ComponentCard
            title="[ NOTES ]"
            variants={itemVariants}
            className="md:col-span-1"
          >
            <Tabs7 />
          </ComponentCard>

          <ComponentCard
            title="[ SUBMIT ROUND ]"
            variants={itemVariants}
            className="md:col-span-1"
          >
            <Checkbox16 />
          </ComponentCard>

          <ComponentCard
            title="[ LOCKS ]"
            variants={itemVariants}
            className="md:col-span-1"
            innerClassName="mt-8"
          >
            <WatermarkLock />
          </ComponentCard>

          <ComponentCard
            title="[ STUDIO PATH ]"
            variants={itemVariants}
            className="md:col-span-1"
          >
            <Breadcrumb7 />
          </ComponentCard>
        </motion.div>
      </Container>
    </section>
  );
}
