"use client";

import { motion, type Variants } from "motion/react";
import Link from "next/link";
import { CheckmarkCircle01Icon } from "hugeicons-react";
import { Faq6 } from "@/components/ui/faq-6";
import Container from "./container";
import Heading from "./heading";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

export default function Pricing() {
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
    <section id="pricing" className="relative overflow-hidden bg-[#101010] py-24 font-mono scroll-mt-20 md:py-32">
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
            className="mb-4 inline-flex items-center text-xs font-bold tracking-widest text-white/50 uppercase"
          >
            <span className="text-primary mr-3">{"//"}</span>
            {site.pricing.kicker}
          </motion.div>
          <motion.div variants={itemVariants}>
            <Heading as="h2" variant="big" className="text-balance font-sans text-foreground">
              {site.pricing.titleBefore}
              <span className="text-primary">{site.pricing.titleAccent}</span>
            </Heading>
          </motion.div>
          <motion.p
            variants={itemVariants}
            className="mt-6 max-w-2xl text-balance font-mono text-sm tracking-widest text-white/50 uppercase leading-relaxed"
          >
            {site.pricing.body}
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {site.pricing.plans.map((plan) => (
            <motion.div
              key={plan.name}
              variants={itemVariants}
              className={cn(
                "relative flex h-full flex-col border bg-black/40 p-6 md:p-8 backdrop-blur-md transition-colors duration-300",
                plan.popular ? "border-primary/50 bg-primary/5" : "border-white/10 hover:bg-white/2"
              )}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-0 bg-primary px-3 py-1 text-[10px] font-bold tracking-widest text-primary-foreground uppercase">
                  Most popular
                </div>
              )}
              
              <div className="mb-6">
                <h3 className="mb-2 text-sm font-bold tracking-widest text-white/80 uppercase">
                  {plan.name}
                </h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-sans font-bold tracking-tight text-white">{plan.price}</span>
                  <span className="text-xs tracking-widest text-white/40 uppercase">{plan.period}</span>
                </div>
                <p className="mt-4 text-[11px] tracking-widest text-white/60 uppercase min-h-[3rem]">
                  {plan.target}
                </p>
              </div>

              <Link
                href="#access"
                className={cn(
                  "mb-8 flex h-12 w-full items-center justify-center text-xs font-bold tracking-widest uppercase transition-colors active:scale-[0.98]",
                  plan.popular
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "border border-white/20 bg-white/5 text-white hover:bg-white/10"
                )}
              >
                {plan.cta}
              </Link>

              <div className="flex flex-1 flex-col gap-4">
                <p className="text-[10px] font-bold tracking-widest text-white/40 uppercase">Includes:</p>
                <ul className="flex flex-col gap-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckmarkCircle01Icon className="h-4 w-4 shrink-0 text-primary mt-0.5" />
                      <span className="text-xs tracking-widest text-white/70 uppercase leading-snug">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mt-24"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          <Faq6
            badge="// FAQ"
            title="Pricing questions"
            faqs={site.pricing.faqs}
            className="border-white/10 bg-black/20"
          />
        </motion.div>
      </Container>
    </section>
  );
}
