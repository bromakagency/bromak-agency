"use client";

import { useEffect, useRef } from "react";
import "../arama-motoru-optimizasyonu-seo/seo-components.css";

const STEPS = [
  {
    month: "1. Keşif",
    title: "Analiz & Strateji",
    desc: "İhtiyaçlarınızı dinliyor, hedef kitlenizi ve rakiplerinizi analiz ederek projeye en uygun teknolojik altyapıyı belirliyoruz."
  },
  {
    month: "2. Tasarım",
    title: "UI/UX & Prototip",
    desc: "Kullanıcı deneyimini merkeze alan modern, şık ve markanızı yansıtan arayüz tasarımlarını onayınıza sunuyoruz."
  },
  {
    month: "3. Geliştirme",
    title: "Kodlama & Entegrasyon",
    desc: "Tasarımları, en güncel teknolojiler (React, Next.js vb.) ile performanstan ödün vermeden koda döküyoruz."
  },
  {
    month: "4. Lansman",
    title: "Test & Yayına Alma",
    desc: "Tüm cihaz ve tarayıcılarda kusursuz çalıştığından emin olduktan sonra projenizi yayına alıyoruz."
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
          <h2>Adım Adım Başarı.</h2>
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
