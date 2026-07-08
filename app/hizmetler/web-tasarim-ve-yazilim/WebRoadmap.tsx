"use client";

import { useEffect, useRef } from "react";
import "../arama-motoru-optimizasyonu-seo/seo-components.css";

const STEPS = [
  {
    month: "1. Keşif",
    title: "Strateji ve Planlama",
    desc: "Hedef kitlenizi ve rakiplerinizi analiz ederek, dijitalde nasıl bir duruş sergilemeniz gerektiğini planlıyoruz."
  },
  {
    month: "2. Tasarım",
    title: "UI/UX Tasarım",
    desc: "Hazır şablonlar kullanmıyoruz. Markanıza özel, kullanıcı deneyimi yüksek ve dönüşüm odaklı benzersiz arayüzler tasarlıyoruz."
  },
  {
    month: "3. Geliştirme",
    title: "Özel Yazılım ve Kodlama",
    desc: "Modern web teknolojileriyle (Next.js, React) saniyeden kısa sürede açılan, Google Core Web Vitals metriklerinde kusursuz puanlar alan siteler geliştiriyoruz."
  },
  {
    month: "4. Lansman",
    title: "SEO Uyumu",
    desc: "Sitelerimiz sadece güzel görünmekle kalmaz; en başından itibaren arama motoru dostu bir mimariyle (Semantic HTML, Schema Markup) kodlanır."
  }
];

export default function WebRoadmap() {
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
    <section className="seo-roadmap-section" style={{ background: "transparent" }}>
      <div className="seo-roadmap-inner">
        <div className="seo-roadmap-heading">
          <span>PROJE SÜRECİ</span>
          <h2>Kurumsal Web Tasarım Sürecimiz.</h2>
          <p>Fikirden yayına kadar şeffaf ve planlı bir şekilde ilerliyoruz.</p>
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
