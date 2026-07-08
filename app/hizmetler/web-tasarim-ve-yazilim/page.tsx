import type { Metadata } from "next";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import Animations from "@/app/components/Animations";
import WebBentoWorks from "./WebBentoWorks";
import WebFeatures from "./WebFeatures";
import WebRoadmap from "./WebRoadmap";
import MetaViewContentTracker from "@/app/components/MetaViewContentTracker";
import "../arama-motoru-optimizasyonu-seo/detay.css";
import "./web-tasarim.css";

import { getSeoMetadata } from "@/app/lib/seo";

export async function generateMetadata() {
  return getSeoMetadata("hizmetler-web", {
    title: "Konya Web Tasarım ve Yazılım Ajansı | Bromak",
    description: "Konya web tasarım firmaları arasında dönüşüm odaklı, SEO uyumlu ve ultra hızlı kurumsal web sitesi yapan ödüllü reklam ajansı. Projeniz için tanışalım.",
    keywords: "web tasarım, konya web tasarım, konya web site tasarımı, kurumsal web sitesi"
  });
}
export default async function WebTasarim() {
  const { prisma } = await import("@/app/lib/prisma");
  const works = await prisma.work.findMany({
    where: {
      published: true,
      service: { contains: "Web" }
    },
    orderBy: { createdAt: "desc" },
    take: 10
  });

  const allGalleryImages = works.flatMap(w => (w.gallery || []).map(g => g.split("|")[0]));
  const fallbacks = [
    "/images/dies-markasi.png", "/images/dies-markasi-1.png", "/images/dies-markasi-2.png",
    "/images/essen-markasi.png", "/images/essen-markasi-1.png", "/images/essen-markasi-2.png",
    "/images/essen-markasi-3.png", "/images/essen-markasi-4.png", "/images/essen-markasi-5.png",
    "/images/dies-markasi.png", "/images/dies-markasi-1.png", "/images/dies-markasi-2.png"
  ];
  // Benzersiz (unique) görselleri alıp fallback ile 12'ye tamamlayalım
  const uniqueGallery = Array.from(new Set(allGalleryImages)).map(img => 
    img?.startsWith('http') || img?.startsWith('/') ? img : `/images/${img}`
  );

  // Görselleri rastgele karıştır (shuffle)
  for (let i = uniqueGallery.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [uniqueGallery[i], uniqueGallery[j]] = [uniqueGallery[j], uniqueGallery[i]];
  }
  
  const heroImages = [...uniqueGallery, ...fallbacks].slice(0, 12);

  const topImages = heroImages.slice(0, 6);
  const bottomImages = heroImages.slice(6, 12);

  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://bromakagency.com/hizmetler/web-tasarim-ve-yazilim/#service",
    "name": "Web Tasarım & Yazılım",
    "provider": {
      "@id": "https://bromakagency.com/#organization"
    },
    "description": "Markanızı dijitalde kusursuz temsil eden, hızlı, güvenli ve modern web siteleri tasarlıyor ve kodluyoruz.",
    "url": "https://bromakagency.com/hizmetler/web-tasarim-ve-yazilim"
  };

  return (
    <div className="page-wrapper" style={{ backgroundColor: "#050505" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <MetaViewContentTracker content_name="Web Tasarım & Yazılım" content_category="Hizmet" />
      <Animations />
      <div className="main-wrapper">
        <Navbar />

        <main className="detail-page">
          <section className="detail-hero">
            <div className="hero-left">
              <span className="eyebrow-text" style={{color: "#fff", textTransform: "uppercase", fontSize: "0.85rem", letterSpacing: "2px", opacity: 0.7, display: "block", marginBottom: "1rem"}}>
                KUSURSUZ KOD. SIFIR SINIR.
              </span>
              <h1>
                Konya Web Tasarım<br />
                <strong>& Yazılım Ajansı.</strong>
              </h1>
              <p>
                Dijitaldeki vitrininiz sıradan olamaz. Konya web sitesi yapan firmalar arasında butik hizmet anlayışımızla; ziyaretçiyi müşteriye dönüştüren, mobil ve SEO uyumlu, ultra hızlı özel web projeleri tasarlıyor ve kodluyoruz.
              </p>
            </div>

            <div className="hero-visuals">
              <div className="hero-track-container top">
                <div className="hero-track">
                  {topImages.map((img, i) => (
                    <img key={i} loading="lazy" decoding="async" src={img} alt="Web Tasarım" />
                  ))}
                  {/* Duplicates */}
                  {topImages.map((img, i) => (
                    <img key={`dup-${i}`} loading="lazy" decoding="async" src={img} alt="Web Tasarım" />
                  ))}
                </div>
              </div>
              <div className="hero-track-container bottom">
                <div className="hero-track">
                  {bottomImages.map((img, i) => (
                    <img key={i} loading="lazy" decoding="async" src={img} alt="Web Tasarım" />
                  ))}
                  {/* Duplicates */}
                  {bottomImages.map((img, i) => (
                    <img key={`dup-${i}`} loading="lazy" decoding="async" src={img} alt="Web Tasarım" />
                  ))}
                </div>
              </div>
            </div>
          </section>

          <WebFeatures />

          <WebRoadmap />

          <WebBentoWorks works={works.slice(0, 5)} />

          <section className="social-faq-section">
            <div className="social-faq-inner">
              <div className="social-faq-heading">
                <span>SIKÇA SORULAN SORULAR</span>
                <h2>
                  Web tasarım hakkında merak edilenler<span>.</span>
                </h2>
              </div>

              <div className="social-faq-list">
                <details className="social-faq-item" open>
                  <summary>Kurumsal bir web sitesinin yapım süreci ne kadar sürer?</summary>
                  <p>
                    Projenin kapsamına ve ihtiyaçlarınıza göre değişiklik gösterir. Kurumsal web siteleri genellikle 4-6 hafta, e-ticaret ve özel yazılım projeleri ise 8-12 hafta arasında tamamlanmaktadır. Konya web tasarım ajansı arayışınızda en hızlı ve şeffaf süreci sunuyoruz.
                  </p>
                </details>

                <details className="social-faq-item">
                  <summary>Tasarladığınız web siteleri mobil uyumlu mu?</summary>
                  <p>
                    Kesinlikle. Geliştirdiğimiz tüm kurumsal web sitesi projeleri %100 mobil uyumlu (responsive) olarak tasarlanır ve kodlanır. Siteniz akıllı telefonlar, tabletler ve dev ekranlarda kusursuz görünür.
                  </p>
                </details>

                <details className="social-faq-item">
                  <summary>Hazır şablon (tema) kullanıyor musunuz?</summary>
                  <p>
                    Hayır. Sizi rakiplerinizden ayırmak için markanıza tamamen özel UI/UX tasarımlar yapıyor ve projeyi sıfırdan sizin ihtiyaçlarınıza göre kodluyoruz. Gerçek bir web tasarım firması farkını kod kalitesinde gösterir.
                  </p>
                </details>

                <details className="social-faq-item">
                  <summary>Siteyi teslim aldıktan sonra kendim güncelleyebilir miyim?</summary>
                  <p>
                    Evet. Sitenizle birlikte size özel tasarlanmış, kullanımı son derece kolay bir Yönetim Paneli (Admin) sunuyoruz. Teknik bilgiye ihtiyaç duymadan yazılarınızı, fotoğraflarınızı ve ürünlerinizi güncelleyebilirsiniz.
                  </p>
                </details>
              </div>
            </div>
          </section>

        </main>
        
        <Footer />
      </div>
    </div>
  );
}
