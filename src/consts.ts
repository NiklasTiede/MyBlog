export const SITE = {
  title: "The Coding Lab",
  tagline: "Notes on software, tools & projects",
  description:
    "Programming notes, project writeups and small technical guides, written while building real things.",
  author: "Niklas Tiede",
  url: "https://the-coding-lab.com",
};

export type Tone = "teal" | "indigo" | "amber" | "coral" | "gray";

export const CATEGORY_TONES: Record<string, Tone> = {
  Bash: "gray",
  Backend: "teal",
  CLI: "indigo",
  DevOps: "indigo",
  "IMDb Clone": "coral",
  Packaging: "amber",
  Python: "amber",
  React: "coral",
  Scripting: "gray",
  "spring boot": "teal",
  Testing: "indigo",
  WebDev: "teal",
};

export function toneFor(category: string): Tone {
  return CATEGORY_TONES[category] ?? "gray";
}

export function categoryFor(post: {
  data: { category?: string; categories?: string[]; tags?: string[] };
}): string {
  return post.data.category ?? post.data.categories?.[0] ?? post.data.tags?.[0] ?? "Notes";
}

export function postHref(post: {
  data: { pubDatetime: Date; slug: string };
}): string {
  return `/${post.data.pubDatetime.getFullYear()}/${post.data.slug}/`;
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
