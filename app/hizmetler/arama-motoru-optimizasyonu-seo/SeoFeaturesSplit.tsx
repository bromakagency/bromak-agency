"use client";

import { useState } from "react";
import "./seo-sierra.css";

const FEATURES = [
  {
    id: "audit",
    icon: "🔍",
    title: "Derinlemesine Teknik Denetim",
    desc: "Sitenizin Google botları tarafından kolayca taranmasını engelleyen tüm teknik sorunları (Hız, Yönlendirmeler, Etiketler) tespit edip kökünden çözeriz."
  },
  {
    id: "content",
    icon: "📝",
    title: "Semantik İçerik Ağı",
    desc: "Sadece anahtar kelime doldurmak yerine, kullanıcıların arama niyetini anlayan ve onlara en doğru cevabı sunan otorite içerikleri kurgularız."
  },
  {
    id: "backlink",
    icon: "🔗",
    title: "Kaliteli ve Doğal Backlink",
    desc: "Sektörünüzle alakalı, Google gözünde gerçekten değeri olan premium mecralardan referans (backlink) alarak domain otoritenizi yükseltiriz."
  }
];

export default function SeoFeaturesSplit() {
  const [activeFeature, setActiveFeature] = useState(FEATURES[0].id);

  return (
    <section className="sierra-split-section">
      <div className="sierra-split-inner">
        <div className="sierra-split-header">
          <h2>Kalıcı ve sürdürülebilir büyüme</h2>
          <p>
            Google algoritmalarını kandırmaya çalışmaz, doğrudan kullanıcılara 
            ve arama motorlarına değer katan sağlam bir temel inşa ederiz.
          </p>
        </div>

        <div className="sierra-split-grid">
          {/* LEFT: Sticky List */}
          <div className="sierra-split-list">
            {FEATURES.map((feature) => (
              <div 
                key={feature.id}
                className={`sierra-feature-item ${activeFeature === feature.id ? "active" : ""}`}
                onClick={() => setActiveFeature(feature.id)}
              >
                <div className="feature-icon">{feature.icon}</div>
                <div className="feature-text">
                  <h3>{feature.title}</h3>
                  <p>{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT: Visual Area */}
          <div className="sierra-split-visual">
            <div className="visual-card-wrapper">
              <div className={`visual-card ${activeFeature === "audit" ? "show" : ""}`}>
                <div className="mock-code">
                  <div className="mock-dot-group">
                    <span className="dot red"></span>
                    <span className="dot yellow"></span>
                    <span className="dot green"></span>
                  </div>
                  <div className="mock-lines">
                    <div className="m-line w-80"></div>
                    <div className="m-line w-60"></div>
                    <div className="m-line w-90"></div>
                    <div className="m-line w-40"></div>
                    <div className="m-line w-70"></div>
                  </div>
                  <div className="mock-score">
                    <span>Performance:</span>
                    <strong>100</strong>
                  </div>
                </div>
              </div>

              <div className={`visual-card ${activeFeature === "content" ? "show" : ""}`}>
                <div className="mock-article">
                  <div className="m-title"></div>
                  <div className="m-text-line"></div>
                  <div className="m-text-line"></div>
                  <div className="m-text-line w-50"></div>
                  <div className="m-image"></div>
                  <div className="m-text-line"></div>
                  <div className="m-text-line w-80"></div>
                </div>
              </div>

              <div className={`visual-card ${activeFeature === "backlink" ? "show" : ""}`}>
                <div className="mock-network">
                  <div className="net-node main-node">SİZ</div>
                  <div className="net-node sub-node n1">Haber</div>
                  <div className="net-node sub-node n2">Blog</div>
                  <div className="net-node sub-node n3">Otorite</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
