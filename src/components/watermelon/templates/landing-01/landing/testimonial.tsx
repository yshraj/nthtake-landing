"use client";

import { motion, type Variants, useReducedMotion } from "motion/react";
import Heading from "./heading";
import Container from "./container";
import { site } from "@/content/site";

type Platform = "dm" | "tweet" | "linkedin";

interface Testimonial {
  id: number;
  content: string;
  author: string;
  handle: string;
  avatar?: string;
  platform: Platform;
}

const testimonials: Testimonial[] = site.voices.items.map((item) => ({
  ...item,
}));

function TestimonialCard({ testimonial: t }: { testimonial: Testimonial }) {
  return (
    <div className="group relative w-[350px] shrink-0 border border-white/10 bg-black/40 backdrop-blur-md transition-colors duration-300 md:w-[450px]">
      <div className="absolute top-0 left-0 h-2 w-2 border-t border-l border-white/40" />
      <div className="absolute top-0 right-0 h-2 w-2 border-t border-r border-white/40" />
      <div className="absolute bottom-0 left-0 h-2 w-2 border-b border-l border-white/40" />
      <div className="absolute right-0 bottom-0 h-2 w-2 border-r border-b border-white/40" />

      <div className="flex h-full w-full flex-col p-8 whitespace-normal">
        <div className="mb-5 inline-flex w-fit items-center border border-white/15 px-2.5 py-1">
          <span className="text-[10px] font-bold tracking-widest text-white/50">
            {t.platform.toUpperCase()}
          </span>
        </div>

        <p className="mb-8 grow font-mono text-sm leading-relaxed tracking-wide text-white/80">
          &quot;{t.content}&quot;
        </p>

        <div className="mt-auto flex items-center gap-3 border-t border-white/5 pt-6">
          <div className="relative h-10 w-10 shrink-0 overflow-hidden border border-white/20">
            <div className="text-primary flex h-full w-full items-center justify-center bg-white/5 text-xs font-bold">
              {t.author.charAt(0).toUpperCase()}
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-bold tracking-widest text-white/90 uppercase">
              {t.author}
            </span>
            <span className="mt-0.5 text-[10px] tracking-widest text-white/40">
              {t.handle}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Testimonial() {
  const reduce = useReducedMotion();
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

  const marqueeItems = [...testimonials, ...testimonials];

  return (
    <section className="bg-[#101010] relative overflow-hidden py-24 md:py-32 font-mono">
      <div className="absolute top-0 left-0 hidden w-full border-t border-white/5 lg:block" />

      <Container className="relative z-10 mx-auto">
        <motion.div
          className="mb-16 flex flex-col items-start text-left md:items-center md:text-center"
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
            {site.voices.kicker}
          </motion.div>
          <motion.div variants={itemVariants}>
            <Heading
              as="h2"
              variant="big"
              className="text-foreground font-sans text-balance"
            >
              {site.voices.titleBefore}
              <span className="text-primary">{site.voices.titleAccent}</span>
            </Heading>
          </motion.div>
          <motion.p
            variants={itemVariants}
            className="mt-6 max-w-2xl font-mono text-sm leading-relaxed tracking-widest text-pretty text-white/50 uppercase"
          >
            {site.voices.body}
          </motion.p>
        </motion.div>
      </Container>

      <div className="relative mt-8 flex w-full max-w-full overflow-hidden">
        <div className="pointer-events-none absolute top-0 left-0 z-20 h-full w-16 bg-linear-to-r from-[#101010] to-transparent sm:w-32" />
        <div className="pointer-events-none absolute top-0 right-0 z-20 h-full w-16 bg-linear-to-l from-[#101010] to-transparent sm:w-32" />

        <motion.div
          className="flex gap-6 px-3 whitespace-nowrap"
          animate={reduce ? undefined : { x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 40,
          }}
        >
          {marqueeItems.map((t, index) => (
            <TestimonialCard key={`${t.id}-${index}`} testimonial={t} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
