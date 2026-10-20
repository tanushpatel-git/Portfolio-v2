import Image from "next/image";

const features = [
  {
    number: "01",
    label: "JOB DISCOVERY AGENT",
    title: "Find relevant roles on LinkedIn",
    description:
      "I built an agent-powered job search that takes a user's role and company-size preferences and turns them into relevant LinkedIn listings inside EmergX.",
    steps: [
      { title: "Set preferences", detail: "Choose a role such as full-stack and a company size such as 11–15 employees." },
      { title: "Search LinkedIn", detail: "The agent checks LinkedIn for openings that match those preferences." },
      { title: "Review matches", detail: "It collects the matching job details and displays them in the EmergX portal." },
    ],
    tags: ["Job search", "LinkedIn listings", "Agent workflow"],
  },
  {
    number: "02",
    label: "HIRING WORKFLOW",
    title: "Add screening questions to applications",
    description:
      "I extended EmergX's existing eight-step recruiting setup with pre-application questions and a spreadsheet-style way for HR to review applicants by job.",
    steps: [
      { title: "Create questions", detail: "HR adds a screening step to the recruiting form and writes questions for applicants." },
      { title: "Collect responses", detail: "Candidates answer those questions before completing the job application." },
      { title: "Review applicants", detail: "HR sees each job's applicants and their details in a sortable, Excel-style portal view." },
    ],
    tags: ["Recruiting forms", "Candidate questions", "Applicant management"],
  },
];

