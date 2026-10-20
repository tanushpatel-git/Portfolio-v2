"use client";

import { Fragment, useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { MusicPlayer, type MusicTrack } from "@/component/ui/music-player";
import WaveGridBackground from "@/component/WaveGridBackground";
import GitHubAboutArticle from "@/component/GitHubAboutArticle";
import EmergXExperienceArticle from "@/component/EmergXExperienceArticle";
import { useSitePreferences } from "@/component/SitePreferences";

// Each entry is a complete, editable article. Add or remove a JSX fragment to
// add or remove a slide. Write any HTML/JSX inside it: headings, images, video,
// links, and other components are all supported.
const articles = [
  <>
    <header className="mb-8 max-w-[900px] sm:mb-10">
      <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.16em] text-[#e33b58] sm:text-sm">PROFILE / 01</p>
      <h1 className="mb-3 mt-0 text-[clamp(2rem,4vw,3.5rem)] font-medium leading-[0.98] tracking-[-0.065em]">A little more about me.</h1>
      <p className="m-0 max-w-[800px] text-base leading-relaxed sm:text-lg">
        I’m Tanush, a 19-year-old CSE student, developer, and curious maker. I love learning how things work—and building ideas into things people can use.
      </p>
    </header>

    <section
      aria-label="Tanush — About me"
      className="relative isolate mb-12 flex h-[min(76dvh,780px)] min-h-[440px] items-center justify-center overflow-hidden rounded-[1.5rem] bg-black sm:mb-16 sm:rounded-[2rem]"
    >
      <span className="sr-only">About me</span>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[43%] z-0 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-[clamp(6rem,25vw,22rem)] font-black leading-none tracking-[-0.11em] text-[#f04416]/55"
      >
        TLUX
      </span>
      <span className="absolute left-3 top-1/2 z-20 -translate-y-1/2 text-[10px] font-semibold uppercase tracking-[0.3em] text-white [writing-mode:vertical-rl] rotate-180 sm:left-6 sm:text-xs sm:tracking-[0.4em]">
        ABOUT ME
      </span>
      <Image
        src="/aboutMain.webp"
        alt="Anime illustration centered over the TLUX wordmark"
        width={1080}
        height={2288}
        sizes="(max-width: 640px) 86vw, 50vw"
        className="relative z-10 h-[98%] max-w-[86vw] object-contain object-bottom mix-blend-screen"
      />
      <span className="absolute right-3 top-1/2 z-20 -translate-y-1/2 text-[10px] font-semibold uppercase tracking-[0.3em] text-white [writing-mode:vertical-rl] sm:right-6 sm:text-xs sm:tracking-[0.4em]">
        ABOUT ME
      </span>
      <span className="absolute bottom-4 left-1/2 z-20 -translate-x-1/2 rounded-full border border-white/20 bg-black/50 px-4 py-1.5 text-[10px] uppercase tracking-[0.18em] text-white/80 backdrop-blur-sm sm:bottom-6 sm:text-xs">
        Tanush · 19 · CSE
      </span>
    </section>

    <div className="max-w-[1050px] space-y-12 text-[15px] leading-[1.75] sm:space-y-16 sm:text-base lg:text-[clamp(16px,1.2vw,20px)]">
      <section aria-labelledby="about-education" className="grid gap-4 sm:grid-cols-2">
        <div className="bio-panel relative overflow-hidden rounded-2xl border border-black/10 bg-[#f6f4f2] p-5 sm:p-6">
          <img src="/about/cursed-seal.svg" alt="Decorative occult seal" className="absolute right-4 top-4 size-12 opacity-80 sm:size-14" />
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.14em] opacity-60">Currently</p>
          <h2 id="about-education" className="mb-2 mt-0 text-xl font-medium tracking-tight sm:text-2xl">Learning and building</h2>
          <p className="m-0">I’m pursuing a B.Tech in Computer Science and Engineering at Oriental Institute of Science and Technology. I’m in my third semester, with graduation expected in 2029.</p>
        </div>
        <div className="bio-panel rounded-2xl border border-black/10 bg-[#f6f4f2] p-5 sm:p-6">
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.14em] opacity-60">Experience · 2026</p>
          <h2 className="mb-2 mt-0 text-xl font-medium tracking-tight sm:text-2xl">EmergX</h2>
          <p className="m-0">I completed an internship at EmergX, gaining experience working in a professional environment.</p>
        </div>
      </section>

      <section aria-labelledby="about-interests" className="max-w-[850px]">
        <p className="mb-2 text-xs font-medium uppercase tracking-[0.14em] opacity-60">Away from the screen</p>
        <h2 id="about-interests" className="mb-3 mt-0 text-2xl font-medium tracking-tight sm:text-3xl">A few things I enjoy</h2>
        <p className="m-0">I love sketching and dancing, and anime is a favourite way to unwind. Coding has become a hobby too: I enjoy exploring a new idea and seeing where I can take it.</p>
      </section>

      <section aria-labelledby="about-skills">
        <div className="mb-7 flex flex-wrap items-end justify-between gap-3 border-b border-current/15 pb-4">
          <div>
            <p className="mb-2 text-xs font-medium uppercase tracking-[0.14em] opacity-60">Curiosity, put to work</p>
            <h2 id="about-skills" className="m-0 text-2xl font-medium tracking-tight sm:text-3xl">Things I work with</h2>
          </div>
          <span className="text-sm opacity-60">A growing toolkit</span>
        </div>

        <p className="m-0 mb-7 max-w-[850px]">
          I actively use many AI tools depending on the requirement — to
          accelerate development, streamline workflows, and enhance design
          quality.
        </p>

        <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
{[
  {
    title: "Languages",
    skills: ["HTML", "CSS", "JavaScript", "TypeScript", "Java", "Go", "Python"],
  },
  {
    title: "Frameworks",
    skills: ["React", "Next.js", "Express.js", "Tailwind CSS", "Bootstrap"],
  },
  {
    title: "Libraries & animation",
    skills: ["GSAP", "Framer Motion", "Locomotive Scroll", "Swiper.js", "Chart.js", "React Router", "Redux Toolkit"],
  },
  {
    title: "Databases & tools",
    skills: ["MongoDB", "Mongoose", "Firebase", "Git", "GitHub"],
  },
].map(({ title, skills }, sectionIndex) => (
            <section key={title} aria-label={title} className="bio-skill-group border-t border-current/15 pt-4">
              <h3 className="mb-3 mt-0 flex items-center gap-3 text-base font-medium sm:text-lg"><span className="text-xs opacity-50">0{sectionIndex + 1}</span>{title}</h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => <span key={skill} className="skill-pill rounded-full border border-black/10 bg-white/70 px-3 py-1 text-[13px] leading-5">{skill}</span>)}
              </div>
            </section>
          ))}</div>
      </section>

      <blockquote className="m-0 max-w-[850px] border-l-2 border-[#dedede] py-1 pl-5 text-lg font-medium sm:pl-7 sm:text-xl">
        Curious by nature. Always learning, always looking for the next idea to bring to life.
      </blockquote>
    </div>
  </>,
  <GitHubAboutArticle key="github" />,
  <EmergXExperienceArticle key="emergx" />,
];

