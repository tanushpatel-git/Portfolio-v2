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
  { title: "Codeera", category: "Collaborative coding", description: "A collaborative coding and interview workspace with live coding, video sessions, and real-time chat.", image: "/projectImages/Codeera.webp", width: 2918, height: 1650, slug: "codeera" },
  { title: "GitHub Wizard", category: "Developer tool", description: "A visual Git command assistant that helps developers build and run commands without memorizing syntax.", image: "/projectImages/GithubWizard.webp", width: 2846, height: 1638, slug: "github-wizard" },
  { title: "TLux AI", category: "AI product", description: "An AI assistant builder exploring how customizable assistants can live on any website.", image: "/projectImages/TluxAi.webp", width: 2912, height: 1668, slug: "tlux-ai" },
  { title: "Topmate", category: "Web experience", description: "A creator storefront concept for bringing sessions, products, and an online presence together.", image: "/projectImages/Topmate.webp", width: 2906, height: 1590, slug: "topmate" },
  { title: "Book Collection", category: "Book management", description: "A book collection interface for browsing, organizing, and managing a personal library.", image: "/projectImages/bookManagement.webp", width: 2640, height: 1500, slug: "book-collection" },
  { title: "HeadPhone Era", category: "Product design", description: "A dark, product-focused landing page concept for a headphone brand.", image: "/projectImages/headPhoneEra.webp", width: 2908, height: 1670, slug: "headphone-era" },
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
