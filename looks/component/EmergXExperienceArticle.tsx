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

