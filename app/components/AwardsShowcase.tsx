import Image from "next/image";
import "./awards-showcase.css";

const baseImages = [
  { src: "/images/slider/cagan.webp", alt: "Çağan" },
  { src: "/images/slider/greendome.webp", alt: "Greendome" },
  { src: "/images/slider/dizgiline1.webp", alt: "Dizgiline Detay 1" },
  { src: "/images/slider/essenhidrolik.webp", alt: "Essen Hidrolik" },
  { src: "/images/slider/tuana_gida_post.webp", alt: "Tuana Gıda Post Çalışması" },
  { src: "/images/slider/mavigri.webp", alt: "Mavi Gri" },
  { src: "/images/slider/dizgiline.webp", alt: "Dizgiline" },
  { src: "/images/slider/essenhidrolik1.webp", alt: "Essen Hidrolik Detay 1" },
  { src: "/images/slider/greendome1.webp", alt: "Greendome Detay 1" },
  { src: "/images/slider/tuana_gida_post1.webp", alt: "Tuana Gıda Post Detay" },
  { src: "/images/slider/fatmaturgut.webp", alt: "Fatma Turgut" },
  { src: "/images/slider/essenhidrolik3.webp", alt: "Essen Hidrolik Detay 2" },
  { src: "/images/slider/dizgiline3.webp", alt: "Dizgiline Detay 2" },
  { src: "/images/slider/tuanagida.webp", alt: "Tuana Gıda Ambalaj" },
  { src: "/images/slider/greendome2.webp", alt: "Greendome Detay 2" },
];

// We need exactly 24 items for a full 360-degree wheel (24 * 15deg = 360deg)
const arcImages = [...baseImages, ...baseImages.slice(0, 9)];

const awards = [
  { src: "/assets/awards/trt-internet-sitesi-2024.svg", alt: "TRT İnternet Sitesi 2024" },
  { src: "/assets/awards/trt_giy_2025.svg", alt: "TRT Geleceğin İletişimcileri 2025" },
  { src: "/assets/awards/trt-radyo-belgesel-2023.svg", alt: "TRT Radyo Belgesel 2023" },
  { src: "/assets/awards/aydın-dogan-2025.svg", alt: "Aydın Doğan 2025" },
  { src: "/assets/awards/aydin-dogan-internet-sitesi-2025.svg", alt: "Aydın Doğan İnternet Sitesi 2025" },
  { src: "/assets/awards/trt_giy_2024.svg", alt: "TRT Geleceğin İletişimcileri 2024" },
  { src: "/assets/awards/trt-internet-sitesi-2025.svg", alt: "TRT İnternet Sitesi 2025" },
  { src: "/assets/awards/trt_giy_2023-radyo.svg", alt: "TRT Geleceğin İletişimcileri 2023" },
  { src: "/assets/awards/trt-radyo-2023.svg", alt: "TRT Radyo 2023" },
  { src: "/assets/awards/trt_giy_2025.svg", alt: "TRT Geleceğin İletişimcileri 2025 " },
  { src: "/assets/awards/trt-internet-sitesi-2024.svg", alt: "TRT İnternet Sitesi 2024 " },
  { src: "/assets/awards/trt_giy_2024.svg", alt: "TRT Geleceğin İletişimcileri 2024 " },
];

export default function AwardsShowcase() {
  return (
    <section className="awards-showcase-section">
      {/* Rotating Wheel of images */}
      <div className="awards-wheel-container" aria-hidden="true">
        <div className="awards-wheel">
          {arcImages.map((img, i) => (
            <div
              key={i}
              className="awards-wheel-item"
              style={{ '--rotate-deg': `${i * 15}deg` } as React.CSSProperties}
            >
              <Image 
                src={img.src} 
                alt={img.alt} 
                loading={i < 8 ? undefined : "lazy"}
                fetchPriority={i < 8 ? "high" : "auto"}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                style={{ objectFit: "cover" }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Center content */}
      <div className="awards-center-content">
        <h2 className="awards-heading">
          Nitelikli işler,<br />tescilli başarılar.
        </h2>
        <p className="awards-sub">
          Yıllar içinde ürettiğimiz işler, ulusal yarışmalarda defalarca ödüle layık görüldü.
        </p>

        <div className="awards-featured-label">ÖDÜLLERİMİZ</div>

        <div className="awards-logos-row">
          {awards.map((award, i) => (
            <Image
              key={i}
              src={award.src}
              alt={award.alt}
              className="award-logo-img"
              width={120}
              height={40}
              style={{ width: 'auto' }}
            />
          ))}
        </div>

        <p className="awards-fine-print">
          * Aldığımız ödüller; TRT Geleceğin İletişimcileri ve Aydın Doğan Genç İletişimciler yarışmalarında internet sitesi tasarımı, radyo programcılığı ve radyo belgeseli kategorilerinde kazanılmıştır.
        </p>
      </div>
    </section>
  );
}
