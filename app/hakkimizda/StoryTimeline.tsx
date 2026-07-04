const timelineItems = [
  {
    year: "2020",
    eyebrow: "BAŞLANGIÇ",
    title: "Aynı bakış açısında buluştuk.",
    body: "Selçuk Üniversitesi İletişim Fakültesi'nde başlayan yol arkadaşlığımız, zamanla akademik iş birliklerine ve gerçek sektör projelerine dönüştü.",
  },
  {
    year: "2021",
    eyebrow: "SAHA DENEYİMİ",
    title: "Farklı sektörlerle tanıştık.",
    body: "Gıda, turizm, sanayi ve sanatçı prodüksiyonları başta olmak üzere farklı sektörlerde projeler üreterek saha deneyimimizi artırdık.",
    bullets: [
      "Süreci şeffaflaştırdık.",
      "Yapılan işi görünür kıldık.",
    ],
  },
  {
    year: "2022",
    eyebrow: "GELİŞİM",
    title: "Sahada öğrendik, güçlendik.",
    body: "Projelerimizden edindiğimiz tecrübelerle üretim kabiliyetimizi geliştirdik ve iş disiplinimizi güçlendirdik.",
    bullets: [
      "Her projeye aynı ciddiyetle yaklaştık.",
    ],
  },
  {
    year: "2023",
    eyebrow: "TESCİLLENEN KALİTE",
    title: "Emeğimiz ödüllerle taçlandı.",
    body: "TRT Geleceğin İletişimcileri ve Aydın Doğan Genç İletişimciler yarışmalarında web sitesi, radyo programcılığı ve web tasarımı alanlarında önemli ödüller kazandık.",
    active: true,
  },
  {
    year: "2024",
    eyebrow: "BÜYÜME",
    title: "Üretim disiplinimiz güçlendi.",
    body: "Markalarla kurduğumuz iş ortaklıklarını daha ölçülebilir, daha düzenli ve daha sürdürülebilir hale getirdik. Strateji, tasarım ve prodüksiyon süreçlerini tek bakışta yönetilebilir bir yapıya taşıdık.",
  },
  {
    year: "2025",
    eyebrow: "YENİ UFUKLAR",
    title: "Daha büyük projelere hazır hale geldik.",
    body: "Farklı sektörlerde edindiğimiz saha tecrübesini daha kapsamlı kampanyalara, daha güçlü dijital deneyimlere ve 360 derece reklamcılık çözümlerine dönüştürdük.",
  },
  {
    year: "2026",
    eyebrow: "BROMAK AGENCY",
    title: "Deneyim tek bir çatı altında birleşti.",
    body: "Farklı alanlarda edinilen bilgi birikimi, Bromak Agency çatısı altında tek bir vizyonda toplandı. Amacımız netti: şeffaf, ölçülebilir ve nitelikli çözümler sunmak.",
    after: "Devamı gelecek...",
    blackDot: true,
  },
];

export default function StoryTimeline() {
  return (
    <section className="about-timeline-section" id="hikaye">
      <div className="about-timeline-line" aria-hidden="true" />

      {timelineItems.map((item) => (
        <article
          className={`about-timeline-item${item.active ? " active" : ""}`}
          key={item.year}
        >
          <div className={`about-timeline-dot${item.blackDot ? " black" : ""}`} />
          <div className="about-timeline-year">{item.year}</div>
          <div className="about-timeline-content">
            <span>{item.eyebrow}</span>
            <h2>{item.title}</h2>
            <p>
              {item.body}
              {item.after && (
                <>
                  <br />
                  <br />
                  <strong>{item.after}</strong>
                </>
              )}
            </p>
            {item.bullets && (
              <ul>
                {item.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            )}
          </div>
        </article>
      ))}
    </section>
  );
}
