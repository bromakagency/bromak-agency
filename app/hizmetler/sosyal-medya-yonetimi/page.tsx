import type { Metadata } from "next";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import Animations from "@/app/components/Animations";
import StoryBentoCard from "./StoryBentoCard";
import VideoShowcase from "./VideoShowcase";
import MetaViewContentTracker from "@/app/components/MetaViewContentTracker";
import "./detay.css";

import { getSeoMetadata } from "@/app/lib/seo";

export async function generateMetadata() {
  return getSeoMetadata("hizmetler-sosyal", {
    title: "Sosyal Medya Yönetimi | Bromak Agency",
    description: "Markanızın sosyal medyadaki tüm süreçlerini yönetiyor; içerik üretiminden iletişim stratejisine kadar dijital varlığınızı güçlendiriyoruz.",
    keywords: "sosyal medya yönetimi, içerik üretimi, instagram yönetimi, marka yönetimi"
  }, "/hizmetler/sosyal-medya-yonetimi");
}

export default function SosyalMedyaDetay() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://bromakagency.com/hizmetler/sosyal-medya-yonetimi/#service",
    "name": "Sosyal Medya Yönetimi",
    "provider": {
      "@id": "https://bromakagency.com/#organization"
    },
    "description": "Markanızın sosyal medyadaki tüm süreçlerini yönetiyor; içerik üretiminden iletişim stratejisine kadar dijital varlığınızı güçlendiriyoruz.",
    "url": "https://bromakagency.com/hizmetler/sosyal-medya-yonetimi"
  };

  return (
    <div className="page-wrapper">
      <MetaViewContentTracker content_name="Sosyal Medya Yönetimi" content_category="Hizmet" />
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
                Sosyal Medya İle<br />
                <strong>Markanıza Değer Katın.</strong>
              </h1>
              <p>
                Strateji, tasarım ve dijital dünyanın gücünü birleştirerek
                markanızı sosyal mecralarda ileriye taşıyoruz.
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

          <section className="service-showcase-mosaic" aria-label="Sosyal medya üretim alanları">
            <article className="showcase-panel showcase-panel-main">
              <img loading="lazy" decoding="async" src="/images/essen-markasi.png" alt="Visual branding örneği" />
              <div className="showcase-panel-copy">
                <h2>Visual Branding</h2>
                <p>Visual Systems, Styleguides, and Logos everyone will remember.</p>
              </div>
            </article>

            <div className="showcase-side-grid">
              <article className="showcase-panel showcase-panel-wide">
                <img loading="lazy" decoding="async" src="/images/dies-markasi.png" alt="Web tasarım örneği" />
                <div className="showcase-panel-copy">
                  <h3>Web</h3>
                  <p>Websites so easy to use, every visitor knows what to do next.</p>
                </div>
              </article>

              <article className="showcase-panel showcase-panel-small showcase-panel-2d">
                <img loading="lazy" decoding="async" src="/images/essen-markasi-2.png" alt="2D tasarım örneği" />
                <div className="showcase-panel-copy">
                  <h3>2D</h3>
                  <p>Flat Design & Art Direction that grab attention.</p>
                </div>
              </article>

              <article className="showcase-panel showcase-panel-tall">
                <img loading="lazy" decoding="async" src="/images/dies-markasi-1.png" alt="Motion içerik örneği" />
                <div className="showcase-panel-copy">
                  <h3>Motion</h3>
                  <p>Moving things to keep living beings glued to the screen.</p>
                </div>
              </article>

              <article className="showcase-panel showcase-panel-small showcase-panel-3d">
                <img loading="lazy" decoding="async" src="/images/essen-markasi-4.png" alt="3D içerik örneği" />
                <div className="showcase-panel-copy">
                  <h3>3D</h3>
                  <p>Creations that make ideas pop like they should.</p>
                </div>
              </article>
            </div>
          </section>

          <section className="social-detail-bento">
            <div className="bento-heading">
              <span>SOSYAL MEDYA YÖNETİMİ</span>
              <h2>
                Markanızın dijital ritmini uçtan uca yönetiyoruz<span>.</span>
              </h2>
              <p>
                İçerik planından kreatif üretime, topluluk yönetiminden raporlamaya kadar
                sosyal medya varlığınızı düzenli, ölçülebilir ve markanıza özel bir sistemle
                büyütüyoruz.
              </p>
            </div>

            <div className="bento-grid">
              <StoryBentoCard />

              <article className="bento-card bento-card-red">
                <span>02 / Takvim</span>
                <h3>Aylık içerik akışı</h3>
                <p>
                  Kampanya günleri, ürün odakları ve etkileşim fırsatları tek bir yayın planında
                  toplanır.
                </p>
                <div className="calendar-preview" aria-hidden="true">
                  <div className="calendar-preview-head">
                    <strong>Mayıs 2026</strong>
                    <span>12 içerik</span>
                  </div>
                  <div className="calendar-weekdays">
                    <b>Pzt</b>
                    <b>Sal</b>
                    <b>Çar</b>
                    <b>Per</b>
                    <b>Cum</b>
                    <b>Cmt</b>
                    <b>Paz</b>
                  </div>
                  <div className="calendar-days">
                    <i className="muted">27</i>
                    <i className="muted">28</i>
                    <i className="muted">29</i>
                    <i className="muted">30</i>
                    <i className="has-content">1</i>
                    <i>2</i>
                    <i>3</i>
                    <i>4</i>
                    <i className="has-content">5</i>
                    <i>6</i>
                    <i>7</i>
                    <i className="active">8</i>
                    <i>9</i>
                    <i>10</i>
                    <i>11</i>
                    <i>12</i>
                    <i className="has-content">13</i>
                    <i>14</i>
                    <i>15</i>
                    <i className="has-content">16</i>
                    <i>17</i>
                  </div>
                </div>
              </article>

              <article className="bento-card bento-card-image">
                <img loading="lazy" decoding="async" src="/images/essen-markasi-4.png" alt="Kreatif içerik üretimi" />
                <div className="bento-overlay">
                  <span>03 / Kreatif</span>
                  <h3>Görsel tasarım & metin üretimi</h3>
                </div>
              </article>

              <article className="bento-card bento-card-light">
                <span>04 / Topluluk</span>
                <h3>Yorum, mesaj ve marka dili takibi</h3>
                <p>
                  Takipçilerinizle kurulan iletişimi markanızın diliyle yönetir, güven veren
                  ve hızlı bir sosyal medya deneyimi oluştururuz.
                </p>
              </article>

              <article className="bento-card bento-card-wide bento-card-dark bento-report-card">
                <img loading="lazy" decoding="async" src="/images/essen-markasi-5.png" alt="Sosyal medya performans raporu" />
                <div className="bento-content">
                  <span>05 / Raporlama</span>
                  <h3>Her ay okunabilir performans raporu</h3>
                  <p>
                    Erişim, etkileşim, takipçi artışı ve içerik performansını yorumlayarak
                    sonraki ayın aksiyonlarını veriye göre şekillendiriyoruz.
                  </p>
                </div>
                <div className="metric-strip" aria-hidden="true">
                  <div>
                    <strong>+42%</strong>
                    <small>Etkileşim</small>
                  </div>
                  <div>
                    <strong>3.8x</strong>
                    <small>Erişim</small>
                  </div>
                  <div>
                    <strong>24/7</strong>
                    <small>Takip</small>
                  </div>
                </div>
              </article>

              <article className="bento-card bento-card-image">
                <img loading="lazy" decoding="async" src="/images/dies-markasi-2.png" alt="Reklam kampanyası yönetimi" />
                <div className="bento-overlay">
                  <span>06 / Reklam</span>
                  <h3>Kampanya ve hedef kitle optimizasyonu</h3>
                </div>
              </article>
            </div>
          </section>
          <VideoShowcase />

          <section className="social-faq-section">
            <div className="social-faq-inner">
              <div className="social-faq-heading">
                <span>SIKÇA SORULAN SORULAR</span>
                <h2>
                  Sosyal medya yönetimi hakkında merak edilenler<span>.</span>
                </h2>
              </div>

              <div className="social-faq-list">
                <details className="social-faq-item" open>
                  <summary>Sosyal medya yönetimi süreci nasıl başlıyor?</summary>
                  <p>
                    Önce markanızı, hedef kitlenizi ve mevcut hesap performansınızı analiz ediyoruz.
                    Ardından içerik dili, paylaşım takvimi ve büyüme hedeflerini netleştiriyoruz.
                  </p>
                </details>

                <details className="social-faq-item">
                  <summary>İçerik takvimi aylık mı hazırlanıyor?</summary>
                  <p>
                    Evet. Aylık içerik planı oluşturuyor, kampanya günlerini ve marka önceliklerini
                    takvime işliyoruz. Onay sonrası içerikler üretim ve yayın akışına alınıyor.
                  </p>
                </details>

                <details className="social-faq-item">
                  <summary>Reels ve kısa video üretimi dahil mi?</summary>
                  <p>
                    Paket kapsamına göre reels, story ve kısa video formatları planlanabilir.
                    Çekim, kurgu ve yayın formatı markanın ihtiyaçlarına göre belirlenir.
                  </p>
                </details>

                <details className="social-faq-item">
                  <summary>Raporlama nasıl yapılıyor?</summary>
                  <p>
                    Her ay erişim, etkileşim, takipçi artışı ve içerik performansını yorumlayan
                    okunabilir bir rapor sunuyoruz. Bir sonraki ayın aksiyonları bu verilere göre güncellenir.
                  </p>
                </details>

                <details className="social-faq-item">
                  <summary>Reklam yönetimi sosyal medya yönetimine dahil mi?</summary>
                  <p>
                    Organik sosyal medya yönetimi ve reklam yönetimi ayrı planlanabilir. İhtiyaç varsa
                    hedef kitle, bütçe ve kampanya kurgusunu birlikte yönetiyoruz.
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
