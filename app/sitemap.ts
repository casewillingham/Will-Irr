import type { MetadataRoute } from "next";
import { getPosts } from "@/lib/content/posts";
import { cities } from "@/lib/cities";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const pages: MetadataRoute.Sitemap = [
    {
      url: `${site.url}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${site.url}/services`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${site.url}/cities-we-serve`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${site.url}/commercial`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${site.url}/design`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${site.url}/holiday-lighting`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${site.url}/landscape-lighting`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${site.url}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${site.url}/careers`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${site.url}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${site.url}/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
  ];

  const cityPages: MetadataRoute.Sitemap = cities.map((c) => {
    const isTop =
      c.name === "Benbrook" ||
      c.name === "Fort Worth" ||
      c.name === "White Settlement";
    return {
      url: `${site.url}/${c.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: isTop ? 0.85 : c.priority ? 0.75 : 0.6,
    };
  });

  const posts: MetadataRoute.Sitemap = getPosts().map((post) => ({
    url: `${site.url}/post/${post.slug}`,
    lastModified: new Date(post.updated ?? post.date),
    changeFrequency: "yearly",
    priority: 0.5,
  }));

  return [...pages, ...cityPages, ...posts];
}
