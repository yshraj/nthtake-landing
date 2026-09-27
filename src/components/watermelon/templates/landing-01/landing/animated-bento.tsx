"use client";

import { useState } from "react";
import { motion, type Variants } from "motion/react";
import Heading from "./heading";
import Container from "./container";
import { SelectAIAgent } from "@/components/ui/select-ai-agent";
import { MorphingButton } from "@/components/ui/morphing-button";
import { KnobSlider } from "@/components/ui/knob-slider";
import { CarouselSlider } from "@/components/ui/carousel-slider";
import { cn } from "@/lib/utils";
import {
  AdobeAfterEffectIcon,
  AdobePhotoshopIcon,
  AdobePremierIcon,
  FigmaIcon,
} from "hugeicons-react";
import { site } from "@/content/site";
import { TAKE_FRAMES } from "./take-plate";
import { joinWaitlist } from "@/lib/waitlist";

const slides = TAKE_FRAMES.map((frame, i) => ({
  id: i + 1,
  img: frame.src,
}));

const AGENTS = [
  {
    id: "premiere",
    name: site.tools[0],
    icon: <AdobePremierIcon className="h-6 w-6" />,
  },
  {
    id: "after-effects",
    name: site.tools[1],
    icon: <AdobeAfterEffectIcon className="h-6 w-6" />,
  },
  {
    id: "figma",
    name: site.tools[3],
    icon: <FigmaIcon className="h-6 w-6" />,
  },
  {
    id: "photoshop",
    name: site.tools[4],
    icon: <AdobePhotoshopIcon className="h-6 w-6" />,
  },
];

function FeatureCard({
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
        className,
      )}
    >
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/40"></div>
      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/40"></div>
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/40"></div>
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/40"></div>

      <div className="w-full h-full flex flex-col items-center justify-center p-6 relative overflow-hidden">
        <div className="absolute top-6 left-6 z-10">
          <span className="text-white/40 text-[10px] font-mono uppercase tracking-widest group-hover:text-white/80 transition-colors">
            {title}
          </span>
        </div>
        <div className={cn("origin-center flex justify-center w-full", innerClassName)}>
          {children}
        </div>
      </div>
    </motion.div>
  );
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export default function AnimatedBento() {
  const [knobValue, setKnobValue] = useState(24);
  const timecode = `00:${pad(Math.floor(knobValue / 60))}:${pad(knobValue % 60)}`;

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
    <section className="py-24 md:py-32 relative overflow-hidden bg-[#101010] font-mono">
      <div className="hidden lg:block absolute top-0 left-0 w-full border-t border-white/5" />

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
            {site.studio.kicker}
          </motion.div>
          <motion.div variants={itemVariants}>
            <Heading as="h2" variant="big" className="text-balance text-foreground font-sans">
              {site.studio.titleBefore}
              <span className="text-primary">{site.studio.titleAccent}</span>
            </Heading>
          </motion.div>
          <motion.p variants={itemVariants} className="mt-6 text-sm text-white/50 text-pretty max-w-2xl font-mono uppercase tracking-widest">
            {site.studio.body}
          </motion.p>
        </motion.div>

        <motion.div
          className="w-full max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
        >
          <FeatureCard
            title="[ AI ASSISTANT ]"
            variants={itemVariants}
            className="w-full h-[380px]"
            innerClassName="scale-[0.85] md:scale-[0.92] mt-4"
          >
            <SelectAIAgent
              agents={AGENTS}
              placeholder="Send take 03"
              modes={["Video", "Design"]}
            />
          </FeatureCard>
        </motion.div>
      </Container>
    </section>
  );
}
