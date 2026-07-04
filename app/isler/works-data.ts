export type WorkItem = {
  slug: string;
  title: string;
  image: string;
  tags: string[];
  description: string;
  gallery: {
    image: string;
    className: string;
    alt: string;
  }[];
};

export const works: WorkItem[] = [
  {
    slug: "dies-markasi",
    title: "Dies Markası",
    image: "/images/dies-markasi.png",
    tags: ["Strateji", "Sosyal Medya", "İçerik"],
    description:
      "Endüstriyel üretim odağındaki marka iletişimini sosyal medya, görsel tasarım ve kampanya kurgusuyla daha okunabilir hale getirdik.",
    gallery: [
      { image: "/images/dies-markasi.png", className: "detail-tile-wide", alt: "Dies marka ana görseli" },
      { image: "/images/dies-markasi-1.png", className: "detail-tile-tall", alt: "Dies dikey içerik tasarımı" },
      { image: "/images/dies-markasi-2.png", className: "detail-tile-medium", alt: "Dies sosyal medya paylaşımı" },
      { image: "/images/dies-markasi.png", className: "detail-tile-medium", alt: "Dies marka sunumu" },
      { image: "/images/dies-markasi-1.png", className: "detail-tile-large", alt: "Dies kampanya görseli" },
      { image: "/images/dies-markasi-2.png", className: "detail-tile-small", alt: "Dies içerik detayı" },
      { image: "/images/dies-markasi.png", className: "detail-tile-wide", alt: "Dies kapanış görseli" },
    ],
  },
  {
    slug: "essen-markasi",
    title: "Essen Markası",
    image: "/images/essen-markasi.png",
    tags: ["Branding", "Tasarım", "Kampanya"],
    description:
      "Markanın dijital yüzünü kampanya görselleri, kreatif konseptler ve düzenli içerik akışıyla daha güçlü bir hikayeye taşıdık.",
    gallery: [
      { image: "/images/essen-markasi.png", className: "detail-tile-wide", alt: "Essen marka ana görseli" },
      { image: "/images/essen-markasi-1.png", className: "detail-tile-medium", alt: "Essen kampanya içeriği" },
      { image: "/images/essen-markasi-2.png", className: "detail-tile-tall", alt: "Essen dikey sosyal medya tasarımı" },
      { image: "/images/essen-markasi-3.png", className: "detail-tile-medium", alt: "Essen kreatif paylaşım" },
      { image: "/images/essen-markasi-4.png", className: "detail-tile-large", alt: "Essen ürün odaklı görsel" },
      { image: "/images/essen-markasi-5.png", className: "detail-tile-small", alt: "Essen sosyal medya detayı" },
      { image: "/images/essen-markasi.png", className: "detail-tile-wide", alt: "Essen kapanış görseli" },
    ],
  },
  {
    slug: "dies-icerik-serisi",
    title: "Dies İçerik Serisi",
    image: "/images/dies-markasi-1.png",
    tags: ["Reels", "Görsel Tasarım", "Planlama"],
    description:
      "Tekil içeriklerden seri iletişime geçerek markanın sosyal medya ritmini daha planlı ve sürdürülebilir bir yapıya aldık.",
    gallery: [
      { image: "/images/dies-markasi-1.png", className: "detail-tile-wide", alt: "Dies içerik serisi ana görseli" },
      { image: "/images/dies-markasi.png", className: "detail-tile-medium", alt: "Dies marka görseli" },
      { image: "/images/dies-markasi-2.png", className: "detail-tile-tall", alt: "Dies içerik serisi dikey tasarım" },
      { image: "/images/dies-markasi-1.png", className: "detail-tile-large", alt: "Dies reels planlama görseli" },
      { image: "/images/dies-markasi.png", className: "detail-tile-small", alt: "Dies sosyal medya detayı" },
    ],
  },
  {
    slug: "essen-kreatif-kampanya",
    title: "Essen Kreatif Kampanya",
    image: "/images/essen-markasi-4.png",
    tags: ["Kreatif", "İllüstrasyon", "Dijital"],
    description:
      "Kampanya fikrini görsel dil, mesaj ve platform formatlarıyla bütünleştirerek daha dikkat çekici bir dijital anlatı kurduk.",
    gallery: [
      { image: "/images/essen-markasi-4.png", className: "detail-tile-wide", alt: "Essen kreatif kampanya ana görseli" },
      { image: "/images/essen-markasi-2.png", className: "detail-tile-tall", alt: "Essen kampanya dikey görseli" },
      { image: "/images/essen-markasi-1.png", className: "detail-tile-medium", alt: "Essen kreatif içerik" },
      { image: "/images/essen-markasi-5.png", className: "detail-tile-large", alt: "Essen dijital kampanya" },
      { image: "/images/essen-markasi-3.png", className: "detail-tile-small", alt: "Essen kampanya detayı" },
    ],
  },
  {
    slug: "dies-sosyal-medya",
    title: "Dies Sosyal Medya",
    image: "/images/dies-markasi-2.png",
    tags: ["Reklam", "Performans", "Raporlama"],
    description:
      "İçerik üretimi, reklam kreatifleri ve performans raporlarını aynı yönetim akışında birleştirerek ölçülebilir bir sosyal medya düzeni kurduk.",
    gallery: [
      { image: "/images/dies-markasi-2.png", className: "detail-tile-wide", alt: "Dies sosyal medya ana görseli" },
      { image: "/images/dies-markasi.png", className: "detail-tile-tall", alt: "Dies reklam kreatifi" },
      { image: "/images/dies-markasi-1.png", className: "detail-tile-medium", alt: "Dies raporlama görseli" },
      { image: "/images/dies-markasi-2.png", className: "detail-tile-large", alt: "Dies performans içeriği" },
      { image: "/images/dies-markasi.png", className: "detail-tile-small", alt: "Dies marka detayı" },
    ],
  },
  {
    slug: "essen-dijital-kimlik",
    title: "Essen Dijital Kimlik",
    image: "/images/essen-markasi-5.png",
    tags: ["Kimlik", "Konsept", "Yayın Akışı"],
    description:
      "Dijital kimlik hissini güçlendiren görsel sistem, içerik şablonları ve yayın akışıyla markaya tutarlı bir sosyal medya dili hazırladık.",
    gallery: [
      { image: "/images/essen-markasi-5.png", className: "detail-tile-wide", alt: "Essen dijital kimlik ana görseli" },
      { image: "/images/essen-markasi.png", className: "detail-tile-medium", alt: "Essen marka kimliği" },
      { image: "/images/essen-markasi-3.png", className: "detail-tile-tall", alt: "Essen konsept tasarım" },
      { image: "/images/essen-markasi-1.png", className: "detail-tile-large", alt: "Essen yayın akışı görseli" },
      { image: "/images/essen-markasi-4.png", className: "detail-tile-small", alt: "Essen dijital detay" },
    ],
  },
];

export function getWorkBySlug(slug: string) {
  return works.find((work) => work.slug === slug);
}
