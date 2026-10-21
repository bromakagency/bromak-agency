import "./web-tech-comparison.css";

const comparisons = [
  {
    criterion: "Sayfa Açılış Hızı",
    bromak: "0.4 - 0.8 saniye (Google PageSpeed 95-100)",
    others: "3.5 - 7.0 saniye (Yavaş, hantal eklentiler)",
    benefit: "Ziyaretçiler beklemeden sayfaya girer, reklam maliyetiniz düşer."
  },
  {
    criterion: "Google SEO & Core Web Vitals",
    bromak: "Kusursuz semantik HTML, Edge SSR ve sıfır kod fazlalığı",
    others: "Şişkin CSS/JS dosyaları ve zayıf LCP/CLS puanları",
    benefit: "Google algoritmaları sitenizi rakiplerin doğrudan üzerine çıkarır."
  },
  {
    criterion: "Güvenlik & Siber Saldırı Direnci",
    bromak: "Serverless & Statik mimari — Veritabanı ve açık port riski yok",
    others: "Sürekli güncellenmeyen eklentiler yüzünden sıkça hacklenme",
    benefit: "Siteniz virüs, spam ve çökme tehditlerine karşı %100 korumalıdır."
  },
  {
    criterion: "Tasarım Özgünlüğü",
    bromak: "Figma ile markanıza sıfırdan çizilen özel UI/UX tasarım",
    others: "Herkesin kullandığı hazır şablonların (Theme) kopyalanması",
    benefit: "Kurumsal prestijiniz rakiplerinizden net şekilde ayrışır."
  },
  {
    criterion: "Yönetim & Güncelleme",
    bromak: "Sade, Türkçe ve sadece ihtiyacınız olan hızlı Admin Paneli",
    others: "Karışık, İngilizce ve hata vermeye meyilli paneller",
    benefit: "Teknik bilgi gerektirmeden fotoğraflarınızı ve yazılarınızı güncelleyin."
  }
];

export default function WebTechComparison() {
  return (
    <section className="tech-comparison-section">
      <div className="tech-comparison-container">
        <div className="tc-header">
          <span className="tc-eyebrow">TEKNOLOJİ FARKI</span>
          <h2>Neden Hazır Şablonlar Değil, Bromak Özel Mimarisi?</h2>
          <p>
            Konya web tasarım sektöründe çoğu ajans hazır tema giydirip teslim eder. 
            Bromak Agency olarak biz, markanızı geleceğe taşıyacak en güncel web teknolojilerini (Next.js & React) kullanıyoruz.
          </p>
        </div>

        <div className="tc-table-wrap">
          <table className="tc-table">
            <thead>
              <tr>
                <th className="tc-col-crit">Kriter</th>
                <th className="tc-col-bromak">
                  <div className="tc-th-badge">BROMAK AGENCY</div>
                  <span>Özel Kodlama & Next.js</span>
                </th>
                <th className="tc-col-others">
                  <div className="tc-th-dim">KLASİK AJANSLAR</div>
                  <span>Hazır Tema (WordPress vb.)</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {comparisons.map((row, i) => (
                <tr key={i}>
                  <td className="tc-cell-crit">
                    <strong>{row.criterion}</strong>
                    <small>{row.benefit}</small>
                  </td>
                  <td className="tc-cell-bromak">
                    <div className="tc-icon-good">✓</div>
                    <span>{row.bromak}</span>
                  </td>
                  <td className="tc-cell-others">
                    <div className="tc-icon-bad">✕</div>
                    <span>{row.others}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