const tracks: MusicTrack[] = [
  { title: "Vibe 1", artist: "Tanush", src: "/songs/vibe1.mp3", artwork: "/songs/Image/gojo.webp" },
  { title: "Vibe 2", artist: "Tanush", src: "/songs/vibe2.mp3", artwork: "/songs/Image/itadori.webp" },
  { title: "Vibe 3", artist: "Tanush", src: "/songs/vibe3.mp3", artwork: "/songs/Image/sukuna.webp" },
];

// Wave-grid accent (hover) color per article, cycling if there are more.
const ARTICLE_ACCENTS = ["#e33b58", "#5b8cff", "#ff6a00"];

// Articles that open with the full-screen "curtain" wipe, keyed by index.
const CURTAIN_LABELS: Record<number, string> = {
  0: "About Me",
  1: "About Github",
  2: "EmergX Experience"
};
const CURTAIN_COLORS = ["#ff6a00", "#10234a", "#0b0710"];
const CURTAIN_LABEL_COLORS = ["#17100b", "#f1f5ff", "#ff4fa3"];

// Touch gestures mirror the desktop wheel behaviour: swipe up to open a
// collapsed article, swipe down at the top of an open one to close it.
const TOUCH_OPEN_THRESHOLD = 48;
const TOUCH_CLOSE_THRESHOLD = 56;
const TOUCH_SLOP = 10;
const TOUCH_CLICK_GUARD_MS = 700;

