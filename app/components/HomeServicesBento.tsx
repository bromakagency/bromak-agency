import Link from "next/link";
import "./HomeServicesBento.css";

export default function HomeServicesBento() {
  return (
    <section className="home-services-section">
      <div className="home-services-header">
        <h2 className="home-services-title">Markanızı Büyüten Çözümler</h2>
      </div>
      <div
        className="service-showcase-mosaic home-services-bento-wrapper"
        aria-label="Hizmetlerimiz"
      >
      <Link href="/hizmetler/sosyal-medya-yonetimi" style={{ textDecoration: 'none' }}>
        <article className="showcase-panel showcase-panel-main">
          <img loading="lazy" decoding="async" src="/images/essen-markasi.png" alt="Sosyal Medya Yönetimi" />
          <div className="showcase-panel-copy">
            <h2>Sosyal Medya<br />Yönetimi</h2>
            <p>İçerik planından kitleye ulaşıma kadar tüm sosyal medya sürecinizi yönetiyoruz.</p>
          </div>
        </article>
      </Link>

      <div className="showcase-side-grid">
        <Link href="/hizmetler/web-tasarim-ve-yazilim" style={{ textDecoration: 'none' }} className="showcase-panel-wide">
          <article className="showcase-panel" style={{ height: '100%' }}>
            <img loading="lazy" decoding="async" src="/images/dies-markasi.png" alt="Web Tasarım ve Yazılım" />
            <div className="showcase-panel-copy">
              <h3>Web Tasarım<br />&amp; Yazılım</h3>
              <p>Ziyaretçiyi müşteriye dönüştüren hızlı, modern ve kullanıcı dostu web siteleri.</p>
            </div>
          </article>
        </Link>

        <Link href="/hizmetler/dijital-reklam-yonetimi" style={{ textDecoration: 'none' }} className="showcase-panel-small showcase-panel-2d">
          <article className="showcase-panel" style={{ height: '100%' }}>
            <img loading="lazy" decoding="async" src="/images/essen-markasi-2.png" alt="Dijital Reklam Yönetimi" />
            <div className="showcase-panel-copy">
              <h3>Dijital Reklam</h3>
              <p>Google, Meta ve sosyal platformlarda hedef odaklı kampanyalar.</p>
            </div>
          </article>
        </Link>

        <Link href="/hizmetler/arama-motoru-optimizasyonu-seo" style={{ textDecoration: 'none' }} className="showcase-panel-tall">
          <article className="showcase-panel" style={{ height: '100%' }}>
            <img loading="lazy" decoding="async" src="/images/dies-markasi-1.png" alt="Arama Motoru Optimizasyonu" />
            <div className="showcase-panel-copy">
              <h3>Arama Motoru<br />Optimizasyonu</h3>
              <p>Google'da üst sıralarda görün, organik trafik ve müşteri kazan.</p>
            </div>
          </article>
        </Link>

        <Link href="/hizmetler" style={{ textDecoration: 'none' }} className="showcase-panel-small showcase-panel-3d">
          <article className="showcase-panel" style={{ height: '100%' }}>
            <img loading="lazy" decoding="async" src="/images/essen-markasi-4.png" alt="Grafik ve Kurumsal Kimlik" />
            <div className="showcase-panel-copy">
              <h3>Grafik &amp;<br />Kimlik</h3>
              <p>Logo, renk paleti ve marka dilinde tutarlı bir görsel kimlik.</p>
            </div>
          </article>
        </Link>
      </div>
      </div>
    </section>
  );
}
