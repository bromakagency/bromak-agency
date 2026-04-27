import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { getPostBySlug, blogPosts } from "@/app/lib/blogData";
import "../blog.css";

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <main className="post-container">
        <Link href="/blog" className="post-back-link">
          &larr; Back to Blog
        </Link>
        
        <article>
          <header className="post-header">
            <div className="post-meta">
              <span className="blog-card-category">{post.category}</span>
              <span>•</span>
              <span>{post.date}</span>
            </div>
            <h1 className="post-title">{post.title}</h1>
          </header>
          
          <div className="post-image-placeholder"></div>
          
          <div className="post-content">
            {post.content.split("\n\n").map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
