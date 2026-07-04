"use client";

import "./web-tasarim.css";

export default function WebTechStack() {
  return (
    <section className="web-orbit-section">
      <div style={{ textAlign: "center", marginBottom: "80px" }}>
        <h2 style={{ fontSize: "clamp(36px, 4vw, 56px)", marginBottom: "20px" }}>Modern Teknoloji Yörüngesi</h2>
        <p style={{ fontSize: "18px", color: "rgba(255,255,255,0.7)", maxWidth: "600px", margin: "0 auto" }}>
          Sizi dünün yavaş WordPress kalıplarına mahkum etmiyoruz. Sitenizi yarının React ve Next.js mimarileriyle, dev şirketlerin (Netflix, Uber) kullandığı altyapılarla kodluyoruz.
        </p>
      </div>

      <div className="orbit-container">
        <div className="orbit-center">
          <img loading="lazy" decoding="async" src="/assets/logos/bromak-favicon.svg" alt="Bromak Logo" style={{ filter: "brightness(0)" }} />
        </div>

        <div className="orbit-ring orbit-ring-1">
          <div className="orbit-planet"><span>React</span></div>
          <div className="orbit-planet" style={{ top: "auto", bottom: "-24px" }}><span>Next.js</span></div>
        </div>

        <div className="orbit-ring orbit-ring-2">
          <div className="orbit-planet" style={{ left: "0", top: "50%", transform: "translateY(-50%)" }}><span>Node</span></div>
          <div className="orbit-planet" style={{ left: "100%", top: "50%", transform: "translateY(-50%)" }}><span>TS</span></div>
        </div>

        <div className="orbit-ring orbit-ring-3">
          <div className="orbit-planet" style={{ left: "20%", top: "10%" }}><span>Figma</span></div>
          <div className="orbit-planet" style={{ left: "80%", top: "90%" }}><span>Tailwind</span></div>
        </div>
      </div>
    </section>
  );
}
