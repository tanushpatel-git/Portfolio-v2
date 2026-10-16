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
  { title: "Job Portal", category: "Job search", description: "A job-search workspace for discovering opportunities, saving roles, and organizing applications.", image: "/projectImages/job-portal.webp", width: 2904, height: 1664, slug: "job-portal" },
  { title: "K72", category: "Creative agency", description: "A bold agency direction built around expressive typography, contrast, and graphic forms.", image: "/projectImages/k72.webp", width: 2936, height: 1672, slug: "k72" },
  { title: "OrderMate", category: "Food ordering", description: "A restaurant ordering experience that puts menus and convenient ordering within easy reach.", image: "/projectImages/order-mate.webp", width: 2884, height: 1588, slug: "ordermate" },
  { title: "Padthi", category: "Education", description: "An exam-preparation platform for study materials, interactive quizzes, and progress tracking.", image: "/projectImages/padthi.webp", width: 2896, height: 1604, slug: "padthi" },
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
