"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import {
  describeWaitlistError,
  EMAIL_RE,
  joinWaitlist,
  type WaitlistResult,
} from "@/lib/waitlist";
import { site } from "@/content/site";
import { WaitlistInput, WaitlistReceipt, WaitlistStatus } from "@/components/watermelon/templates/landing-01/landing/waitlist-field";
import { cn } from "@/lib/utils";

interface MorphingButtonProps {
  buttonText?: string;
  placeholder?: string;
  onSubmit?: (email: string) => void | Promise<WaitlistResult | void>;
  className?: string;
}

export const MorphingButton: React.FC<MorphingButtonProps> = ({
  buttonText = site.hero.waitlistCta,
  placeholder = site.hero.waitlistPlaceholder,
  onSubmit,
  className = "",
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const containerRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sending ||
        !containerRef.current ||
        containerRef.current.contains(event.target as Node)
      ) {
        return;
      }
      setIsExpanded(false);
      setError("");
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [sending]);

  useEffect(() => {
    if (isExpanded && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isExpanded]);

  async function submitEmail() {
    if (sending) return;
    const trimmed = email.trim();
    if (!trimmed || !EMAIL_RE.test(trimmed)) {
      setError(site.hero.waitlistError);
      setIsExpanded(true);
      return;
    }

    setSending(true);
    setError("");

    const result = onSubmit
      ? await onSubmit(trimmed)
      : await joinWaitlist({ email: trimmed, source: "studio-tools" });

    if (result && "ok" in result && !result.ok) {
      setSending(false);
      setError(describeWaitlistError(result.error));
      setIsExpanded(true);
      return;
    }

    setEmail(trimmed);
    setSending(false);
    setDone(true);
    setIsExpanded(false);
  }

  function onFormSubmit(e: FormEvent) {
    e.preventDefault();
    void submitEmail();
  }

  if (done) {
    return (
      <div className={cn("flex w-full justify-center px-2", className)}>
        <WaitlistReceipt email={email} label={site.hero.waitlistSuccess} />
      </div>
    );
  }

  return (
    <div className={cn("flex w-full flex-col items-center gap-3 px-2", className)}>
      <form
        ref={containerRef}
        onSubmit={onFormSubmit}
        noValidate
        className={cn("w-full", isExpanded ? "max-w-sm" : "w-auto")}
      >
        <div
          className={cn(
            "overflow-hidden",
            isExpanded ? "flex w-full flex-col" : "flex w-auto",
            isExpanded
              ? error
                ? "border border-white/35 bg-black/60"
                : "border border-white/15 bg-black/60"
              : "bg-transparent",
          )}
        >
          {isExpanded ? (
            <div className="min-w-0 w-full">
                <label className="sr-only" htmlFor="studio-waitlist-email">
                  {site.hero.waitlistLabel}
                </label>
                <WaitlistInput
                  id="studio-waitlist-email"
                  ref={inputRef}
                  type="email"
                  autoComplete="email"
                  inputMode="email"
                  placeholder={placeholder}
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError("");
                  }}
                  disabled={sending}
                  invalid={Boolean(error)}
                  className="border-0 bg-transparent focus-within:ring-0"
                />
            </div>
          ) : null}

          <button
            type={isExpanded ? "submit" : "button"}
            disabled={sending}
            onClick={() => {
              if (!isExpanded) setIsExpanded(true);
            }}
            className={cn(
              "bg-primary text-primary-foreground shrink-0 px-5 py-3 text-xs font-bold tracking-widest uppercase",
              "hover:bg-primary/90 focus-visible:ring-1 focus-visible:ring-primary disabled:opacity-50",
              isExpanded && "w-full",
            )}
          >
            {sending ? site.hero.waitlistSending : buttonText}
          </button>
        </div>
      </form>
      <WaitlistStatus error={error} />
    </div>
  );
};
