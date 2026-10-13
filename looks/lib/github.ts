export const GITHUB_USERNAME = "tanushpatel-git";
export const GITHUB_PROFILE_URL = `https://api.github.com/users/${GITHUB_USERNAME}`;

export type GitHubUser = {
  name: string | null;
  login: string;
  bio: string | null;
  avatar_url: string;
  html_url: string;
  company: string | null;
  location: string | null;
  blog: string | null;
  public_repos: number;
  followers: number;
  following: number;
};

export type GitHubRepo = {
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  fork: boolean;
};

export type Contribution = { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 };

export type GitHubData = {
  profile: GitHubUser | null;
  repositories: GitHubRepo[];
  contributions: Contribution[];
  contributionTotal: number | null;
  readme: string;
};

export type GitHubApiResponse = GitHubData & { error?: string };

export function decodeReadmeContent(value: string) {
  const bytes = Uint8Array.from(atob(value.replace(/\s/g, "")), (char) => char.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}
