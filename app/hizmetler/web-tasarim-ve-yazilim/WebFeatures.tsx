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
            <h2>Neden Bromak Web Tasarım Ajansı?</h2>
            <p>
              Aynı anda yüzlerce iş almıyoruz. Sınırlı sayıda proje alarak markanıza hak ettiği kaliteyi sağlıyoruz. Hazır şablonlar kullanmıyoruz; Konya merkezli butik ajansımızdan global standartlarda, tamamen markanıza özel (UI/UX) ve dönüşüm odaklı kurumsal web siteleri tasarlıyoruz.
            </p>
            <a href="#iletisim" className="feature-outline-btn">Tasarım sürecimizi incele</a>
          </div>
        </div>

        {/* Feature 2: Text Left, Image Right */}
        <div className="feature-row reverse">
          <div className="feature-content">
            <h2>Performans, Hız ve SEO Uyumu</h2>
            <p>
              Güzel görünen ama yavaş açılan bir site size müşteri kaybettirir. En güncel teknolojilerle saniyeden kısa sürede yüklenen ve arama motorlarında üst sıralara çıkan SEO uyumlu web siteleri kodluyoruz. Hantal altyapılardan uzak, 2026 standartlarına uygun bir hız sunuyoruz.
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
            <h2>Teknik Bilgi Gerektirmeyen Yönetilebilir Altyapı</h2>
            <p>
              Web sitenizi teslim aldıktan sonra, teknik bilgiye ihtiyaç duymadan yazı, fotoğraf ve ürünlerinizi kolayca güncelleyebileceğiniz size özel yönetim panelleri sunuyoruz. Sitenizi tamamen özgürce, kimseye bağlı kalmadan yönetin.
            </p>
            <a href="#iletisim" className="feature-outline-btn">Hemen iletişime geçin</a>
          </div>
        </div>

      </div>
    </section>
  );
}
