"use client";

import { useState } from "react";

export default function InteractiveRoasCalc() {
  const [budget, setBudget] = useState(25000);
  const [mode, setMode] = useState<"ecommerce" | "lead">("ecommerce");

  // E-Ticaret (E-commerce) Simulation
  const ecomRoas = 6.8;
  const ecomCpc = 3.5;
  const ecomCr = 0.025; // 2.5%

  const ecomClicks = Math.floor(budget / ecomCpc);
  const ecomSales = Math.floor(ecomClicks * ecomCr);
  const ecomRevenue = Math.floor(budget * ecomRoas);

  // Hizmet / B2B (Lead) Simulation
  const leadCpc = 5.5; // Hizmet sektörü tıklama maliyetleri genelde daha yüksektir
  const leadCr = 0.045; // %4.5 form doldurma oranı
  
  const leadClicks = Math.floor(budget / leadCpc);
  const totalLeads = Math.floor(leadClicks * leadCr);
  const costPerLead = totalLeads > 0 ? Math.floor(budget / totalLeads) : 0;

  return (
    <section className="roas-calculator-section">
      <div className="roas-calc-inner">
        <div className="roas-calc-heading">
          <span>ETKİLEŞİMLİ SİMÜLASYON</span>
          <h2>Reklam bütçeniz ne kadar kazandırır?</h2>
          <p>Sektörünüze ve hedefinize uygun projeksiyonu görmek için geçiş yapın.</p>
        </div>

        <div className="roas-calc-box">
          <div className="roas-calc-tabs">
            <button 
              className={`calc-tab ${mode === "ecommerce" ? "active" : ""}`}
              onClick={() => setMode("ecommerce")}
            >
              E-Ticaret (Satış)
            </button>
            <button 
              className={`calc-tab ${mode === "lead" ? "active" : ""}`}
              onClick={() => setMode("lead")}
            >
              Hizmet / B2B (Talep)
            </button>
          </div>

          <div className="roas-calc-slider-area">
            <div className="slider-label">
              <strong>Aylık Reklam Bütçesi</strong>
              <span>₺{budget.toLocaleString("tr-TR")}</span>
            </div>
            <input
              type="range"
              min="5000"
              max="200000"
              step="5000"
              value={budget}
              onChange={(e) => setBudget(Number(e.target.value))}
              className="budget-slider"
            />
            <div className="slider-marks">
              <span>₺5B</span>
              <span>₺200B+</span>
            </div>
          </div>

          {mode === "ecommerce" ? (
            <div className="roas-calc-results">
              <div className="result-item">
                <small>Tahmini Tıklama</small>
                <strong>{ecomClicks.toLocaleString("tr-TR")}</strong>
              </div>
              <div className="result-item">
                <small>Aylık Toplam Sipariş</small>
                <strong>{ecomSales.toLocaleString("tr-TR")}</strong>
              </div>
              <div className="result-item highlight">
                <small>Beklenen Ciro (ROAS: {ecomRoas}x)</small>
                <strong className="gradient-text">₺{ecomRevenue.toLocaleString("tr-TR")}</strong>
              </div>
            </div>
          ) : (
            <div className="roas-calc-results">
              <div className="result-item">
                <small>Tahmini Tıklama</small>
                <strong>{leadClicks.toLocaleString("tr-TR")}</strong>
              </div>
              <div className="result-item">
                <small>Talep Başı Maliyet (CPL)</small>
                <strong>₺{costPerLead.toLocaleString("tr-TR")}</strong>
              </div>
              <div className="result-item highlight">
                <small>Potansiyel Müşteri (Lead)</small>
                <strong className="gradient-text">{totalLeads.toLocaleString("tr-TR")} Form</strong>
              </div>
            </div>
          )}

          <div className="roas-disclaimer">
            * Yukarıdaki değerler Türkiye ortalamalarına dayanarak oluşturulmuş tahmini (projeksiyon) rakamlardır. Kesin sonuçlar markanızın konumuna, web sitenizin hızına ve kampanya optimizasyonlarımıza göre değişiklik gösterebilir.
          </div>
        </div>
      </div>
    </section>
  );
}
