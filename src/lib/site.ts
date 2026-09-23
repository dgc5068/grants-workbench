export const site = {
  name: "grant's workbench",
  title: "grant's workbench",
  description:
    "I'm Grant, an engineering student documenting what I design, create, and break. I created Grant's Workbench to stand out in a world of ATS-friendly resumes and LinkedIn connections.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  author: "Grant",
  email: "11048611@uvu.edu",
  links: {
    linkedin: "https://www.linkedin.com/in/danny-clark-54480633a",
  },
} as const;
