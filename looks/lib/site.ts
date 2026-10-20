export const SITE_NAME = "Tanush Patel";
export const SITE_TITLE =
  "Tanush Patel | Freelance Full-Stack Developer & Designer";
export const SITE_DESCRIPTION =
  "Tanush Patel — freelance full-stack developer and designer in India. React, web design, AI, and product-development work.";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");
