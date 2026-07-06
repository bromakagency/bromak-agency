"use client";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import "./footer.css";

import { FiInstagram, FiLinkedin, FiArrowRight } from "react-icons/fi";
import { FaMediumM } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const MailIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const PhoneIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.19h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.8a16 16 0 0 0 6.29 6.29l1.17-.95a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const LocationIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

function AccordionCol({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="footer-accordion">
      <button className="footer-accordion-btn" onClick={() => setOpen(!open)} aria-expanded={open}>
        <span>{title}</span>
        <svg className={`footer-accordion-chevron ${open ? "open" : ""}`} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <div className={`footer-accordion-body ${open ? "open" : ""}`}>
        {children}
      </div>
    </div>
  );
}

const serviceLinks = (
  <>
    <Link href="/hizmetler/web-tasarim-ve-yazilim">Web Tasarım & Yazılım</Link>
    <Link href="/hizmetler/arama-motoru-optimizasyonu-seo">Arama Motoru Optimizasyonu</Link>
    <Link href="/hizmetler/sosyal-medya-yonetimi">Sosyal Medya Yönetimi</Link>
    <Link href="/hizmetler/dijital-reklam-yonetimi">Dijital Reklam Yönetimi</Link>
  </>
);

const agencyLinks = (
  <>
    <Link href="/hakkimizda">Hakkımızda</Link>
    <Link href="/kariyer">Kariyer</Link>
    <Link href="/isler">Referanslar</Link>
    <Link href="/basari-hikayeleri">Başarı Hikayeleri</Link>
  </>
);

const resourceLinks = (
  <>
    <Link href="/blog">Blog</Link>
    <Link href="/sikca-sorulan-sorular">Sıkça Sorulan Sorular</Link>
  </>
);

const contactContent = (
  <>
    <a href="mailto:merhaba@bromakagency.com" className="footer-contact-item footer-contact-link"><span className="footer-contact-icon"><MailIcon /></span><span>merhaba@bromakagency.com</span></a>
    <a href="tel:+905413660496" className="footer-contact-item footer-contact-link"><span className="footer-contact-icon"><PhoneIcon /></span><span>+90 541 366 04 96</span></a>
    <a href="tel:+905050638543" className="footer-contact-item footer-contact-link"><span className="footer-contact-icon"><PhoneIcon /></span><span>+90 505 063 85 43</span></a>
    <div className="footer-contact-item"><span className="footer-contact-icon"><LocationIcon /></span><span>Esenler Mh. Horasan Sk. Görgülü Center.<br />No:4/4 Selçuklu / Konya</span></div>
  </>
);

const sliderImages = [
  "/images/slider/cagan.webp",
  "/images/slider/dizgiline.webp",
  "/images/slider/essenhidrolik.webp",
  "/images/slider/fatmaturgut.webp",
  "/images/slider/greendome.webp",
  "/images/slider/mavigri.webp",
  "/images/slider/tuanagida.webp"
];

export default function Footer() {
  const pathname = usePathname();
  const isHiddenPage = pathname === "/iletisim" || pathname === "/hizmetler";
  const reversedSliderImages = [...sliderImages].reverse();

  return (
    <footer className="bromak-footer">
      {!isHiddenPage && (
        <div className="footer-cta-wrapper">
          <section className="footer-cta">
            <div className="footer-cta-content">
              <h2>Yeni bir projeye<br />başlamaya hazır mısınız<span className="footer-cta-red">?</span></h2>
              <p className="footer-cta-desc">Markanızı bir adım öteye taşıyacak yaratıcı çözümler için bize ulaşın.</p>
              <Link href="/iletisim" className="footer-cta-btn">
                <span>Projenizi Konuşalım</span>
                <FiArrowRight style={{ strokeWidth: "3px" }} />
              </Link>
            </div>
            
            <div className="footer-visual-grid-container">
              <div className="footer-image-track-top">
                <div className="footer-track-inner">
                  {[...sliderImages, ...sliderImages].map((src, index) => (
                    <Image key={`top-${index}`} src={src} alt="Marka çalışması" width={150} height={150} />
                  ))}
                </div>
              </div>
              <div className="footer-image-track-bottom">
                <div className="footer-track-inner">
                  {[...reversedSliderImages, ...reversedSliderImages].map((src, index) => (
                    <Image key={`bottom-${index}`} src={src} alt="Marka çalışması" width={150} height={150} />
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>
      )}

      <section className="footer-main">
        <div className="footer-brand">
          <Image
            src="/assets/logos/bromak_kirmizi-logo.gif"
            alt="Bromak Agency"
            className="footer-brand-logo"
            width={300}
            height={100}
            style={{ width: '150px', height: 'auto' }}
            unoptimized={true} // Unoptimized for GIFs to preserve animation
          />
          <p className="footer-brand-desc">Strateji, tasarım ve teknolojiyi bir araya getirerek markaların büyümesine katkı sağlıyoruz.</p>
          <div className="footer-social">
            <a href="https://www.instagram.com/bromakagency/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><FiInstagram size={18} /></a>
            <a href="https://x.com/bromakagency" target="_blank" rel="noopener noreferrer" aria-label="X / Twitter"><FaXTwitter size={18} /></a>
            <a href="https://tr.linkedin.com/company/bromakagency" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><FiLinkedin size={18} /></a>
            <a href="https://medium.com/@bromakagency" target="_blank" rel="noopener noreferrer" aria-label="Medium"><FaMediumM size={18} /></a>
          </div>
        </div>

        <div className="footer-col-desktop">
          <h4>Hizmetlerimiz</h4>
          {serviceLinks}
        </div>

        <div className="footer-col-desktop">
          <h4>Ajans</h4>
          {agencyLinks}
        </div>

        <div className="footer-col-desktop">
          <h4>Kaynaklar</h4>
          {resourceLinks}
        </div>

        <div className="footer-contact footer-col-desktop">
          <h4>İletişim</h4>
          {contactContent}
        </div>

        <AccordionCol title="Hizmetlerimiz">{serviceLinks}</AccordionCol>
        <AccordionCol title="Ajans">{agencyLinks}</AccordionCol>
        <AccordionCol title="Kaynaklar">{resourceLinks}</AccordionCol>
        <AccordionCol title="İletişim">
          <div style={{ paddingTop: 8 }}>{contactContent}</div>
        </AccordionCol>
      </section>

      <section className="footer-bottom">
        <p>© 2026 Bromak Agency. Her hakkı, her işi gibi sahiplenilmiştir.</p>
        <div className="footer-bottom-links">
          <Link href="/gizlilik-politikasi">Gizlilik Politikası</Link>
          <span className="footer-bottom-dot">•</span>
          <Link href="/kullanim-sartlari">Kullanım Şartları</Link>
          <span className="footer-bottom-dot">•</span>
          <Link href="/cerez-politikasi">Çerez Politikası</Link>
        </div>
      </section>
    </footer>
  );
}
