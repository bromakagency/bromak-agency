import type { Metadata } from "next";
import { prisma } from "@/app/lib/prisma";
import BlogPageClient from "./BlogPageClient";

import { getSeoMetadata } from "@/app/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoMetadata("blog", {
    title: "Blog | Bromak Agency",
    description: "Dijital pazarlama, web tasarım, SEO ve marka yönetimi üzerine güncel ipuçları, stratejiler ve sektör haberleri.",
    keywords: "blog, dijital pazarlama, seo, web tasarım, marka yönetimi"
  });

  return {
    ...seo,
    alternates: {
      canonical: "/blog",
    },
  };
}

export default async function BlogPage() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
  });

  // Map DB fields to the shape BlogPageClient expects
  const mapped = posts.map((p) => ({
    id: p.id,
    slug: p.slug,
    title: p.title,
    summary: p.summary,
    content: p.content,
    category: p.category,
    image: p.image,
    readTime: p.readTime,
    author: p.author,
    authorRole: p.authorRole,
    date: new Date(p.createdAt).toLocaleDateString("tr-TR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }),
  }));

  return <BlogPageClient posts={mapped} />;
}
