"use client";

import { EyeOff, Fingerprint, SearchX, ShieldCheck } from "lucide-react";
import { motion } from "motion/react";

const trustFeatures = [
  {
    title: "100% Confidential",
    description: "Your work stays between you and your client. We don't use your files for training, and we never expose them to third parties.",
    icon: ShieldCheck,
  },
  {
    title: "No Public Indexing",
    description: "Unlike portfolio sites or marketplaces, EditTrack review rooms are unsearchable and completely hidden from search engines.",
    icon: SearchX,
  },
  {
    title: "Expiring Magic Links",
    description: "Control exactly who sees your work and for how long. Generate time-limited access links that expire automatically.",
    icon: Fingerprint,
  },
  {
    title: "No Client Accounts",
    description: "Clients access their secure review room instantly. No onboarding, no passwords to remember, just frictionless review.",
    icon: EyeOff,
  },
];

export function TrustSection() {
  return (
    <section className="py-24 border-t border-border/50 bg-secondary/10 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16 space-y-4"
        >
          <h2 className="text-3xl md:text-5xl font-heading font-medium tracking-tight">
            Your client relationship,<br className="hidden md:block" /> your business.
          </h2>
          <p className="text-lg text-muted-foreground">
            EditTrack is a delivery tool for freelancers — not a marketplace. Your work stays private, your client relationship stays yours, and we never take a cut.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {trustFeatures.map((feature, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex flex-col gap-4 p-6 rounded-2xl bg-background border border-border/50 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold">{feature.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
