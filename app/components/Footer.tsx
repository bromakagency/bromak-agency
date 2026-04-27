"use client";
import Link from "next/link";
import { useState } from "react";

/* ── Social Icons ─────────────────────────── */
const LinkedInIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
  </svg>
);

const TwitterXIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.259 5.632L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"/>
  </svg>
);



const MailIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2"/>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
  </svg>
);

const PhoneIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.19h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.8a16 16 0 0 0 6.29 6.29l1.17-.95a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);

const LocationIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);


function AccordionCol({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="footer-accordion">
      <button className="footer-accordion-btn" onClick={() => setOpen(!open)} aria-expanded={open}>
        <span>{title}</span>
        <svg className={`footer-accordion-chevron ${open ? "open" : ""}`} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      <div className={`footer-accordion-body ${open ? "open" : ""}`}>
        {children}
      </div>
    </div>
  );
}

/* ── Footer ───────────────────────────────── */
export default function Footer() {
  return (
    <footer className="bromak-footer">
      <style dangerouslySetInnerHTML={{ __html: `
        .bromak-footer {
          background: #fff;
          color: #111;
          padding: 64px 6vw 28px;
          width: 100%;
          box-sizing: border-box;
          overflow: hidden;
        }

        /* ── CTA ─────────────────────────────── */
        .footer-cta {
          border: 1px solid rgba(226,19,10,.45);
          border-radius: 22px;
          padding: 52px 64px;
          display: grid;
          grid-template-columns: 1.2fr .5fr 1fr auto;
          align-items: center;
          gap: 40px;
          position: relative;
          overflow: hidden;
        }
        .footer-cta > * { position: relative; z-index: 1; }
        .footer-cta-label {
          color: #e2130a;
          font-weight: 800;
          font-size: 13px;
          display: block;
          margin-bottom: 16px;
          letter-spacing: .08em;
        }
        .footer-cta h2 {
          font-size: clamp(26px, 3vw, 48px);
          line-height: 1.12;
          margin: 0;
          font-weight: 700;
        }
        .footer-cta-red { color: #e2130a; }
        .footer-m-shape {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0.13;
          pointer-events: none;
          user-select: none;
          z-index: 0;
        }
        .footer-m-shape img {
          height: 100%;
          width: auto;
          display: block;
        }
        .footer-cta-desc {
          font-size: 16px;
          color: #555;
          line-height: 1.75;
          margin: 0;
        }
        .footer-cta-btn {
          border: 1px solid #e2130a;
          color: #e2130a;
          text-decoration: none;
          padding: 18px 32px;
          border-radius: 10px;
          font-weight: 800;
          white-space: nowrap;
          font-size: 15px;
          transition: background .2s, color .2s;
          display: inline-block;
        }
        .footer-cta-btn:hover { background: #e2130a; color: #fff; }

        /* ── MAIN ────────────────────────────── */
        .footer-main {
          display: grid;
          grid-template-columns: 1.5fr 1fr 1fr 1fr 1.25fr;
          gap: 56px;
          margin-top: 80px;
        }
        .footer-brand-logo {
          max-width: 150px;
          margin-bottom: 20px;
          display: block;
        }
        .footer-brand-desc {
          color: #444;
          line-height: 1.8;
          font-size: 14px;
          margin: 0 0 20px;
        }
        .footer-social {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }
        .footer-social a {
          width: 42px;
          height: 42px;
          border: 1px solid rgba(226,19,10,.4);
          border-radius: 50%;
          display: grid;
          place-items: center;
          color: #e2130a;
          text-decoration: none;
          transition: background .2s, color .2s;
        }
        .footer-social a:hover { background: #e2130a; color: #fff; }

        /* ── COLUMNS ─────────────────────────── */
        .footer-col-desktop h4,
        .footer-contact h4 {
          font-size: 16px;
          font-weight: 700;
          margin: 0 0 24px;
          position: relative;
          padding-bottom: 12px;
        }
        .footer-col-desktop h4::after,
        .footer-contact h4::after {
          content: "";
          width: 22px;
          height: 2px;
          background: #e2130a;
          position: absolute;
          left: 0;
          bottom: 0;
        }
        .footer-col-desktop a {
          display: block;
          color: #333;
          text-decoration: none;
          margin-bottom: 12px;
          font-size: 14px;
          transition: color .2s;
        }
        .footer-col-desktop a::after { content: " ›"; color: #e2130a; }
        .footer-col-desktop a:hover { color: #e2130a; }

        /* ── ACCORDION (mobile only) ─────────── */
        .footer-accordion {
          display: none;
          border-bottom: 1px solid rgba(0,0,0,.1);
        }
        .footer-accordion-btn {
          width: 100%;
          background: none;
          border: none;
          padding: 18px 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 16px;
          font-weight: 700;
          color: #111;
          cursor: pointer;
          font-family: var(--font-neue-leiden), var(--font-graphik), sans-serif;
        }
        .footer-accordion-chevron {
          transition: transform .25s;
          color: #e2130a;
          flex-shrink: 0;
        }
        .footer-accordion-chevron.open { transform: rotate(180deg); }
        .footer-accordion-body {
          max-height: 0;
          overflow: hidden;
          transition: max-height .3s ease;
        }
        .footer-accordion-body.open { max-height: 600px; }
        .footer-accordion-body a {
          display: block;
          color: #333;
          text-decoration: none;
          padding: 10px 0;
          font-size: 15px;
          border-bottom: 1px solid rgba(0,0,0,.05);
        }
        .footer-accordion-body a:last-child { border-bottom: none; }

        /* ── CONTACT ─────────────────────────── */
        .footer-contact-item {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          color: #444;
          font-size: 14px;
          line-height: 1.6;
          margin-bottom: 14px;
        }
        .footer-contact-icon { color: #e2130a; font-size: 17px; flex-shrink: 0; margin-top: 1px; }

        /* ── FEATURES ────────────────────────── */
        .footer-features {
          border-top: 1px solid rgba(0,0,0,.1);
          border-bottom: 1px solid rgba(0,0,0,.1);
          margin-top: 64px;
          padding: 30px 0;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 32px;
        }
        .footer-feature-item {
          border-right: 1px solid rgba(0,0,0,.09);
          padding-right: 24px;
          display: flex;
          align-items: flex-start;
          gap: 12px;
        }
        .footer-feature-item:last-child { border-right: none; }
        .footer-feature-icon {
          width: 38px;
          height: 38px;
          border: 1px solid rgba(226,19,10,.3);
          border-radius: 8px;
          display: grid;
          place-items: center;
          color: #e2130a;
          font-size: 17px;
          flex-shrink: 0;
        }
        .footer-feature-text strong { font-size: 14px; font-weight: 700; display: block; margin-bottom: 4px; }
        .footer-feature-text p { color: #555; font-size: 13px; line-height: 1.6; margin: 0; }

        /* ── BOTTOM ──────────────────────────── */
        .footer-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 28px;
          color: #666;
          font-size: 13px;
          gap: 20px;
        }
        .footer-bottom-links { display: flex; align-items: center; gap: 4px; flex-wrap: wrap; }
        .footer-bottom-links a { color: #666; text-decoration: none; padding: 0 4px; }
        .footer-bottom-links a:hover { color: #e2130a; }
        .footer-bottom-dot { color: #e2130a; }

        /* ── DESKTOP ONLY ────────────────────── */
        .footer-col-desktop { display: block; }

        /* ── RESPONSIVE ──────────────────────── */
        @media (max-width: 900px) {
          .bromak-footer { padding: 36px 20px 24px; }

          .footer-cta {
            grid-template-columns: 1fr;
            padding: 30px 24px;
            gap: 18px;
          }
          .footer-b-shape {
            position: absolute;
            right: -10px;
            bottom: -10px;
            font-size: 160px;
            opacity: .4;
          }
          .footer-main {
            grid-template-columns: 1fr;
            gap: 0;
            margin-top: 44px;
          }
          .footer-brand { padding-bottom: 28px; border-bottom: 1px solid rgba(0,0,0,.1); margin-bottom: 4px; }

          /* Hide desktop cols, show accordion */
          .footer-col-desktop { display: none; }
          .footer-accordion { display: block; }

          /* Contact stays visible but compact */
          .footer-contact { padding-top: 8px; }
          .footer-contact h4 { padding-top: 18px; }

          .footer-features {
            grid-template-columns: 1fr;
            gap: 0;
            margin-top: 36px;
          }
          .footer-feature-item {
            border-right: none;
            border-bottom: 1px solid rgba(0,0,0,.08);
            padding: 16px 0;
            padding-right: 0;
          }
          .footer-feature-item:last-child { border-bottom: none; }

          .footer-bottom {
            flex-direction: column;
            align-items: center;
            text-align: center;
            padding-top: 20px;
          }
        }
      `}} />

      {/* ── CTA ── */}
      <section className="footer-cta">
        <div>
          <span className="footer-cta-label">BİRLİKTE HARİKA İŞLER ÜRETELİM</span>
          <h2>Yeni bir projeye<br />başlamaya hazır mısınız<span className="footer-cta-red">?</span></h2>
        </div>
        <div className="footer-m-shape"><img src="/assets/m.svg" alt="" /></div>
        <p className="footer-cta-desc">Markanızı bir adım öteye taşıyacak yaratıcı çözümler için bize ulaşın.</p>
        <Link href="#contact" className="footer-cta-btn">Projenizi Konuşalım →</Link>
      </section>

      {/* ── MAIN ── */}
      <section className="footer-main">
        {/* Brand */}
        <div className="footer-brand">
          <img src="/assets/logos/bromak_kirmizi-logo.gif" alt="Bromak Agency" className="footer-brand-logo" />
          <p className="footer-brand-desc">Strateji, tasarım ve teknolojiyi bir araya getirerek markaların büyümesine katkı sağlıyoruz.</p>
          <div className="footer-social">
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><LinkedInIcon /></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><InstagramIcon /></a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter / X"><TwitterXIcon /></a>

          </div>
        </div>

        {/* Desktop columns */}
        <div className="footer-col-desktop">
          <h4>Hizmetlerimiz</h4>
          <Link href="/#hizmetlerimiz">Strateji</Link>
          <Link href="/#hizmetlerimiz">Tasarım</Link>
          <Link href="/#hizmetlerimiz">Dijital Pazarlama</Link>
          <Link href="/#hizmetlerimiz">İçerik Üretimi</Link>
          <Link href="/#hizmetlerimiz">Prodüksiyon</Link>
          <Link href="/#hizmetlerimiz">Sosyal Medya Yönetimi</Link>
        </div>

        <div className="footer-col-desktop">
          <h4>Ajans</h4>
          <Link href="/#hakkimizda">Hakkımızda</Link>
          <Link href="#">Ekibimiz</Link>
          <Link href="#">Yaklaşımımız</Link>
          <Link href="#">Kariyer</Link>
          <Link href="/#islerimiz">Referanslar</Link>
          <Link href="/blog">Blog</Link>
        </div>

        <div className="footer-col-desktop">
          <h4>Kaynaklar</h4>
          <Link href="/blog">Blog</Link>
          <Link href="#">Rehberler</Link>
          <Link href="#">Sıkça Sorulan Sorular</Link>
        </div>

        <div className="footer-contact footer-col-desktop">
          <h4>İletişim</h4>
          <div className="footer-contact-item"><span className="footer-contact-icon"><MailIcon /></span><span>info@bromakagency.com</span></div>
          <div className="footer-contact-item"><span className="footer-contact-icon"><PhoneIcon /></span><span>+90 541 366 04 96</span></div>
          <div className="footer-contact-item"><span className="footer-contact-icon"><LocationIcon /></span><span>Esenler Mh. Horasan Sk. Görgülü Center.<br />No:4/4 Selçuklu / Konya</span></div>
        </div>

        {/* Mobile Accordions */}
        <AccordionCol title="Hizmetlerimiz">
          <Link href="/#hizmetlerimiz">Strateji</Link>
          <Link href="/#hizmetlerimiz">Tasarım</Link>
          <Link href="/#hizmetlerimiz">Dijital Pazarlama</Link>
          <Link href="/#hizmetlerimiz">İçerik Üretimi</Link>
          <Link href="/#hizmetlerimiz">Prodüksiyon</Link>
          <Link href="/#hizmetlerimiz">Sosyal Medya Yönetimi</Link>
        </AccordionCol>

        <AccordionCol title="Ajans">
          <Link href="/#hakkimizda">Hakkımızda</Link>
          <Link href="#">Ekibimiz</Link>
          <Link href="#">Yaklaşımımız</Link>
          <Link href="#">Kariyer</Link>
          <Link href="/#islerimiz">Referanslar</Link>
          <Link href="/blog">Blog</Link>
        </AccordionCol>

        <AccordionCol title="Kaynaklar">
          <Link href="/blog">Blog</Link>
          <Link href="#">Rehberler</Link>
          <Link href="#">Sıkça Sorulan Sorular</Link>
        </AccordionCol>

        <AccordionCol title="İletişim">
          <div style={{ paddingTop: 8 }}>
            <div className="footer-contact-item"><span className="footer-contact-icon"><MailIcon /></span><span>info@bromakagency.com</span></div>
            <div className="footer-contact-item"><span className="footer-contact-icon"><PhoneIcon /></span><span>+90 541 366 04 96</span></div>
            <div className="footer-contact-item"><span className="footer-contact-icon"><LocationIcon /></span><span>Esenler Mh. Horasan Sk. Görgülü Center.<br />No:4/4 Selçuklu / Konya</span></div>
          </div>
        </AccordionCol>
      </section>



      {/* ── BOTTOM ── */}
      <section className="footer-bottom">
        <p>© 2026 Bromak Agency. Her hakkı, her işi gibi sahiplenilmiştir.</p>
        <div className="footer-bottom-links">
          <Link href="#">Gizlilik Politikası</Link>
          <span className="footer-bottom-dot">•</span>
          <Link href="#">Kullanım Şartları</Link>
          <span className="footer-bottom-dot">•</span>
          <Link href="#">Çerez Politikası</Link>
        </div>
      </section>
    </footer>
  );
}
