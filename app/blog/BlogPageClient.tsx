"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  LuBell,
  LuLayoutList,
  LuMail,
  LuShieldCheck,
  LuTrendingUp,
} from "react-icons/lu";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { subscribeToNewsletter } from "@/app/actions/newsletter";
import toast, { Toaster } from "react-hot-toast";
import "./blog.css";

type Post = {
  id: string
  slug: string
  title: string
  summary: string
  content: string
  category: string
  image: string
  readTime: string
  author: string
  authorRole: string
  date: string
}

const categories = (posts: Post[]) => [
  "Tümü",
  ...Array.from(new Set(posts.map((p) => p.category))),
];

function BlogSlider({ posts }: { posts: Post[] }) {
  const featuredPosts = posts.slice(0, 3);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [startX, setStartX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const nextSlide = () =>
    setCurrentSlide((prev) => (prev + 1) % featuredPosts.length);
  const prevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + featuredPosts.length) % featuredPosts.length);

  const onStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    setStartX("pageX" in e ? e.pageX : e.touches[0].clientX);
  };

  const onMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    if ("pageX" in e) e.preventDefault();
  };

  const onEnd = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    setIsDragging(false);
    const endX = "pageX" in e ? e.pageX : e.changedTouches[0].clientX;
    const diff = startX - endX;
    if (diff > 50) nextSlide();
    else if (diff < -50) prevSlide();
  };

  return (
    <div className="blog-slider-container">
      <div
        className="blog-slider-wrapper"
        style={{ cursor: "pointer", userSelect: "none", WebkitUserSelect: "none" }}
        onMouseDown={onStart}
        onMouseMove={onMove}
        onMouseUp={onEnd}
        onMouseLeave={onEnd}
        onTouchStart={onStart}
        onTouchMove={onMove}
        onTouchEnd={onEnd}
      >
        <div
          className="blog-slider-track"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {featuredPosts.map((post, index) => (
            <Link href={`/blog/${post.slug}`} key={post.slug} className="blog-slide">
              <div className="blog-slide-image-col">
                <img
                  src={post.image || "/assets/logos/bromak_kirmizi_logo.svg"}
                  alt={post.title}
                  draggable={false}
                  loading={index === 0 ? "eager" : "lazy"}
                  decoding="async"
                  fetchPriority={index === 0 ? "high" : "auto"}
                  style={{ pointerEvents: "none" }}
                  onError={(e) => { (e.target as HTMLImageElement).src = '/assets/logos/bromak_kirmizi_logo.svg' }}
                />
              </div>
              <div className="blog-slide-content-col">
                <div className="blog-slide-date">{post.date}</div>
                <h2 className="blog-slide-title">{post.title}</h2>
                <p className="blog-slide-desc">{post.summary}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="blog-slider-controls">
        <div className="blog-slider-dots">
          {featuredPosts.map((_, i) => (
            <button
              key={i}
              className={`blog-slider-dot ${i === currentSlide ? "active" : ""}`}
              onClick={() => setCurrentSlide(i)}
              aria-label={`${i + 1}. öne çıkan yazıya git`}
            />
          ))}
        </div>
        <div className="blog-slider-arrows">
          <button className="blog-slider-arrow" onClick={prevSlide} aria-label="Önceki">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button className="blog-slider-arrow" onClick={nextSlide} aria-label="Sonraki">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default function BlogPageClient({ posts }: { posts: Post[] }) {
  const [activeCategory, setActiveCategory] = useState("Tümü");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  // Bülten Form State
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Lütfen e-posta adresinizi girin.");
      return;
    }
    
    setIsLoading(true);
    const res = await subscribeToNewsletter(email);
    setIsLoading(false);
    
    if (res.success) {
      toast.success(res.message);
      setEmail("");
    } else {
      toast.error(res.message);
    }
  };

  const allCategories = categories(posts);
  const normalizedQuery = searchQuery.trim().toLocaleLowerCase("tr-TR");
  const visiblePosts = posts.filter((post) => {
    const matchesCategory =
      activeCategory === "Tümü" || post.category === activeCategory;
    const matchesSearch =
      !normalizedQuery ||
      `${post.title} ${post.summary} ${post.category}`
        .toLocaleLowerCase("tr-TR")
        .includes(normalizedQuery);

    return matchesCategory && matchesSearch;
  });

  const [visibleCount, setVisibleCount] = useState(12);

  // Kategori veya arama değiştiğinde sayfamayı sıfırla
  useEffect(() => {
    setVisibleCount(12);
  }, [activeCategory, searchQuery]);

  const displayedPosts = visiblePosts.slice(0, visibleCount);

  return (
    <>
      <Toaster position="top-right" />
      <Navbar />
      <main className="bromak-blog-page">
        <BlogSlider posts={posts} />

        <div className="blog-layout">
          <div className="blog-main">
            <div className="blog-filter-bar-new">
              <div className="bf-scroll-area">
                <div className="bf-links">
                  {allCategories.map((cat) => (
                    <button
                      key={cat}
                      className={`bf-link ${activeCategory === cat ? "active" : ""}`}
                      onClick={() => setActiveCategory(cat)}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
              <div className="bf-actions">
                {isSearchOpen ? (
                  <div className="bf-search-input-wrap">
                    <input
                      type="text"
                      placeholder="Ara..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      autoFocus
                    />
                    <button
                      className="bf-search-close"
                      onClick={() => {
                        setSearchQuery("");
                        setIsSearchOpen(false);
                      }}
                    >
                      ✕
                    </button>
                  </div>
                ) : (
                  <button className="bf-search-btn" onClick={() => setIsSearchOpen(true)} aria-label="Blogda ara">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="11" cy="11" r="8" />
                      <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                  </button>
                )}
              </div>
            </div>

            <div className="blog-grid">
              {displayedPosts.map((post) => (
                <Link href={`/blog/${post.slug}`} className="blog-card" key={post.slug}>
                  <div className="blog-card-img-wrap">
                    <img
                      src={post.image || "/assets/logos/bromak_kirmizi_logo.svg"}
                      alt={post.title}
                      loading="lazy"
                      decoding="async"
                      onError={(e) => { (e.target as HTMLImageElement).src = '/assets/logos/bromak_kirmizi_logo.svg' }}
                    />
                  </div>
                  <div className="blog-card-content">
                    <h3>{post.title}</h3>
                    <p>{post.summary}</p>
                    <small>{post.date}</small>
                  </div>
                </Link>
              ))}
            </div>

            {visiblePosts.length > visibleCount && (
              <div style={{ textAlign: "center", marginTop: "40px" }}>
                <button 
                  onClick={() => setVisibleCount(prev => prev + 12)}
                  className="works-primary-btn"
                  style={{ display: "inline-flex", cursor: "pointer", border: "none" }}
                >
                  <span>Daha Fazla Göster</span>
                </button>
              </div>
            )}

            {visiblePosts.length === 0 && (
              <p style={{ color: "#666", padding: "2rem 0" }}>
                Aramanızla eşleşen yazı bulunamadı.
              </p>
            )}
          </div>
        </div>
      </main>

      <section className="bromak-newsletter">
        <div className="bn-wrap">
          <div className="bn-card">
            <div className="bn-content">
              <div className="bn-eyebrow">
                <img
                  src="/assets/m.svg"
                  alt="Bromak"
                  className="bn-logo"
                  loading="lazy"
                  decoding="async"
                />
                <div className="bn-divider" />
                <span>Bromak Agency&apos;den içerik dozunuzu alın.</span>
              </div>

              <h2>
                İlham veren içerikler
                <br />
                bülteninizde<span>.</span>
              </h2>

              <p className="bn-desc">
                Ajans dünyasındaki gelişmeleri, strateji ipuçlarını ve trendleri
                ilk siz öğrenin.
              </p>

              <form className="bn-form" onSubmit={handleSubscribe}>
                <label className="bn-input">
                  <LuMail size={19} color="#888" />
                  <input 
                    type="email" 
                    placeholder="E-posta adresinizi yazın" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </label>
                <button type="submit" className="bn-btn" disabled={isLoading}>
                  {isLoading ? "Kaydediliyor..." : "Bültene Katıl  →"}
                </button>
              </form>

              <div className="bn-spam">
                <LuShieldCheck size={15} />
                <span>
                  Bültene kayıt olarak Gizlilik Politikası ve Çerez Kullanımını
                  kabul etmiş olursunuz.
                </span>
              </div>

              <div className="bn-plane">
                <img
                  src="/assets/paper-planed.svg"
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
