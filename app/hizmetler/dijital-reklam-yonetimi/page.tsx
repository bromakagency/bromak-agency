import type { Metadata } from "next";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import Animations from "@/app/components/Animations";
import StoryBentoCard from "./StoryBentoCard";
import InteractiveRoasCalc from "./InteractiveRoasCalc";
import PlatformEcosystem from "./PlatformEcosystem";
import MetaViewContentTracker from "@/app/components/MetaViewContentTracker";
import "./detay.css";

import { getSeoMetadata } from "@/app/lib/seo";

export async function generateMetadata() {
  return getSeoMetadata("hizmetler-reklam", {
    title: "Dijital Reklam Yönetimi | Bromak Agency",
    description: "Google Ads, Meta ve diğer platformlarda hedef kitlenize ulaşacak, bütçenizi verimli kullanan kampanyalar tasarlıyoruz.",
    keywords: "dijital reklam, google ads, meta reklamları, sosyal medya reklam"
  }, "/hizmetler/dijital-reklam-yonetimi");
}

export default function DijitalReklamDetay() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://bromakagency.com/hizmetler/dijital-reklam-yonetimi/#service",
    "name": "Dijital Reklam Yönetimi",
    "provider": {
      "@id": "https://bromakagency.com/#organization"
    },
    "description": "Google Ads, Meta Ads, TikTok ve diğer performans kanallarında veri odaklı kampanyalarla maksimum dönüşüm ve ROAS sağlıyoruz.",
    "url": "https://bromakagency.com/hizmetler/dijital-reklam-yonetimi"
  };

  return (
    <div className="page-wrapper">
      <MetaViewContentTracker content_name="Dijital Reklam Yönetimi" content_category="Hizmet" />
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
                Dijital Reklamlarla<br />
                <strong>Büyümeyi Hızlandırın.</strong>
              </h1>
              <p>
                Veri odaklı stratejiler ve performans pazarlamasıyla markanızı
                doğru hedef kitleye ulaştırıyor, dönüşüm oranlarınızı maksimize ediyoruz.
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

          <section className="service-showcase-mosaic" aria-label="Dijital reklam platformları">
            <article className="showcase-panel showcase-panel-main">
              <img loading="lazy" decoding="async" src="/images/essen-markasi.png" alt="Google Ads" />
              <div className="showcase-panel-copy">
                <h2>Google Ads</h2>
                <p>Search, Display, YouTube and Shopping campaigns that capture high-intent users.</p>
              </div>
            </article>

            <div className="showcase-side-grid">
              <article className="showcase-panel showcase-panel-wide">
                <img loading="lazy" decoding="async" src="/images/dies-markasi.png" alt="Meta Ads" />
                <div className="showcase-panel-copy">
                  <h3>Meta Ads</h3>
                  <p>Targeted campaigns on Facebook and Instagram for scalable growth.</p>
                </div>
              </article>

              <article className="showcase-panel showcase-panel-small showcase-panel-2d">
                <img loading="lazy" decoding="async" src="/images/essen-markasi-2.png" alt="TikTok Ads" />
                <div className="showcase-panel-copy">
                  <h3>TikTok</h3>
                  <p>Engaging short-form video ads for the next generation of consumers.</p>
                </div>
              </article>

              <article className="showcase-panel showcase-panel-tall">
                <img loading="lazy" decoding="async" src="/images/dies-markasi-1.png" alt="Retargeting" />
                <div className="showcase-panel-copy">
                  <h3>Retargeting</h3>
                  <p>Bringing back bounced visitors and turning them into loyal customers.</p>
                </div>
              </article>

              <article className="showcase-panel showcase-panel-small showcase-panel-3d">
                <img loading="lazy" decoding="async" src="/images/essen-markasi-4.png" alt="Data Analytics" />
                <div className="showcase-panel-copy">
                  <h3>Analytics</h3>
                  <p>Deep dive tracking, GA4 setups, and conversion rate optimization.</p>
                </div>
              </article>
            </div>
          </section>

          <section className="social-detail-bento">
            <div className="bento-heading">
              <span>DİJİTAL REKLAM YÖNETİMİ</span>
              <h2>
                Veriyle beslenen stratejiler, ölçülebilir büyüme<span>.</span>
              </h2>
              <p>
                Arama motorlarından sosyal ağlara kadar her platformda en iyi getiriyi (ROI)
                sağlamak için bütçenizi akıllıca yönetiyor, A/B testleriyle reklamlarınızı 
                sürekli optimize ediyoruz.
              </p>
            </div>

            <div className="bento-grid">
              <StoryBentoCard />

              <article className="bento-card bento-card-red">
                <span>02 / Performans</span>
                <h3>Gerçek Zamanlı Optimizasyon</h3>
                <p>
                  ROAS (Reklam Harcaması Getirisi) ve CAC (Müşteri Edinme Maliyeti) odaklı
                  anlık müdahalelerle bütçenizi koruyoruz.
                </p>
                <div className="roas-preview" aria-hidden="true">
                  <div className="roas-chart-bar">
                    <div className="roas-fill" style={{ width: "85%" }}></div>
                  </div>
                  <div className="roas-metrics">
                    <strong>8.5x</strong>
                    <span>Hedef ROAS</span>
                  </div>
                  <div className="roas-chart-bar">
                    <div className="roas-fill" style={{ width: "45%", background: "#ff7f7a" }}></div>
                  </div>
                  <div className="roas-metrics">
                    <strong>₺42</strong>
                    <span>Edinme Maliyeti</span>
                  </div>
                </div>
              </article>

              <article className="bento-card bento-card-image">
                <img loading="lazy" decoding="async" src="/images/essen-markasi-4.png" alt="Hedef kitle" />
                <div className="bento-overlay">
                  <span>03 / Hedefleme</span>
                  <h3>Nokta Atışı Hedef Kitle (Lookalike & Retargeting)</h3>
                </div>
              </article>

              <article className="bento-card bento-card-light">
                <span>04 / A/B Testleri</span>
                <h3>Sürekli Deney, Maksimum Verim</h3>
                <p>
                  Hangi görselin, hangi metnin veya hangi kitle ayarının daha iyi
                  çalıştığını varsayımlarla değil, verilerle buluyoruz.
                </p>
              </article>

              <article className="bento-card bento-card-wide bento-card-dark bento-report-card">
                <img loading="lazy" decoding="async" src="/images/essen-markasi-5.png" alt="Performans raporu" />
                <div className="bento-content">
                  <span>05 / Şeffaf Raporlama</span>
                  <h3>Karmaşık verileri net tablolara dönüştürüyoruz</h3>
                  <p>
                    Nereye ne kadar harcadınız ve karşılığında tam olarak ne kazandınız?
                    Her şey şeffaf, ölçülebilir ve anlaşılır.
                  </p>
                </div>
                <div className="metric-strip" aria-hidden="true">
                  <div>
                    <strong>+140%</strong>
                    <small>ROAS Artışı</small>
                  </div>
                  <div>
                    <strong>-35%</strong>
                    <small>CPL Düşüşü</small>
                  </div>
                  <div>
                    <strong>24/7</strong>
                    <small>Analiz</small>
                  </div>
                </div>
              </article>

              <article className="bento-card bento-card-image">
                <img loading="lazy" decoding="async" src="/images/dies-markasi-2.png" alt="Ölçeklendirme" />
                <div className="bento-overlay">
                  <span>06 / Büyüme</span>
                  <h3>Sınırları Zorlayan Ölçeklendirme (Scaling)</h3>
                </div>
              </article>
            </div>
          </section>
          <InteractiveRoasCalc />

          <PlatformEcosystem />

          <section className="social-faq-section">
            <div className="social-faq-inner">
              <div className="social-faq-heading">
                <span>SIKÇA SORULAN SORULAR</span>
                <h2>
                  Dijital reklam yönetimi hakkında merak edilenler<span>.</span>
                </h2>
              </div>

              <div className="social-faq-list">
                <details className="social-faq-item" open>
                  <summary>Dijital reklam süreci nasıl başlıyor?</summary>
                  <p>
                    Önce hedeflerinizi (satış, lead vb.) ve geçmiş reklam verilerinizi analiz ediyoruz.
                    Ardından bütçe planlaması, kullanılacak kanallar ve kampanya kurgularını netleştiriyoruz.
                  </p>
                </details>

                <details className="social-faq-item">
                  <summary>Hangi platformlara reklam veriyorsunuz?</summary>
                  <p>
                    Google Ads, Meta (Facebook & Instagram), TikTok ve LinkedIn başta olmak üzere 
                    hedef kitlenizin bulunduğu tüm dijital performans kanallarında kampanyalar kuruyoruz.
                  </p>
                </details>

                <details className="social-faq-item">
                  <summary>Aylık bütçe nasıl belirleniyor?</summary>
                  <p>
                    Sektörünüzün rekabet durumuna ve hedeflerinize göre bir başlangıç test bütçesi belirliyor, 
                    veri geldikçe ve verim arttıkça bütçeyi ölçeklendiriyoruz.
                  </p>
                </details>

                <details className="social-faq-item">
                  <summary>Ne zaman sonuç alırım?</summary>
                  <p>
                    Kurulumlar tamamlandıktan sonraki ilk 2-4 hafta makine öğrenimi ve A/B test aşamasıdır. 
                    Çoğu durumda ilk aydan itibaren anlamlı ve ölçülebilir dönüşümler (satış/form) gelmeye başlar.
                  </p>
                </details>

                <details className="social-faq-item">
                  <summary>Reklam görsellerini kim hazırlıyor?</summary>
                  <p>
                    İsterseniz mevcut materyallerinizi kullanabiliriz veya ajansımızın kreatif ekibi, 
                    performans ve dönüşüm odaklı özel banner ve video reklam tasarımlarınızı hazırlayabilir.
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
