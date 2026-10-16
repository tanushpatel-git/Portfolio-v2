export type ProjectImageAsset = {
  src: string;
  width: number;
  height: number;
  alt: string;
};

export type PortfolioProject = {
  title: string;
  category: string;
  githubUrl?: string;
  description: string;
  overview?: string;
  highlights?: string[];
  image: string;
  width: number;
  height: number;
  slug: string;
  relatedImages?: ProjectImageAsset[];
};

const related = (name: string, count: number, dimensions: Array<[number, number]>): ProjectImageAsset[] =>
  Array.from({ length: count }, (_, index) => ({
    src: `/projectImages/${name}${index + 2}.webp`,
    width: dimensions[index][0],
    height: dimensions[index][1],
    alt: `${name} project image ${index + 2}`,
  }));

export const projectImages: PortfolioProject[] = [
  {
    title: "Codeera", category: "Collaborative coding", githubUrl: "https://github.com/tanushpatel-git/CodeEra", description: "A LeetCode-style coding platform brought together with video calls and live chat.",
    overview: "CodeEra gives people one place to solve programming questions and work through them together. It combines the familiar challenge-based flow of a coding practice site with the communication tools needed to discuss an approach while it is being written.",
    highlights: ["Browse and solve programming questions", "Discuss solutions over a video call", "Use chat messaging alongside the coding session"],
    image: "/projectImages/Codeera.webp", width: 2918, height: 1650, slug: "codeera",
    relatedImages: related("Codeera", 5, [[988, 1666], [2922, 1346], [2940, 1668], [2940, 1642], [1380, 1606]]),
  },
  {
    title: "GitHub Wizard", category: "Developer tool", githubUrl: "https://github.com/tanushpatel-git/Github_tanu", description: "A VS Code extension that makes common Git commands quick to find and run.",
    overview: "GitHub Wizard brings a list of ready-to-use Git commands into VS Code. Instead of remembering command syntax or typing it from scratch, users can choose the command they need and run it in the integrated terminal.",
    highlights: ["Find common Git commands in the extension", "Run a selected command in the VS Code terminal", "Speed up routine Git work"],
    image: "/projectImages/GithubWizard.webp", width: 2846, height: 1638, slug: "github-wizard", relatedImages: [],
  },
  {
    title: "TLux AI", category: "AI product", githubUrl: "https://github.com/tanushpatel-git/Ai-Embedding-Tlux", description: "An AI embedding pipeline for creating website chatbots with live navigation.",
    overview: "TLux AI lets a user create a chatbot for a website through an AI embedding pipeline. The chatbot can answer visitors and support live navigation, helping people move through the site as they interact with it.",
    highlights: ["Create a chatbot for a website", "Use an AI embedding pipeline to prepare its knowledge", "Guide visitors through the site with live navigation"],
    image: "/projectImages/TluxAi.webp", width: 2912, height: 1668, slug: "tlux-ai", relatedImages: [],
  },
  {
    title: "Topmate", category: "User connection platform", githubUrl: "https://github.com/tanushpatel-git/Topmate-1-1-", description: "A platform for finding and booking time with people in a chosen professional stream.",
    overview: "Topmate helps people connect with someone whose professional stream matches what they are looking for. A user can find the right person, pay for that person's service, and then use the platform to connect once the booking is complete.",
    highlights: ["Discover people by their professional stream", "Choose a service and complete its payment", "Connect through the platform after booking"],
    image: "/projectImages/Topmate.webp", width: 2906, height: 1590, slug: "topmate",
    relatedImages: [
      { src: "/projectImages/Topmate1.webp", width: 2940, height: 1670, alt: "Topmate project image 1" },
      { src: "/projectImages/Topmate2.webp", width: 992, height: 1674, alt: "Topmate project image 2" },
      { src: "/projectImages/Topmate3.webp", width: 992, height: 1548, alt: "Topmate project image 3" },
      { src: "/projectImages/Topmate4.webp", width: 2940, height: 1672, alt: "Topmate project image 4" },
    ],
  },
  {
    title: "Book Management", category: "Library management", githubUrl: "https://github.com/tanushpatel-git/Book-Management", description: "A simple library management system for maintaining a personal book collection.",
    overview: "Book Management gives users a place to keep their book collection organized. They can add books to their library, update the details later, and remove books they no longer want to keep in the collection.",
    highlights: ["Store books in a personal collection", "Edit book details", "Delete books from the collection"],
    image: "/projectImages/bookManagement.webp", width: 2640, height: 1500, slug: "book-management",
    relatedImages: related("BookManagement", 2, [[2940, 1678], [992, 1672]]),
  },
  {
    title: "HeadPhone Era", category: "Product storytelling", githubUrl: "https://github.com/tanushpatel-git/Headphone-Website", description: "A headphone brand experience told through a portfolio-style, scrolling website.",
    overview: "HeadPhone Era is a headphone agency website built as a product storytelling experience. The page uses a guided, scrolling narrative to introduce the headphones and their visual world, with the interaction and pacing of a portfolio presentation.",
    highlights: ["Present a headphone brand and its products", "Use a story-led scrolling experience", "Build the page as a visual portfolio piece"],
    image: "/projectImages/headPhoneEra.webp", width: 2908, height: 1670, slug: "headphone-era", relatedImages: [],
  },
  {
    title: "Job Portal", category: "Job search", githubUrl: "https://github.com/tanushpatel-git/JobPortal", description: "A job-search website for finding roles, saving opportunities, and applying.",
    overview: "Job Portal helps people manage the job search from discovery through application. Users can search for roles, save opportunities to revisit, and apply to jobs from the same workspace.",
    highlights: ["Search for job opportunities", "Save jobs for later", "Apply to selected roles"],
    image: "/projectImages/job-portal.webp", width: 2904, height: 1664, slug: "job-portal",
    relatedImages: [
      { src: "/projectImages/Jobportal.webp", width: 990, height: 1670, alt: "Job Portal project image 2" },
      { src: "/projectImages/Jobportal2.webp", width: 2164, height: 834, alt: "Job Portal project image 3" },
    ],
  },
  {
    title: "K72", category: "Creative agency recreation", githubUrl: "https://github.com/tanushpatel-git/K72", description: "A recreation of a creative agency website, built to explore its portfolio and visual direction.",
    overview: "K72 is a cloned creative agency website. The project recreates the agency's portfolio experience and visual direction as a front-end build, focusing on how its work is presented and how the site moves between sections.",
    highlights: ["Recreate a creative agency portfolio", "Study the original visual direction", "Build the experience as a front-end implementation"],
    image: "/projectImages/k72.webp", width: 2936, height: 1672, slug: "k72", relatedImages: [],
  },
  {
    title: "OrderMate", category: "Restaurant operations", githubUrl: "https://github.com/tanushpatel-git/Order-Mate", description: "A restaurant kitchen order board for tracking each order from queue to completion.",
    overview: "OrderMate helps restaurant staff keep incoming orders organized in a kitchen to-do board. Each order can be tracked through its current state, so the team can see what is waiting, what is being prepared, and what has been completed.",
    highlights: ["Track orders waiting to be prepared", "Move active orders through preparation", "Mark finished orders as complete"],
    image: "/projectImages/OrderMate.webp", width: 2884, height: 1588, slug: "ordermate",
    relatedImages: [
      { src: "/projectImages/OrderMate1.webp", width: 996, height: 1664, alt: "OrderMate project image 2" },
      { src: "/projectImages/OrderMate2.webp", width: 2940, height: 1672, alt: "OrderMate project image 3" },
    ],
  },
  {
    title: "Padthi", category: "Government exam preparation", githubUrl: "https://github.com/tanushpatel-git/Padthi", description: "An exam-preparation website with exam information, study resources, and scheduled practice papers.",
    overview: "Padthi supports people preparing for government exams by bringing exam information and learning resources together. Users can also schedule a paper for a particular exam, giving them a way to plan their practice around the exam they are targeting.",
    highlights: ["Explore government exam information", "Access exam preparation resources", "Schedule a practice paper for a selected exam"],
    image: "/projectImages/padthi.webp", width: 2896, height: 1604, slug: "padthi",
    relatedImages: [
      { src: "/projectImages/padthi2.webp", width: 998, height: 1484, alt: "Padthi project image 2" },
      { src: "/projectImages/padthi3.webp", width: 2940, height: 1672, alt: "Padthi project image 3" },
    ],
  },
  {
    title: "Vitaweave", category: "Healthcare AI", githubUrl: "https://github.com/tanushpatel-git/Vitaweave", description: "A hospital platform that helps doctors review patient history with an AI assistant grounded in medical knowledge.",
    overview: "VitaWeave is a hospital experience designed to reduce the effort involved in understanding a patient's case. A retrieval-augmented generation (RAG) assistant draws on medical knowledge adapted to different doctors, while also bringing the patient's history into the conversation so a doctor can review the context more quickly.",
    highlights: ["Give doctors an AI assistant grounded in medical knowledge", "Adapt the assistant's knowledge to different doctors", "Bring patient history into the review to provide context"],
    image: "/projectImages/Vitaweave1.webp", width: 970, height: 1290, slug: "vitaweave",
    relatedImages: [
      { src: "/projectImages/Vitaweave2.webp", width: 1004, height: 1276, alt: "Vitaweave project image 2" },
      { src: "/projectImages/Vitaweave3.webp", width: 2940, height: 1682, alt: "Vitaweave project image 3" },
    ],
  },
  {
    title: "TLux Lazy", category: "Machine learning toolkit", description: "A Python library for comparing classification and regression models with one function.",
    overview: "TLux Lazy makes it easier to compare machine learning models on a dataset. A single function runs classification or regression models, applies a selection of preprocessing steps, and returns a ranked DataFrame so results can be reviewed side by side.",
    highlights: ["Compare classification and regression models through one function", "Apply a range of preprocessing options to the dataset", "Review and rank model performance in a returned DataFrame"],
    image: "/projectImages/tluxLazy1.webp", width: 2320, height: 1484, slug: "tlux-lazy",
    relatedImages: [{ src: "/projectImages/tluxLazy2.webp", width: 2296, height: 824, alt: "TLux Lazy model comparison results" }],
  },
  {
    title: "Computer Vision", category: "Computer vision · model training", description: "A trained model that recognizes seven face classes, with its progress documented across 50 epochs.",
    overview: "This project follows the training of a computer vision model built to detect seven types of face. The training journey is documented across 50 epochs, showing how the model develops as it learns from the data.",
    highlights: ["Train a model to detect seven face classes", "Track the training process over 50 epochs", "Present the model and its learning progress visually"],
    image: "/projectImages/ComputerVision1.webp", width: 658, height: 643, slug: "computer-vision",
    relatedImages: [{ src: "/projectImages/ComputerVision2.webp", width: 1536, height: 1024, alt: "Computer Vision model training progress" }],
  },
  { title: "Project exploration 01", category: "Selected work", description: "A selected project from my design and development practice.", image: "/projectImages/projectImage1.png", width: 970, height: 1290, slug: "project-exploration-01" },
  { title: "Project exploration 02", category: "Selected work", description: "A selected project from my design and development practice.", image: "/projectImages/projectImage2.png", width: 1004, height: 1276, slug: "project-exploration-02" },
  { title: "Project exploration 03", category: "Selected work", description: "A selected project from my design and development practice.", image: "/projectImages/projectImage3.png", width: 2940, height: 1682, slug: "project-exploration-03" },
  { title: "Project exploration 04", category: "Selected work", description: "A selected project from my design and development practice.", image: "/projectImages/projectImage4.png", width: 2940, height: 1670, slug: "project-exploration-04" },
  { title: "Project exploration 05", category: "Selected work", description: "A selected project from my design and development practice.", image: "/projectImages/projectImage5.png", width: 992, height: 1674, slug: "project-exploration-05" },
  { title: "Project exploration 06", category: "Selected work", description: "A selected project from my design and development practice.", image: "/projectImages/projectImage6.png", width: 992, height: 1548, slug: "project-exploration-06" },
  { title: "Project exploration 07", category: "Selected work", description: "A selected project from my design and development practice.", image: "/projectImages/projectImage7.png", width: 998, height: 1484, slug: "project-exploration-07" },
  { title: "Project exploration 08", category: "Selected work", description: "A selected project from my design and development practice.", image: "/projectImages/projectImage8.png", width: 2940, height: 1672, slug: "project-exploration-08" },
  { title: "Project exploration 09", category: "Selected work", description: "A selected project from my design and development practice.", image: "/projectImages/projectImage9.png", width: 2940, height: 1672, slug: "project-exploration-09" },
  { title: "Project exploration 10", category: "Selected work", description: "A selected project from my design and development practice.", image: "/projectImages/projectImage10.png", width: 996, height: 1664, slug: "project-exploration-10" },
  { title: "Project exploration 11", category: "Selected work", description: "A selected project from my design and development practice.", image: "/projectImages/projectImage11.png", width: 2940, height: 1672, slug: "project-exploration-11" },
  { title: "Project exploration 12", category: "Selected work", description: "A selected project from my design and development practice.", image: "/projectImages/projectImage12.png", width: 990, height: 1670, slug: "project-exploration-12" },
  { title: "Project exploration 13", category: "Selected work", description: "A selected project from my design and development practice.", image: "/projectImages/projectImage13.png", width: 2164, height: 834, slug: "project-exploration-13" },
  { title: "Project exploration 14", category: "Selected work", description: "A selected project from my design and development practice.", image: "/projectImages/projectImage14.png", width: 2940, height: 1678, slug: "project-exploration-14" },
  { title: "Project exploration 15", category: "Selected work", description: "A selected project from my design and development practice.", image: "/projectImages/projectImage15.png", width: 992, height: 1672, slug: "project-exploration-15" },
  { title: "Project exploration 16", category: "Selected work", description: "A selected project from my design and development practice.", image: "/projectImages/projectImage16.png", width: 988, height: 1666, slug: "project-exploration-16" },
  { title: "Project exploration 17", category: "Selected work", description: "A selected project from my design and development practice.", image: "/projectImages/projectImage17.png", width: 1380, height: 1606, slug: "project-exploration-17" },
  { title: "Project exploration 18", category: "Selected work", description: "A selected project from my design and development practice.", image: "/projectImages/projectImage18.png", width: 2922, height: 1346, slug: "project-exploration-18" },
  { title: "Project exploration 19", category: "Selected work", description: "A selected project from my design and development practice.", image: "/projectImages/projectImage19.png", width: 2940, height: 1642, slug: "project-exploration-19" },
  { title: "Project exploration 20", category: "Selected work", description: "A selected project from my design and development practice.", image: "/projectImages/projectImage20.png", width: 2940, height: 1668, slug: "project-exploration-20" },
];
