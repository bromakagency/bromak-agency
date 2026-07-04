import type { MetadataRoute } from "next";
import { works } from "@/app/isler/works-data";
import { prisma } from "@/app/lib/prisma";

const siteUrl = "https://bromakagency.com";
const lastModified = new Date("2026-06-26");

const staticRoutes: Array<{
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
}> = [
  { path: "", changeFrequency: "weekly", priority: 1 },
  { path: "/hizmetler", changeFrequency: "monthly", priority: 0.9 },
  { path: "/hizmetler/sosyal-medya-yonetimi", changeFrequency: "monthly", priority: 0.85 },
  { path: "/hizmetler/dijital-reklam-yonetimi", changeFrequency: "monthly", priority: 0.85 },
  { path: "/hizmetler/web-tasarim-ve-yazilim", changeFrequency: "monthly", priority: 0.85 },
  { path: "/hizmetler/arama-motoru-optimizasyonu-seo", changeFrequency: "monthly", priority: 0.85 },
  { path: "/isler", changeFrequency: "monthly", priority: 0.8 },
  { path: "/blog", changeFrequency: "weekly", priority: 0.8 },
  { path: "/hakkimizda", changeFrequency: "monthly", priority: 0.75 },
  { path: "/iletisim", changeFrequency: "monthly", priority: 0.9 },
  { path: "/sikca-sorulan-sorular", changeFrequency: "monthly", priority: 0.65 },
  { path: "/gizlilik-politikasi", changeFrequency: "yearly", priority: 0.3 },
  { path: "/kullanim-sartlari", changeFrequency: "yearly", priority: 0.3 },
  { path: "/cerez-politikasi", changeFrequency: "yearly", priority: 0.3 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages = staticRoutes.map((route) => ({
    url: `${siteUrl}${route.path}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const workPages = works.map((work) => ({
    url: `${siteUrl}/isler/${work.slug}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const dbPosts = await prisma.post.findMany({
    where: { published: true },
    select: { slug: true, updatedAt: true },
  });

  const blogPages = dbPosts.map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: post.updatedAt,
    changeFrequency: "monthly" as const,
    priority: 0.65,
  }));

  return [...staticPages, ...workPages, ...blogPages];
}
