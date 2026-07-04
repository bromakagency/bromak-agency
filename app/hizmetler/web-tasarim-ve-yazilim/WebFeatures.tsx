"use client";

import { useState } from "react";
import "./web-features.css";

const ADMIN_TABS = [
  { label: "Dashboard", image: "/images/dies-markasi-2.png" },
  { label: "İçerikler", image: "/images/dies-markasi-1.png" },
  { label: "Ürünler", image: "/images/essen-markasi.png" },
  { label: "Ayarlar", image: "/images/essen-markasi-3.png" },
];

export default function WebFeatures() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section className="web-features-section">
      <div className="web-features-container">
        
        {/* Feature 1: Image Left, Text Right */}
        <div className="feature-row">
          <div className="feature-visual left-visual">
            <div className="visual-bg">
              <img src="/images/dies-markasi.png" alt="UI UX Tasarım" loading="lazy" decoding="async" />
            </div>
            <div className="floating-card float-right">
              <div className="fc-header">
                <div className="fc-dot red"></div>
                <div className="fc-dot yellow"></div>
                <div className="fc-dot green"></div>
              </div>
              <div className="fc-body">
                <div className="fc-line title"></div>
                <div className="fc-line"></div>
                <div className="fc-line short"></div>
                <div className="fc-button"></div>
              </div>
            </div>
          </div>
          <div className="feature-content">
            <h2>Kusursuz Kullanıcı Deneyimi (UI/UX)</h2>
            <p>
              Müşterilerinizin sitenizde kaybolmasına izin vermeyin. Modern, sezgisel ve dönüşüm odaklı arayüzlerle, ziyaretçilerinizi sadık müşterilere dönüştüren akıcı dijital deneyimler tasarlıyoruz.
            </p>
            <a href="#iletisim" className="feature-outline-btn">Tasarım sürecimizi incele</a>
          </div>
        </div>

        {/* Feature 2: Text Left, Image Right */}
        <div className="feature-row reverse">
          <div className="feature-content">
            <h2>Işık Hızında, SEO Dostu Altyapı</h2>
            <p>
              Güzel görünen ama yavaş açılan bir site size sadece para kaybettirir. En güncel teknolojilerle (Next.js, React) saniyeden kısa sürede yüklenen ve arama motorlarında üst sıralara çıkan kusursuz kodlar yazıyoruz.
            </p>
            <a href="#iletisim" className="feature-outline-btn">Teknoloji yığınımızı gör</a>
          </div>
          <div className="feature-visual right-visual">
            <div className="visual-bg">
              <img src="/images/essen-markasi.png" alt="SEO ve Hız" loading="lazy" decoding="async" />
            </div>
            <div className="floating-card float-left performance-card">
              <div className="perf-item">
                <div className="perf-circle">100</div>
                <span>Performans</span>
              </div>
              <div className="perf-item">
                <div className="perf-circle">100</div>
                <span>SEO</span>
              </div>
            </div>
          </div>
        </div>

        {/* Feature 3: Image Left, Text Right */}
        <div className="feature-row">
          <div className="feature-visual left-visual">
            <div className="visual-bg">
              <img
                src={ADMIN_TABS[activeTab].image}
                alt="Yönetim Paneli Görünümü"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="floating-card float-bottom">
              <div className="admin-menu">
                {ADMIN_TABS.map((tab, index) => (
                  <div 
                    key={index} 
                    className={`admin-item ${activeTab === index ? 'active' : ''}`}
                    onClick={() => setActiveTab(index)}
                  >
                    {tab.label}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="feature-content">
            <h2>Size Özel, Özgür Yönetim Paneli</h2>
            <p>
              Sitenizi güncellemek için ajanslara veya yazılımcılara bağımlı kalmayın. Tamamen size ve işletmenize özel geliştirdiğimiz, kullanımı son derece kolay yönetim paneli ile tüm ipler sizin elinizde.
            </p>
            <a href="#iletisim" className="feature-outline-btn">Panel demosunu talep et</a>
          </div>
        </div>

      </div>
    </section>
  );
}
