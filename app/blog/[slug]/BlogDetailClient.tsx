"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { FaFacebookF, FaLink, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import type { BlogPost } from "@/app/lib/blogData";

type BlogDetailClientProps = {
  post: BlogPost;
  relatedPosts: BlogPost[];
};

export default function BlogDetailClient({
  post,
  relatedPosts,
}: BlogDetailClientProps) {
  const [tocOpen, setTocOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("bolum1");
  const [currentUrl, setCurrentUrl] = useState("");

  const sectionIds = useMemo(
    () => post.sections.map((_, index) => `bolum${index + 1}`),
    [post.sections]
  );

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { rootMargin: "-20% 0px -60% 0px", threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((observer) => observer.disconnect());
  }, [sectionIds]);

  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, []);

  const shareUrl = encodeURIComponent(currentUrl);
  const shareTitle = encodeURIComponent(post.title);

  return (
    <main className="b-blog-detail">
      <div className="b-hero">
        <div className="b-hero-text">
          <div className="b-breadcrumb">
            <Link href="/blog" style={{ color: "inherit", textDecoration: "none" }}>
              Blog
            </Link>
            <span className="b-breadcrumb-sep">›</span>
            {post.category}
          </div>
          <div className="b-meta">
            <span>{post.category.toLocaleUpperCase("tr-TR")}</span>
            <small>{post.date}</small>
            <small className="b-sep">●</small>
            <small>{post.readTime}</small>
          </div>

          <h1>
            {post.title}
            <span>.</span>
          </h1>

          <div className="b-author">
            <div className="avatar" />
            <div>
              <strong>{post.author}</strong>
              <small>{post.authorRole}</small>
            </div>
          </div>
        </div>

        <div className="b-hero-cover">
          <img
            src={post.image}
            alt={post.title}
            loading="eager"
            decoding="async"
            fetchPriority="high"
          />
        </div>
      </div>

      <div className="b-layout">
        <aside className="b-toc">
          <div className="share-row-top">
            <strong>Paylaş</strong>
            <div className="share-icons">
              <Link
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
                target="_blank"
                title="LinkedIn"
              >
                <FaLinkedinIn />
              </Link>
              <Link
                href={`https://x.com/intent/tweet?url=${shareUrl}&text=${shareTitle}`}
                target="_blank"
                title="X (Twitter)"
              >
                <FaXTwitter />
              </Link>
              <Link
                href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
                target="_blank"
                title="Facebook"
              >
                <FaFacebookF />
              </Link>
              <button
                className="share-copy-btn"
                title="Bağlantıyı Kopyala"
                onClick={() => navigator.clipboard.writeText(window.location.href)}
              >
                <FaLink />
              </button>
            </div>
          </div>

          <div className="toc-head" onClick={() => setTocOpen(!tocOpen)}>
            <strong>Bu Yazıda</strong>
            <div className="toc-head-right">
              <div style={{ display: "flex", gap: "4px" }}>
                <span />
                <span />
                <span />
              </div>
              <span className="toc-toggle-label">{tocOpen ? "Kapat" : "Aç"}</span>
            </div>
          </div>

          <div className={`toc-links${tocOpen ? " toc-links--open" : ""}`}>
            {post.sections.map((section, index) => {
              const id = sectionIds[index];
              return (
                <Link
                  href={`#${id}`}
                  className={activeSection === id ? "active" : ""}
                  onClick={() => setTocOpen(false)}
                  key={id}
                >
                  <b>{String(index + 1).padStart(2, "0")}</b> {section.title}
                </Link>
              );
            })}
          </div>

          <div className="toc-cta">
            <h4>Markanız için doğru stratejiyi birlikte oluşturalım.</h4>
            <Link href="/iletisim">Projenizi Konuşalım →</Link>
          </div>
        </aside>

        <div className="b-content">
          <div className="quote-box">
            <span>&ldquo;</span>
            <p>{post.quote}</p>
          </div>

          <p>{post.summary}</p>

          <div className="mini-cta">
            Yazının Bölümleri <span>●</span>
          </div>

          {post.sections.map((section, index) => (
            <section id={sectionIds[index]} key={sectionIds[index]}>
              <h2>
                <span>{String(index + 1).padStart(2, "0")}.</span> {section.title}
              </h2>
              <p>{section.body}</p>
            </section>
          ))}

          <div className="download-box">
            <h3>Bu konu hakkında markanıza özel bir yol haritası hazırlayalım.</h3>
            <Link href="/iletisim">Teklif Al →</Link>
          </div>

          <div className="author-card">
            <div className="avatar" />
            <div>
              <strong>{post.author}</strong>
              <small>{post.authorRole}</small>
              <p>
                Strateji, tasarım ve dijital pazarlama süreçlerinde markaların
                daha tutarlı ve ölçülebilir büyümesine odaklanır.
              </p>
            </div>
            <Link href="/iletisim">↗</Link>
          </div>
        </div>
      </div>

      <section className="related-section">
        <h2>
          Önerilen makaleler<span>.</span>
        </h2>

        <div className="related-grid">
          {relatedPosts.map((item) => (
            <article className="related-card" key={item.slug}>
              <Link href={`/blog/${item.slug}`} className="related-card-link">
                <div className="related-card-img-wrap">
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    decoding="async"
                  />
                  <span className="related-badge">
                    {item.category.toLocaleUpperCase("tr-TR")}
                  </span>
                </div>
                <div className="related-card-body">
                  <h3>{item.title}</h3>
                  <p>{item.summary}</p>
                  <div className="related-card-meta">
                    <div className="related-author-avatar" />
                    <div>
                      <strong>{item.author}</strong>
                      <small>{item.date}</small>
                    </div>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="bottom-cta">
        <div>
          <h2>
            Birlikte <span>harika işler</span>
            <br />
            üretelim.
          </h2>
          <p>
            Markanızı bir adım öteye taşıyacak yaratıcı çözümler için bize ulaşın.
          </p>
        </div>
        <Link href="/iletisim">Projenizi Konuşalım →</Link>
      </section>
    </main>
  );
}
