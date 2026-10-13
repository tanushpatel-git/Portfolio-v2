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
