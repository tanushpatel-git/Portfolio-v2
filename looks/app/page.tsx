import Image from "next/image";
import SiteHeader from "@/component/SiteHeader";
import ImageTrail from "@/component/ImageTrail";

const socials = [
  { name: "Mail", href: "tanush000patel@gmail.com" },
  { name: "LinkedIn", href: "https://www.linkedin.com/" },
  { name: "Instagram", href: "https://www.instagram.com/" },
  { name: "GitHub", href: "https://github.com/tanushpatel-git" },
  { name: "Portfolio-v1", href: "https://tanushportfolioo.netlify.app/" },
];

const linkCls = "underline underline-offset-2 hover:decoration-2";

export default function Home() {
  return (
    // Locked to screen height: nothing can scroll
    <main className="flex h-dvh flex-col overflow-x-hidden overflow-y-auto px-4 sm:px-6 lg:px-[2.35vw]">
        <div className="shrink-0">
          <SiteHeader />
        </div>

        {/* About and portfolio sections (natural height) */}
        <section
          className="mt-6 grid shrink-0 grid-cols-2 items-start gap-x-4 gap-y-5 text-[clamp(13px,2.4dvh,19px)] leading-[1.45] sm:mt-8 sm:gap-x-8 sm:text-[clamp(14px,2.2dvh,20px)] lg:text-[clamp(15px,2dvh,21px)] xl:mt-[40px] xl:grid-cols-[minmax(0,1.28fr)_minmax(0,.55fr)_minmax(0,1.12fr)_minmax(0,1.05fr)] xl:gap-x-[clamp(22px,2.1vw,42px)] xl:text-[clamp(16px,1.13vw,23px)] xl:leading-[1.37]"
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
                  <a className={linkCls} href="/">
                    {label}
                  </a>
                </li>
              )
            )}
          </ul>
        </div>

        {/* Experience */}
        <div className="min-w-0" id="engineering">
          <h2 className="mb-[7px] mt-0 text-[1.08em] font-semibold leading-[1.3]">Experience</h2>
          <div className="space-y-1">
            <p className="m-0">Independent: Designer &amp; developer (2024 – present)</p>
            <p className="m-0">Digital studio: Product designer (2022 – 2024)</p>
            <p className="m-0">Creative practice: Designer (2020 – 2022)</p>
            <p className="m-0">Freelance designer (2019 – 2024)</p>
          </div>
        </div>

        {/* Articles */}
        <div className="min-w-0 text-right" id="articles">
          <h2 className="mb-[7px] mt-0 text-[1.08em] font-semibold leading-[1.3]">Writing, talks &amp; more</h2>
          <ul className="m-0 list-none p-0">
            <li><a className={linkCls} href="#articles">Selected writing</a></li>
            <li><a className={linkCls} href="#articles">Design notes</a></li>
            <li>Conversations &amp; features</li>
            <li><a className={linkCls} href="#articles">Ideas in progress</a></li>
            <li><a className={linkCls} href="#articles">The creative process</a></li>
            <li><a className={linkCls} href="#articles">Get in touch</a></li>
          </ul>
        </div>
      </section>

      {/* Footer: takes ALL remaining height */}
      <ImageTrail className="flex flex-1 flex-col">
      <footer className="mt-8 flex flex-1 flex-col sm:mt-10">
        <nav
          className="mt-auto mb-3 flex shrink-0 flex-wrap gap-1.5 sm:mb-4"
          aria-label="Social links"
        >
          {socials.map((social) => (
            <a
              className="rounded-[5px] bg-[#ededed] px-3 py-2 text-[13px] leading-none no-underline transition-colors hover:bg-[#dcdcdc] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black sm:px-[11px] sm:text-base lg:text-[clamp(14px,.92vw,18px)]"
              key={social.name}
              href={social.href}
              target={social.name === "Mail" ? undefined : "_blank"}
              rel={social.name === "Mail" ? undefined : "noopener noreferrer"}
            >
              {social.name}
            </a>
          ))}
        </nav>

        {/* Full image: height follows the width, nothing is cropped */}
        <Image
          className="block h-auto max-h-[65dvh] w-full shrink-0 object-contain object-bottom"
          src="/tanushDesign.jpeg"
          alt="Tanush Design"
          width={1600}
          height={700}
          sizes="100vw"
          priority
        />
      </footer>
      </ImageTrail>
    </main>
  );
}