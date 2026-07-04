"use client";

import Link from "next/link";
import { FaFacebookF, FaLinkedinIn, FaXTwitter, FaLink } from "react-icons/fa6";
import { useState, useEffect } from "react";

type Post = {
  title: string;
  summary: string;
  content: string;
  image: string;
  category: string;
  author: string;
  authorRole: string;
  readTime: string;
  date: string;
  slug: string;
  createdAtIso: string;
  updatedAtIso: string;
  faqJson?: string | null;
};

type RelatedPost = {
  slug: string;
  title: string;
  summary: string;
  image: string;
  category: string;
  date: string;
};

export default function BlogDetailDB({ post, relatedPosts }: { post: Post; relatedPosts: RelatedPost[] }) {
  const [currentUrl, setCurrentUrl] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setCurrentUrl(`https://bromakagency.com/blog/${post.slug}`);
  }, [post.slug]);

  const copyLink = () => {
    // Sadece HTTPS veya localhost (güvenli) ortamlarda çalışır. 
    // ? (optional chaining) sayesinde yerel IP'de test ederken hata fırlatmaz, sadece kopyalamaz.
    navigator.clipboard?.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="blog-detail-page">
      {/* JSON-LD Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: "https://bromakagency.com" },
              { "@type": "ListItem", position: 2, name: "Blog", item: "https://bromakagency.com/blog" },
              { "@type": "ListItem", position: 3, name: post.title, item: `https://bromakagency.com/blog/${post.slug}` },
            ],
          }),
        }}
      />

      {/* JSON-LD Article Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": `https://bromakagency.com/blog/${post.slug}`
            },
            headline: post.title,
            description: post.summary,
            image: post.image,
            author: { "@type": "Person", name: post.author },
            publisher: { 
              "@type": "Organization", 
              name: "Bromak Agency", 
              logo: { 
                "@type": "ImageObject", 
                url: "https://bromakagency.com/assets/logos/bromak_app_icon.png" 
              } 
            },
            datePublished: post.createdAtIso,
            dateModified: post.updatedAtIso,
            articleSection: post.category,
            inLanguage: "tr-TR",
            url: `https://bromakagency.com/blog/${post.slug}`,
            wordCount: post.content.replace(/<[^>]*>?/gm, '').split(/\s+/).length,
            timeRequired: `PT${parseInt(post.readTime) || 5}M`,
          }),
        }}
      />

      {/* JSON-LD FAQPage Schema */}
      {post.faqJson && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: JSON.parse(post.faqJson).map((faq: any) => ({
                "@type": "Question",
                name: faq.question,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: faq.answer
                }
              }))
            }),
          }}
        />
      )}

      {/* Hero */}
      <div className="bd-hero">
        {post.image && (
          <div className="bd-hero-image">
            <img src={post.image} alt={post.title} onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }} />
            <div className="bd-hero-overlay" />
          </div>
        )}
        <div className="bd-hero-content">
          <h1 className="bd-title">{post.title}</h1>
          <div className="bd-author-meta">
            <div className="bd-author">
              <div className="bd-author-avatar">
                <img 
                  src={post.author === "Recep Aydoğan" ? "/assets/recep_aydogan_bromak.jpg" : "/assets/logos/bromak_app_icon.png"} 
                  alt={post.author} 
                />
              </div>
              <div>
                <span className="bd-author-name">{post.author}</span>
                <span className="bd-author-role">{post.authorRole}</span>
              </div>
            </div>
            
            <div className="bd-meta-divider" aria-hidden="true"></div>

            <div className="bd-meta">
              <span className="bd-category">{post.category}</span>
              <span className="bd-dot">·</span>
              <span className="bd-readtime">{post.readTime}</span>
              <span className="bd-dot">·</span>
              <span className="bd-date">{post.date}</span>
            </div>
          </div>
          
          <nav className="bd-breadcrumb-hero" aria-label="Breadcrumb">
            <a href="/">Ana Sayfa</a>
            <span className="bd-bc-sep" aria-hidden="true">/</span>
            <a href="/blog">Blog</a>
            <span className="bd-bc-sep" aria-hidden="true">/</span>
            <span aria-current="page">{post.title}</span>
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="bd-body">
        <div className="bd-content-wrap">
          {/* Share sidebar */}
          <aside className="bd-share-sidebar">
            <span className="bd-share-label">Paylaş</span>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`}
              target="_blank" rel="noopener noreferrer"
              className="bd-share-btn" title="Facebook'ta Paylaş"
            >
              <FaFacebookF />
            </a>
            <a
              href={`https://twitter.com/intent/tweet?url=${currentUrl}&text=${encodeURIComponent(post.title)}`}
              target="_blank" rel="noopener noreferrer"
              className="bd-share-btn" title="X'te Paylaş"
            >
              <FaXTwitter />
            </a>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${currentUrl}`}
              target="_blank" rel="noopener noreferrer"
              className="bd-share-btn" title="LinkedIn'de Paylaş"
            >
              <FaLinkedinIn />
            </a>
            <button className="bd-share-btn" onClick={copyLink} title={copied ? "Kopyalandı!" : "Bağlantıyı Kopyala"}>
              <FaLink />
            </button>
          </aside>

          {/* Main article */}
          <article
            className="bd-article"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* FAQs */}
          {post.faqJson && (
            <div className="bd-faq-section">
              <h2>Sıkça Sorulan Sorular</h2>
              <div className="bd-faq-list">
                {JSON.parse(post.faqJson).map((faq: any, i: number) => (
                  <details key={i} className="bd-faq-item">
                    <summary className="bd-faq-question">{faq.question}</summary>
                    <div className="bd-faq-answer">
                      <p>{faq.answer}</p>
                    </div>
                  </details>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="bd-related">
            <h2 className="bd-related-title">İlgili Yazılar</h2>
            <div className="bd-related-grid">
              {relatedPosts.map((p) => (
                <Link key={p.slug} href={`/blog/${p.slug}`} className="bd-related-card">
                  <div className="bd-related-img">
                  <img
                    src={p.image || "/assets/logos/bromak_kirmizi_logo.svg"}
                    alt={p.title}
                    loading="lazy"
                    onError={(e) => { (e.target as HTMLImageElement).src = '/assets/logos/bromak_kirmizi_logo.svg' }}
                  />
                </div>
                  <div className="bd-related-content">
                    <span className="bd-related-category">{p.category}</span>
                    <h3>{p.title}</h3>
                    <p>{p.summary}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>

      <div className="bd-back-wrap">
        <Link href="/blog" className="bd-back-link">← Blog'a Dön</Link>
      </div>
    </main>
  );
}
