"use client";

import { useState, useEffect, type FC } from "react";
import { motion, LayoutGroup } from "motion/react";
import { cn } from "@/lib/utils";

interface TabItem {
    id: string;
    label: string;
}

interface ContinuousTabsProps {
    tabs?: TabItem[];
    defaultActiveId?: string;
    onChange?: (id: string) => void;
}

const DEFAULT_TABS: TabItem[] = [
    { id: "home", label: "Home" },
    { id: "interactions", label: "Interactions" },
    { id: "resources", label: "Resources" },
    { id: "docs", label: "Docs" },
];

export const ContinuousTabs: FC<ContinuousTabsProps> = ({
    tabs = DEFAULT_TABS,
    defaultActiveId = "home",
    onChange,
}) => {
    const [active, setActive] = useState<string>(defaultActiveId);
    const [isMounted, setIsMounted] = useState<boolean>(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const handleChange = (id: string) => {
        setActive(id);
        onChange?.(id);
    };

    if (!isMounted) return null;

    return (
        <LayoutGroup>
            <nav className="relative flex items-center gap-0.5 border border-white/15 bg-black/40 p-1">
                {tabs.map((tab) => {
                    const isActive = active === tab.id;

                    return (
                        <button
                            key={tab.id}
                            type="button"
                            onClick={() => handleChange(tab.id)}
                            className="relative px-4 py-2 sm:px-6 sm:py-2.5 outline-none"
                        >
                            {isActive && (
                                <motion.div
                                    layoutId="active-pill"
                                    transition={{
                                        type: "spring",
                                        stiffness: 380,
                                        damping: 30,
                                        mass: 0.9,
                                    }}
                                    className="absolute inset-0 bg-white"
                                />
                            )}
                            <span
                                className={cn(
                                    "relative z-10 font-mono text-xs font-bold tracking-widest uppercase transition-colors duration-200",
                                    isActive ? "text-black" : "text-white/50 hover:text-white",
                                )}
                            >
                                {tab.label}
                            </span>
                        </button>
                    );
                })}
            </nav>
        </LayoutGroup>
    );
};
