import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  updated?: string;
  image?: string;
  draft?: boolean;
};

export type Post = PostMeta & {
  content: string;
};

const POSTS_DIR = path.join(process.cwd(), "content/blog");

/**
 * Content adapter boundary.
 * Today: MDX/Markdown files in content/blog.
 * Later: swap this implementation to Sanity (or another CMS) without changing page components.
 */
function readPostFiles(): string[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"));
}

function parsePost(filename: string): Post {
  const slug = filename.replace(/\.mdx?$/, "");
  const raw = fs.readFileSync(path.join(POSTS_DIR, filename), "utf8");
  const { data, content } = matter(raw);
  return {
    slug,
    title: String(data.title ?? slug),
    description: String(data.description ?? ""),
    date: String(data.date ?? ""),
    updated: data.updated ? String(data.updated) : undefined,
    image: data.image ? String(data.image) : undefined,
    draft: Boolean(data.draft),
    content,
  };
}

export function getPosts(): PostMeta[] {
  return readPostFiles()
    .map(parsePost)
    .filter((p) => !p.draft)
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .map(({ content: _c, ...meta }) => meta);
}

export function getPostBySlug(slug: string): Post | null {
  const file =
    readPostFiles().find((f) => f.replace(/\.mdx?$/, "") === slug) ?? null;
  if (!file) return null;
  const post = parsePost(file);
  if (post.draft) return null;
  return post;
}

export function getPostSlugs(): string[] {
  return getPosts().map((p) => p.slug);
}
