import type { Metadata } from "next";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import Animations from "@/app/components/Animations";
import InteractiveSeoRoi from "./InteractiveSeoRoi";
import SeoToolEcosystem from "./SeoToolEcosystem";
import SeoRoadmap from "./SeoRoadmap";
import SeoHeroCaseStudies from "./SeoHeroCaseStudies";
import MetaViewContentTracker from "@/app/components/MetaViewContentTracker";
import "./detay.css";

import { getSeoMetadata } from "@/app/lib/seo";

export async function generateMetadata() {
  return getSeoMetadata("hizmetler-seo", {
    title: "Konya SEO Ajansı | Kurumsal SEO Hizmeti | Bromak Agency",
    description: "Konya SEO ajansı Bromak ile arama motorlarında ilk sayfaya çıkın. Yüksek hacimli (Konya SEO) aramalarda Google'da zirveye yerleşmek için profesyonel SEO uzmanı desteği alın.",
    keywords: "konya seo, konya seo ajansı, konya seo uzmanı, arama motoru optimizasyonu konya, google sıralama yükseltme, konya dijital pazarlama"
  });
}

import { prisma } from "@/app/lib/prisma";

export default async function SeoDetay() {
  const stories = await prisma.story.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
  });

  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://bromakagency.com/hizmetler/arama-motoru-optimizasyonu-seo/#service",
    "name": "Konya SEO Ajansı (Arama Motoru Optimizasyonu)",
    "provider": {
      "@id": "https://bromakagency.com/#organization"
    },
    "description": "Konya SEO uzmanı ekibimizle web sitenizin arama motorlarındaki sıralamasını yükseltiyor, organik trafiğinizi ve satışlarınızı kalıcı olarak artırıyoruz.",
    "url": "https://bromakagency.com/hizmetler/arama-motoru-optimizasyonu-seo"
  };

  return (
    <div className="page-wrapper">
      <MetaViewContentTracker content_name="Arama Motoru Optimizasyonu (SEO)" content_category="Hizmet" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <Animations />
      <div className="main-wrapper">
        <Navbar />

        <main className="detail-page">
          <section className="detail-hero">
            <div className="hero-left">

              <h1>
                Konya SEO Ajansı ile<br />
                <strong>Google'da Zirveye Yerleşin.</strong>
              </h1>
              <p>
                Yüksek arama hacmine sahip kelimelerde rakiplerinizi geride bırakın. Profesyonel <strong>Konya SEO uzmanı</strong> ekibimizle, sürdürülebilir stratejiler kurguluyor; <strong>Konya SEO ajansı</strong> olarak markanızı doğrudan hedef kitlenize ulaştırıyoruz.
              </p>
            </div>

            <div className="hero-visuals">
              <div className="hero-track-container top">
                <div className="hero-track">
                  <img loading="lazy" decoding="async" src="/images/dies-markasi.png" alt="Sosyal Medya" />
                  <img loading="lazy" decoding="async" src="/images/dies-markasi-1.png" alt="Sosyal Medya" />
                  <img loading="lazy" decoding="async" src="/images/dies-markasi-2.png" alt="Sosyal Medya" />
                  <img loading="lazy" decoding="async" src="/images/essen-markasi.png" alt="Sosyal Medya" />
                  <img loading="lazy" decoding="async" src="/images/essen-markasi-1.png" alt="Sosyal Medya" />
                  <img loading="lazy" decoding="async" src="/images/essen-markasi-2.png" alt="Sosyal Medya" />
                  {/* Duplicates */}
                  <img loading="lazy" decoding="async" src="/images/dies-markasi.png" alt="Sosyal Medya" />
                  <img loading="lazy" decoding="async" src="/images/dies-markasi-1.png" alt="Sosyal Medya" />
                  <img loading="lazy" decoding="async" src="/images/dies-markasi-2.png" alt="Sosyal Medya" />
                  <img loading="lazy" decoding="async" src="/images/essen-markasi.png" alt="Sosyal Medya" />
                  <img loading="lazy" decoding="async" src="/images/essen-markasi-1.png" alt="Sosyal Medya" />
                  <img loading="lazy" decoding="async" src="/images/essen-markasi-2.png" alt="Sosyal Medya" />
                </div>
              </div>
              <div className="hero-track-container bottom">
                <div className="hero-track">
                  <img loading="lazy" decoding="async" src="/images/essen-markasi-3.png" alt="Sosyal Medya" />
                  <img loading="lazy" decoding="async" src="/images/essen-markasi-4.png" alt="Sosyal Medya" />
                  <img loading="lazy" decoding="async" src="/images/essen-markasi-5.png" alt="Sosyal Medya" />
                  <img loading="lazy" decoding="async" src="/images/dies-markasi.png" alt="Sosyal Medya" />
                  <img loading="lazy" decoding="async" src="/images/dies-markasi-1.png" alt="Sosyal Medya" />
                  <img loading="lazy" decoding="async" src="/images/dies-markasi-2.png" alt="Sosyal Medya" />
                  {/* Duplicates */}
                  <img loading="lazy" decoding="async" src="/images/essen-markasi-3.png" alt="Sosyal Medya" />
                  <img loading="lazy" decoding="async" src="/images/essen-markasi-4.png" alt="Sosyal Medya" />
                  <img loading="lazy" decoding="async" src="/images/essen-markasi-5.png" alt="Sosyal Medya" />
                  <img loading="lazy" decoding="async" src="/images/dies-markasi.png" alt="Sosyal Medya" />
                  <img loading="lazy" decoding="async" src="/images/dies-markasi-1.png" alt="Sosyal Medya" />
                  <img loading="lazy" decoding="async" src="/images/dies-markasi-2.png" alt="Sosyal Medya" />
                </div>
              </div>
            </div>
          </section>

          <SeoHeroCaseStudies variant="contained" stories={stories} />

          <section className="service-showcase-mosaic" aria-label="SEO çalışma alanları">
            <article className="showcase-panel showcase-panel-main">
              <img loading="lazy" decoding="async" src="/images/essen-markasi.png" alt="Teknik SEO" />
              <div className="showcase-panel-copy">
                <h2>Teknik SEO</h2>
                <p>Hızlı, taranabilir ve arama motoru dostu kusursuz bir altyapı.</p>
              </div>
            </article>

            <div className="showcase-side-grid">
              <article className="showcase-panel showcase-panel-wide">
                <img loading="lazy" decoding="async" src="/images/dies-markasi.png" alt="İçerik Optimizasyonu" />
                <div className="showcase-panel-copy">
                  <h3>İçerik</h3>
                  <p>Kullanıcının arama niyetine tam yanıt veren kaliteli içerikler.</p>
                </div>
              </article>

              <article className="showcase-panel showcase-panel-small showcase-panel-2d">
                <img loading="lazy" decoding="async" src="/images/essen-markasi-2.png" alt="Lokal SEO" />
                <div className="showcase-panel-copy">
                  <h3>Lokal</h3>
                  <p>Bölgesel aramalarda doğrudan müşterinize ulaşın.</p>
                </div>
              </article>

              <article className="showcase-panel showcase-panel-tall">
                <img loading="lazy" decoding="async" src="/images/dies-markasi-1.png" alt="Off-Page SEO" />
                <div className="showcase-panel-copy">
                  <h3>Otorite</h3>
                  <p>Güçlü backlink profili ile Google'ın gözünde güven inşa edin.</p>
                </div>
              </article>

              <article className="showcase-panel showcase-panel-small showcase-panel-3d">
                <img loading="lazy" decoding="async" src="/images/essen-markasi-4.png" alt="Analiz" />
                <div className="showcase-panel-copy">
                  <h3>Analiz</h3>
                  <p>Sürekli veri takibi ve anlık rakip izleme.</p>
                </div>
              </article>
            </div>
          </section>

          <section className="social-detail-bento">
            <div className="bento-heading">
              <span>KONYA SEO & ARAMA MOTORU OPTİMİZASYONU</span>
              <h2>
                Organik trafiğinizi tesadüfe bırakmıyoruz<span>.</span>
              </h2>
              <p>
                Konya SEO kelimesinde olduğu gibi markanızı da en yüksek hacimli aramalarda ilk sayfaya taşıyoruz. Detaylı site analizi, profesyonel anahtar kelime stratejisi ve lokal SEO teknikleriyle sitenizin otoritesini artırıyor; en başarılı <strong>Konya SEO ajansı</strong> olarak sizi müşterilerinizle buluşturuyoruz.
              </p>
            </div>

            <div className="bento-grid">
              <article className="bento-card bento-card-red" style={{ gridColumn: 'span 2' }}>
                <span>01 / Teknik Analiz</span>
                <h3>Site hızı ve kod optimizasyonu</h3>
                <p>
                  Arama motoru botlarının sitenizi kolayca taraması ve anlaması için
                  teknik tüm hataları gideriyor, sayfa yüklenme hızını maksimuma çıkarıyoruz.
                </p>
              </article>

              <article className="bento-card bento-card-image" style={{ gridColumn: 'span 2' }}>
                <img loading="lazy" decoding="async" src="/images/essen-markasi-4.png" alt="İçerik Stratejisi" />
                <div className="bento-overlay">
                  <span>02 / İçerik</span>
                  <h3>Anahtar Kelime & Niyet Analizi</h3>
                </div>
              </article>

              <article className="bento-card bento-card-light" style={{ gridColumn: 'span 2' }}>
                <span>03 / Otorite</span>
                <h3>Güvenilir Backlink Profili</h3>
                <p>
                  Sektörünüzle alakalı ve yüksek otoriteli sitelerden alınan referanslarla (backlink),
                  sitenizin Google gözündeki güven puanını (Domain Authority) artırıyoruz.
                </p>
              </article>

              <article className="bento-card bento-card-wide bento-card-dark bento-report-card" style={{ gridColumn: '1 / -1' }}>
                <img loading="lazy" decoding="async" src="/images/essen-markasi-5.png" alt="SEO performans raporu" />
                <div className="bento-content">
                  <span>04 / Raporlama</span>
                  <h3>Şeffaf SEO İlerleme Raporu</h3>
                  <p>
                    Hangi kelimede kaçıncı sıraya yükseldik, organik trafiğimiz yüzde kaç arttı?
                    Tüm verileri karmaşadan uzak, okunabilir bir raporda her ay size sunuyoruz.
                  </p>
                </div>
                <div className="metric-strip" aria-hidden="true">
                  <div>
                    <strong>+150%</strong>
                    <small>Trafik</small>
                  </div>
                  <div>
                    <strong>#1</strong>
                    <small>Sıralama</small>
                  </div>
                  <div>
                    <strong>99</strong>
                    <small>Hız Skoru</small>
                  </div>
                </div>
              </article>
            </div>
          </section>

          <InteractiveSeoRoi />

          <SeoRoadmap />

          <SeoToolEcosystem />

          <section className="social-faq-section">
            <div className="social-faq-inner">
              <div className="social-faq-heading">
                <span>SIKÇA SORULAN SORULAR</span>
                <h2>
                  SEO hakkında merak edilenler<span>.</span>
                </h2>
              </div>

              <div className="social-faq-list">
                <details className="social-faq-item" open>
                  <summary>SEO ne kadar sürede etki gösterir?</summary>
                  <p>
                    SEO uzun vadeli bir yatırımdır. Sektördeki rekabet durumuna ve web sitenizin
                    mevcut otoritesine bağlı olarak, belirgin sonuçlar görmeye genellikle 3 ila 6 ay
                    içerisinde başlarız.
                  </p>
                </details>

                <details className="social-faq-item">
                  <summary>Garanti 1. sıra sözü veriyor musunuz?</summary>
                  <p>
                    Hiçbir profesyonel SEO ajansı veya uzmanı Google'da garanti 1. sıra sözü veremez.
                    Çünkü Google'ın algoritması bağımsızdır. Bizim garantimiz, teknik olarak kusursuz,
                    Google yönergelerine %100 uyumlu, güvenilir ve sürdürülebilir yükseliş sağlayan bir çalışmadır.
                  </p>
                </details>

                <details className="social-faq-item">
                  <summary>Lokal (Yerel) SEO nedir?</summary>
                  <p>
                    Eğer fiziksel bir mağazanız veya bölgesel hizmet veren bir işletmeniz varsa,
                    "Kadıköy kuaför" veya "Ankara nakliyat" gibi bölgesel aramalarda sizi
                    Haritalar'da ve arama sonuçlarında üst sıralara çıkaran özel optimizasyondur.
                  </p>
                </details>

                <details className="social-faq-item">
                  <summary>Çalışmalar bitince sıram düşer mi?</summary>
                  <p>
                    SEO bir kerede yapılıp biten bir işlem değil, sürekli bir yarıştır. Rakipleriniz
                    de çalışmaya devam edeceği için, SEO faaliyetleri durduğunda zamanla sıralamalarda
                    gerileme yaşanması doğaldır. Sürdürülebilirlik esastır.
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
