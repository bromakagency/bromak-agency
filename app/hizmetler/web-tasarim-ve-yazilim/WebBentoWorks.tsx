"use client";

import Link from "next/link";
import Image from "next/image";
import "./web-bento-works.css";

export default function WebBentoWorks({ works = [] }: { works?: any[] }) {
  if (!works || works.length === 0) return null;

  return (
    <section className="web-bento-works-section">
      <div className="web-bento-works-header">
        <h2>Seçili İşlerimiz</h2>
        <p>Milyonlarca kullanıcıya hizmet veren, performans odaklı dijital ürünler.</p>
      </div>

      <div className="bento-works-grid">
        {works.map((item, index) => (
          <Link href={`/isler/${item.slug}`} className={`bento-work-card work-${index + 1}`} key={index}>
            <Image
              src={item.coverImage?.startsWith('http') || item.coverImage?.startsWith('/') ? item.coverImage : `/images/${item.coverImage}`}
              alt={item.title}
              className="work-bg"
              loading="lazy"
              decoding="async"
              fill
              style={{ objectFit: 'cover' }}
            />
            <div className="work-overlay">
              <h3 className="work-brand">{item.title}</h3>
            </div>
          </Link>
        ))}
      </div>

      <div className="bento-works-action">
        <Link href="/isler" className="works-primary-btn">
          <span>Tüm İşleri İncele</span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Link>
      </div>
    </section>
  );
}
