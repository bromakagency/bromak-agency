import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import { prisma } from "@/app/lib/prisma";
import ContactForm from '../components/ContactForm';
import ShortContactForm from '../components/ShortContactForm';
import './lp.css';

export const metadata: Metadata = {
  title: "İşlerimize Göz Atın, Sıradaki Siz Olun | Bromak Agency",
  description: "Konya'da 6 yıldır üretim firmalarına web sitesi ve sosyal medya hizmeti veriyoruz. Ödüllü ajansımızla dijitalde güçlü bir iz bırakın.",
  robots: {
    index: false,
    follow: false
  }
};

const awardsList = [
  { src: "/assets/awards/trt-internet-sitesi-2024.svg", alt: "TRT İnternet Sitesi 2024" },
  { src: "/assets/awards/trt_giy_2025.svg", alt: "TRT Geleceğin İletişimcileri 2025" },
  { src: "/assets/awards/trt-radyo-belgesel-2023.svg", alt: "TRT Radyo Belgesel 2023" },
  { src: "/assets/awards/aydın-dogan-2025.svg", alt: "Aydın Doğan 2025" },
  { src: "/assets/awards/aydin-dogan-internet-sitesi-2025.svg", alt: "Aydın Doğan İnternet Sitesi 2025" },
  { src: "/assets/awards/trt_giy_2024.svg", alt: "TRT Geleceğin İletişimcileri 2024" },
];

