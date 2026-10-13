"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export interface CursorCardProps {
  children: React.ReactNode;
  image: string;
  description: string;
  href?: string;
  className?: string;
}

export function CursorCard({ children, image, description, href = "#", className }: CursorCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [mounted, setMounted] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 300 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    x.set(e.clientX - 120); // Center horizontally (width 240 / 2)
    y.set(e.clientY + 20);  // Offset vertically slightly below cursor
  };

  return (
    <>
      <a
        href={href}
        className={cn(
          "relative inline-block font-bold text-neutral-900 dark:text-neutral-100 transition-colors",
          "hover:bg-orange-100 dark:hover:bg-orange-900/40 rounded px-1 -mx-1",
          className
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseMove={handleMouseMove}
      >
        {children}
      </a>

      {mounted && typeof document !== "undefined" && createPortal(
        <AnimatePresence>
          {isHovered && (
            <motion.div
