import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/app/lib/prisma";
import "./HomeBlogSection.css";

export default async function HomeBlogSection() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
    take: 3,
  });

  if (posts.length === 0) return null;

  return (
    <section className="home-blog-section">
      <div className="home-blog-container">
        <div className="home-blog-header">
          <h2 className="home-blog-title">Blog</h2>
          <Link href="/blog" className="home-blog-all-btn">
            TÜM YAZILAR
          </Link>
        </div>

        <div className="home-blog-grid">
          {posts.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`} className="home-blog-card">
              <div className="home-blog-card-top">
                <span className="home-blog-category">{post.category.toUpperCase()}</span>
                <span className="home-blog-date">
                  {new Date(post.createdAt).toLocaleDateString("tr-TR", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </div>
              <div className="home-blog-image-wrapper">
                <Image
                  src={post.image || "/images/placeholder.webp"}
                  alt={post.title}
                  fill
                  className="home-blog-image"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="home-blog-content">
                <h3 className="home-blog-post-title">{post.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
