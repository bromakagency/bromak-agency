"use client";

import "./seo-sierra.css";

export default function SeoTestimonial() {
  return (
    <section className="sierra-test-section">
      <div className="sierra-test-inner">
        <div className="sierra-test-card">
          <div className="test-avatar">
            <img loading="lazy" decoding="async" src="/images/essen-markasi.png" alt="Müşteri Logosu" />
          </div>
          <div className="test-content">
            <div className="test-quote-icon">“</div>
            <blockquote>
              Bromak ile çalışmaya başlamadan önce reklamlara devasa bütçeler harcıyorduk. 
              Sadece 6 ay içerisinde SEO stratejileri sayesinde organik trafiğimiz 4 katına çıktı. 
              Artık müşteri edinme maliyetimiz (CAC) inanılmaz düştü ve en kaliteli müşteriler 
              bizi doğrudan Google'da bularak ulaşıyor. Bu, şirketimiz için tam bir dönüm noktası oldu.
            </blockquote>
            <div className="test-author">
              <strong>Ahmet Yılmaz</strong>
              <span>E-Ticaret Direktörü, Essen Markası</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