export default async function HemenBaslayin() {
  // Reklamdan gelenler için özel portföy: İstenmeyenleri çıkar, web/sosyal medya ve özel müşterileri (Tuana, Essen vb.) getir.
  const works = await prisma.work.findMany({
    where: { 
      published: true,
      NOT: {
        OR: [
          { client: { contains: "Sapanca", mode: "insensitive" } },
          { title: { contains: "Sapanca", mode: "insensitive" } },
          { client: { contains: "Kozalak", mode: "insensitive" } },
          { title: { contains: "Kozalak", mode: "insensitive" } },
          { client: { contains: "La Masia", mode: "insensitive" } },
          { title: { contains: "La Masia", mode: "insensitive" } }
        ]
      },
      OR: [
        { client: { contains: "Dizgiline", mode: "insensitive" } },
        { title: { contains: "Dizgiline", mode: "insensitive" } },
        { client: { contains: "Puffy", mode: "insensitive" } },
        { title: { contains: "Puffy", mode: "insensitive" } },
        { client: { contains: "Essen", mode: "insensitive" } },
        { title: { contains: "Essen", mode: "insensitive" } },
        { client: { contains: "Tuana", mode: "insensitive" } },
        { title: { contains: "Tuana", mode: "insensitive" } },
        { service: { contains: "Web", mode: "insensitive" } },
        { service: { contains: "Sosyal", mode: "insensitive" } }
      ]
    },
    orderBy: [{ order: "asc" }, { createdAt: "desc" }],
    take: 6,
  });

  return (
    <div className="lp-page">
      
      {/* ── ÜST BAR (HEADER) ── */}
      <header className="lp-topbar">
        <Link href="/" className="lp-topbar-logo">
          <Image 
            src="/assets/logos/bromak_kirmizi-logo.gif" 
            alt="Bromak Agency" 
            width={300} 
            height={100} 
            style={{ width: '130px', height: 'auto', objectFit: 'contain' }}
            unoptimized
          />
        </Link>
        <a href="#iletisim-formu" className="lp-topbar-cta">
          Projeyi Konuşalım
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
        </a>
      </header>

      {/* ── HERO ── */}
      <section className="lp-hero-section">
        <div className="lp-hero-left">
          <h1>İşlerimize göz atın, sıradaki siz olun.</h1>
          <p className="lp-hero-desc">
            Ödüllü projelerimizi inceleyin. Markanız için neler yapabileceğimizi konuşmak için yandaki formu doldurun.
          </p>
          
          {/* Portfolyo Grid */}
          <div className="lp-portfolio-grid" style={{ marginTop: '2.5rem' }}>
            {works.map((work) => (
              <a href={`/isler/${work.slug}`} target="_blank" rel="noopener noreferrer" className="lp-portfolio-card" key={work.id}>
                <div className="lp-portfolio-img-wrap">
                  <img src={work.coverImage || "/images/placeholder.jpg"} alt={work.title} loading="lazy" />
                </div>
                <div className="lp-portfolio-meta">
                  <h3>{work.title}</h3>
                  <span className="lp-portfolio-tag">{work.service || "Proje"}</span>
                </div>
              </a>
            ))}
          </div>

          <div className="lp-stats-row" style={{ marginTop: '3.5rem' }}>
            <div className="lp-stat">
              <span className="lp-stat-value">6 yıl</span>
              <span className="lp-stat-label">deneyim</span>
            </div>
            <div className="lp-stat">
              <span className="lp-stat-value">6 ödül</span>
              <span className="lp-stat-label">TRT, Aydın Doğan</span>
            </div>
            <div className="lp-stat">
              <span className="lp-stat-value">40+</span>
              <span className="lp-stat-label">proje</span>
            </div>
          </div>
        </div>

        {/* SAĞ KOLON: HERO CTA PANELİ (FORM + WHATSAPP) */}
        <div className="lp-sidebar-col">
          <div className="lp-sidebar-cta">
            <h3 className="lp-sidebar-heading">Hangi hizmet ilginizi çekiyor?</h3>
            <p className="lp-sidebar-sub">Bizi arayın veya hızlıca numaranızı bırakın, biz sizi arayalım.</p>
            
            <div className="lp-sidebar-form-wrapper">
               <ShortContactForm />
            </div>

            <div className="lp-sidebar-divider" style={{margin: '1rem 0'}}></div>
            
            <a href="https://wa.me/905413660496?text=Merhaba,%20web%20sitesi%20yapt%C4%B1rmak%20istiyorum." target="_blank" rel="noopener noreferrer" className="lp-sidebar-btn btn-web">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
              Web Sitesi İstiyorum
            </a>
            
            <a href="https://wa.me/905413660496?text=Merhaba,%20sosyal%20medya%20y%C3%B6netimi%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum." target="_blank" rel="noopener noreferrer" className="lp-sidebar-btn btn-social">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              Sosyal Medya İstiyorum
            </a>

            <div className="lp-sidebar-divider" style={{margin: '0.75rem 0'}}></div>
            
            <div style={{display: 'flex', gap: '0.5rem'}}>
              <a href="https://wa.me/905413660496" target="_blank" rel="noopener noreferrer" className="lp-sidebar-btn btn-whatsapp" style={{flex: 1, justifyContent: 'center'}}>
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.489-1.761-1.663-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
              </a>
              <a href="tel:+905413660496" className="lp-sidebar-btn btn-phone" style={{flex: 1, justifyContent: 'center'}}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
              </a>
            </div>

            <div className="lp-sidebar-features" style={{marginTop: '1rem', alignItems: 'center'}}>
              <div className="lp-sidebar-feature">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
                Ücretsiz Ön Görüşme
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── TAM GENİŞLİK ANA YAPI (HİZMETLER) ── */}
      <div className="lp-full-layout">
        <div className="lp-services-section">
          <div style={{ textAlign: 'center' }}>
            <span className="lp-section-label">HİZMETLERİMİZ</span>
            <h2 className="lp-section-heading">Uçtan uca çözümler.</h2>
          </div>
          <div className="lp-services-grid">
            <div className="lp-service-card">
              <div className="lp-service-icon">
                 <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="24" height="24"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
              </div>
              <h3>Web Sitesi Tasarımı</h3>
              <p>Firmanızı en iyi şekilde anlatan, hızlı, mobil uyumlu ve SEO dostu kurumsal web siteleri tasarlıyoruz.</p>
            </div>
            <div className="lp-service-card">
              <div className="lp-service-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="24" height="24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </div>
              <h3>Sosyal Medya Yönetimi</h3>
              <p>Markanızın dijitalde düzenli, etkili ve profesyonel bir şekilde yönetilmesini sağlıyoruz.</p>
            </div>
            <div className="lp-service-card">
              <div className="lp-service-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="24" height="24"><circle cx="12" cy="12" r="10"></circle><polygon points="10 8 16 12 10 16 10 8"></polygon></svg>
              </div>
              <h3>İçerik & Prodüksiyon</h3>
              <p>Fotoğraf, video ve drone çekimleri ile marka kimliğinize değer katacak içerikler üretiyoruz.</p>
            </div>
            <div className="lp-service-card">
              <div className="lp-service-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="24" height="24"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
              </div>
              <h3>Kurumsal Kimlik</h3>
              <p>Logodan antetli kağıda kadar şirketinizin görsel kimliğini sıfırdan kurumsal bir yapıya büründürüyoruz.</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── İLETİŞİM FORMU (EN ALT KISIM) ── */}
      <section id="iletisim-formu" className="lp-contact-section">
        <div className="lp-contact-layout">
          <div className="lp-contact-left">
             <h2>Firmanız için neler<br/>yapabileceğimizi konuşalım.</h2>
             <p>Kısa bir ön görüşme ile ihtiyaçlarınızı anlayalım, markanızı birlikte dijitalde büyütelim.</p>
             <div className="lp-contact-info-row">
                <a href="mailto:merhaba@bromakagency.com" className="lp-contact-info-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                  merhaba@bromakagency.com
                </a>
                <a href="tel:+905413660496" className="lp-contact-info-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                  +90 541 366 04 96
                </a>
                <div className="lp-contact-info-item" style={{ alignItems: 'flex-start' }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginTop: '4px' }}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                  <div>
                    Esenler Mh. Horasan Sk. Görgülü Center<br/>No:4/4 Selçuklu / Konya
                    <a href="https://share.google/6EDoSKwss56ZnrGPv" target="_blank" rel="noopener noreferrer" style={{display: 'block', marginTop: '0.75rem', color: '#e30613', fontWeight: 700, textDecoration: 'none'}}>Ofise Buyrun (Haritada Gör) &rarr;</a>
                  </div>
                </div>
             </div>
          </div>
          <div className="lp-contact-right">
             <ContactForm />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="lp-mini-footer">
        &copy; {new Date().getFullYear()} Bromak Agency. Tüm Hakları Saklıdır.
      </footer>

      {/* SADECE MOBİLDE GÖRÜNEN SABİT WHATSAPP */}
      <a href="https://wa.me/905413660496" target="_blank" rel="noopener noreferrer" className="lp-floating-wa" aria-label="WhatsApp'tan Ulaşın">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.489-1.761-1.663-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
      </a>
    </div>
  );
}
