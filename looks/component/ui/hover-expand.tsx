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
              />
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
