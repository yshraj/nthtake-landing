"use client";

import { FormEvent, useState } from "react";
import { motion, type Variants } from "motion/react";
import Container from "./container";
import Heading from "./heading";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { site } from "@/content/site";
import {
  describeWaitlistError,
  EMAIL_RE,
  joinWaitlist,
} from "@/lib/waitlist";
import {
  WaitlistInput,
  WaitlistReceipt,
  WaitlistSelect,
  WaitlistStatus,
} from "./waitlist-field";

export default function Closer() {
  const [email, setEmail] = useState("");
  const [craft, setCraft] = useState("video");
  const [company, setCompany] = useState("");
  const [done, setDone] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (sending) return;

    const trimmed = email.trim();
    if (!trimmed || !EMAIL_RE.test(trimmed)) {
      setError(site.hero.waitlistError);
      return;
    }

    setSending(true);
    setError("");

    const name =
      typeof window !== "undefined"
        ? sessionStorage.getItem("nthtake-name") ?? ""
        : "";

    const result = await joinWaitlist({
      name,
      email: trimmed,
      craft,
      source: "closer",
      company,
    });

    if (!result.ok) {
      setSending(false);
      setError(describeWaitlistError(result.error));
      return;
    }

    sessionStorage.setItem("nthtake-email", trimmed);
    sessionStorage.setItem("nthtake-craft", craft);
    setSending(false);
    setDone(true);
  }

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
    <section id="access" className="relative overflow-hidden bg-[#101010] py-24 font-mono scroll-mt-20 md:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-size-[24px_24px]" />
      <Container className="relative z-10 mx-auto max-w-2xl text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div
            variants={itemVariants}
            className="mb-8 inline-flex items-center text-xs font-bold tracking-widest text-white/50 uppercase"
          >
            <span className="text-primary mr-3">{"//"}</span>
            {site.closer.kicker}
          </motion.div>
          <motion.div variants={itemVariants}>
            <Heading as="h2" variant="big" className="text-foreground font-sans">
              {site.closer.title}
            </Heading>
          </motion.div>
          <motion.p
            variants={itemVariants}
            className="mt-6 font-mono text-sm tracking-widest text-white/50 uppercase"
          >
            {site.closer.body}
          </motion.p>
          {done ? (
            <motion.div variants={itemVariants} className="mt-10">
              <WaitlistReceipt
                email={email.trim()}
                label={site.closer.success}
              />
            </motion.div>
          ) : (
            <motion.form
              variants={itemVariants}
              onSubmit={onSubmit}
              noValidate
              className="mt-8 space-y-4 text-left"
            >
              <div className="sr-only" aria-hidden>
                <label htmlFor="waitlist-company">Leave this field blank</label>
                <input
                  id="waitlist-company"
                  name="company"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor="waitlist-email"
                  className="block text-[11px] tracking-[0.2em] text-white/45 uppercase"
                >
                  {site.closer.emailLabel}
                </label>
                <WaitlistInput
                  id="waitlist-email"
                  required
                  type="email"
                  autoComplete="email"
                  inputMode="email"
                  placeholder={site.closer.emailPlaceholder}
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError("");
                  }}
                  disabled={sending}
                  invalid={Boolean(error)}
                  aria-invalid={error ? true : undefined}
                  aria-describedby={error ? "waitlist-email-status" : undefined}
                  className="mt-2"
                />
              </div>
              <label
                htmlFor="waitlist-craft"
                className="block text-[11px] tracking-[0.2em] text-white/45 uppercase"
              >
                {site.closer.craftLabel}
                <WaitlistSelect
                  id="waitlist-craft"
                  value={craft}
                  onChange={(e) => setCraft(e.target.value)}
                  disabled={sending}
                >
                  {site.closer.crafts.map((c) => (
                    <option key={c.value} value={c.value} className="bg-neutral-950">
                      {c.label}
                    </option>
                  ))}
                </WaitlistSelect>
              </label>
              {error ? (
                <div id="waitlist-email-status">
                  <WaitlistStatus error={error} />
                </div>
              ) : null}
              <ShimmerButton
                type="submit"
                disabled={sending}
                className="w-full px-8 py-4 text-xs font-bold tracking-widest uppercase"
              >
                {sending ? site.closer.sending : site.closer.cta}
              </ShimmerButton>
            </motion.form>
          )}
        </motion.div>
      </Container>
    </section>
  );
}
