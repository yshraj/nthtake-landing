"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { site } from "@/content/site";

export function VoicesSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-24 border-t border-border/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center space-y-4 mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20">
            {site.voices.kicker}
          </span>
          <h2 className="text-3xl md:text-5xl font-heading font-medium tracking-tight">
            {site.voices.titleBefore}
            <span className="font-serif italic text-primary">{site.voices.titleAccent}</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {site.voices.body}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {site.voices.items.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.5,
                delay: 0.1 + i * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="rounded-2xl border border-border/50 bg-secondary/20 p-5 space-y-3 hover:bg-secondary/30 transition-colors"
            >
              <div className="space-y-1">
                <p className="font-heading font-medium text-foreground">{item.author}</p>
                <p className="text-xs text-muted-foreground/60 font-mono">{item.handle}</p>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.content}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