export default function AboutReader() {
  const { preferences } = useSitePreferences();
  const distortionAmplitude = preferences.distortion === "off" ? 0 : preferences.distortion === "subtle" ? 0.16 : 0.4;
  const railRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLElement | null>>([]);
  const audioRef = useRef<HTMLAudioElement>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const drawerBufferRef = useRef<AudioBuffer | null>(null);
  const drawerSourceRef = useRef<AudioBufferSourceNode | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [showMusic, setShowMusic] = useState(false);
  const [curtain, setCurtain] = useState(false);
  const [curtainLabel, setCurtainLabel] = useState("About Me");
  const [curtainColor, setCurtainColor] = useState(CURTAIN_COLORS[0]);
  const [curtainLabelColor, setCurtainLabelColor] = useState(CURTAIN_LABEL_COLORS[0]);
  const [curtainIndex, setCurtainIndex] = useState(0);
  const curtainTimers = useRef<number[]>([]);
  const touchStartRef = useRef<{ x: number; y: number; moved: boolean } | null>(null);
  const lastTouchRef = useRef<{ time: number; moved: boolean } | null>(null);
  const activeAccent = ARTICLE_ACCENTS[activeIndex % ARTICLE_ACCENTS.length];

  // Drawer sound segment played while opening, its speed, and its gain
  const DRAWER_SRC = "/SoundBar/articles-drawer.mp3";
  const DRAWER_START_S = 0.5;
  const DRAWER_END_S = 1.7;
  const DRAWER_REST_END_S = 3;
  const DRAWER_RATE = 1.2;
  const DRAWER_GAIN: 1 | 2 | 3 | 4 | 5 | 6 = 6;

  const playTurnSound = useCallback(() => {
    if (!preferences.soundsEnabled || !preferences.articleSounds || preferences.volume <= 0) return;
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = preferences.volume / 100;
    try {
      audio.currentTime = 0;
    } catch {
      /* metadata not ready yet */
    }
    void audio.play().catch(() => { });
  }, [preferences.articleSounds, preferences.soundsEnabled, preferences.volume]);

  // Decode the drawer sound once so it can be amplified
  useEffect(() => {
    const AudioCtor =
      window.AudioContext ??
      (window as typeof window & { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;
    if (!AudioCtor) return;

    const ctx = new AudioCtor();
    audioCtxRef.current = ctx;
    let cancelled = false;

    fetch(DRAWER_SRC)
      .then((res) => res.arrayBuffer())
      .then((data) => ctx.decodeAudioData(data))
      .then((buffer) => {
        if (!cancelled) drawerBufferRef.current = buffer;
      })
      .catch(() => { });

    return () => {
      cancelled = true;
      drawerSourceRef.current?.stop();
      drawerSourceRef.current = null;
      void ctx.close().catch(() => { });
      audioCtxRef.current = null;
    };
  }, []);

  const playDrawerSegment = useCallback((offset: number, duration?: number) => {
    if (!preferences.soundsEnabled || !preferences.articleSounds || preferences.volume <= 0) return;
    const ctx = audioCtxRef.current;
    const buffer = drawerBufferRef.current;
    if (!ctx || !buffer) return;

    if (ctx.state === "suspended") void ctx.resume();

    try {
      drawerSourceRef.current?.stop();
    } catch {
      /* already stopped */
    }

    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.playbackRate.value = DRAWER_RATE;

    const gain = ctx.createGain();
    gain.gain.value = DRAWER_GAIN * (preferences.volume / 100);
    source.connect(gain).connect(ctx.destination);

    if (duration !== undefined) {
      source.start(0, offset, duration);
    } else {
      source.start(0, offset);
    }
    drawerSourceRef.current = source;
  }, [preferences.articleSounds, preferences.soundsEnabled, preferences.volume]);

  // Opening an article: play the drawer sound from 0.5s to 1.5s, then stop
  const playOpenSound = useCallback(() => {
    playDrawerSegment(DRAWER_START_S, DRAWER_END_S - DRAWER_START_S);
  }, [playDrawerSegment]);

  // Back to the initial position: play the rest of the sound (up to 4.5s)
  const playRestSound = useCallback(() => {
    playDrawerSegment(DRAWER_END_S, DRAWER_REST_END_S - DRAWER_END_S);
  }, [playDrawerSegment]);

  const clearCurtainTimers = useCallback(() => {
    curtainTimers.current.forEach((id) => window.clearTimeout(id));
    curtainTimers.current = [];
  }, []);

  useEffect(() => clearCurtainTimers, [clearCurtainTimers]);

  useEffect(() => {
    if (preferences.soundsEnabled && preferences.articleSounds && preferences.volume > 0) return;
    audioRef.current?.pause();
    try {
      drawerSourceRef.current?.stop();
    } catch {
      /* The sound may have already ended. */
    }
    drawerSourceRef.current = null;
  }, [preferences.articleSounds, preferences.soundsEnabled, preferences.volume]);

  // Raise the label curtain for a curtained article, then slide it back down.
  // It comes in shortly after the article has taken the full screen so the
  // repaint flicker stays hidden.
  const scheduleCurtain = useCallback((index: number) => {
    const label = CURTAIN_LABELS[index];
    if (!label) return;

    setCurtainLabel(label);
    setCurtainColor(CURTAIN_COLORS[index] ?? "#100d18");
    setCurtainLabelColor(CURTAIN_LABEL_COLORS[index] ?? "#f8f4fb");
    setCurtainIndex(index);
    curtainTimers.current.push(
      window.setTimeout(() => setCurtain(true), 200),
      window.setTimeout(() => setCurtain(false), 1250),
    );
  }, []);

  // Opening an article. Curtained articles expand to fullscreen first, then a
  // full-screen label curtain rises to cover the settled article (hiding any
  // repaint flicker) before sliding back down.
  const openArticle = useCallback(
    (index: number) => {
      const nextIndex = Math.max(0, Math.min(articles.length - 1, index));

      clearCurtainTimers();
      playOpenSound();
      setActiveIndex(nextIndex);
      setExpanded(true);
      setShowMusic(true);
      scheduleCurtain(nextIndex);
    },
    [clearCurtainTimers, playOpenSound, scheduleCurtain],
  );

  const selectArticle = useCallback((index: number) => {
    const nextIndex = Math.max(0, Math.min(articles.length - 1, index));
    if (nextIndex !== activeIndex) playTurnSound();
    // Cancel any curtain still animating from a previous open before deciding
    // whether this switch needs its own.
    clearCurtainTimers();
    setCurtain(false);
    setActiveIndex(nextIndex);

    const rail = railRef.current;
    const card = cardRefs.current[nextIndex];
    if (rail && card) {
      const railBox = rail.getBoundingClientRect();
      const cardBox = card.getBoundingClientRect();
      rail.scrollTo({
        left:
          rail.scrollLeft +
          cardBox.left -
          railBox.left +
          cardBox.width / 2 -
          rail.clientWidth / 2,
          behavior: "smooth",
      });
    }
    if (expanded && card) card.scrollTop = 0;

    // While an article is already open, switching to another curtained article
    // (nav buttons) shows that article's curtain too.
    if (expanded) scheduleCurtain(nextIndex);
  }, [expanded, activeIndex, playTurnSound, clearCurtainTimers, scheduleCurtain]);

  const syncActiveCard = useCallback(() => {
    const rail = railRef.current;
    if (!rail || expanded) return;

    const focusPoint = rail.getBoundingClientRect().left + rail.clientWidth / 2;
    let selected = 0;
    let distance = Number.POSITIVE_INFINITY;

    cardRefs.current.forEach((card, index) => {
      if (!card) return;
      const rect = card.getBoundingClientRect();
      const nextDistance = Math.abs(rect.left + rect.width / 2 - focusPoint);
      if (nextDistance < distance) {
        distance = nextDistance;
        selected = index;
      }
    });

    setActiveIndex(selected);
  }, [expanded]);
  const collapseArticle = useCallback(() => {
    clearCurtainTimers();
    setCurtain(false);
    playRestSound();
    setExpanded(false);
    setShowMusic(false);
  }, [clearCurtainTimers, playRestSound]);

  const handleWheel = useCallback(
    (event: React.WheelEvent<HTMLElement>, index: number) => {
      if (!expanded && event.deltaY > 4) {
        event.preventDefault();
        openArticle(index);
        return;
      }

      if (expanded && event.deltaY < -4 && event.currentTarget.scrollTop <= 2) {
        event.preventDefault();
        collapseArticle();
      }
    },
    [expanded, openArticle, collapseArticle],
  );

  const handleTouchStart = useCallback((event: React.TouchEvent<HTMLElement>) => {
    const touch = event.touches[0];
    if (!touch) return;
    touchStartRef.current = { x: touch.clientX, y: touch.clientY, moved: false };
  }, []);

  const handleTouchMove = useCallback(
    (event: React.TouchEvent<HTMLElement>, index: number) => {
      const start = touchStartRef.current;
      const touch = event.touches[0];
      if (!start || !touch) return;

      const dx = touch.clientX - start.x;
      const dy = touch.clientY - start.y;
      if (Math.abs(dx) > TOUCH_SLOP || Math.abs(dy) > TOUCH_SLOP) start.moved = true;

      // Sideways drags stay with the rail's horizontal browsing.
      if (Math.abs(dx) >= Math.abs(dy)) return;

      if (!expanded) {
        if (-dy >= TOUCH_OPEN_THRESHOLD) {
          touchStartRef.current = null;
          lastTouchRef.current = { time: Date.now(), moved: true };
          openArticle(index);
        }
      } else if (dy >= TOUCH_CLOSE_THRESHOLD && event.currentTarget.scrollTop <= 2) {
        touchStartRef.current = null;
        lastTouchRef.current = { time: Date.now(), moved: true };
        collapseArticle();
      }
    },
    [expanded, openArticle, collapseArticle],
  );

  const handleTouchEnd = useCallback(() => {
    if (touchStartRef.current) {
      lastTouchRef.current = { time: Date.now(), moved: touchStartRef.current.moved };
      touchStartRef.current = null;
    }
  }, []);

  const handleTouchCancel = useCallback(() => {
    touchStartRef.current = null;
  }, []);

  // Stable ref setters so the article refs are not detached/re-attached on every
  // re-render (which happens as you scroll / open an article).
  const cardRefSetters = useMemo(
    () =>
      articles.map(
        (_, index) => (element: HTMLElement | null) => {
          cardRefs.current[index] = element;
        },
      ),
    [],
  );

  return (
    <main className={`relative h-full min-h-0 flex-1 overflow-hidden text-[#111] ${preferences.theme === "professional" ? "bg-white" : ""}`}>
      {/* Full-viewport background (also sits behind the shared header) */}
      <div
        aria-hidden="true"
        className={`fixed inset-0 -z-10 bg-cover bg-center bg-no-repeat ${preferences.theme === "professional" ? "bg-white" : ""}`}
        style={{ backgroundImage: preferences.theme === "anime" ? "url('/AboutBackground.webp')" : "none", backgroundColor: "#fff" }}
      />

      <div
        ref={railRef}
        onScroll={syncActiveCard}
        className="absolute inset-0 flex items-start gap-[5vw] overflow-x-auto overflow-y-hidden px-[7vw] pt-[clamp(72px,13vh,170px)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:px-[18vw] lg:px-[21vw]"
        aria-label="About articles. Swipe sideways to browse, scroll an article to open it."
      >
        {articles.map((article, index) => {
          const isExpanded = expanded && index === activeIndex;
          const isSelected = index === activeIndex;
          const isGitHubArticle = index === 1;
          const isExperienceArticle = index === 2;
          const accent = ARTICLE_ACCENTS[index % ARTICLE_ACCENTS.length];
          const themeCls = isExpanded && index === 0
            ? "bg-[#100d18] text-[#f8f4fb] [&_blockquote]:border-[var(--accent)] [&_blockquote]:bg-gradient-to-r [&_blockquote]:from-[var(--accent)]/10 [&_blockquote]:to-transparent [&_blockquote]:pr-5 [&_blockquote]:text-white [&_header>div>div>p:first-child]:text-[var(--accent)] [&_header>div>div>p:first-child]:opacity-100 [&_a]:text-[var(--accent)] [&_.bio-panel]:border-white/10 [&_.bio-panel]:bg-[#171321] [&_.bio-panel]:text-white [&_.skill-pill]:border-white/10 [&_.skill-pill]:bg-[#23182d] [&_.skill-pill]:text-[#eee5f7] [&_.bio-skill-group]:border-white/15 [&_h3]:text-[#eee5f7]"
            : "";

          return (
            <Fragment key={index}>
              {isExpanded && (
                <div
                  key="spacer"
                  aria-hidden="true"
                  className="invisible h-[calc(100dvh-7rem)] min-h-[520px] w-[86vw] shrink-0 rounded-xl sm:h-[calc(100dvh-9rem)] sm:w-[64vw] lg:w-[58vw]"
                />
              )}
              <motion.article
                key="article"
                layout
                layoutId={`about-article-${index}`}
                initial={{ opacity: 0, y: 72 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  ["--accent" as string]: accent,
                  ["--github-heading-color" as string]: isExpanded && isGitHubArticle ? "#f1f5ff" : "#000000",
                  ["--github-subheading-color" as string]: isExpanded && isGitHubArticle ? "#d7dfef" : "#000000",
                  ["--experience-heading-color" as string]: isExpanded && isExperienceArticle ? "#ffffff" : "#000000",
                  ["--experience-subheading-color" as string]: isExpanded && isExperienceArticle ? "#d7dfef" : "#000000",
                  ["--experience-copy-color" as string]: isExpanded && isExperienceArticle ? "#edf2ff" : "#111111",
                  ["--experience-muted-color" as string]: isExpanded && isExperienceArticle ? "#b9c6dc" : "#454545",
                  ["--experience-label-color" as string]: isExpanded && isExperienceArticle ? "#8ebcff" : "#222222",
                  ["--experience-panel-color" as string]: isExpanded && isExperienceArticle ? "rgba(16,23,41,0.72)" : "rgba(255,255,255,0.9)",
                  ["--experience-card-color" as string]: isExpanded && isExperienceArticle ? "rgba(11,20,38,0.78)" : "rgba(245,245,245,0.94)",
                  ["--experience-border-color" as string]: isExpanded && isExperienceArticle ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.14)",
                  ["--experience-overlay-opacity" as string]: isExpanded && isExperienceArticle ? "1" : "0",
                  ["--experience-image-opacity" as string]: isExpanded && isExperienceArticle ? "0.9" : "0.45",
                  ...(preferences.theme === "anime" && isExpanded && index === 0
                    ? {
                      backgroundImage:
                        "radial-gradient(circle at 86% 8%, rgba(126, 55, 200, 0.2), transparent 34%), radial-gradient(circle at 8% 72%, rgba(227, 59, 88, 0.12), transparent 30%), linear-gradient(#100d18, #100d18)",
                    }
                    : {}),
                }}
                transition={{
                  layout: { duration: 0.72, ease: [0.22, 1, 0.36, 1] },
                  opacity: { duration: 0.55, delay: index * 0.12 },
                  y: { duration: 0.72, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] },
                }}
                ref={cardRefSetters[index]}
                onWheel={(event) => handleWheel(event, index)}
                onTouchStart={handleTouchStart}
                onTouchMove={(event) => handleTouchMove(event, index)}
                onTouchEnd={handleTouchEnd}
                onTouchCancel={handleTouchCancel}
                onClick={() => {
                  const recentTouch = lastTouchRef.current;
                  if (recentTouch && Date.now() - recentTouch.time < TOUCH_CLICK_GUARD_MS) {
                    lastTouchRef.current = null;
                    if (recentTouch.moved) return;
                  }
                  if (expanded) return;
                  if (index !== activeIndex) selectArticle(index);
                  else openArticle(index);
                }}
                  className={
                  isExpanded && preferences.theme === "professional"
                    ? "professional-about-article fixed inset-0 z-50 h-dvh w-screen overflow-y-auto overscroll-contain rounded-none bg-white px-6 pb-12 pt-10 text-black shadow-none sm:px-10 sm:pt-14 lg:px-[8vw]"
                    : isExpanded
                    ? `fixed inset-0 z-50 h-dvh w-screen overflow-y-auto overscroll-contain rounded-none px-6 pb-12 pt-10 shadow-none sm:px-10 sm:pt-14 lg:px-[8vw] ${isGitHubArticle || isExperienceArticle ? "bg-transparent text-[#edf2ff]" : themeCls || "bg-white text-black"}`
                    : `relative h-[calc(100dvh-7rem)] min-h-[520px] w-[86vw] shrink-0 overflow-hidden rounded-xl bg-white px-6 pb-10 pt-7 shadow-[0_8px_50px_rgba(0,0,0,0.07)] transition-colors sm:h-[calc(100dvh-9rem)] sm:w-[64vw] sm:px-8 sm:pt-8 lg:w-[58vw] lg:px-[3vw] lg:pt-9 ${isSelected ? "text-black" : "text-[#929292]"}`
                }
                aria-label={`About article ${index + 1}`}
              >
                {preferences.theme === "professional" || !isExpanded ? <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 bg-white" /> : <WaveGridBackground
                  className={isExpanded ? "fixed inset-0 z-0" : "absolute inset-0 z-0"}
                  gridSize={52}
                  colorBase={isExpanded ? (index === 0 ? "#221006" : isExperienceArticle ? "#0b0710" : isGitHubArticle ? "#10234a" : "#100d18") : "#f4f1ee"}
                  colorHigh={index === 0 ? "#ff7a18" : isExperienceArticle ? "#ff4fa3" : accent}
                  waveAmplitude={distortionAmplitude}
                  waveMaxHeight={preferences.distortion === "off" ? 0.01 : preferences.distortion === "subtle" ? 0.18 : 0.4}
                  waveJitter={preferences.distortion === "off" ? 0 : preferences.distortion === "subtle" ? 0.08 : 0.2}
                  autoAnimate={preferences.distortion !== "off"}
                />}
                <motion.div
                  initial={isExpanded ? { opacity: 0, y: 18 } : false}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.48, delay: isExpanded ? 0.16 : 0, ease: [0.22, 1, 0.36, 1] }}
                  className={`relative z-10 mx-auto w-full max-w-[1100px] ${isExpanded ? "pb-8 pt-7 sm:pt-3" : ""} ${!isExpanded ? "pointer-events-none [&_a]:pointer-events-auto [&_button]:pointer-events-auto" : ""}`}
                >
                  {article}
                </motion.div>
              </motion.article>
            </Fragment>
          );
        })}
      </div>

      <nav
        className={`z-[70] flex items-center gap-2 ${expanded
          ? "fixed right-5 top-5"
          : "absolute right-[calc(7vw_+_1rem)] top-[calc(clamp(72px,13vh,170px)_+_1rem)] sm:right-[calc(18vw_+_1rem)] lg:right-[calc(21vw_+_1rem)]"
          }`}
        style={{ ["--accent" as string]: activeAccent }}
        aria-label="Article navigation"
      >
        <button
          type="button"
          onClick={() => selectArticle(activeIndex - 1)}
          disabled={activeIndex === 0}
          aria-label="Previous article"
          className={`grid size-10 place-items-center rounded-full text-xl transition-colors disabled:cursor-default disabled:opacity-40 ${expanded && activeIndex === 1 ? "border border-white/15 bg-[#101729]/80 text-[#edf2ff] backdrop-blur hover:bg-[#18233b]" : expanded ? "border border-white/15 bg-[#171321] text-white hover:bg-[var(--accent)]" : "bg-[#ededed] hover:bg-[#dedede]"}`}
        >
          <span aria-hidden="true">←</span>
        </button>
        <button
          type="button"
          onClick={() => selectArticle(activeIndex + 1)}
          disabled={activeIndex === articles.length - 1}
          aria-label="Next article"
          className={`grid size-10 place-items-center rounded-full text-xl transition-colors disabled:cursor-default disabled:opacity-40 ${expanded && activeIndex === 1 ? "border border-white/15 bg-[#101729]/80 text-[#edf2ff] backdrop-blur hover:bg-[#18233b]" : expanded ? "border border-white/15 bg-[#171321] text-white hover:bg-[var(--accent)]" : "bg-[#ededed] hover:bg-[#dedede]"}`}
        >
          <span aria-hidden="true">→</span>
        </button>
      </nav>

      {!expanded && (
        <p className="pointer-events-none absolute bottom-4 left-1/2 z-10 m-0 -translate-x-1/2 text-[11px] text-[#999] sm:text-xs">
          <span className="sm:hidden">Swipe up to open · swipe sideways to browse</span>
          <span className="hidden sm:inline">Scroll to open · swipe sideways to browse</span>
        </p>
      )}

      {showMusic && tracks[activeIndex] && preferences.musicEnabled && preferences.soundsEnabled ? (
        <div className="fixed bottom-6 right-6 z-[80]">
          <MusicPlayer
            key={activeIndex}
            tracks={tracks}
            startIndex={activeIndex}
            autoPlay={preferences.musicAutoplay}
            volume={preferences.volume / 100}
            enabled={preferences.musicEnabled && preferences.soundsEnabled}
            accentColor={expanded ? activeAccent : "#ff6a00"}
          />
        </div>
      ) : null}
      <audio ref={audioRef} src="/SoundBar/articles-page-turn.wav" preload="auto" className="hidden" />

      {/* Top "wipe" that covers the expand transition for the first article */}
      <AnimatePresence>
        {curtain ? (
          <motion.div
            key="about-curtain"
            aria-hidden="true"
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-none fixed inset-0 z-[100] flex items-center justify-center"
            style={{
              backgroundColor: curtainColor,
              backgroundImage: `radial-gradient(circle at 50% 48%, ${curtainColor} 0%, transparent 54%), linear-gradient(135deg, rgba(255,255,255,0.08), transparent 42%)`,
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.04 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-5 rounded-[2rem] border border-white/20 sm:inset-8 sm:rounded-[2.5rem]"
            />
            <span aria-hidden="true" className="absolute left-8 top-8 text-[clamp(5rem,20vw,18rem)] font-semibold leading-none tracking-[-0.1em] text-white/[0.07] sm:left-16 sm:top-10">
              0{curtainIndex + 1}
            </span>
            <motion.span
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.18 }}
              className="relative flex max-w-[90vw] flex-col items-center text-center"
            >
              <span className="mb-5 inline-flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.28em] text-white/70 sm:text-xs">
                <span className="h-px w-8 bg-current sm:w-12" />
                Article 0{curtainIndex + 1}
                <span className="h-px w-8 bg-current sm:w-12" />
              </span>
              <span
                className="text-[clamp(2.6rem,9vw,7rem)] font-medium leading-none tracking-[-0.05em]"
              style={{ color: curtainLabelColor }}
              >
                {curtainLabel}
              </span>
              <span className="mt-6 h-1 w-16 rounded-full bg-white/70 shadow-[0_0_24px_rgba(255,255,255,0.4)] sm:mt-8 sm:w-24" />
            </motion.span>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </main>
  );
}
