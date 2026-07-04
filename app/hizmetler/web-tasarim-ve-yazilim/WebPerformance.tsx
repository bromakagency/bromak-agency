"use client";

import { useEffect, useState, useRef } from "react";
import "./web-tasarim.css";

const SCORES = [
  { label: "Performans", score: 100 },
  { label: "Erişilebilirlik", score: 100 },
  { label: "Best Practices", score: 100 },
  { label: "SEO", score: 100 },
];

export default function WebPerformance() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="web-perf-section" ref={sectionRef}>
      <div className="web-perf-header">
        <h2>Hız eşittir dönüşüm.</h2>
        <p>Araştırmalara göre 1 saniyelik gecikme %7 dönüşüm kaybına yol açar. Bizim kodladığımız sitelerde gecikme yoktur.</p>
      </div>

      <div className="lighthouse-grid">
        {SCORES.map((item, index) => (
          <div key={index} className={`lighthouse-item ${isVisible ? 'animate' : ''}`}>
            <div className="lighthouse-gauge">
              <svg className="gauge-svg" viewBox="0 0 160 160">
                <circle className="gauge-bg" cx="80" cy="80" r="70" />
                <circle className="gauge-progress" cx="80" cy="80" r="70" />
              </svg>
              <span className="gauge-score">{isVisible ? item.score : 0}</span>
            </div>
            <span className="lighthouse-label">{item.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
