"use client";

import { useState } from "react";
import Link from "next/link";
import "./sss.css";

const FAQ_DATA = [
  {
    category: "Genel",
    questions: [
      { q: "Bromak Agency hangi hizmetleri sunuyor?", a: "Marka stratejisinden web tasarımına, kurumsal kimlikten sosyal medya yönetimine, SEO'dan dijital reklam yönetimine kadar markaların dijitalde ihtiyaç duyduğu birçok hizmeti tek çatı altında sunuyoruz." },
      { q: "Hangi şehirlerde hizmet veriyorsunuz?", a: "Merkezimiz Konya'da bulunuyor. Türkiye'nin ve yurt dışının farklı noktalarındaki markalarla uzaktan veya yüz yüze çalışabiliyoruz." },
      { q: "Kimlerle çalışıyorsunuz?", a: "Yeni kurulan girişimlerden kurumsal markalara kadar farklı ölçeklerde işletmelerle çalışıyoruz." },
      { q: "Sadece tek bir hizmet alabilir miyim?", a: "Evet. İster yalnızca web sitesi, ister logo tasarımı ya da sosyal medya hizmeti alabilirsiniz." }
    ]
  },
  {
    category: "Web Tasarım",
    questions: [
      { q: "Web siteniz mobil uyumlu oluyor mu?", a: "Evet. Geliştirdiğimiz tüm web siteleri mobil, tablet ve masaüstü cihazlarla uyumlu olarak hazırlanır." },
      { q: "Web siteleri SEO uyumlu mu?", a: "Evet. Teknik SEO altyapısı, sayfa yapısı ve performans optimizasyonu projeye dahil edilir." },
      { q: "Yönetim paneli oluyor mu?", a: "Projeye göre değişir. İçeriklerinizi kolayca yönetebileceğiniz sistemler sunabiliyoruz." },
      { q: "Alan adı ve hosting konusunda destek sağlıyor musunuz?", a: "Evet. Gerekli tüm teknik süreçlerde destek sağlıyoruz." }
    ]
  },
  {
    category: "Marka Tasarımı",
    questions: [
      { q: "Sadece logo tasarımı yaptırabilir miyim?", a: "Evet. Bunun yanında kurumsal kimlik ve marka sistemi oluşturma hizmetleri de sunuyoruz." },
      { q: "Kurumsal kimlik neleri kapsıyor?", a: "Logo, renk sistemi, tipografi, kullanım kuralları ve markanızın görsel dilini oluşturan temel öğeleri kapsar." },
      { q: "Markam için sıfırdan bir kimlik oluşturabilir misiniz?", a: "Evet. Marka konumlandırmasından görsel kimliğe kadar uçtan uca destek sağlıyoruz." }
    ]
  },
  {
    category: "Sosyal Medya",
    questions: [
      { q: "Sosyal medya hesaplarını siz mi yönetiyorsunuz?", a: "Talebe göre içerik üretimi, tasarım, planlama ve hesap yönetimi hizmeti sunabiliyoruz." },
      { q: "İçerikler markama özel hazırlanıyor mu?", a: "Evet. Hazır şablonlar yerine markanızın sektörüne ve hedef kitlesine uygun içerikler üretiyoruz." },
      { q: "Reels ve hikâye tasarımları da hazırlıyor musunuz?", a: "Evet. Sosyal medya platformlarına uygun farklı içerik formatları hazırlıyoruz." }
    ]
  },
  {
    category: "SEO & Dijital Pazarlama",
    questions: [
      { q: "SEO hizmeti veriyor musunuz?", a: "Evet. Teknik SEO, içerik optimizasyonu ve arama motoru görünürlüğünü artırmaya yönelik çalışmalar yürütüyoruz." },
      { q: "Google Analytics ve Meta Pixel kurulumu yapıyor musunuz?", a: "Evet. Analiz ve dönüşüm takibi için gerekli teknik kurulumları gerçekleştiriyoruz." },
      { q: "Google Search Console kurulumu da yapılıyor mu?", a: "Evet. Web sitenizin arama performansını takip edebilmeniz için gerekli entegrasyonları sağlıyoruz." }
    ]
  },
  {
    category: "Çalışma Süreci",
    questions: [
      { q: "Süreç nasıl ilerliyor?", a: "İhtiyaç analiziyle başlayan süreç; planlama, tasarım, revizyon ve teslim aşamalarından oluşur." },
      { q: "Projeler ne kadar sürede tamamlanıyor?", a: "Teslim süresi projenin kapsamına göre değişiklik gösterir. Süre planlaması teklif aşamasında paylaşılır." },
      { q: "Revizyon hakkım bulunuyor mu?", a: "Evet. Proje kapsamına göre belirlenen revizyon süreçleri uygulanır." }
    ]
  },
  {
    category: "Ödeme",
    questions: [
      { q: "Ödeme seçenekleri nelerdir?", a: "Proje kapsamına göre farklı ödeme yöntemleri sunulmaktadır. Detaylı bilgi teklif aşamasında paylaşılır." },
      { q: "Fiyatlar nasıl belirleniyor?", a: "Her proje kapsam, ihtiyaç ve hedeflere göre ayrı değerlendirilerek fiyatlandırılır." },
      { q: "Teklif almak ücretli mi?", a: "Hayır. İhtiyaç analizi ve teklif hazırlama süreci ücretsizdir." }
    ]
  },
  {
    category: "Destek",
    questions: [
      { q: "Teslimden sonra destek veriyor musunuz?", a: "Evet. Hizmet türüne göre teslim sonrası teknik ve danışmanlık desteği sunuyoruz." },
      { q: "Mevcut web sitem üzerinde çalışabilir misiniz?", a: "Evet. Mevcut projeler üzerinde geliştirme, bakım ve iyileştirme çalışmaları yapabiliyoruz." },
      { q: "İletişime nasıl geçebilirim?", a: "İletişim formunu doldurabilir, e-posta gönderebilir veya telefon üzerinden bizimle iletişime geçebilirsiniz." }
    ]
  }
];

