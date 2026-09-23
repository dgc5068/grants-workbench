import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";
import GithubSlugger from "github-slugger";

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

export interface PostFrontmatter {
  title: string;
  publishedAt: string;
  summary: string;
  tags: string[];
  draft: boolean;
  image?: string;
}

export interface Post extends PostFrontmatter {
  slug: string;
  content: string;
  readingTime: string;
}

export interface TocItem {
  id: string;
  text: string;
  depth: number;
}

const frontmatterSchema = {
  title: "string",
  publishedAt: "string",
  summary: "string",
};

function validateFrontmatter(data: Record<string, unknown>, slug: string): PostFrontmatter {
  for (const key of Object.keys(frontmatterSchema)) {
    if (typeof data[key] !== "string" || !(data[key] as string).length) {
      throw new Error(`Post "${slug}" is missing required frontmatter field "${key}"`);
    }
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(data.publishedAt as string)) {
    throw new Error(`Post "${slug}" has invalid publishedAt "${data.publishedAt}" — expected YYYY-MM-DD`);
  }
  return {
    title: data.title as string,
    publishedAt: data.publishedAt as string,
    summary: data.summary as string,
    tags: Array.isArray(data.tags) ? (data.tags as string[]) : [],
    draft: data.draft === true,
    image:
      typeof data.image === "string" && data.image.length
        ? data.image
        : undefined,
  };
}

function isDraftVisible(): boolean {
  return process.env.NODE_ENV !== "production";
}

function parsePostFile(fileName: string): Post {
  const slug = fileName.replace(/\.mdx$/, "");
  const raw = fs.readFileSync(path.join(POSTS_DIR, fileName), "utf8");
  const { data, content } = matter(raw);
  const frontmatter = validateFrontmatter(data, slug);
  return {
    slug,
    ...frontmatter,
    content,
    readingTime: readingTime(content).text,
  };
}

function postFileNames(): string[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".mdx"));
}

/** All posts, newest first. Drafts are included in development only. */
export function getAllPosts(): Post[] {
  return postFileNames()
    .map(parsePostFile)
    .filter((post) => isDraftVisible() || !post.draft)
    .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));
}

export function getPostBySlug(slug: string): Post | null {
  const fileName = `${slug}.mdx`;
  if (!postFileNames().includes(fileName)) return null;
  const post = parsePostFile(fileName);
  if (post.draft && !isDraftVisible()) return null;
  return post;
}

/** Extract h2/h3 headings from raw markdown, slugged the same way rehype-slug does. */
export function getTableOfContents(content: string): TocItem[] {
  const slugger = new GithubSlugger();
  const toc: TocItem[] = [];
  let inFence = false;
  for (const line of content.split("\n")) {
    if (/^\s*```/.test(line)) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;
    const match = /^(#{2,3})\s+(.+?)\s*#*\s*$/.exec(line);
    if (!match) continue;
    const text = match[2].replace(/[`*_~[\]]/g, "").trim();
    toc.push({ id: slugger.slug(text), text, depth: match[1].length });
  }
  return toc;
}

export function getAllTags(): string[] {
  const tags = new Set<string>();
  for (const post of getAllPosts()) {
    post.tags.forEach((t) => tags.add(t));
  }
  return [...tags].sort();
}

export { formatDate } from "./format";
