import type { Metadata } from "next";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import Animations from "@/app/components/Animations";
import PartnerCta from "@/app/components/PartnerCta";
import "./hizmetler.css";

import { getSeoMetadata } from "@/app/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return getSeoMetadata("hizmetler", {
    title: "Hizmetlerimiz | Bromak Agency",
    description: "Markanızı büyütmek için ihtiyacınız olan tüm çözümleri tek çatı altında sunuyoruz. Strateji, tasarım ve dijital pazarlama hizmetlerimizi keşfedin.",
    keywords: "hizmetler, dijital pazarlama, strateji, tasarım"
  }, "/hizmetler");
}

export default function HizmetlerPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": "https://bromakagency.com/hizmetler/#webpage",
    "url": "https://bromakagency.com/hizmetler",
    "name": "Hizmetlerimiz | Bromak Agency",
    "description": "Markanızı büyütmek için ihtiyacınız olan tüm çözümleri tek çatı altında sunuyoruz. Strateji, tasarım ve dijital pazarlama hizmetlerimizi keşfedin.",
    "publisher": {
      "@id": "https://bromakagency.com/#organization"
    },
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "url": "https://bromakagency.com/hizmetler/sosyal-medya-yonetimi",
          "name": "Sosyal Medya Yönetimi"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "url": "https://bromakagency.com/hizmetler/dijital-reklam-yonetimi",
          "name": "Dijital Reklam Yönetimi"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "url": "https://bromakagency.com/hizmetler/web-tasarim-ve-yazilim",
          "name": "Web Tasarım & Yazılım"
        },
        {
          "@type": "ListItem",
          "position": 4,
          "url": "https://bromakagency.com/hizmetler/arama-motoru-optimizasyonu-seo",
          "name": "Arama Motoru Optimizasyonu (SEO)"
        }
      ]
    }
  };

  return (
    <div className="page-wrapper">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <Animations />
      <div className="main-wrapper">
        <Navbar />

        <main className="services-page">
          <section className="services-hero">
            <div className="services-hero-overlay"></div>

            <div className="services-hero-content">
              <h1>Hizmetlerimiz</h1>
              <p>
                Markanızı büyütmek için ihtiyacınız olan tüm çözümleri tek çatı
                altında sunuyoruz.
              </p>

              <div className="services-hero-actions">
                <a href="#hizmetler" className="services-secondary-btn">
                  <span className="services-play-icon">▷</span>
                  Hizmetlerimizi Keşfedin
                </a>
              </div>
            </div>
          </section>

          <section id="hizmetler" className="social-service">
            <div className="service-title">
              <span>HİZMETLERİMİZ</span>
              <h2>Sosyal Medya Yönetimi<span>.</span></h2>
              <p>
                Markanızın sosyal medyadaki tüm süreçlerini yönetiyor; içerik üretiminden
                iletişim stratejisine kadar dijital varlığınızı güçlendiriyoruz.
              </p>
            </div>

            <div className="service-cards">
              <a href="/hizmetler/sosyal-medya-yonetimi" className="service-card">
                <img loading="lazy" decoding="async" src="/images/dies-markasi.png" alt="İçerik üretimi" />
                <div className="card-content">
                  <div className="chips">
                    <span>İçerik Üretimi</span>
                    <span>Görsel Tasarım</span>
                  </div>
                  <h3>İçerik Üretimi & Tasarım</h3>
                  <p>Markanıza özel, dikkat çeken ve etkileşim odaklı içerikler üretiyoruz.</p>
                </div>
              </a>

              <a href="/hizmetler/sosyal-medya-yonetimi" className="service-card service-card-large">
                <img loading="lazy" decoding="async" src="/images/dies-markasi-1.png" alt="Sosyal medya stratejisi" />
                <div className="card-content">
                  <div className="chips">
                    <span>Strateji</span>
                    <span>Planlama</span>
                    <span>Topluluk Yönetimi</span>
                    <span>Raporlama</span>
                  </div>
                  <h3>Sosyal Medya Stratejisi</h3>
                  <p>
                    Hedef kitlenizi analiz ediyor, markanıza özel sosyal medya stratejisi
                    ile büyümenizi sürdürülebilir hale getiriyoruz.
                  </p>
                </div>
              </a>

              <a href="/hizmetler/sosyal-medya-yonetimi" className="service-card">
                <img loading="lazy" decoding="async" src="/images/dies-markasi-2.png" alt="Reklam ve kampanya yönetimi" />
                <div className="card-content">
                  <div className="chips">
                    <span>Reklam Yönetimi</span>
                    <span>Kampanya</span>
                  </div>
                  <h3>Reklam & Kampanya Yönetimi</h3>
                  <p>
                    Hedef odaklı reklam kampanyaları ile görünürlüğünüzü artırıyor, doğru
                    kitleye ulaşıyoruz.
                  </p>
                </div>
              </a>
            </div>
          </section>

          <section className="social-service" style={{ background: '#fff' }}>
            <div className="service-title">
              <span>HİZMETLERİMİZ</span>
              <h2>Dijital Reklam Yönetimi<span>.</span></h2>
              <p>
                Hedef odaklı stratejiler ve yaratıcı kampanya fikirleri ile markanızın 
                dijitaldeki etkileşimini ve satışlarını artırıyoruz.
              </p>
            </div>

            <div className="service-cards">
              <a href="/hizmetler/dijital-reklam-yonetimi" className="service-card">
                <img loading="lazy" decoding="async" src="/images/essen-markasi-3.png" alt="Marka Konumlandırma" />
                <div className="card-content">
                  <div className="chips">
                    <span>Konumlandırma</span>
                    <span>Strateji</span>
                  </div>
                  <h3>Marka Konumlandırma</h3>
                  <p>Markanızı rakiplerinden ayıran en güçlü yönleri belirliyor ve doğru konumlandırıyoruz.</p>

                </div>
              </a>

              <a href="/hizmetler/dijital-reklam-yonetimi" className="service-card service-card-large">
                <img loading="lazy" decoding="async" src="/images/essen-markasi-4.png" alt="Kreatif Strateji" />
                <div className="card-content">
                  <div className="chips">
                    <span>Kreatif</span>
                    <span>Kimlik</span>
                  </div>
                  <h3>Kreatif Strateji & Kimlik</h3>
                  <p>Markanızın görsel ve sözel kimliğini, hedef kitlenizle bağ kuracak şekilde inşa ediyoruz.</p>

                </div>
              </a>

              <a href="/hizmetler/dijital-reklam-yonetimi" className="service-card">
                <img loading="lazy" decoding="async" src="/images/essen-markasi-5.png" alt="Kampanya Fikirleri" />
                <div className="card-content">
                  <div className="chips">
                    <span>Kampanya</span>
                    <span>Fikir</span>
                  </div>
                  <h3>Kampanya Fikirleri</h3>
                  <p>Ses getiren kampanya fikirleri ile markanızın dijital dünyada fark edilmesini sağlıyoruz.</p>

                </div>
              </a>
            </div>
          </section>

          <section className="social-service">
            <div className="service-title">
              <span>HİZMETLERİMİZ</span>
              <h2>Web Tasarım & Yazılım<span>.</span></h2>
              <p>
                Kullanıcı deneyimi odaklı, estetik ve işlevsel web çözümleri ile 
                markanızın dijital dünyadaki yüzünü şekillendiriyoruz.
              </p>
            </div>

            <div className="service-cards">
              <a href="/hizmetler/web-tasarim-ve-yazilim" className="service-card">
                <img loading="lazy" decoding="async" src="/images/dies-markasi.png" alt="Kurumsal Web Sitesi" />
                <div className="card-content">
                  <div className="chips">
                    <span>Web Sitesi</span>
                    <span>E-ticaret</span>
                  </div>
                  <h3>Kurumsal Web & E-ticaret</h3>
                  <p>Hızlı, güvenli ve dönüşüm odaklı web siteleri ve e-ticaret platformları geliştiriyoruz.</p>

                </div>
              </a>

              <a href="/hizmetler/web-tasarim-ve-yazilim" className="service-card service-card-large">
                <img loading="lazy" decoding="async" src="/images/dies-markasi-1.png" alt="UI/UX Tasarım" />
                <div className="card-content">
                  <div className="chips">
                    <span>UI/UX</span>
                    <span>Tasarım</span>
                  </div>
                  <h3>UI/UX Tasarım</h3>
                  <p>Kullanıcıların sitenizde keyifle vakit geçirmesi için modern ve sezgisel arayüzler tasarlıyoruz.</p>

                </div>
              </a>

              <a href="/hizmetler/web-tasarim-ve-yazilim" className="service-card">
                <img loading="lazy" decoding="async" src="/images/dies-markasi-2.png" alt="Özel Yazılım" />
                <div className="card-content">
                  <div className="chips">
                    <span>Özel Yazılım</span>
                    <span>Geliştirme</span>
                  </div>
                  <h3>Özel Yazılım Geliştirme</h3>
                  <p>İşletmenizin ihtiyaçlarına özel, ölçeklenebilir ve performanslı yazılım çözümleri sunuyoruz.</p>

                </div>
              </a>
            </div>
          </section>

          <section className="social-service" style={{ background: '#fff' }}>
            <div className="service-title">
              <span>HİZMETLERİMİZ</span>
              <h2>Arama Motoru Optimizasyonu (SEO)<span>.</span></h2>
              <p>
                Markanızın arama motorlarında görünürlüğünü artırarak, organik trafik 
                ve sürdürülebilir büyüme sağlıyoruz.
              </p>
            </div>

            <div className="service-cards">
              <a href="/hizmetler/arama-motoru-optimizasyonu-seo" className="service-card">
                <img loading="lazy" decoding="async" src="/images/dies-markasi.png" alt="Teknik SEO" />
                <div className="card-content">
                  <div className="chips">
                    <span>Teknik SEO</span>
                    <span>Lokal SEO</span>
                  </div>
                  <h3>Teknik & Lokal SEO</h3>
                  <p>Sitenizin teknik altyapısını optimize ediyor, yerel aramalarda ön plana çıkmanızı sağlıyoruz.</p>

                </div>
              </a>

              <a href="/hizmetler/arama-motoru-optimizasyonu-seo" className="service-card service-card-large">
                <img loading="lazy" decoding="async" src="/images/dies-markasi-1.png" alt="İçerik SEO" />
                <div className="card-content">
                  <div className="chips">
                    <span>İçerik</span>
                    <span>Analiz</span>
                  </div>
                  <h3>İçerik SEO & Analiz</h3>
                  <p>Doğru anahtar kelimeler ve kaliteli içerik stratejileri ile üst sıralarda yer almanızı sağlıyoruz.</p>

                </div>
              </a>

              <a href="/hizmetler/arama-motoru-optimizasyonu-seo" className="service-card">
                <img loading="lazy" decoding="async" src="/images/dies-markasi-2.png" alt="Optimizasyon" />
                <div className="card-content">
                  <div className="chips">
                    <span>Sürekli</span>
                    <span>Optimizasyon</span>
                  </div>
                  <h3>Sürekli Optimizasyon</h3>
                  <p>Verileri düzenli analiz ediyor ve performansınızı artırmak için stratejilerimizi güncelliyoruz.</p>

                </div>
              </a>
            </div>
          </section>

          <section className="social-service">
            <div className="service-title">
              <span>HİZMETLERİMİZ</span>
              <h2>Marka & Strateji<span>.</span></h2>
              <p>
                Markanızın hikayesini doğru kitleye, doğru kanallar ve güçlü 
                bir strateji ile anlatıyoruz.
              </p>
            </div>

            <div className="service-cards">
              <article className="service-card">
                <img loading="lazy" decoding="async" src="/images/dies-markasi.png" alt="Marka Konumlandırma" />
                <div className="card-content">
                  <div className="chips">
                    <span>Konumlandırma</span>
                    <span>Strateji</span>
                  </div>
                  <h3>Marka Konumlandırma</h3>
                  <p>Markanızın karakterini belirliyor ve pazar payınızı artıracak stratejiler geliştiriyoruz.</p>

                </div>
              </article>

              <article className="service-card service-card-large">
                <img loading="lazy" decoding="async" src="/images/dies-markasi-1.png" alt="Kreatif Strateji" />
                <div className="card-content">
                  <div className="chips">
                    <span>Kreatif</span>
                    <span>Konsept</span>
                  </div>
                  <h3>Kreatif Strateji & Konsept</h3>
                  <p>Akılda kalıcı marka konseptleri ve görsel dünyalar yaratarak fark yaratmanızı sağlıyoruz.</p>

                </div>
              </article>

              <article className="service-card">
                <img loading="lazy" decoding="async" src="/images/dies-markasi-2.png" alt="Kurumsal Kimlik" />
                <div className="card-content">
                  <div className="chips">
                    <span>Kimlik</span>
                    <span>Kampanya</span>
                  </div>
                  <h3>Kurumsal Kimlik & Kampanya</h3>
                  <p>Markanızın tüm temas noktalarında profesyonel ve tutarlı bir duruş sergilemesini sağlıyoruz.</p>

                </div>
              </article>
            </div>
          </section>



          <PartnerCta />
        </main>

        <Footer />
      </div>
    </div>
  );
}
