"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "motion/react";

const faqs = [
  {
    question: "Does the client pay before they see the work?",
    answer:
      "No. They watch the entire watermarked preview — every frame, every detail. Payment is only required to download the clean, unwatermarked final files.",
  },
  {
    question: "Do my clients need to create an EditTrack account?",
    answer:
      "No. Your client receives a secure, private link. They click it and are instantly in their review room — no sign-up, no passwords, no onboarding friction.",
  },
  {
    question: "Can't they just screen-record the watermarked preview?",
    answer:
      "The watermark is always visible on the preview. A screen recording will still carry the watermark. Paying and downloading the clean file is the only way to get the unmarked version.",
  },
  {
    question: "How do revisions work?",
    answer:
      "Each time you upload a new version, it creates a numbered take (Take 1, Take 2…). Your client's feedback stays attached to the specific version it belongs to, so nothing gets confused across rounds.",
  },
  {
    question: "What does it cost?",
    answer:
      "EditTrack takes 0% of your client payments. We charge a flat monthly fee: Free ($0), Pro ($19/mo), or Agency ($49/mo). Your earnings are yours. No revenue share, no per-delivery cut.",
  },
  {
    question: "Are there file size or storage limits?",
    answer:
      "Storage depends on your plan: Free gets 10 GB, Pro gets 250 GB, and Agency gets 1 TB. EditTrack is built for professional creative files — large 4K exports, design assets, and raw footage all work.",
  },
  {
    question: "Can anyone else see my work?",
    answer:
      "No. EditTrack is not a marketplace or a portfolio site. Your review rooms are private, never indexed by search engines, and only accessible via a secret link you control. Your client relationship stays your own.",
  },
];

export function FaqSection() {
  return (
    <section className="py-24 bg-secondary/10 border-t border-border/50 overflow-hidden">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4 mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-heading font-medium tracking-tight">
            Frequently asked questions
          </h2>
          <p className="text-lg text-muted-foreground">
            Everything you need to know about how EditTrack works.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Accordion className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left text-lg font-medium hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed text-base">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
