import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/app/lib/prisma";
import Footer from "@/app/components/Footer";
import Navbar from "@/app/components/Navbar";
import "./blog-detail.css";
import BlogDetailDB from "./BlogDetailDB";
import ReadingProgress from "@/app/components/ReadingProgress";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    select: { slug: true },
  });
  return posts.map((p: any) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await prisma.post.findUnique({ where: { slug } });

  if (!post) return { title: "Blog yazısı bulunamadı" };

  return {
    title: post.title,
    description: post.summary,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.summary,
      url: `/blog/${post.slug}`,
      type: "article",
      images: [{ url: post.image }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.summary,
      images: [post.image],
    },
  };
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = await prisma.post.findUnique({ where: { slug } });

  if (!post || !post.published) notFound();

  const relatedPosts = await prisma.post.findMany({
    where: { published: true, id: { not: post.id } },
    orderBy: { createdAt: "desc" },
    take: 3,
  });

  const mappedRelated = relatedPosts.map((p: any) => ({
    slug: p.slug,
    title: p.title,
    summary: p.summary,
    image: p.image,
    category: p.category,
    date: new Date(p.createdAt).toLocaleDateString("tr-TR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }),
  }));

  const mappedPost = {
    title: post.title,
    summary: post.summary,
    content: post.content,
    image: post.image,
    category: post.category,
    author: post.author,
    authorRole: post.authorRole,
    readTime: post.readTime,
    date: new Date(post.createdAt).toLocaleDateString("tr-TR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }),
    createdAtIso: post.createdAt.toISOString(),
    updatedAtIso: post.updatedAt.toISOString(),
    slug: post.slug,
    faqJson: post.faqJson,
  };

  return (
    <>
      <ReadingProgress />
      <Navbar />
      <BlogDetailDB post={mappedPost} relatedPosts={mappedRelated} />
      <Footer />
    </>
  );
}
