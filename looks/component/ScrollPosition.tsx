"use client";

import { useEffect, useLayoutEffect, useRef } from "react";

// Restore the saved offset before the first paint so the list never flashes at
// the top. Layout effects never run during server prerendering, where they
// would only produce a warning, so fall back to useEffect there.
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

// Offsets live in module memory so a route can be left and remounted without
// losing the reader's place.
const scrollPositions = new Map<string, number>();

/**
 * Keeps the scroll offset of its parent scroll container in sync with `id`.
 * Render it as the FIRST child of that container: its restore runs before any
 * sibling effect, so shared layout transitions (framer-motion) measure the
 * restored positions instead of the un-scrolled ones.
 */
export default function ScrollPosition({ id }: { id: string }) {
  const holderRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const container = holderRef.current?.parentElement;
    if (!container) return;

    const saved = scrollPositions.get(id);
    if (saved) container.scrollTop = saved;

    const persist = () => scrollPositions.set(id, container.scrollTop);
    container.addEventListener("scroll", persist, { passive: true });

    return () => {
      // Layout cleanups run before the container leaves the DOM, but guard
      // against a detached container (scrollTop forced to 0) clobbering the
      // offset the scroll listener already recorded.
      const offset = container.scrollTop;
      if (offset > 0) scrollPositions.set(id, offset);
      container.removeEventListener("scroll", persist);
    };
  }, [id]);

  return <div ref={holderRef} aria-hidden="true" className="hidden" />;
}
