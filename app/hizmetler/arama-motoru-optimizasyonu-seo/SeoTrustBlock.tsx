"use client";

import "./seo-sierra.css";

export default function SeoTrustBlock() {
  return (
    <section className="sierra-trust-section">
      <div className="sierra-trust-inner">
        <div className="sierra-trust-header">
          <h2>Güven ve Kalite Standardı</h2>
          <p>
            Sitenizi riske atacak hiçbir "sihirli" yönteme veya spam taktiklere başvurmuyoruz. 
            Google'ın resmi kalite yönergelerine %100 uyumlu, White-Hat stratejilerle çalışıyoruz.
          </p>
        </div>

        <div className="sierra-trust-grid">
          <div className="trust-card dark-card">
            <div className="trust-card-content">
              <h3>%100 White-Hat SEO</h3>
              <p>
                Sadece arama motorlarının sevdiği, doğal ve temiz teknikler.
                Sitenizin geleceğini "spam" algoritmalarıyla tehlikeye atmıyoruz.
              </p>
            </div>
            <div className="trust-visual white-hat-visual">
              <div className="shield-icon">🛡️</div>
            </div>
          </div>

          <div className="trust-card light-card">
            <div className="trust-card-content">
              <h3>Core Update Koruması</h3>
              <p>
                Google'ın büyük algoritma güncellemelerine karşı dirençli,
                dalgalanmalardan minimum etkilenen sağlam bir site otoritesi.
              </p>
            </div>
            <div className="trust-visual update-visual">
              <div className="wave-line"></div>
              <div className="wave-line offset"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
