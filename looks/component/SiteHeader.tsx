"use client";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { cn } from "@/lib/utils";

const TICK_COUNT = 41;
const CENTER_TICK = Math.floor(TICK_COUNT / 2); // 20
const ticks = Array.from({ length: TICK_COUNT }, (_, i) => i);

const navItems = [
  { id: "Home", label: "Home", href: "/" },
  { id: "About", label: "About", href: "/about" },
  { id: "Projects", label: "Projects", href: "/projects" },
  { id: "Setting", label: "Setting", href: "/setting" },
] as const;

const findActiveNavItem = (pathname: string) =>
  navItems.find(
    (item) => item.href === pathname || (item.id === "Projects" && pathname.startsWith("/project/")),
  );

type NavId = (typeof navItems)[number]["id"];

// One gap value used everywhere, so spacing is identical between all items
const GAP = "gap-x-[clamp(6px,1.6vw,20px)]";

const TICK_SRC = "/SoundBar/tick.wav";
const TICK_GAIN: 1 | 2 | 3 | 4 | 5 | 6 = 6;

export default function SiteHeader() {
  const router = useRouter();
  const pathname = usePathname();

  const [active, setActive] = useState<NavId>(() => {
    const match = findActiveNavItem(pathname);
    return match?.id ?? "Home";
  });
  const [offset, setOffset] = useState(0);
  const [ready, setReady] = useState(false);
  const [dragDelta, setDragDelta] = useState(0);
  const [dragging, setDragging] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Array<HTMLAnchorElement | null>>([]);
  const itemCentersRef = useRef<number[]>([]);
  const containerWidthRef = useRef(0);
  const dragRef = useRef({
    active: false,
    startX: 0,
    pointerId: -1,
    moved: false,
  });
  const audioRef = useRef<HTMLAudioElement>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const tickBufferRef = useRef<AudioBuffer | null>(null);
  const lastTickIndexRef = useRef(0);

  const activeIndex = navItems.findIndex((item) => item.id === active);

  // Decode the tick once so playback is instant and can be amplified
  useEffect(() => {
    const AudioCtor =
      window.AudioContext ??
      (window as typeof window & { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;
    if (!AudioCtor) return;

    const ctx = new AudioCtor();
    audioCtxRef.current = ctx;
    let cancelled = false;

    fetch(TICK_SRC)
      .then((res) => res.arrayBuffer())
      .then((data) => ctx.decodeAudioData(data))
      .then((buffer) => {
        if (!cancelled) tickBufferRef.current = buffer;
      })
      .catch(() => { });

    return () => {
      cancelled = true;
      void ctx.close().catch(() => { });
      audioCtxRef.current = null;
    };
  }, []);

  const playTick = useCallback(() => {
    const ctx = audioCtxRef.current;
    const buffer = tickBufferRef.current;

    if (ctx && buffer) {
      if (ctx.state === "suspended") void ctx.resume();
      const source = ctx.createBufferSource();
      source.buffer = buffer;
      const gain = ctx.createGain();
      gain.gain.value = TICK_GAIN;
      source.connect(gain).connect(ctx.destination);
      source.start();
      return;
    }

    // Fallback: plain audio element
    const audio = audioRef.current;
    if (!audio) return;
    try {
      audio.currentTime = 0;
    } catch {
      /* metadata not ready yet */
    }
    void audio.play().catch(() => { });
  }, []);

  // Center the active item by sliding the whole row horizontally
  const measure = useCallback(() => {
    const container = containerRef.current;
    const row = rowRef.current;
    if (!container || !row) return;

    const containerRect = container.getBoundingClientRect();
    const rowRect = row.getBoundingClientRect();
    containerWidthRef.current = containerRect.width;
    itemCentersRef.current = itemRefs.current.map((el) => {
      if (!el) return 0;
      const rect = el.getBoundingClientRect();
      return rect.left + rect.width / 2 - rowRect.left;
    });

    const activeCenter = itemCentersRef.current[activeIndex] ?? 0;
    setOffset(containerRect.width / 2 - activeCenter);
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

  // Keep the active item in sync with the current route
  useEffect(() => {
    const match = findActiveNavItem(pathname);
    if (match) setActive(match.id);
  }, [pathname]);

  const commitIndex = useCallback((index: number) => {
    if (index < 0 || index >= navItems.length) return;
    if (navItems[index].id === active) return;
    setActive(navItems[index].id);
    const item = navItems[index];
    if (item.href.startsWith("/")) router.push(item.href);
  }, [active, router]);

  // Link handles route navigation; this only updates the pill + sound
  const select = useCallback((id: NavId) => {
    if (id === active) return;
    playTick();
    setActive(id);
  }, [active, playTick]);

  // Tick whenever the item nearest to the center changes (so dragging past
  // sections fires one tick per section, like a dial)
  const tickTo = useCallback((index: number) => {
    if (index === lastTickIndexRef.current) return;
    lastTickIndexRef.current = index;
    playTick();
  }, [playTick]);

  const nearestIndexTo = useCallback((translate: number) => {
    const centers = itemCentersRef.current;
    const containerCenter = containerWidthRef.current / 2;
    let nearest = activeIndex;
    let best = Infinity;
    centers.forEach((center, index) => {
      const distance = Math.abs(center + translate - containerCenter);
      if (distance < best) {
        best = distance;
        nearest = index;
      }
    });
    return nearest;
  }, [activeIndex]);

  // --- Drag / swipe to change the active item -----------------------------
  const onPointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    dragRef.current = {
      active: true,
      startX: e.clientX,
      pointerId: e.pointerId,
      moved: false,
    };
    lastTickIndexRef.current = activeIndex;
    setDragging(true);
  }, [activeIndex]);

  const onPointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag.active) return;
    const delta = e.clientX - drag.startX;
    if (!drag.moved && Math.abs(delta) > 5) {
      drag.moved = true;
      try {
        e.currentTarget.setPointerCapture(drag.pointerId);
      } catch {
        /* not capturable */
      }
    }
    setDragDelta(delta);
    tickTo(nearestIndexTo(offset + delta));
  }, [offset, tickTo, nearestIndexTo]);

  const endDrag = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag.active) return;
    drag.active = false;
    setDragging(false);
    try {
      e.currentTarget.releasePointerCapture(drag.pointerId);
    } catch {
      /* already released */
    }

    const nearest = nearestIndexTo(offset + dragDelta);
    setDragDelta(0);
    tickTo(nearest);
    commitIndex(nearest);
  }, [offset, dragDelta, nearestIndexTo, tickTo, commitIndex]);

  const linkBase =
    "rounded-full px-[clamp(8px,2.6vw,12px)] py-[clamp(4px,1.1vw,6px)] text-[clamp(11px,3.2vw,16px)] leading-5 no-underline whitespace-nowrap transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black";

  // Hover/focus gives the same gray pill as the active item
  const inactive =
    "text-[#888] hover:underline hover:text-[#111] focus-visible:bg-[#e9e9e9] focus-visible:text-[#111]";
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
          <div
            ref={containerRef}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
            className={cn(
              "touch-pan-y overflow-hidden py-1 select-none",
              dragging ? "cursor-grabbing" : "cursor-grab"
            )}
          >
            <div
              ref={rowRef}
              style={{ transform: `translateX(${offset + dragDelta}px)` }}
              className={cn(
                "flex items-center justify-start",
                GAP,
                ready &&
                !dragging &&
                "transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform"
              )}
            >
              {navItems.map((item, index) => (
                <Link
                  key={item.id}
                  ref={(el) => {
                    itemRefs.current[index] = el;
                  }}
                  href={item.href}
                  draggable={false}
                  onClick={(e) => {
                    if (dragRef.current.moved) {
                      e.preventDefault();
                      return;
                    }
                    select(item.id);
                  }}
                  aria-current={index === activeIndex ? "page" : undefined}
                  className={cn(
                    linkBase,
                    index === activeIndex ? activeCls : inactive
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </nav>
      </div>

      <audio ref={audioRef} src={TICK_SRC} preload="auto" className="hidden" />
    </header>
  );
}
