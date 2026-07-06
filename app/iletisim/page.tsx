import type { Metadata } from "next";
import { FiMapPin, FiPhoneCall, FiMail, FiClock, FiZap, FiArrowRight } from "react-icons/fi";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import ContactForm from "@/app/components/ContactForm";
import Image from "next/image";
import "./iletisim.css";

import { getSeoMetadata } from "@/app/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return getSeoMetadata("iletisim", {
    title: "İletişim | Bromak Agency - Konya Reklam Ajansı",
    description: "Bromak Agency ile iletişime geçin. Konya merkezli reklam ajansımızla projenizi konuşalım. +90 541 366 04 96 | merhaba@bromakagency.com",
    keywords: "iletişim, bromak agency, konya reklam ajansı, iletişim bilgileri"
  });
}

export default function ContactPage() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": "https://bromakagency.com/#localbusiness",
        "name": "Bromak Agency",
        "image": "https://bromakagency.com/assets/logos/bromak_kirmizi_logo.png",
        "telephone": "+905413660496",
        "email": "merhaba@bromakagency.com",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Şeker Mh. Şefikcan Cd.",
          "addressLocality": "Selçuklu",
          "addressRegion": "Konya",
          "addressCountry": "TR"
        },
        "url": "https://bromakagency.com/iletisim"
      },
      {
        "@type": "ContactPage",
        "@id": "https://bromakagency.com/iletisim/#webpage",
        "url": "https://bromakagency.com/iletisim",
        "name": "İletişim | Bromak Agency",
        "description": "Bromak Agency ile iletişime geçin. Konya merkezli reklam ajansımızla projenizi konuşalım.",
        "publisher": {
          "@id": "https://bromakagency.com/#organization"
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <Navbar />
      <main className="contact-page">
        <section className="contact-hero">
          <div>
            <span className="contact-hero-eyebrow">İLETİŞİM</span>
            <h1>
              Birlikte harika işler<br />
              üretelim<span>.</span>
            </h1>
            <p className="contact-hero-desc">
              Markanız için yaratıcı çözümler üretmeye hazırız.<br />
              Projenizden bahsedin, size nasıl yardımcı olabileceğimizi konuşalım.
            </p>
          </div>

          <div className="hero-visual">
            <div className="hero-m-wrap">
              <Image
                src="/assets/logos/bromak_app_icon.png"
                alt="Bromak"
                className="hero-m-svg"
                width={280}
                height={280}
              />
            </div>
          </div>
        </section>

        <section className="contact-main">
          <div className="contact-info">
            <h2>İletişim Bilgileri<span>.</span></h2>

            <div className="info-item">
              <div className="info-icon"><FiMapPin size={24} /></div>
              <div>
                <strong>Adres</strong>
                <p>Esenler Mah. Horasan Sk. Görgülü Center<br />No:4/4 Selçuklu / Konya</p>
              </div>
            </div>

            <div className="info-item">
              <div className="info-icon"><FiPhoneCall size={24} /></div>
              <div>
                <strong>Telefon</strong>
                <p>+90 541 366 04 96<br />+90 505 063 85 43</p>
              </div>
            </div>

            <div className="info-item">
              <div className="info-icon"><FiMail size={24} /></div>
              <div>
                <strong>E-posta</strong>
                <p>merhaba@bromakagency.com</p>
              </div>
            </div>

            <div className="info-item">
              <div className="info-icon"><FiClock size={24} /></div>
              <div>
                <strong>Çalışma Saatleri</strong>
                <p>Pazartesi - Cumartesi &nbsp; 09:00 - 18:00</p>
              </div>
            </div>

            <div className="quick-box">
              <div className="quick-box-icon">
                <Image src="/assets/logos/bromak_app_icon.png" alt="Bromak" width={54} height={54} style={{ objectFit: "contain" }} />
              </div>
              <div>
                <strong>Hızlı dönüş alın!</strong>
                <p>Formu doldurun, en kısa sürede size geri dönüş yapalım.</p>
              </div>
            </div>
          </div>

          <div className="contact-form-wrap">
            <h2>Bize Yazın<span>.</span></h2>

            <ContactForm />

          </div>
        </section>

        <div className="map-section">
          <iframe
            className="map-iframe"
            src="https://maps.google.com/maps?q=37.8902847,32.4648995&z=17&output=embed&hl=tr"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Bromak Agency Konumu"
          />
          <div className="map-pin-wrapper">
            <div className="pulse-ring"></div>
            <div className="pulse-ring delay"></div>
            <Image
              src="/assets/logos/bromak-favicon.svg"
              alt="Bromak"
              className="map-pin-img"
              width={44}
              height={44}
            />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
