"use client";

import { FormEvent, useState } from "react";
import { motion, type Variants } from "motion/react";
import Container from "./container";
import Heading from "./heading";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { site } from "@/content/site";
import { joinWaitlist } from "@/lib/waitlist";

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
    setSending(true);
    setError("");

    const name =
      typeof window !== "undefined"
        ? sessionStorage.getItem("nthtake-name") ?? ""
        : "";

    const result = await joinWaitlist({
      name,
      email: email.trim(),
      craft,
      source: "closer",
      company,
    });

    if (!result.ok) {
      setSending(false);
      setError(result.error);
      return;
    }

    sessionStorage.setItem("nthtake-email", email.trim());
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
            <motion.p variants={itemVariants} className="mt-10 text-white">
              We&apos;ll ping you when a studio slot opens.
            </motion.p>
          ) : (
            <motion.form variants={itemVariants} onSubmit={onSubmit} className="mt-8 space-y-4 text-left">
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
              <label className="block text-[10px] tracking-widest text-white/40 uppercase">
                {site.closer.emailLabel}
                <input
                  required
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={sending}
                  className="mt-2 w-full border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none placeholder:text-white/40 focus:border-primary focus-visible:ring-1 focus-visible:ring-primary disabled:opacity-50"
                />
              </label>
              <label className="block text-[10px] tracking-widest text-white/40 uppercase">
                {site.closer.craftLabel}
                <span className="relative mt-2 block">
                  <select
                    value={craft}
                    onChange={(e) => setCraft(e.target.value)}
                    disabled={sending}
                    className="w-full appearance-none border border-white/10 bg-black/40 px-4 py-3 pr-10 text-sm text-white outline-none focus:border-primary focus-visible:ring-1 focus-visible:ring-primary disabled:opacity-50"
                  >
                    {site.closer.crafts.map((c) => (
                      <option key={c.value} value={c.value} className="bg-neutral-950">
                        {c.label}
                      </option>
                    ))}
                  </select>
                  <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-white/40">
                    ▾
                  </span>
                </span>
              </label>
              {error ? (
                <p className="text-sm text-red-400" role="alert">
                  {error}
                </p>
              ) : null}
              <ShimmerButton
                type="submit"
                disabled={sending}
                className="w-full rounded-none px-8 py-4 text-xs font-bold tracking-widest uppercase"
              >
                {sending ? "Sending" : site.closer.cta}
              </ShimmerButton>
            </motion.form>
          )}
        </motion.div>
      </Container>
    </section>
  );
}
