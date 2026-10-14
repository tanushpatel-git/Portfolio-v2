export type PortfolioProject = {
  title: string;
  category: string;
  description: string;
  image: string;
  width: number;
  height: number;
  slug: string;
};

export const projectImages: PortfolioProject[] = [
  { title: "Codeera", category: "Collaborative coding", description: "A collaborative coding and interview workspace with live coding, video sessions, and real-time chat.", image: "/projectImages/Codeera.webp", width: 2918, height: 1650, slug: "codeera" },
  { title: "GitHub Wizard", category: "Developer tool", description: "A visual Git command assistant that helps developers build and run commands without memorizing syntax.", image: "/projectImages/GithubWizard.webp", width: 2846, height: 1638, slug: "github-wizard" },
  { title: "TLux AI", category: "AI product", description: "An AI assistant builder exploring how customizable assistants can live on any website.", image: "/projectImages/TluxAi.webp", width: 2912, height: 1668, slug: "tlux-ai" },
  { title: "Topmate", category: "Web experience", description: "A creator storefront concept for bringing sessions, products, and an online presence together.", image: "/projectImages/Topmate.webp", width: 2906, height: 1590, slug: "topmate" },
  { title: "Book Collection", category: "Book management", description: "A book collection interface for browsing, organizing, and managing a personal library.", image: "/projectImages/bookManagement.webp", width: 2640, height: 1500, slug: "book-collection" },
];
