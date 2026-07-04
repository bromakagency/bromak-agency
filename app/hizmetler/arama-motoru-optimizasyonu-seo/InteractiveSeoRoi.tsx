"use client";

import { useState } from "react";
import "./seo-roi.css";

export default function InteractiveSeoRoi() {
  // Tab State
  const [activeTab, setActiveTab] = useState<"savings" | "ranking">("savings");

  // Savings State
  const [traffic, setTraffic] = useState(15000);
  const [cpc, setCpc] = useState(4.5);
  const totalSavings = Math.floor(traffic * cpc);

  // Ranking State
  const [volume, setVolume] = useState(50000);
  const rank1Traffic = Math.floor(volume * 0.317); // ~31.7% CTR
  const rank3Traffic = Math.floor(volume * 0.10);  // ~10% CTR
  const rank5Traffic = Math.floor(volume * 0.04);  // ~4% CTR

  return (
    <section className="seo-roi-section">
      <div className="seo-roi-inner">
        <div className="seo-roi-heading">
          <span>ETKİLEŞİMLİ SEO ARAÇLARI</span>
          <h2>SEO'nun gücünü rakamlarla görün.</h2>
          <p>Organik trafiğin markanıza sağladığı net tasarrufu ve 1. sırada olmanın yaratacağı farkı simüle edin.</p>
        </div>

        <div className="seo-roi-box">
          <div className="seo-roi-tabs">
            <button 
              className={`roi-tab ${activeTab === "savings" ? "active" : ""}`}
              onClick={() => setActiveTab("savings")}
            >
              Organik Trafik Tasarrufu
            </button>
            <button 
              className={`roi-tab ${activeTab === "ranking" ? "active" : ""}`}
              onClick={() => setActiveTab("ranking")}
            >
              Sıralama (ROI) Simülatörü
            </button>
          </div>

          {activeTab === "savings" && (
            <div className="roi-calculator">
              <div className="roi-sliders">
                <div className="slider-group">
                  <div className="slider-label">
                    <strong>Hedef Aylık Organik Trafik</strong>
                    <span>{traffic.toLocaleString("tr-TR")} Ziyaretçi</span>
                  </div>
                  <input
                    type="range"
                    min="1000"
                    max="100000"
                    step="1000"
                    value={traffic}
                    onChange={(e) => setTraffic(Number(e.target.value))}
                    className="seo-slider"
                  />
                </div>

                <div className="slider-group">
                  <div className="slider-label">
                    <strong>Sektörünüzün Ortalama TBM'si (Reklam Tıklama Maliyeti)</strong>
                    <span>₺{cpc.toFixed(1)}</span>
                  </div>
                  <input
                    type="range"
                    min="0.5"
                    max="25"
                    step="0.5"
                    value={cpc}
                    onChange={(e) => setCpc(Number(e.target.value))}
                    className="seo-slider"
                  />
                </div>
              </div>

              <div className="roi-result-card">
                <div className="result-header">
                  Eğer bu trafiği Google Ads (Reklam) ile alsaydınız ödeyeceğiniz aylık tutar:
                </div>
                <div className="result-amount gradient-text">
                  ₺{totalSavings.toLocaleString("tr-TR")}
                </div>
                <div className="result-footer">
                  SEO ile bu trafik için Google'a <strong>hiçbir tıklama maliyeti ödemezsiniz.</strong> Bu sizin net tasarrufunuzdur.
                </div>
              </div>
            </div>
          )}

          {activeTab === "ranking" && (
            <div className="roi-calculator">
              <div className="slider-group mb-40">
                <div className="slider-label">
                  <strong>Hedef Kelimenin Aylık Aranma Hacmi</strong>
                  <span>{volume.toLocaleString("tr-TR")} Arama</span>
                </div>
                <input
                  type="range"
                  min="5000"
                  max="500000"
                  step="5000"
                  value={volume}
                  onChange={(e) => setVolume(Number(e.target.value))}
                  className="seo-slider"
                />
              </div>

              <div className="ranking-bars-container">
                <div className="ranking-bar-item">
                  <div className="bar-info">
                    <span className="rank-badge rank-5">Google 5. Sıra</span>
                    <strong>{rank5Traffic.toLocaleString("tr-TR")} Tıklama</strong>
                  </div>
                  <div className="bar-track">
                    <div className="bar-fill fill-5" style={{ width: '15%' }}></div>
                  </div>
                </div>

                <div className="ranking-bar-item">
                  <div className="bar-info">
                    <span className="rank-badge rank-3">Google 3. Sıra</span>
                    <strong>{rank3Traffic.toLocaleString("tr-TR")} Tıklama</strong>
                  </div>
                  <div className="bar-track">
                    <div className="bar-fill fill-3" style={{ width: '35%' }}></div>
                  </div>
                </div>

                <div className="ranking-bar-item">
                  <div className="bar-info">
                    <span className="rank-badge rank-1">Google 1. Sıra</span>
                    <strong className="gradient-text">{rank1Traffic.toLocaleString("tr-TR")} Tıklama</strong>
                  </div>
                  <div className="bar-track">
                    <div className="bar-fill fill-1" style={{ width: '100%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
