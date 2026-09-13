"use client";

import { NewTwitterIcon } from "hugeicons-react";
import { cn } from "@/lib/utils";
import { NthtakeMark } from "@/assets/nthtake-mark";
import { site } from "@/content/site";

function Crosshair({
  position,
}: {
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
}) {
  const isTop = position.startsWith("top");
  const isLeft = position.endsWith("left");

  return (
    <div
      className={cn(
        "pointer-events-none absolute h-8 w-8",
        isTop ? "top-0" : "bottom-0",
        isLeft ? "left-0" : "right-0",
      )}
    >
      <div
        className={cn(
          "absolute h-full w-px bg-white/10",
          isTop ? "top-0" : "bottom-0",
          isLeft ? "left-4" : "right-4",
        )}
      />
      <div
        className={cn(
          "absolute h-px w-full bg-white/10",
          isTop ? "top-4" : "bottom-4",
          isLeft ? "left-0" : "right-0",
        )}
      />
    </div>
  );
}

function FooterLinkColumn({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-5">
      <div className="mb-2 flex gap-2 font-mono text-xs tracking-widest text-white/50">
        <span className="text-primary">{"//"}</span> {title}
      </div>
      {children}
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} className="text-sm text-white/50 transition-colors hover:text-white">
      {children}
    </a>
  );
}

export default function Footer() {
  return (
    <footer className="bg-background text-foreground relative overflow-hidden border-t border-white/5 font-mono">
      <Crosshair position="top-left" />
      <Crosshair position="top-right" />

      <div className="relative z-10 container mx-auto px-4 pt-20 pb-12 md:px-8 lg:px-12 xl:px-16">
        <div className="relative grid grid-cols-1 gap-12 border-b border-white/5 pb-16 lg:grid-cols-12 lg:gap-8">
          <div className="flex flex-col items-start pr-0 lg:col-span-5 lg:pr-8">
            <div className="mb-6 flex items-center gap-2 font-mono text-xs tracking-widest text-white/50">
              <span className="text-primary">{"//"}</span> {site.name.toUpperCase()}
            </div>
            <h3 className="mb-6 font-sans text-3xl tracking-tight text-balance md:text-5xl">
              One studio link to <br className="hidden lg:block" /> review and
              unlock
            </h3>
            <p className="max-w-md text-sm leading-relaxed text-pretty text-white/50">
              {site.footer.blurb}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:col-span-7 lg:pl-8">
            <FooterLinkColumn title="PRODUCT">
              {site.footer.product.map((link) => (
                <FooterLink key={link.href} href={link.href}>
                  {link.label}
                </FooterLink>
              ))}
            </FooterLinkColumn>

            <FooterLinkColumn title="LEGAL">
              {site.footer.legal.map((link) => (
                <FooterLink key={link.label} href={link.href}>
                  {link.label}
                </FooterLink>
              ))}
            </FooterLinkColumn>

            <FooterLinkColumn title="COMPANY">
              {site.footer.company.map((link) => (
                <FooterLink key={link.href} href={link.href}>
                  {link.label}
                </FooterLink>
              ))}
            </FooterLinkColumn>
          </div>

          <div className="absolute top-0 bottom-0 left-[41.666%] hidden w-px bg-white/5 lg:block" />
        </div>

        <div className="relative flex flex-col items-center justify-between gap-6 border-b border-white/5 py-6 md:flex-row">
          <div className="flex items-center gap-3">
            <div className="bg-primary h-2 w-2" />
            <span className="text-primary font-mono text-xs tracking-widest uppercase">
              {site.footer.status}
            </span>
          </div>
          <div className="font-mono text-xs tracking-widest text-white/40">
            {`[ ${site.name.toUpperCase()} ]`}
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-8 pt-12 xl:flex-row xl:items-center">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center text-primary">
              <NthtakeMark state="unlocked" className="h-8 w-8" />
            </div>
            <span className="font-sans text-lg font-bold tracking-tight text-white/90">
              {site.name}
            </span>
          </div>

          <div className="flex w-full flex-col items-start justify-between gap-4 text-xs tracking-widest text-white/40 uppercase md:flex-row md:items-center md:gap-16 xl:w-auto">
            <span>&copy; 2026 {site.name}. All rights reserved.</span>
            <div className="flex gap-4 md:gap-6">
              <a href="#" className="transition-colors hover:text-white">
                Privacy
              </a>
              <a href="#" className="transition-colors hover:text-white">
                Terms
              </a>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px] tracking-widest text-white/40 uppercase">
              Social URL pending
            </span>
            <span
              className="flex h-8 w-8 items-center justify-center border border-white/10 text-white/30"
              title="X / Twitter URL pending"
            >
              <NewTwitterIcon className="h-4 w-4" />
            </span>
          </div>
        </div>
      </div>

      <Crosshair position="bottom-left" />
      <Crosshair position="bottom-right" />
    </footer>
  );
}
