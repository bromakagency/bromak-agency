import Link from "next/link";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { blogPosts } from "@/app/lib/blogData";
import "./blog.css";

export default function BlogPage() {
  return (
    <div style={{ backgroundColor: '#fff', minHeight: '100vh' }}>
      <Navbar />
      <main className="blog-container">
        <header className="blog-header">
          <h1 className="blog-title">Blog</h1>
          <p className="blog-subtitle">Our resources and updates</p>
        </header>

        <section>
          <h2 className="blog-section-title">Recently added</h2>
          <div className="blog-grid">
            {blogPosts.map((post, index) => (
              <Link 
                href={`/blog/${post.slug}`} 
                key={post.slug} 
                className={`blog-card ${index === 0 ? 'featured-post' : ''}`}
              >
                <div className="blog-card-image-placeholder"></div>
                <div className="blog-card-content">
                  <div className="blog-card-meta">
                    <span className="blog-card-category">{post.category}</span>
                    <span>•</span>
                    <span>{post.date}</span>
                  </div>
                  <h3 className="blog-card-title">{post.title}</h3>
                  <p className="blog-card-summary">{post.summary}</p>
                  <div className="blog-card-readmore">
                    Read article <span aria-hidden="true">&rarr;</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
