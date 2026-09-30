"use client";

import { Check } from "lucide-react";
import { motion } from "motion/react";
import { site } from "@/content/site";

export function PricingSection() {
  return (
    <section id="pricing" className="py-24 bg-background overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4 mb-6"
        >
          <p className="text-sm font-medium text-primary uppercase tracking-widest">
            {site.pricing.kicker}
          </p>
          <h2 className="text-4xl md:text-5xl font-heading font-medium tracking-tight">
            {site.pricing.titleBefore}<span className="font-serif italic text-primary">{site.pricing.titleAccent}</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {site.pricing.body}
          </p>
        </motion.div>

        {/* Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-14">
          {site.pricing.plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`relative rounded-2xl border flex flex-col p-8 transition-transform hover:-translate-y-1 ${
                plan.popular
                  ? "border-foreground bg-foreground text-background shadow-2xl"
                  : "border-border bg-background shadow-sm hover:shadow-md"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground text-xs font-semibold px-4 py-1.5 rounded-full uppercase tracking-wider">
                    Most popular
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3
                  className={`text-xl font-heading font-semibold mb-1 ${
                    plan.popular ? "text-background" : "text-foreground"
                  }`}
                >
                  {plan.name}
                </h3>
                <p
                  className={`text-sm ${
                    plan.popular ? "text-background/60" : "text-muted-foreground"
                  }`}
                >
                  {plan.target}
                </p>
              </div>

              <div className="mb-8">
                <div className="flex items-baseline gap-1">
                  <span
                    className={`text-5xl font-heading font-bold tracking-tight ${
                      plan.popular ? "text-background" : "text-foreground"
                    }`}
                  >
                    {plan.price}
                  </span>
                  <span
                    className={`text-base ${
                      plan.popular
                        ? "text-background/60"
                        : "text-muted-foreground"
                    }`}
                  >
                    {plan.period}
                  </span>
                </div>
              </div>

              <ul className="space-y-3 flex-1 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5">
                    <Check
                      className={`w-4 h-4 mt-0.5 shrink-0 ${
                        plan.popular ? "text-primary" : "text-foreground"
                      }`}
                    />
                    <span
                      className={`text-sm ${
                        plan.popular
                          ? "text-background/80"
                          : "text-muted-foreground"
                      }`}
                    >
                      {feature}
                    </span>
                  </li>
                ))}
                {plan.excluded.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2.5 opacity-40"
                  >
                    <span className="w-4 h-4 mt-0.5 shrink-0 flex items-center justify-center">
                      <span className="block w-3 h-px bg-current" />
                    </span>
                    <span
                      className={`text-sm ${
                        plan.popular ? "text-background/60" : "text-muted-foreground"
                      }`}
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <a
                href="#cta"
                className={`w-full rounded-full py-3 text-sm font-semibold transition-colors text-center block ${
                  plan.popular
                    ? "bg-background text-foreground hover:bg-background/90"
                    : "bg-foreground text-background hover:bg-foreground/90"
                }`}
              >
                {plan.cta}
              </a>
            </motion.div>
          ))}
        </div>

        {/* Bottom trust note */}
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center text-sm text-muted-foreground mt-10"
        >
          All plans include payment unlock, client preview, and version history.
        </motion.p>
      </div>
    </section>
  );
}
