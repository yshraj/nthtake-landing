"use client";

import { ArrowUpRight01Icon } from "hugeicons-react";
import Container from "./container";
import Heading from "./heading";
import SubHeading from "./subheading";
import { motion, type Variants, AnimatePresence, useReducedMotion } from "motion/react";
import Link from "next/link";
import { useEffect, useState, type FormEvent } from "react";
import { site } from "@/content/site";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import TakePlate, { TAKE_FRAMES } from "./take-plate";
import { cn } from "@/lib/utils";
import {
  describeWaitlistError,
  EMAIL_RE,
  joinWaitlist,
} from "@/lib/waitlist";
import { WaitlistInput, WaitlistReceipt, WaitlistStatus } from "./waitlist-field";

const ROTATING_WORDS = site.hero.rotating;

const HERO_PLATES = [
  {
    frame: TAKE_FRAMES[0],
    locked: true,
    watermarked: true,
    unlocked: false,
    className:
      "hidden md:block left-[4%] top-[18%] w-[28%] z-[1] -rotate-6 opacity-45",
    depth: "back",
  },
  {
    frame: TAKE_FRAMES[1],
    locked: true,
    watermarked: true,
    unlocked: false,
    className:
      "left-[2%] md:left-[16%] top-[28%] md:top-[26%] w-[58%] md:w-[34%] z-[2] -rotate-3 md:-rotate-6 opacity-90 md:opacity-85",
    depth: "mid",
  },
  {
    frame: TAKE_FRAMES[4],
    locked: false,
    watermarked: false,
    unlocked: true,
    className:
      "left-[21%] md:left-[29%] top-[36%] md:top-[34%] w-[70%] md:w-[42%] z-[4] rotate-0",
    depth: "front",
  },
  {
    frame: TAKE_FRAMES[2],
    locked: true,
    watermarked: true,
    unlocked: false,
    className:
      "right-[2%] md:right-[16%] top-[22%] md:top-[24%] w-[52%] md:w-[32%] z-[3] rotate-3 md:rotate-6 opacity-90 md:opacity-85",
    depth: "mid",
  },
  {
    frame: TAKE_FRAMES[3],
    locked: true,
    watermarked: true,
    unlocked: false,
    className:
      "hidden md:block right-[6%] top-[12%] w-[26%] z-[1] rotate-6 opacity-45",
    depth: "back",
  },
] as const;

