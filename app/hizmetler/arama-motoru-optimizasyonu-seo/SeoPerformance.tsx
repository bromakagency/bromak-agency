"use client";

import "./seo-components.css";

export default function SeoPerformance() {
  return (
    <section className="seo-performance-section">
      <div className="seo-performance-inner">
        <div className="seo-performance-heading">
          <span>ETKİSİ KANITLANMIŞ SONUÇLAR</span>
          <h2>Öncesi ve Sonrası.</h2>
          <p>Sadece trafiği değil, sitenizin genel sağlığını ve kullanıcı deneyimini de dönüştürüyoruz.</p>
        </div>

        <div className="performance-comparison">
          {/* BEFORE CARD */}
          <div className="perf-card before-card">
            <div className="perf-card-header">
              <span className="perf-badge badge-red">BİZDEN ÖNCE</span>
            </div>
            
            <div className="perf-metrics">
              <div className="perf-metric">
                <div className="metric-label">Site Açılış Hızı</div>
                <div className="metric-value text-red">8.5sn <span>❌</span></div>
                <div className="metric-bar"><div className="fill fill-red" style={{width: '20%'}}></div></div>
              </div>
              
              <div className="perf-metric">
                <div className="metric-label">SEO Sağlık Skoru</div>
                <div className="metric-value text-red">%42 <span>⚠️</span></div>
                <div className="metric-bar"><div className="fill fill-orange" style={{width: '42%'}}></div></div>
              </div>

              <div className="perf-metric">
                <div className="metric-label">Mobil Uyumluluk (Core Web Vitals)</div>
                <div className="metric-value text-red">Zayıf <span>📱</span></div>
              </div>
            </div>
          </div>

          {/* AFTER CARD */}
          <div className="perf-card after-card">
            <div className="perf-card-header">
              <span className="perf-badge badge-green">BİZDEN SONRA</span>
            </div>
            
            <div className="perf-metrics">
              <div className="perf-metric">
                <div className="metric-label">Site Açılış Hızı</div>
                <div className="metric-value text-green">1.2sn <span>🚀</span></div>
                <div className="metric-bar"><div className="fill fill-green" style={{width: '95%'}}></div></div>
              </div>
              
              <div className="perf-metric">
                <div className="metric-label">SEO Sağlık Skoru</div>
                <div className="metric-value text-green">%98 <span>✅</span></div>
                <div className="metric-bar"><div className="fill fill-green" style={{width: '98%'}}></div></div>
              </div>

              <div className="perf-metric">
                <div className="metric-label">Mobil Uyumluluk (Core Web Vitals)</div>
                <div className="metric-value text-green">Kusursuz <span>📱</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