export function EmergXSection() {
  return (
    <section aria-labelledby="emergx-internship" className="relative z-10 mt-10 w-full">
      {/* Section header */}
      <div className="flex flex-wrap items-end justify-between gap-3 pb-4">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-zinc-400 dark:text-zinc-500 mb-1.5">
            INTERNSHIP · DEEP DIVE
          </p>
          <h2
            id="emergx-internship"
            className="text-[20px] sm:text-[24px] font-bold text-zinc-800 dark:text-zinc-100 tracking-tight leading-none m-0"
          >
            What I built at EmergX
          </h2>
        </div>
        <a
          href="https://github.com/tanushpatel-git"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-2.5 py-1.5 bg-zinc-100 dark:bg-zinc-800/40 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-md text-[12px] font-medium text-zinc-600 dark:text-zinc-300 transition-colors border border-zinc-200/50 dark:border-zinc-700/50"
        >
          <svg viewBox="0 0 24 24" className="w-3.5 h-3.5">
            <path
              d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
            />
          </svg>
          github.com/tanushpatel-git
        </a>
      </div>

      {/* Hero panel */}
      <div className="relative overflow-hidden rounded-xl border border-black/10 dark:border-white/[0.15] bg-zinc-50 dark:bg-[#0b0b0d] mb-4">
        <Image
          src="/emergXImage.webp"
          alt=""
          aria-hidden="true"
          fill
          sizes="(min-width: 768px) 40vw, 100vw"
          quality={70}
          className="object-cover opacity-40 dark:opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-white/40 dark:from-black/95 dark:via-black/80 dark:to-black/40" />
        <div className="relative z-10 p-5 sm:p-8">
          <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-zinc-500 dark:text-zinc-400 mb-2">
            REMOTE INTERNSHIP · 3 MONTHS · 2026
          </p>
          <h3 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight m-0 mb-1">
            EmergX
          </h3>
          <p className="text-[14px] text-zinc-600 dark:text-zinc-400 m-0">
            Full Stack Developer Intern · Product and recruiting features
          </p>
          <div className="mt-5 grid gap-4 border-t border-black/10 dark:border-white/[0.12] pt-4 sm:grid-cols-3 sm:gap-8">
            <div>
              <p className="mb-1 text-[11px] uppercase tracking-[0.14em] text-zinc-400 dark:text-zinc-500">Role</p>
              <p className="m-0 text-[13px] font-semibold text-zinc-800 dark:text-zinc-200">Remote intern</p>
            </div>
            <div>
              <p className="mb-1 text-[11px] uppercase tracking-[0.14em] text-zinc-400 dark:text-zinc-500">Company</p>
              <p className="m-0 text-[13px] font-semibold text-zinc-800 dark:text-zinc-200">EmergX</p>
            </div>
            <div>
              <p className="mb-1 text-[11px] uppercase tracking-[0.14em] text-zinc-400 dark:text-zinc-500">Duration</p>
              <p className="m-0 text-[13px] font-semibold text-zinc-800 dark:text-zinc-200">Apr 1 – Jun 30, 2026</p>
            </div>
          </div>
        </div>
      </div>

      {/* Narrative */}
      <div className="mb-4 text-[14px] leading-relaxed text-zinc-600 dark:text-zinc-400 space-y-3">
        <p className="m-0">
          During my three-month remote internship from April 1 to June 30, 2026, I worked on features
          for the EmergX platform that supported both job seekers and HR teams.
        </p>
        <p className="m-0">
          I built a LinkedIn job-search agent and extended the recruiting workflow with candidate
          questions and an Excel-style applicant view, helping bring the relevant information into one place.
        </p>
      </div>

      {/* Feature cards */}
      <div className="grid gap-4 lg:grid-cols-2 mb-4">
        {features.map((feature) => (
          <article
            key={feature.number}
            className="rounded-xl border border-black/10 dark:border-white/[0.15] bg-white dark:bg-[#0b0b0d] p-5 shadow-sm"
          >
            <div className="mb-4 flex items-center justify-between gap-4">
              <p className="m-0 text-[11px] font-medium tracking-[0.12em] text-zinc-500 dark:text-zinc-400">
                {feature.label}
              </p>
              <span className="text-[11px] text-zinc-400 dark:text-zinc-500">{feature.number}</span>
            </div>
            <h3 className="mb-2 mt-0 text-[16px] sm:text-[17px] font-bold leading-snug text-zinc-900 dark:text-zinc-100">
              {feature.title}
            </h3>
            <p className="m-0 text-[13px] leading-relaxed text-zinc-600 dark:text-zinc-400">
              {feature.description}
            </p>
            <div className="mt-4 border-t border-black/10 dark:border-white/[0.12] pt-4">
              <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.15em] text-zinc-400 dark:text-zinc-500">
                How it works
              </p>
              <ol className="m-0 list-none space-y-3 p-0">
                {feature.steps.map((step, index) => (
                  <li key={step.title} className="flex gap-3">
                    <span className="grid size-5 shrink-0 place-items-center rounded-full border border-black/10 dark:border-white/[0.15] bg-zinc-100 dark:bg-zinc-800 text-[10px] font-semibold text-zinc-600 dark:text-zinc-300">
                      {index + 1}
                    </span>
                    <div>
                      <p className="m-0 text-[13px] font-semibold text-zinc-800 dark:text-zinc-200">{step.title}</p>
                      <p className="mb-0 mt-0.5 text-[12px] leading-5 text-zinc-500 dark:text-zinc-400">{step.detail}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {feature.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-black/10 dark:border-white/[0.15] bg-zinc-100 dark:bg-zinc-800/60 px-2.5 py-1 text-[11px] text-zinc-600 dark:text-zinc-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>

      {/* Certificate */}
      <div className="rounded-xl border border-black/10 dark:border-white/[0.15] bg-white dark:bg-[#0b0b0d] p-5 shadow-sm">
        <div className="mb-4 flex flex-wrap items-end justify-between gap-3 border-b border-black/10 dark:border-white/[0.12] pb-4">
          <div>
            <p className="mb-1 text-[11px] font-medium uppercase tracking-[0.15em] text-zinc-400 dark:text-zinc-500">
              INTERNSHIP CERTIFICATE
            </p>
            <h3 className="m-0 text-[18px] sm:text-[20px] font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
              Completed at EmergX
            </h3>
          </div>
          <a
            href="/certificationEmergX.webp"
            target="_blank"
            rel="noreferrer"
            className="text-[13px] text-zinc-600 dark:text-zinc-300 underline underline-offset-4 hover:text-zinc-900 dark:hover:text-zinc-100"
          >
            View full certificate ↗
          </a>
        </div>
        <Image
          src="/certificationEmergX.webp"
          alt="Internship completion certificate from EmergX for Tanush Patel"
          width={1200}
          height={850}
          sizes="(min-width: 768px) 40vw, 90vw"
          quality={80}
          loading="lazy"
          className="mx-auto block h-auto w-full max-w-[720px] rounded-lg border border-black/10 dark:border-white/[0.12] bg-white shadow-sm"
        />
      </div>
    </section>
  );
}
