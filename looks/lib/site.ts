export const SITE_NAME = "Tanush Patel";
export const SITE_TITLE = "Tanush Patel — Designer & Developer";
export const SITE_DESCRIPTION =
  "The portfolio of Tanush Patel, designer and developer.";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");
