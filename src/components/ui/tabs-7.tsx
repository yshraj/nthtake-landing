"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

type Tab = { label: string; body: string };

const DEFAULT_TABS: Tab[] = [
  { label: "Notes", body: "Numbered notes sit on this take, not in a 40-message thread." },
  { label: "Compare", body: "Keep Take 02 beside Take 03. Nothing overwrites into FINAL_v7." },
  { label: "Submit", body: "One round. They submit this take, then you cut the next." },
];

export default function Tabs7({ tabs = DEFAULT_TABS }: { tabs?: Tab[] }) {
  const [active, setActive] = useState(tabs[0].label);

  return (
    <div className="w-full max-w-sm">
      <div className="flex border border-white/15">
        {tabs.map((tab) => (
          <button
            key={tab.label}
            type="button"
            onClick={() => setActive(tab.label)}
            className={cn(
              "flex-1 px-3 py-2 font-mono text-[10px] uppercase tracking-widest transition-colors",
              active === tab.label
                ? "bg-white text-black"
                : "bg-transparent text-white/60 hover:text-white",
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <p className="mt-3 text-left font-mono text-[11px] leading-relaxed text-white/50">
        {tabs.find((tab) => tab.label === active)?.body}
      </p>
    </div>
  );
}
