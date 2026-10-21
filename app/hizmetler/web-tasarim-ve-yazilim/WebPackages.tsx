import Link from "next/link";
import "./web-packages.css";

const packages = [
  {
    title: "Kurumsal Web Sitesi",
    tag: "B2B & ŞİRKETLER",
    desc: "Konya Organize Sanayi, üretim, sağlık ve kurumsal firmalar için prestij ve müşteri kazandıran dijital vitrin.",
    features: [
      "Markanıza özel UI/UX tasarım (Sıfır hazır şablon)",
      "%100 Mobil ve tablet uyumlu responsive yapı",
      "Next.js mimarisiyle ultra hızlı açılış (< 1 saniye)",
      "Google Core Web Vitals ve Teknik SEO altyapısı",
      "Türkçe, kolay kullanılabilir yönetim paneli",
      "Kurumsal e-posta kurulumu ve SSL güvenlik sertifikası",
      "WhatsApp & dinamik iletişim formları entegrasyonu"
    ],
    highlight: false,
    ctaText: "Kurumsal Teklif Al"
  },
  {
    title: "E-Ticaret & Katalog",
    tag: "EN ÇOK TERCİH EDİLEN",
    desc: "Ürünlerinizi Türkiye'ye ve dünyaya 7/24 satabileceğiniz yüksek dönüşümlü satış platformu.",
    features: [
      "Tüm bankalar ve İyzico / PayTR sanal POS entegrasyonu",
      "Kargo ve sipariş takip otomasyonu",
      "Pazaryeri (Trendyol, Hepsiburada) entegrasyon altyapısı",
      "Gelişmiş filtreleme ve stok yönetim paneli",
      "Terk edilen sepet ve kampanya kurguları",
      "Çoklu dil ve çoklu para birimi desteği",
      "Hızlı ve güvenli tek sayfa ödeme (One-step checkout)"
    ],
    highlight: true,
    ctaText: "E-Ticaret Projesi Başlat"
  },
  {
    title: "Özel Web Yazılımı & Portal",
    tag: "BÜYÜK ÖLÇEKLİ PROJELER",
    desc: "İşletmenizin süreçlerine tam oturan bayi ağları, B2B portalları ve özel web uygulamaları.",
    features: [
      "İşletmenize özel veritabanı ve API mimarisi",
      "B2B bayi sipariş ve cari takip sistemleri",
      "ERP, Muhasebe (Logo, Mikro) yazılım entegrasyonları",
      "Kullanıcı yetkilendirme ve rol yönetimi",
      "Detaylı raporlama ve analitik gösterge paneli",
      "AWS / Cloud altyapısında yüksek güvenlik ve yedekleme",
      "Ömür boyu teknik destek ve bakım opsiyonu"
    ],
    highlight: false,
    ctaText: "Özel Çözüm Planla"
  }
];

export default function WebPackages() {
  return (
    <section className="web-packages-section">
      <div className="web-packages-container">
        <div className="web-packages-header">
          <span className="wp-eyebrow">ÇÖZÜMLERİMİZ & PAKET KAPSAMLARI</span>
          <h2>İhtiyacınıza En Uygun Web Tasarım Çözümü</h2>
          <p>
            Konya web tasarım projelerinde şeffaf süreç ve sıfır sürpriz maliyet. 
            İşletmenizin hedeflerine göre özelleştirilmiş kurumsal paketlerimizi inceleyin.
          </p>
        </div>

        <div className="web-packages-grid">
          {packages.map((pkg, idx) => (
            <div key={idx} className={`wp-card ${pkg.highlight ? "is-featured" : ""}`}>
              {pkg.highlight && <div className="wp-badge">ÖNERİLEN</div>}
              <div className="wp-tag">{pkg.tag}</div>
              <h3 className="wp-title">{pkg.title}</h3>
              <p className="wp-desc">{pkg.desc}</p>

              <div className="wp-divider" />

              <ul className="wp-features-list">
                {pkg.features.map((feat, fIdx) => (
                  <li key={fIdx}>
                    <svg className="wp-check-icon" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>

              <Link href="/iletisim" className={`wp-cta-btn ${pkg.highlight ? "btn-primary" : "btn-secondary"}`}>
                {pkg.ctaText}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
