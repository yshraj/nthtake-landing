"use client";

import { useEffect, useRef } from "react";
import { motion, useInView, animate, type Variants } from "motion/react";
import Container from "./container";
import Heading from "./heading";
import { cn } from "@/lib/utils";
import { site } from "@/content/site";

const statsData = site.stats.items.map((item, id) => ({
  id,
  value: item.value,
  label: item.label,
}));

function CountingNumber({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const parsed = value.match(/^([\d,]+(?:\.\d+)?)(.*)$/);
  const isNumeric = Boolean(parsed);
  const raw = parsed ? parsed[1].replace(/,/g, "") : "0";
  const number = parseFloat(raw);
  const suffix = parsed ? parsed[2] : "";
  const decimals = raw.includes(".") ? (raw.split(".")[1]?.length ?? 0) : 0;
  const useComma = parsed?.[1].includes(",") ?? false;

  useEffect(() => {
    if (!isNumeric || !isInView || !ref.current) return;
    const controls = animate(0, number, {
      duration: 2.5,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => {
        if (!ref.current) return;
        if (decimals) {
          ref.current.textContent = latest.toFixed(decimals);
          return;
        }
        const whole = Math.floor(latest);
        ref.current.textContent = useComma
          ? whole.toLocaleString("en-US")
          : whole.toString();
      },
    });
    return controls.stop;
  }, [isNumeric, isInView, number, decimals, useComma]);

  if (!isNumeric) {
    return <span>{value}</span>;
  }

  return (
    <span className="tabular-nums">
      <span ref={ref}>0</span>
      {suffix}
    </span>
  );
}

function Crosshair({
  position,
}: {
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
}) {
  const isTop = position.startsWith("top");
  const isLeft = position.endsWith("left");

  return (
    <div
      className={cn(
        "absolute z-10 hidden h-4 w-4 lg:block",
        isTop ? "top-0 -translate-y-1/2" : "bottom-0 translate-y-1/2",
        isLeft
          ? "left-8 -translate-x-1/2 md:left-16"
          : "right-8 translate-x-1/2 md:right-16",
      )}
    >
      <div className="absolute top-1/2 right-0 left-0 h-px bg-white/20"></div>
      <div className="absolute top-0 bottom-0 left-1/2 w-px bg-white/20"></div>
    </div>
  );
}

function StatCard({
  stat,
  variants,
}: {
  stat: (typeof statsData)[0];
  variants: Variants;
}) {
  return (
    <motion.div
      variants={variants}
      className="group relative border border-white/10 bg-neutral-950 backdrop-blur-md transition-colors duration-300 hover:bg-white/2"
    >
      <div className="absolute top-0 left-0 h-2 w-2 border-t border-l border-white/40"></div>
      <div className="absolute top-0 right-0 h-2 w-2 border-t border-r border-white/40"></div>
      <div className="absolute bottom-0 left-0 h-2 w-2 border-b border-l border-white/40"></div>
      <div className="absolute right-0 bottom-0 h-2 w-2 border-r border-b border-white/40"></div>

      <div className="flex h-full w-full flex-col items-center justify-center p-10 text-center">
        <div className="text-foreground mb-3 font-mono text-4xl font-bold tracking-tight tabular-nums lg:text-5xl">
          <CountingNumber value={stat.value} />
        </div>
        <div className="text-xs font-bold tracking-widest text-white/40 uppercase">
          {stat.label}
        </div>
      </div>
    </motion.div>
  );
}

export default function Stats() {
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
    <section
      id="stakes"
      className="bg-[#101010] relative w-full overflow-hidden py-24 font-mono scroll-mt-20 md:py-32"
    >
      <div className="absolute top-0 left-0 hidden w-full border-t border-white/5 lg:block" />
      <div className="absolute bottom-0 left-0 hidden w-full border-b border-white/5 lg:block" />
      <div className="absolute top-0 bottom-0 left-8 hidden w-px bg-white/5 md:left-16 lg:block"></div>
      <div className="absolute top-0 right-8 bottom-0 hidden w-px bg-white/5 md:right-16 lg:block"></div>

      <Crosshair position="top-left" />
      <Crosshair position="top-right" />
      <Crosshair position="bottom-left" />
      <Crosshair position="bottom-right" />

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
            {site.stats.kicker}
          </motion.div>
          <motion.div variants={itemVariants}>
            <Heading
              as="h2"
              variant="big"
              className="text-foreground font-sans text-balance"
            >
              {site.stats.titleBefore}
              <span className="text-primary">{site.stats.titleAccent}</span>
            </Heading>
          </motion.div>
          <motion.p
            variants={itemVariants}
            className="mt-6 max-w-2xl font-mono text-sm tracking-widest text-pretty text-white/50 uppercase"
          >
            {site.stats.body}
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {statsData.map((stat) => (
            <StatCard key={stat.id} stat={stat} variants={itemVariants} />
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
