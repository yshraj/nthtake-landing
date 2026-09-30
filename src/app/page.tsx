"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Navbar } from "@/components/navbar";
import { ProductFlow } from "@/components/product-flow";
import { AIChatSection } from "@/components/ai-chat-section";
import { VoicesSection } from "@/components/voices-section";
import { TrustSection } from "@/components/trust-section";
import { PricingSection } from "@/components/pricing-section";
import { FaqSection } from "@/components/faq-section";
import { CtaSection } from "@/components/cta-section";
import { site } from "@/content/site";
import { Upload, Eye, CheckCircle2, Unlock } from "lucide-react";

function RotatingWord({ words }: { words: readonly string[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % words.length);
    }, 2200);
    return () => clearInterval(interval);
  }, [words.length]);

  return (
    <span className="relative inline-block">
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif italic text-primary inline-block"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30 overflow-hidden">
      <Navbar />

      <main className="pt-52 pb-20">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Hero Section */}
          <section className="max-w-4xl mx-auto text-center space-y-8 flex flex-col items-center">
            {/* Positioning badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20">
                {site.hero.badge}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
              className="text-6xl md:text-[80px] font-heading font-medium tracking-tight text-foreground leading-[1.1]"
            >
              {site.hero.line1}{" "}
              <RotatingWord words={site.hero.rotating} />
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="text-xl text-muted-foreground max-w-xl mx-auto"
            >
              {site.hero.body}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 w-full max-w-md mx-auto sm:max-w-none"
            >
              <motion.button
                onClick={() => document.querySelector('#cta')?.scrollIntoView({ behavior: 'smooth' })}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-foreground text-background px-8 py-4 rounded-full text-lg font-medium hover:bg-foreground/90 transition-colors flex items-center justify-center gap-2 w-full sm:w-auto shadow-lg group"
              >
                {site.hero.waitlistCta}
                <div className="w-6 h-6 rounded-full bg-background/20 flex items-center justify-center group-hover:bg-background/30 transition-colors">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
                  </svg>
                </div>
              </motion.button>
            </motion.div>

            {/* Social proof */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="flex items-center gap-2 text-sm text-muted-foreground"
            >
              {site.hero.proof.map((label, i) => (
                <span key={label} className="flex items-center gap-2">
                  {i > 0 && <span className="w-1 h-1 rounded-full bg-muted-foreground/40" />}
                  {label}
                </span>
              ))}
            </motion.div>

            {/* Tools marquee */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="w-full overflow-hidden relative"
              style={{ maskImage: "linear-gradient(to right, transparent, black 12%, black 88%, transparent)" }}
            >
              <motion.div
                animate={{ x: "-50%" }}
                transition={{ duration: 18, repeat: Infinity, repeatType: "loop", ease: "linear" }}
                className="flex items-center gap-10 w-max"
              >
                {[...site.tools, ...site.tools].map((tool, i) => (
                  <span key={i} className="text-xs text-muted-foreground/40 font-mono whitespace-nowrap select-none tracking-widest uppercase">
                    {tool}
                  </span>
                ))}
              </motion.div>
            </motion.div>

            {/* 4-step mini flow */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="w-full pt-2"
            >
              <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-3">
                {[
                  { icon: Upload, label: "Upload your work" },
                  { icon: Eye, label: "Client reviews" },
                  { icon: CheckCircle2, label: "Client approves" },
                  { icon: Unlock, label: "Files unlock" },
                ].map(({ icon: Icon, label }, i, arr) => (
                  <span key={label} className="flex items-center gap-2">
                    <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                      <Icon className="w-3.5 h-3.5 text-primary/70 shrink-0" />
                      {label}
                    </span>
                    {i < arr.length - 1 && (
                      <svg className="w-3 h-3 text-border shrink-0" viewBox="0 0 12 12" fill="none">
                        <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </span>
                ))}
              </div>
            </motion.div>
          </section>

          {/* How it works */}
          <section id="features" className="mt-40">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="text-center space-y-4 mb-24"
            >
              <h2 className="text-3xl md:text-5xl font-heading font-medium tracking-tight">
                {site.how.titleBefore}<span className="font-serif italic text-primary">{site.how.titleAccent}</span>
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{site.how.kicker}</p>
            </motion.div>

            <div id="workflow" className="flex justify-center">
              <ProductFlow />
            </div>
          </section>
        </div>

        <AIChatSection />
        <VoicesSection />
        <TrustSection />
        <PricingSection />
        <FaqSection />
        <CtaSection />
      </main>
    </div>
  );
}
