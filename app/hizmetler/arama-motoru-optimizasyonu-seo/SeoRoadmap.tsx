"use client";

import { useEffect, useRef } from "react";
import "./seo-components.css";

const STEPS = [
  {
    month: "1. Ay",
    title: "Kapsamlı Denetim & Teknik Altyapı",
    desc: "Sitenizin arama motorları tarafından kusursuz taranabilmesi için tüm teknik hatalar (Hız, Mobil Uyumluluk, Tarama Hataları) giderilir."
  },
  {
    month: "2. Ay",
    title: "İçerik Stratejisi & Optimizasyon",
    desc: "Müşterilerinizin arama niyetine uygun anahtar kelimeler belirlenir ve site içi içerik hiyerarşisi yeniden kurgulanır."
  },
  {
    month: "3. Ay",
    title: "Otorite İnşası & Backlink",
    desc: "Sektörünüzle alakalı, yüksek otoriteli güvenilir sitelerden referanslar alınarak domain gücünüz artırılır."
  },
  {
    month: "6. Ay ve Sonrası",
    title: "Sürdürülebilir Büyüme & Zirve",
    desc: "Sıralamalar oturur, organik trafik ivmelenir ve sürekli optimizasyonlarla rekabette kalıcı üstünlük sağlanır."
  }
];

export default function SeoRoadmap() {
  const roadmapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
          }
        });
      },
      { threshold: 0.2 }
    );

    const items = roadmapRef.current?.querySelectorAll(".roadmap-item");
    items?.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="seo-roadmap-section">
      <div className="seo-roadmap-inner">
        <div className="seo-roadmap-heading">
          <span>BAŞARI YOLCULUĞU</span>
          <h2>SEO'da kalıcı başarı zaman ister.</h2>
          <p>Şeffaf ve ölçülebilir adımlarla zirveye giden yol haritamız.</p>
        </div>

        <div className="roadmap-container" ref={roadmapRef}>
          <div className="roadmap-line"></div>
          {STEPS.map((step, index) => (
            <div key={index} className="roadmap-item">
              <div className="roadmap-dot"></div>
              <div className="roadmap-content">
                <span className="roadmap-month">{step.month}</span>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
