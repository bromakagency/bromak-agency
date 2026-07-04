import { prisma } from "@/app/lib/prisma"
import { auth } from "@/auth"
import { redirect } from "next/navigation"
import SeoClient from "./SeoClient"

export const metadata = {
  title: "SEO Ayarları | Bromak Admin",
}

export default async function SeoPage() {
  const session = await auth()
  if (!session) redirect("/bromakhome")

  const seoSettings = await prisma.seoSettings.findMany({
    orderBy: { page: "asc" }
  })

  // Ana sayfaların listesi
  const pages = [
    { key: "home", label: "Ana Sayfa", path: "/" },
    { key: "hakkimizda", label: "Hakkımızda", path: "/hakkimizda" },
    { key: "hizmetler", label: "Hizmetler", path: "/hizmetler" },
    { key: "isler", label: "İşler / Portfolyo", path: "/isler" },
    { key: "iletisim", label: "İletişim", path: "/iletisim" },
    { key: "blog", label: "Blog", path: "/blog" },
    { key: "kariyer", label: "Kariyer", path: "/kariyer" },
    { key: "sss", label: "Sıkça Sorulan Sorular", path: "/sikca-sorulan-sorular" },
    { key: "hizmetler-seo", label: "Hizmet: SEO (Arama Motoru Opt.)", path: "/hizmetler/arama-motoru-optimizasyonu-seo" },
    { key: "hizmetler-reklam", label: "Hizmet: Dijital Reklam Yönetimi", path: "/hizmetler/dijital-reklam-yonetimi" },
    { key: "hizmetler-sosyal", label: "Hizmet: Sosyal Medya Yönetimi", path: "/hizmetler/sosyal-medya-yonetimi" },
    { key: "hizmetler-web", label: "Hizmet: Web Tasarım ve Yazılım", path: "/hizmetler/web-tasarim-ve-yazilim" },
  ]

  const defaultSeoValues: Record<string, any> = {
    "home": { title: "Bromak Agency - Konya Reklam Ajansı", description: "Bromak Agency, Konya merkezli bir reklam ve dijital pazarlama ajansıdır. Strateji, tasarım, dijital pazarlama ve içerik üretimi hizmetleri sunuyoruz.", keywords: "konya reklam ajansı, bromak agency, dijital pazarlama konya" },
    "hakkimizda": { title: "Hakkımızda | Bromak Agency", description: "Bromak Agency'nin kuruluşu, vizyonu ve hedefleri.", keywords: "hakkımızda, bromak agency, vizyon, misyon" },
    "hizmetler": { title: "Hizmetlerimiz | Bromak Agency", description: "Markanızı büyütmek için ihtiyacınız olan tüm çözümleri tek çatı altında sunuyoruz. Strateji, tasarım ve dijital pazarlama hizmetlerimizi keşfedin.", keywords: "hizmetler, dijital pazarlama, strateji, tasarım" },
    "isler": { title: "İşlerimiz | Bromak Agency", description: "Bromak Agency tarafından markalar için üretilen sosyal medya, tasarım, strateji ve dijital pazarlama çalışmalarını keşfedin.", keywords: "işlerimiz, portfolyo, bromak agency çalışmaları, tasarım, sosyal medya" },
    "iletisim": { title: "İletişim | Bromak Agency - Konya Reklam Ajansı", description: "Bromak Agency ile iletişime geçin. Konya merkezli reklam ajansımızla projenizi konuşalım. +90 541 366 04 96 | merhaba@bromakagency.com", keywords: "iletişim, bromak agency, konya reklam ajansı, iletişim bilgileri" },
    "blog": { title: "Blog | Bromak Agency", description: "Dijital pazarlama, web tasarım, SEO ve marka yönetimi üzerine güncel ipuçları, stratejiler ve sektör haberleri.", keywords: "blog, dijital pazarlama, seo, web tasarım, marka yönetimi" },
    "kariyer": { title: "Kariyer & İş Başvurusu | Bromak Agency", description: "Bromak Agency ekibine katılmak veya staj yapmak için başvurunuzu gönderin.", keywords: "kariyer, iş başvurusu, staj başvurusu, reklam ajansı iş ilanları" },
    "sss": { title: "Sıkça Sorulan Sorular | Bromak Agency", description: "Bromak Agency ile çalışma süreçleri, hizmetlerimiz ve dijital dünyayla ilgili en çok merak edilen soruların cevapları.", keywords: "sıkça sorulan sorular, sss, bromak agency süreçler, destek" },
    "hizmetler-seo": { title: "Arama Motoru Optimizasyonu (SEO) | Bromak Agency", description: "Google'da üst sıralarda yer alarak organik trafik ve müşteri kazanımını artırıyoruz.", keywords: "seo, arama motoru optimizasyonu, google sıralama, seo ajansı konya" },
    "hizmetler-reklam": { title: "Dijital Reklam Yönetimi | Bromak Agency", description: "Google Ads, Meta ve diğer platformlarda hedef kitlenize ulaşacak, bütçenizi verimli kullanan kampanyalar tasarlıyoruz.", keywords: "dijital reklam, google ads, meta reklamları, sosyal medya reklam" },
    "hizmetler-sosyal": { title: "Sosyal Medya Yönetimi | Bromak Agency", description: "İçerik planından kreatif üretime, topluluk yönetiminden raporlamaya kadar sosyal medya varlığınızı büyütüyoruz.", keywords: "sosyal medya yönetimi, içerik üretimi, instagram yönetimi, marka yönetimi" },
    "hizmetler-web": { title: "Web Tasarım & Yazılım | Bromak Agency", description: "Ziyaretçiyi müşteriye dönüştüren hızlı, modern ve kullanıcı dostu web siteleri geliştiriyoruz.", keywords: "web tasarım, web yazılım, kurumsal web sitesi, konya web tasarım" }
  };

  // Veritabanı ile eşleştirme
  const initialSettings = pages.map(p => {
    const existing = seoSettings.find(s => s.page === p.key)
    const defaults = defaultSeoValues[p.key] || { title: "", description: "", keywords: "" }
    
    return {
      page: p.key,
      label: p.label,
      path: p.path,
      isCustomized: !!existing?.title,
      defaultTitle: defaults.title,
      defaultDescription: defaults.description,
      defaultKeywords: defaults.keywords,
      title: existing?.title || defaults.title,
      description: existing?.description || defaults.description,
      keywords: existing?.keywords || defaults.keywords,
      ogImage: existing?.ogImage || "",
    }
  })

  return (
    <div className="blog-admin-container">
      <div className="page-header">
        <div>
          <h1>SEO Ayarları</h1>
          <p>Tüm ana sayfaların Google arama sonuçlarındaki (Title, Description) görünümünü düzenleyin.</p>
        </div>
      </div>

      <SeoClient initialSettings={initialSettings} />
    </div>
  )
}
