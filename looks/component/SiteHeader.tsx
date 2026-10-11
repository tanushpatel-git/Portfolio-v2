"use client";
import { useCallback, useLayoutEffect, useRef, useState } from "react";

const TICK_COUNT = 41;
const CENTER_TICK = Math.floor(TICK_COUNT / 2); // 20
const ticks = Array.from({ length: TICK_COUNT }, (_, i) => i);

const navItems = [
  { id: "about", label: "About" },
  { id: "design", label: "Design" },
  { id: "articles", label: "Articles" },
  { id: "engineering", label: "& Engineering" },
];

// One gap value used everywhere, so spacing is identical between all items
const GAP = "gap-x-3 sm:gap-x-5";

export default function SiteHeader() {
  const [active, setActive] = useState("about");
  const [offset, setOffset] = useState(0);
  const [ready, setReady] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Array<HTMLAnchorElement | null>>([]);

  const activeIndex = navItems.findIndex((item) => item.id === active);

  // Center the active item by sliding the whole row horizontally
  const measure = useCallback(() => {
    const container = containerRef.current;
    const row = rowRef.current;
    const item = itemRefs.current[activeIndex];
    if (!container || !row || !item) return;

    const containerRect = container.getBoundingClientRect();
    const rowRect = row.getBoundingClientRect();
    const itemRect = item.getBoundingClientRect();
    const itemCenterInRow = itemRect.left + itemRect.width / 2 - rowRect.left;

    setOffset(containerRect.width / 2 - itemCenterInRow);
  }, [activeIndex]);

  useLayoutEffect(() => {
    measure();

    const raf = requestAnimationFrame(() => setReady(true));
    window.addEventListener("resize", measure);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  const select = (id: string) => {
    if (id === active) return;
    setActive(id);
  };

  const linkBase =
    "rounded-full px-3 py-1.5 text-sm leading-5 no-underline whitespace-nowrap transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black sm:text-base";

  // Hover/focus gives the same gray pill as the active item
  const inactive =
    "text-[#888] hover:bg-[#e9e9e9] hover:text-[#111] focus-visible:bg-[#e9e9e9] focus-visible:text-[#111]";
  const activeCls = "bg-[#e9e9e9] text-[#111]";

  return (
    <header className="-mx-4 w-[calc(100%+2rem)] border-t-2 border-[#111] px-4 pt-3 sm:-mx-6 sm:w-[calc(100%+3rem)] sm:px-6 lg:-mx-[2.35vw] lg:w-[calc(100%+4.7vw)] lg:px-[2.35vw]">
      <div className="mx-auto max-w-[700px]">
        {/* Decorative ticks */}
        <div className="flex h-7 items-start justify-between" aria-hidden="true">
          {ticks.map((tick) => (
            <span
              key={tick}
              className={
                tick === CENTER_TICK
                  ? "h-6 w-px shrink-0 bg-[#151515]"
                  : "h-[7px] w-px shrink-0 bg-[#999]"
              }
            />
          ))}
        </div>

        {/* Navigation: the row slides so the active item stays centered */}
        <nav aria-label="Main navigation" className="pb-2">
          <div ref={containerRef} className="overflow-hidden py-1">
            <div
              ref={rowRef}
              style={{ transform: `translateX(${offset}px)` }}
              className={`flex items-center justify-start ${GAP} ${
                ready
                  ? "transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform"
                  : ""
              }`}
            >
              {navItems.map((item, index) => (
                <a
                  key={item.id}
                  ref={(el) => {
                    itemRefs.current[index] = el;
                  }}
                  href={`#${item.id}`}
                  onClick={() => select(item.id)}
                  aria-current={index === activeIndex ? "page" : undefined}
                  className={`${linkBase} ${
                    index === activeIndex ? activeCls : inactive
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
