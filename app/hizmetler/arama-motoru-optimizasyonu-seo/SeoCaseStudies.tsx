"use client";

import "./seo-sierra.css";

const CASES = [
  {
    tag: "E-Ticaret",
    title: "Aylık 2.5M Organik Trafik Sırrı",
    desc: "Sektör lideri bir e-ticaret markasının SEO stratejisi ile organik trafiğini %340 artırmasının hikayesi.",
    img: "/images/essen-markasi.png"
  },
  {
    tag: "Yerel İşletme",
    title: "Haritalarda Zirveye Yerleşmek",
    desc: "Bölgesel hizmet veren bir kliniğin, Google Haritalar optimizasyonu ile randevularını %200 artırması.",
    img: "/images/dies-markasi.png"
  },
  {
    tag: "B2B Yazılım",
    title: "Global Pazarda Otorite",
    desc: "Bir SaaS firmasının, semantik blog içerikleriyle global rakiplerini geride bırakıp 1. sıraya oturması.",
    img: "/images/essen-markasi-4.png"
  }
];

export default function SeoCaseStudies() {
  return (
    <section className="sierra-cases-section">
      <div className="sierra-cases-inner">
        <div className="sierra-cases-header">
          <h2>Gerçek başarı hikayeleri</h2>
          <p>
            SEO'nun sadece teorik bir kavram olmadığını, işletmelere nasıl 
            doğrudan ciro ve büyüme sağladığını inceleyin.
          </p>
        </div>

        <div className="sierra-cases-grid">
          {CASES.map((item, i) => (
            <div key={i} className="case-card">
              <div className="case-image">
                <img loading="lazy" decoding="async" src={item.img} alt={item.title} />
                <span className="case-tag">{item.tag}</span>
              </div>
              <div className="case-content">
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
                <button className="case-btn">Vakayı İncele <span>→</span></button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