export default function Hero() {
  const [wordIndex, setWordIndex] = useState(0);
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [joined, setJoined] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const reduce = useReducedMotion();

  async function onWaitlistSubmit(e: FormEvent) {
    e.preventDefault();
    if (sending) return;

    const trimmed = email.trim();
    if (!trimmed || !EMAIL_RE.test(trimmed)) {
      setError(site.hero.waitlistError);
      return;
    }

    setSending(true);
    setError("");

    const result = await joinWaitlist({
      email: trimmed,
      source: "hero",
      company,
    });

    if (!result.ok) {
      setSending(false);
      setError(describeWaitlistError(result.error));
      return;
    }

    sessionStorage.setItem("nthtake-email", trimmed);
    setSending(false);
    setJoined(true);
  }

  useEffect(() => {
    if (reduce) return;
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % ROTATING_WORDS.length);
    }, 2800);
    return () => clearInterval(interval);
  }, [reduce]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.15,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const glowVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.3 },
    },
  };

  return (
    <>
      <section
        id="top"
        className="relative flex min-h-[100dvh] w-full flex-col justify-center overflow-x-hidden scroll-mt-20 pt-24 pb-12 font-mono"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-size-[24px_24px]" />

        <motion.div
          className="pointer-events-none absolute top-1/2 left-1/2 h-[400px] w-[600px] -translate-x-1/2 translate-y-[-60%] rounded-full"
          style={{
            background:
              "radial-gradient(ellipse at center, color-mix(in oklch, var(--primary) 10%, transparent) 0%, color-mix(in oklch, var(--primary) 4%, transparent) 40%, transparent 70%)",
          }}
          variants={glowVariants}
          initial="hidden"
          animate="visible"
        />

        <div className="absolute top-24 right-0 left-0 hidden h-px bg-white/5 lg:block" />
        <div className="absolute right-0 bottom-0 left-0 hidden h-px bg-white/5 lg:block" />
        <div className="absolute top-0 bottom-0 left-8 hidden w-px bg-white/5 md:left-16 lg:block" />
        <div className="absolute top-0 right-8 bottom-0 hidden w-px bg-white/5 md:right-16 lg:block" />

        <div className="absolute top-24 left-8 hidden h-4 w-4 -translate-x-1/2 -translate-y-1/2 md:left-16 lg:block">
          <div className="bg-primary/50 absolute top-1/2 right-0 left-0 h-px" />
          <div className="bg-primary/50 absolute top-0 bottom-0 left-1/2 w-px" />
        </div>
        <div className="absolute top-24 right-8 hidden h-4 w-4 translate-x-1/2 -translate-y-1/2 md:right-16 lg:block">
          <div className="absolute top-1/2 right-0 left-0 h-px bg-white/20" />
          <div className="absolute top-0 bottom-0 left-1/2 w-px bg-white/20" />
        </div>

        <div className="pointer-events-none absolute top-1/2 left-0 flex h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/5 opacity-30">
          <div className="flex h-[600px] w-[600px] items-center justify-center rounded-full border border-dashed border-white/10">
            <div className="flex h-[400px] w-[400px] items-center justify-center rounded-full border border-white/5">
              <div className="h-[200px] w-[200px] rounded-full border border-dashed border-white/5" />
            </div>
          </div>
        </div>

        <Container className="relative z-10 flex flex-1 flex-col justify-center">
          <motion.div
            className="mx-auto flex max-w-4xl flex-col items-center text-center"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              variants={itemVariants}
              className="mb-8 inline-flex items-center gap-2 border border-white/10 bg-white/3 px-4 py-1.5 text-xs font-bold tracking-widest text-white/70 uppercase backdrop-blur-sm"
            >
              {site.hero.badge}
            </motion.div>

            <motion.div variants={itemVariants}>
              <Heading
                as="h1"
                variant="big"
                className="text-foreground mb-2 font-sans leading-[1.1]"
              >
                {site.hero.line1}
              </Heading>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Heading
                as="h1"
                variant="big"
                className="mb-8 font-sans leading-[1.1]"
              >
                <span className="text-foreground">{site.hero.line2Before}</span>
                <span className="relative inline-grid justify-items-start overflow-hidden align-baseline text-left">
                  {ROTATING_WORDS.map((word) => (
                    <span
                      key={word}
                      className="invisible col-start-1 row-start-1 whitespace-nowrap"
                      aria-hidden
                    >
                      {word}
                    </span>
                  ))}
                  <AnimatePresence initial={false} mode="wait">
                    <motion.span
                      key={ROTATING_WORDS[wordIndex]}
                      className="text-primary col-start-1 row-start-1 inline-block justify-self-start whitespace-nowrap pb-1 text-left"
                      initial={reduce ? false : { y: "40%", opacity: 0 }}
                      animate={{ y: "0%", opacity: 1 }}
                      exit={reduce ? { opacity: 0 } : { y: "-40%", opacity: 0 }}
                      transition={{ duration: reduce ? 0 : 0.3, ease: [0.16, 1, 0.3, 1] }}
                    >
                      {ROTATING_WORDS[wordIndex]}
                    </motion.span>
                  </AnimatePresence>
                </span>
              </Heading>
            </motion.div>

            <motion.div variants={itemVariants}>
              <SubHeading variant="big" className="mb-10 max-w-2xl text-pretty">
                {site.hero.body}
              </SubHeading>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex w-full max-w-xl flex-col items-stretch gap-4"
            >
              {joined ? (
                <WaitlistReceipt
                  email={email.trim()}
                  label={site.hero.waitlistSuccess}
                />
              ) : (
                <form
                  className="flex flex-col gap-3"
                  onSubmit={onWaitlistSubmit}
                  noValidate
                >
                  <div className="sr-only" aria-hidden>
                    <label htmlFor="hero-company">Leave this field blank</label>
                    <input
                      id="hero-company"
                      name="company"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                    />
                  </div>
                  <label className="sr-only" htmlFor="hero-email">
                    {site.hero.waitlistLabel}
                  </label>
                  <div className="flex flex-col sm:flex-row sm:items-stretch">
                    <WaitlistInput
                      id="hero-email"
                      type="email"
                      name="email"
                      autoComplete="email"
                      inputMode="email"
                      placeholder={site.hero.waitlistPlaceholder}
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (error) setError("");
                      }}
                      disabled={sending}
                      invalid={Boolean(error)}
                      aria-invalid={error ? true : undefined}
                      aria-describedby={error ? "hero-email-status" : undefined}
                      className="max-sm:border-b-0 sm:border-r-0"
                    />
                    <ShimmerButton
                      type="submit"
                      disabled={sending}
                      className="w-full px-8 py-3 text-xs font-bold tracking-widest uppercase sm:w-auto sm:shrink-0"
                    >
                      {sending
                        ? site.hero.waitlistSending
                        : site.hero.waitlistCta}
                    </ShimmerButton>
                  </div>
                  {error ? (
                    <div id="hero-email-status">
                      <WaitlistStatus error={error} />
                    </div>
                  ) : null}
                </form>
              )}
              <Link
                href="#how"
                className="text-foreground inline-flex items-center justify-center self-center border border-white/10 px-8 py-3 text-sm font-bold transition-all hover:bg-white/5 focus-visible:ring-1 focus-visible:ring-primary active:scale-[0.97]"
              >
                See how
                <ArrowUpRight01Icon className="ml-2 h-4 w-4" />
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            className="relative mx-auto mt-16 h-[280px] w-full max-w-6xl overflow-hidden sm:mt-20 sm:h-[380px] md:h-[460px]"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.1,
                  delayChildren: 0.5,
                },
              },
            }}
          >
            {HERO_PLATES.map((plate) => (
              <motion.div
                key={plate.frame.n}
                className={cn("absolute shadow-2xl", plate.className)}
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
                  },
                }}
                whileHover={{
                  scale: 1.04,
                  zIndex: 20,
                  transition: { duration: 0.35 },
                }}
              >
                <div className={plate.depth === "back" ? "blur-[1.5px]" : undefined}>
                <TakePlate
                  n={plate.frame.n}
                  label={plate.frame.label}
                  src={plate.frame.src}
                  alt={plate.frame.alt}
                  locked={plate.locked}
                  watermarked={plate.watermarked}
                  unlocked={plate.unlocked}
                  priority={plate.unlocked}
                />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>

      <div className="relative z-10 border-y border-white/5 bg-[#101010] py-8 font-mono">
        <div className="flex flex-col items-center gap-4 px-4">
          <div className="flex items-center gap-3 text-xs tracking-widest text-white/40 uppercase">
            <span className="h-px w-8 bg-white/10" />
            Trusted by editors who got ghosted
            <span className="h-px w-8 bg-white/10" />
          </div>
          <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-4">
            {site.hero.proof.map((stat) => (
              <div
                key={stat}
                className="border border-white/5 bg-white/2 px-4 py-2 text-xs font-bold tracking-wider text-white/60 uppercase"
              >
                {stat}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
