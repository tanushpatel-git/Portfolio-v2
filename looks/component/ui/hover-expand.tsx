"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface HoverExpandItem {
  label: string;
  sublabel?: string;
  image: string;
  imageAlt?: string;
  description?: string;
  onSelect?: () => void;
}

export interface HoverExpandProps {
  items: HoverExpandItem[];
  collapsedHeight?: number;
  expandedHeight?: number;
  className?: string;
}

export function HoverExpand({
  items,
  collapsedHeight = 74,
  expandedHeight = 340,
  className,
}: HoverExpandProps) {
  const [activeIndex, setActiveIndex] = React.useState<number | null>(0);

  return (
    <div className={cn("w-full", className)}>
      <div className="overflow-hidden rounded-[1.6rem] border border-black/10 bg-[#f7f6f4] px-4 sm:px-6">
        {items.map((item, index) => {
          const expanded = activeIndex === index;
          const dimmed = activeIndex !== null && !expanded;

          return (
            <React.Fragment key={`${item.label}-${index}`}>
              <motion.div
                className="relative w-full overflow-hidden border-b border-black/10 last:border-b-0"
                animate={{ height: expanded ? expandedHeight : collapsedHeight, opacity: dimmed ? 0.58 : 1 }}
                transition={{
                  height: { type: "spring", stiffness: 260, damping: 30, mass: 0.85 },
                  opacity: { duration: 0.22, ease: "easeOut" },
                }}
                onHoverStart={() => setActiveIndex(index)}
                onFocus={() => setActiveIndex(index)}
              >
                <motion.div
                  aria-hidden="true"
                  className="absolute inset-0"
                  initial={false}
                  animate={{ opacity: expanded ? 1 : 0, scale: expanded ? 1 : 1.04 }}
                  transition={{ opacity: { duration: 0.35 }, scale: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }}
                >
                  <img src={item.image} alt="" className="size-full object-cover" loading="lazy" decoding="async" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/5" />
                </motion.div>

                <div className="pointer-events-none absolute inset-x-4 bottom-4 z-20 flex items-end justify-between gap-4 sm:inset-x-6 sm:bottom-5">
                  <div className="min-w-0">
                    <div className="flex items-baseline gap-3">
                      <span className={`shrink-0 text-xs tabular-nums ${expanded ? "text-white/60" : "text-[#777]"}`}>{String(index + 1).padStart(2, "0")}</span>
                      <span className={`truncate text-[clamp(1.1rem,2.2vw,1.5rem)] font-semibold tracking-tight ${expanded ? "text-white" : "text-[#191919]"}`}>{item.label}</span>
                      {item.description && (
                        <span className={`hidden truncate text-sm sm:block ${expanded ? "text-white/75" : "text-[#777]"}`}>— {item.description}</span>
                      )}
                    </div>
                    {expanded && item.description && <p className="mb-0 ml-8 mt-2 max-w-2xl text-sm leading-6 text-white/75 sm:hidden">{item.description}</p>}
                  </div>
                  <span className={`shrink-0 text-[10px] font-medium uppercase tracking-[0.16em] ${expanded ? "text-white/70" : "text-[#888]"}`}>{item.sublabel}</span>
                </div>
              </motion.div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
