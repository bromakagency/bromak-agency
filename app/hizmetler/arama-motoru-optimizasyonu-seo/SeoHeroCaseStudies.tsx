"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import "./seo-sierra.css";

const CASES = [
  {
    id: 0,
    logo: "/assets/logos/bromak_beyaz_logo.svg",
    title: "Essen Markası organik trafiğini veri odaklı SEO stratejimizle nasıl 4'e katladı?",
    metrics: [
      { value: "4x", label: "Organik Trafik Artışı" },
      { value: "%340", label: "Daha Yüksek Satış" }
    ],
    image: "/images/essen-markasi.png",
    blob1: "#e30613", // Brand Red
    blob2: "#800000", // Dark Red
    slug: "essen-organik-trafik-buyumesi"
  },
  {
    id: 1,
    logo: "/assets/logos/bromak_beyaz_logo.svg",
    title: "Yerel bir kliniğin haritalarda zirveye oturarak randevularını patlatma hikayesi.",
    metrics: [
      { value: "#1", label: "Google Haritalar" },
      { value: "+200%", label: "Randevu Artışı" }
    ],
    image: "/images/dies-markasi.png",
    blob1: "#cc0000", 
    blob2: "#4d0000",
    slug: "klinik-harita-optimizasyonu"
  },
  {
    id: 2,
    logo: "/assets/logos/bromak_beyaz_logo.svg",
    title: "B2B SaaS firmasının semantik içeriklerle global rakiplerini geride bırakması.",
    metrics: [
      { value: "1.2M", label: "Aylık Gösterim" },
      { value: "Top 3", label: "40+ Hedef Kelime" }
    ],
    image: "/images/essen-markasi-4.png",
    blob1: "#a30000",
    blob2: "#ff3333",
    slug: "saas-global-seo-basarisi"
  }
];

export default function SeoHeroCaseStudies({ variant = "contained", stories = [] }: { variant?: "full" | "contained", stories?: any[] }) {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const activeStories = stories.length > 0 ? stories.map(s => ({
    ...s,
    image: s.coverImage,
    blob1: s.color1,
    blob2: s.color2,
    metrics: s.metricsJson ? JSON.parse(s.metricsJson) : []
  })) : CASES;

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    setStartX(clientX);
  };

  const handleDragEnd = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    setIsDragging(false);
    
    const clientX = 'changedTouches' in e ? e.changedTouches[0].clientX : (e as React.MouseEvent).clientX;
    const diff = startX - clientX;
    
    if (diff > 50) {
      setActiveSlide(prev => (prev === activeStories.length - 1 ? 0 : prev + 1));
    } else if (diff < -50) {
      setActiveSlide(prev => (prev === 0 ? activeStories.length - 1 : prev - 1));
    }
  };

  if (!isClient) return null;

  const activeData = activeStories[activeSlide];

  return (
    <section className={`sierra-hero-cases-section ${variant}`}>
      <div 
        className={`sierra-hero-cases-inner ${variant} ${isDragging ? 'grabbing' : 'grab'}`}
        onMouseDown={handleDragStart}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        onTouchStart={handleDragStart}
        onTouchEnd={handleDragEnd}
      >
        {/* Dynamic Blurred Background */}
        <div className="cases-bg-wrapper" style={{ '--b1': activeData.blob1, '--b2': activeData.blob2 } as React.CSSProperties}>
          <div className="cases-bg-blob blob-1" />
          <div className="cases-bg-blob blob-2" />
          <div className="cases-bg-noise"></div>
        </div>

        <div className="cases-content-grid">
          {/* Left: Text & Metrics */}
          <div className="cases-text-col">
            <div className="cases-logo">
              <img loading="lazy" decoding="async" src={activeData.logo} alt="Bromak Vaka Analizi" draggable="false" />
            </div>
            
            <h2 key={`title-${activeSlide}`} className="cases-title animate-fade-up">
              {activeData.title}
            </h2>
            
            <Link href={`/basari-hikayeleri/${activeData.slug}`} className="cases-read-btn">
              Vakayı incele
            </Link>

            <div className="cases-metrics">
              {activeData.metrics.map((metric: any, idx: number) => (
                <div key={`metric-${activeSlide}-${idx}`} className="metric-item animate-fade-up" style={{ animationDelay: `${idx * 0.1}s` }}>
                  <strong>{metric.value}</strong>
                  <span>{metric.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Image */}
          <div className="cases-image-col">
            <div key={`img-${activeSlide}`} className="cases-image-wrapper animate-fade-in">
              <img loading="lazy" decoding="async" src={activeData.image} alt={activeData.title} />
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="cases-controls">
          <div className="cases-dots">
            {activeStories.map((c, i) => (
              <button 
                key={i} 
                onClick={() => setActiveSlide(i)}
                className={`dot-btn ${i === activeSlide ? "active" : ""}`}
                aria-label={`Slayt ${i + 1}`}
              />
            ))}
          </div>
          
          <div className="cases-arrows">
            <button 
              onClick={() => setActiveSlide(prev => (prev === 0 ? activeStories.length - 1 : prev - 1))}
              className="arrow-btn"
              aria-label="Önceki Slayt"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button 
              onClick={() => setActiveSlide(prev => (prev === activeStories.length - 1 ? 0 : prev + 1))}
              className="arrow-btn"
              aria-label="Sonraki Slayt"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
