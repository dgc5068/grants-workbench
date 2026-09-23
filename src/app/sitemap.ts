import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/mdx";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: `${site.url}/blog/${post.slug}`,
    lastModified: new Date(`${post.publishedAt}T00:00:00Z`),
  }));

  return [
    { url: site.url, lastModified: new Date() },
    { url: `${site.url}/blog`, lastModified: new Date() },
    ...posts,
  ];
}
