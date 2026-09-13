"use client";

import { Faq6 } from "@/components/ui/faq-6";
import { site } from "@/content/site";

export default function Questions() {
  return (
    <section id="questions" className="relative overflow-hidden bg-[#101010] py-24 font-mono scroll-mt-20 md:py-32">
      <div className="absolute top-0 left-0 hidden w-full border-t border-white/5 lg:block" />
      <div className="container mx-auto px-4 md:px-8 lg:px-12 xl:px-16">
        <Faq6
          badge={`// ${site.faq.badge}`}
          title={site.faq.title}
          faqs={site.faq.items}
          className="border-white/10 bg-black/20"
        />
      </div>
    </section>
  );
}
