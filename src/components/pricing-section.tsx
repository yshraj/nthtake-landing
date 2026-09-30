"use client";

import { Check } from "lucide-react";
import { motion } from "motion/react";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "/ month",
    target: "Try the full workflow with one project.",
    features: [
      "1 active project",
      "Up to 10 GB storage",
      "Up to 3 takes per project",
      "Client preview with watermark",
      "Feedback and comments",
      "Payment unlock",
      "0% commission on client payments",
    ],
    excluded: ["AI feedback summaries", "Custom watermark"],
    cta: "Start free",
    popular: false,
  },
  {
    name: "Pro",
    price: "$19",
    period: "/ month",
    target: "For freelancers using EditTrack regularly.",
    features: [
      "20 active projects",
      "250 GB storage",
      "Unlimited takes/revisions",
      "Client preview with watermark",
      "Feedback and comments",
      "Payment unlock",
      "100 AI feedback summaries / month",
      "Custom watermark",
      "0% commission on client payments",
    ],
    excluded: [],
    cta: "Get Pro",
    popular: true,
  },
  {
    name: "Agency",
    price: "$49",
    period: "/ month",
    target: "For small creative teams.",
    features: [
      "Unlimited projects",
      "1 TB storage",
      "Unlimited takes/revisions",
      "Client preview with watermark",
      "Feedback and comments",
      "Payment unlock",
      "500 AI feedback summaries / month",
      "3 team seats",
      "Custom watermark",
      "Priority support",
      "0% commission on client payments",
    ],
    excluded: [],
    cta: "Start with Agency",
    popular: false,
  },
];

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
            Simple pricing
          </p>
          <h2 className="text-4xl md:text-5xl font-heading font-medium tracking-tight">
            You keep 100% of what your client pays.
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            EditTrack charges a flat monthly fee. We take 0% of your client
            payments — ever. No revenue share, no per-delivery cut, no
            surprises.
          </p>
        </motion.div>

        {/* Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-14">
          {plans.map((plan, i) => (
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
                  <span className="bg-primary text-background text-xs font-semibold px-4 py-1.5 rounded-full uppercase tracking-wider">
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
          No credit card required for Free. Cancel anytime.
        </motion.p>
      </div>
    </section>
  );
}