export default function FAQClient() {
  const [activeCategory, setActiveCategory] = useState("Genel");
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const categories = FAQ_DATA.map(data => data.category);
  const currentCategoryData = FAQ_DATA.find(d => d.category === activeCategory);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setOpenIndex(0); // Kategoriyi değiştirince ilk soruyu otomatik aç
  };

  return (
    <>
      <div className="sss-categories">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`sss-cat-btn ${activeCategory === cat ? "active" : ""}`}
            onClick={() => handleCategoryChange(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="sss-accordion-list">
        {currentCategoryData?.questions.map((faq, index) => (
          <div key={index} className={`sss-accordion-item ${openIndex === index ? "open" : ""}`}>
            <button 
              className="sss-accordion-header"
              onClick={() => handleToggle(index)}
              aria-expanded={openIndex === index}
            >
              {faq.q}
              <div className="sss-icon"></div>
            </button>
            <div className="sss-accordion-body">
              <p>{faq.a}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="sss-cta-premium">
        <div className="sss-cta-bg-glow"></div>
        <div className="sss-cta-content">
          <h3>Hâlâ aklınızda soru işaretleri mi var?</h3>
          <p>Dijital büyüme yolculuğunuzda yalnız değilsiniz. Gelin, aklınızdaki tüm soruları sıcacık bir çay eşliğinde, yüz yüze konuşalım.</p>
          <button className="sss-cta-magic-btn" onClick={() => setIsPopupOpen(true)}>
            <span>Bizi Ziyaret Edin</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '10px', verticalAlign: 'middle' }}>
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </button>
        </div>
      </div>

      {isPopupOpen && (
        <div className="sss-modal-overlay" onClick={() => setIsPopupOpen(false)}>
          <div className="sss-modal-content" onClick={e => e.stopPropagation()}>
            <button className="sss-modal-close" onClick={() => setIsPopupOpen(false)}>✕</button>
            
            <div className="sss-modal-header">
              <h2>Tanışmaya Hazır Mıyız?</h2>
              <p>İster ofisimizde bir kahve içelim, ister hemen şimdi bize bir mesaj bırakın.</p>
            </div>

            <div className="sss-modal-grid">
              {/* Haritalar Grubu */}
              <div className="sss-modal-group">
                <h3 className="modal-group-title">Yol Tarifi Alın</h3>
                <div className="modal-btn-list">
                  <a 
                    href="https://share.google/Ic15ICyWjzDdE0vI0" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="sss-modal-action-btn map"
                  >
                    <div className="action-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                      </svg>
                    </div>
                    <div className="action-text">
                      <strong>Google Haritalar</strong>
                      <span>Konumumuza git</span>
                    </div>
                  </a>

                  <a 
                    href="https://maps.apple.com/place?auid=16421226335100912468&address=Horasan+Sk.+4%2C+42080+Sel%C3%A7uklu+Konya%2C+T%C3%BCrkiye&coordinate=37.890285%2C32.464900&name=Bromak+Agency+-+Konya+Reklam+Ajans%C4%B1&lsp=9902" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="sss-modal-action-btn map"
                  >
                    <div className="action-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon>
                      </svg>
                    </div>
                    <div className="action-text">
                      <strong>Apple Haritalar</strong>
                      <span>Konumumuza git</span>
                    </div>
                  </a>
                </div>
              </div>

              {/* İletişim Grubu */}
              <div className="sss-modal-group" style={{ marginTop: "16px" }}>
                <h3 className="modal-group-title">Bize Yazın</h3>
                <div className="modal-btn-list">
                  <Link 
                    href="/iletisim" 
                    className="sss-modal-action-btn mail"
                    onClick={() => setIsPopupOpen(false)}
                  >
                    <div className="action-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                        <polyline points="22,6 12,13 2,6"></polyline>
                      </svg>
                    </div>
                    <div className="action-text">
                      <strong>Mesaj Bırakın</strong>
                      <span>İletişim formuna gidin</span>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
