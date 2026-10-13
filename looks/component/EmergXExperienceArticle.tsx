const projects = [
  {
    number: "01",
    label: "JOB DISCOVERY AGENT",
    title: "Find relevant roles on LinkedIn",
    description: "I built an agent-powered job search that takes a user’s role and company-size preferences and turns them into relevant LinkedIn listings inside EmergX.",
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
    description: "I extended EmergX’s existing eight-step recruiting setup with pre-application questions and a spreadsheet-style way for HR to review applicants by job.",
    steps: [
      { title: "Create questions", detail: "HR adds a screening step to the recruiting form and writes questions for applicants." },
      { title: "Collect responses", detail: "Candidates answer those questions before completing the job application." },
      { title: "Review applicants", detail: "HR sees each job’s applicants and their details in a sortable, Excel-style portal view." },
    ],
    tags: ["Recruiting forms", "Candidate questions", "Applicant management"],
  },
];

export default function EmergXExperienceArticle() {
  return (
    <article className="-mx-6 -mt-7 min-h-full bg-transparent text-[var(--experience-copy-color)] sm:-mx-8 sm:-mt-8 lg:-mx-[3vw] lg:-mt-9">
      <div className="mx-auto max-w-[1100px] px-4 pb-12 pt-5 sm:px-8 sm:pt-8 sm:pb-16">
        <header className="mb-8 max-w-4xl sm:mb-12">
          <p className="mb-3 text-[11px] font-medium tracking-[0.16em] text-[var(--experience-label-color)] sm:text-sm">EXPERIENCE / 03 · EmergX</p>
          <h1 className="m-0 text-[clamp(2rem,4vw,3.5rem)] font-medium leading-[0.98] tracking-[-0.065em] text-[var(--experience-heading-color)]">My EmergX experience.</h1>
          <p className="mb-0 mt-4 max-w-2xl text-base leading-7 text-[var(--experience-subheading-color)] sm:text-lg">Three months as a remote full-stack development intern, building job-discovery and candidate-screening features.</p>
        </header>

        <section aria-label="EmergX internship" className="relative mb-6 overflow-hidden rounded-[1.5rem] border border-[var(--experience-border-color)] bg-[var(--experience-panel-color)] p-6 shadow-xl shadow-black/10 backdrop-blur-xl sm:mb-8 sm:rounded-[2rem] sm:p-10">
          <img aria-hidden="true" src="/emergXImage.png" alt="" className="pointer-events-none absolute inset-0 size-full object-cover object-center opacity-[var(--experience-image-opacity,0.9)]" />
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#101729]/95 via-[#101729]/75 to-[#101729]/25 opacity-[var(--experience-overlay-opacity,1)]" />
          <div className="relative z-10 flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="mb-3 text-xs font-medium uppercase tracking-[0.16em] text-[var(--experience-label-color)]">REMOTE INTERNSHIP · 3 MONTHS · 2026</p>
              <h2 className="mb-2 mt-0 text-xl font-medium tracking-tight text-[var(--experience-heading-color)] sm:text-2xl">EmergX</h2>
              <p className="m-0 text-base text-[var(--experience-muted-color)] sm:text-lg">Remote intern · Product and recruiting features</p>
            </div>
            <span className="rounded-full border border-[var(--experience-border-color)] bg-[#0a66c2]/15 px-4 py-2 text-xs font-medium uppercase tracking-[0.12em] text-[var(--experience-copy-color)]">2026</span>
          </div>
          <div className="relative z-10 mt-8 grid gap-4 border-t border-[var(--experience-border-color)] pt-6 sm:grid-cols-3 sm:gap-8">
            <div>
              <p className="mb-1 text-xs uppercase tracking-[0.14em] text-[var(--experience-muted-color)]">Role</p>
              <p className="m-0 text-sm font-medium text-[var(--experience-heading-color)] sm:text-base">Remote intern</p>
            </div>
            <div>
              <p className="mb-1 text-xs uppercase tracking-[0.14em] text-[var(--experience-muted-color)]">Company</p>
              <p className="m-0 text-sm font-medium text-[var(--experience-heading-color)] sm:text-base">EmergX</p>
            </div>
            <div>
              <p className="mb-1 text-xs uppercase tracking-[0.14em] text-[var(--experience-muted-color)]">Duration</p>
              <p className="m-0 text-sm font-medium text-[var(--experience-heading-color)] sm:text-base">Apr 1 – Jun 30, 2026</p>
            </div>
          </div>
        </section>

        <section aria-labelledby="emergx-story" className="mb-8 grid gap-6 sm:grid-cols-[0.75fr_1.25fr] sm:gap-12">
          <div>
            <p className="mb-2 text-xs font-medium uppercase tracking-[0.15em] text-[var(--experience-label-color)]">THE EXPERIENCE</p>
            <h2 id="emergx-story" className="m-0 max-w-sm text-2xl font-medium leading-tight tracking-[-0.04em] text-[var(--experience-heading-color)] sm:text-3xl">Building tools for job discovery and hiring.</h2>
          </div>
          <div className="space-y-4 text-[15px] leading-7 text-[var(--experience-copy-color)] sm:text-base">
            <p className="m-0">During my three-month remote internship from April 1 to June 30, 2026, I worked on features for the EmergX platform that supported both job seekers and HR teams.</p>
            <p className="m-0">I built a LinkedIn job-search agent and extended the recruiting workflow with candidate questions and an Excel-style applicant view, helping bring the relevant information into one place.</p>
          </div>
        </section>

        <section aria-labelledby="emergx-projects" className="mb-8 rounded-[1.5rem] border border-[var(--experience-border-color)] bg-[var(--experience-panel-color)] p-5 backdrop-blur-xl sm:rounded-[2rem] sm:p-8">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-3 border-b border-[var(--experience-border-color)] pb-5 sm:mb-8">
            <div>
              <p className="mb-2 text-xs font-medium uppercase tracking-[0.15em] text-[var(--experience-label-color)]">MY CONTRIBUTIONS</p>
              <h2 id="emergx-projects" className="m-0 text-2xl font-medium tracking-[-0.04em] text-[var(--experience-heading-color)] sm:text-3xl">What I built</h2>
