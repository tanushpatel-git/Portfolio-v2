"use client"
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import ImageTrail from "@/component/ImageTrail";
import { CursorCard } from "@/component/ui/cursor-card";
import { useRouter } from 'next/navigation';

type Social = {
  name: string;
  href: string;
  image?: string;
  description?: string;
};

const socials: Social[] = [
  { name: "Mail", href: "mailto:tanush000patel@gmail.com" },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/tanush-patel-52b0823b4",
    image: "/linkedin.png",
    description: "Let's connect — my experience, the roles I've held, and the teams I've built with.",
  },
  {
    name: "GitHub",
    href: "https://github.com/tanushpatel-git",
    image: "/github.png",
    description: "The code behind the work — repositories, experiments, and things I've shipped.",
  },
  {
    name: "Portfolio-v1",
    href: "https://tanushportfolioo.netlify.app/",
    image: "/portfoliov1.png",
    description: "Where this began — my first portfolio, the seed this site grew from.",
  },
];

const linkCls = "underline underline-offset-2 hover:decoration-2";
const homeIntroStorageKey = "tlux-home-intro-played-v2";

export default function Home() {
  const router = useRouter();
  const [introState, setIntroState] = useState<"playing" | "fading" | "done">("playing");
  const introFinished = useRef(false);

  useEffect(() => {
    try {
      if (window.sessionStorage.getItem(homeIntroStorageKey) === "true") {
        setIntroState("done");
      }
    } catch {
      // Keep the intro available if browser storage is disabled.
    }
  }, []);

  const finishIntro = () => {
    if (introFinished.current) return;
    introFinished.current = true;
    try {
      window.sessionStorage.setItem(homeIntroStorageKey, "true");
    } catch {
      // The intro still fades out when browser storage is disabled.
    }
    setIntroState("fading");
    window.setTimeout(() => setIntroState("done"), 900);
  };

  return (
    <>
      {/* The intro plays once per browser tab session, then reveals the home page. */}
      {introState !== "done" && (
        <div
          aria-label="Portfolio introduction"
          className={`fixed inset-0 z-[100] bg-black transition-opacity duration-[900ms] ease-out ${introState === "fading" ? "pointer-events-none opacity-0" : "opacity-100"}`}
        >
          <video
            className="h-full w-full object-cover object-center"
            src="/starterVideo.mov"
            autoPlay
            muted
            playsInline
            preload="auto"
            onEnded={finishIntro}
            onError={finishIntro}
            aria-label="Portfolio opening video"
          />
          <button
            type="button"
            onClick={finishIntro}
            className="absolute bottom-5 right-5 rounded-full border border-white/40 bg-black/45 px-4 py-2 text-sm text-white backdrop-blur transition hover:bg-black/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Skip intro
          </button>
        </div>
      )}

      {/* Locked to screen height: nothing can scroll */}
      <main className={`relative flex min-h-0 flex-1 flex-col overflow-x-hidden overflow-y-auto px-4 transition-opacity duration-700 ease-out sm:px-6 lg:px-[2.35vw] ${introState === "done" ? "opacity-100" : "opacity-0"}`}>
      {/* Full-viewport background (also sits behind the shared header) */}
      <div
        aria-hidden="true"
        className="fixed inset-0 -z-10 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/mainBackgroundImage.jpeg')",
        }}
      />

      {/* About and portfolio sections (natural height) */}
      <section
        className="relative z-20 mt-6 grid shrink-0 grid-cols-2 items-start gap-x-4 gap-y-5 text-[clamp(13px,2.4dvh,19px)] leading-[1.45] sm:mt-8 sm:gap-x-8 sm:text-[clamp(14px,2.2dvh,20px)] lg:text-[clamp(15px,2dvh,21px)] xl:mt-[40px] xl:grid-cols-[minmax(0,1.28fr)_minmax(0,.55fr)_minmax(0,1.12fr)_minmax(0,1.05fr)] xl:gap-x-[clamp(22px,2.1vw,42px)] xl:text-[clamp(16px,1.13vw,23px)] xl:leading-[1.37]"
        id="about"
        aria-label="About Tanush Patel"
      >
        {/* Introduction */}
        <div className="min-w-0">
          <h1 className="m-0 text-[1.08em] font-semibold leading-[1.3]">
            Tanush Patel
          </h1>
          <p className="mb-0 mt-2 max-w-[470px]">
            A designer and developer crafting thoughtful digital experiences.
            I bring ideas to life through considered design and code.
            <br className="hidden xl:block" /> Building for the web, with
            curiosity and care.
          </p>
        </div>

        {/* Selected work */}
        <div className="min-w-0 text-right" id="design">
          <h2 className="mb-[7px] mt-0 text-[1.08em] font-semibold leading-[1.3]">Case studies</h2>
          <ul className="m-0 list-none p-0">
            {["Product design", "Brand systems", "Digital experiences", "Experiments", "See more..."].map(
              (label) => (
                <li key={label}>
                  <p
                    onClick={() => label === "See more..." ? router.push('/projects') : null}
                    className={`${linkCls} ${label == "See more..." ? "cursor-pointer" : ""}`}
                  >
                    {label}
                  </p>

                </li>
              )
            )}
          </ul>
        </div>

        {/* Experience */}
        <div className="min-w-0" id="engineering">
          <h2 className="mb-[7px] mt-0 text-[1.08em] font-semibold leading-[1.3]">Experience</h2>
          <div className="space-y-1">
            <p className="m-0">Independent: Data Science &amp; developer (2026 – present)</p>
            <p className="m-0">EmergX: Full Stack Developer (2026/04 – 2026/06)</p>
            <p className="m-0">Creative practice: Designer and Developer (2025/05 – 2025/08)</p>
            <p className="m-0">Full Stack Developer (2024 – 2025)</p>
          </div>
        </div>

        {/* Articles */}
        <div className="min-w-0 text-right" id="articles">
          <h2 className="mb-[7px] mt-0 text-[1.08em] font-semibold leading-[1.3]">Writing, talks &amp; more</h2>
          <ul className="m-0 list-none p-0">
            <li><p className={linkCls}>Selected writing</p></li>
            <li>Conversations &amp; features</li>
            <li><p className={linkCls}>Ideas in progress</p></li>
            <li><p className={linkCls}>The creative process</p></li>
            <li><a className={linkCls} href={"mailto:tanush000patel@gmail.com"}>Get in touch</a></li>
          </ul>
        </div>
      </section>

      {/* Footer: takes ALL remaining height */}
      <ImageTrail
        images={[
          "/HoverImage/hoverImage1.webp",
          "/HoverImage/hoverImage2.webp",
          "/HoverImage/hoverImage3.webp",
          "/HoverImage/hoverImage4.webp",
          "/HoverImage/hoverImage5.webp",
          "/HoverImage/hoverImage6.webp",
        ]}
        className="flex flex-1 flex-col"
        overlayClassName="z-10"
        imageClassName="aspect-square h-25 w-25 rounded-full"
        maxItems={100}
        duration={2000}
      >
        <footer className="mt-8 flex flex-1 flex-col sm:mt-10">
          <nav
            className="relative z-20 mt-auto mb-3 flex shrink-0 flex-wrap gap-1.5 sm:mb-4"
            aria-label="Social links"
          >
            {socials.map((social) =>
              social.image && social.description ? (
                <CursorCard
                  className="rounded-[5px] bg-[#ededed] px-3 py-2 text-[13px] leading-none no-underline transition-colors hover:bg-[#dcdcdc] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black sm:px-[11px] sm:text-base lg:text-[clamp(14px,.92vw,18px)]"
                  key={social.name}
                  href={social.href}
                  image={social.image}
                  description={social.description}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {social.name}
                </CursorCard>
              ) : (
                <a
                  className="rounded-[5px] bg-[#ededed] px-3 py-2 text-[13px] leading-none no-underline transition-colors hover:bg-[#dcdcdc] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black sm:px-[11px] sm:text-base lg:text-[clamp(14px,.92vw,18px)]"
                  key={social.name}
                  href={social.href}
                >
                  {social.name}
                </a>
              )
            )}
          </nav>

          {/* Full image: height follows the width, nothing is cropped */}
          <picture>
            <source srcSet="/tanushDesign.png" type="image/png" />
            <Image
              className="block h-auto max-h-[65dvh] w-full shrink-0 object-contain object-bottom"
              src="/tanushDesign.png"
              alt="Tanush Design"
              width={1600}
              height={700}
              sizes="100vw"
              priority
              quality={80}
            />
          </picture>
        </footer>
      </ImageTrail>
      </main>
    </>
  );
}