"use client";

import "./web-tasarim.css";

export default function WebHero() {
  return (
    <section className="web-hero-section">
      <div className="web-hero-bg-glow"></div>
      
      <div className="web-hero-grid">
        <div className="web-hero-text">
          <h1>
            Kusursuz Kod.<br />
            <strong>Sıfır Sınır.</strong>
          </h1>
          <p>
            Hem masaüstünde hem mobilde piksel mükemmelliğinde, saniyeden kısa sürede açılan modern web deneyimleri tasarlıyor ve kodluyoruz.
          </p>
          <div style={{ display: "flex", gap: "16px" }}>
            <a href="#iletisim" className="cases-read-btn" style={{ margin: 0, background: "#fff", color: "#000", border: "none" }}>Projemi Başlat</a>
          </div>
        </div>

        <div className="web-hero-visual">
          <div className="browser-mockup">
            <div className="browser-header">
              <div className="browser-dot red"></div>
              <div className="browser-dot yellow"></div>
              <div className="browser-dot green"></div>
            </div>
            <div className="browser-content"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
