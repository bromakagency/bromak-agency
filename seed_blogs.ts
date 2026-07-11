require('dotenv').config();
import { prisma } from './app/lib/prisma';

async function main() {
  const posts = [
    {
      slug: 'seo-calismasi-nasil-yapilir',
      title: 'SEO Çalışması Nasıl Yapılır? Adım Adım Başarı Rehberi',
      summary: 'Web sitenizin Google sıralamalarını yükseltmek için izlemeniz gereken teknik ve içerik odaklı temel SEO adımlarını paylaşıyoruz.',
      content: `
        <p>SEO (Arama Motoru Optimizasyonu), web sitenizin Google gibi arama motorlarında organik olarak üst sıralara çıkmasını sağlayan stratejiler bütünüdür.</p>
        <h3>1. Anahtar Kelime Analizi</h3>
        <p>SEO çalışmasının ilk adımı, hedef kitlenizin ürün veya hizmetlerinizi nasıl aradığını bulmaktır. Yüksek hacimli ve düşük rekabetli kelimeleri hedefleyerek stratejinizi oluşturmalısınız.</p>
        <h3>2. Teknik SEO</h3>
        <p>Sitenizin hızlı yüklenmesi, mobil uyumlu olması ve arama motoru botları tarafından kolay taranabilir olması şarttır. Teknik altyapısı zayıf olan siteler içerikleri ne kadar iyi olursa olsun sıralama alamazlar.</p>
        <h3>3. İçerik Optimizasyonu</h3>
        <p>Kullanıcının niyetini karşılayan, özgün ve kaliteli içerikler üretmelisiniz.</p>
        <p>Tüm bu süreçleri profesyonel bir ekiple yürütmek isterseniz <a href="/hizmetler/arama-motoru-optimizasyonu-seo">Konya SEO hizmetleri</a> sayfamızı inceleyebilir ve bizimle iletişime geçebilirsiniz.</p>
      `,
      category: 'SEO',
      image: '/images/blog/seo-calismasi.jpg', // Placeholder
      readTime: '4 dk',
      author: 'Bromak Agency',
      authorRole: 'SEO Uzmanı',
      published: true
    },
    {
      slug: 'yerel-seo-nedir',
      title: 'Yerel (Local) SEO Nedir? Haritalarda Üst Sıra Taktikleri',
      summary: 'Yerel işletmelerin kendi bölgelerindeki müşteri potansiyeline ulaşması için yerel SEO (Local SEO) tekniklerinin önemini keşfedin.',
      content: `
        <p>Eğer fiziksel bir mağazanız veya yerel hizmet veren bir şirketiniz varsa, Yerel SEO sizin için can damarıdır.</p>
        <h3>Google Benim İşletmem (GBP) Optimizasyonu</h3>
        <p>Google haritalarda çıkmanın en önemli yolu eksiksiz ve optimize edilmiş bir GBP profiline sahip olmaktır. Adres, telefon ve çalışma saatlerinizin web sitenizle tamamen tutarlı olması gerekir.</p>
        <h3>Yerel İncelemeler</h3>
        <p>Gerçek müşterilerinizden gelen yorumlar ve yüksek puanlar, yerel sıralamanızı doğrudan etkiler.</p>
        <p>Siz de bölgenizdeki aramalarda ilk sırada çıkmak istiyorsanız profesyonel <a href="/hizmetler/arama-motoru-optimizasyonu-seo">Konya SEO ajansı</a> Bromak ekibinden destek alabilirsiniz.</p>
      `,
      category: 'SEO',
      image: '/images/blog/yerel-seo.jpg',
      readTime: '3 dk',
      author: 'Bromak Agency',
      authorRole: 'SEO Uzmanı',
      published: true
    },
    {
      slug: 'seo-ajansi-secerken-nelere-dikkat-edilmeli',
      title: 'Doğru SEO Ajansı Seçerken Nelere Dikkat Edilmeli?',
      summary: 'Firmanızın dijitaldeki geleceğini emanet edeceğiniz SEO ajansını seçerken sormanız gereken kritik sorular ve dikkat edilmesi gerekenler.',
      content: `
        <p>Piyasada yüzlerce ajans bulunurken markanız için doğru olanı seçmek zor olabilir. İşte dikkat etmeniz gerekenler:</p>
        <h3>Şeffaf Raporlama</h3>
        <p>İyi bir ajans, size sadece "çalışıyoruz" demez; anahtar kelime sıralamalarındaki artışı, trafik verilerini ve yapılan işlemleri her ay şeffaf bir şekilde raporlar.</p>
        <h3>Gerçekçi Hedefler</h3>
        <p>"Sizi 1 haftada 1. sıraya çıkaracağız" diyenlerden uzak durun. Gerçek SEO organik, kalıcı ve zaman alan bir süreçtir.</p>
        <p>Markanıza özel uzun vadeli başarı stratejisi için <a href="/hizmetler/arama-motoru-optimizasyonu-seo">SEO uzmanı ekibimizle</a> tanışabilirsiniz.</p>
      `,
      category: 'SEO',
      image: '/images/blog/seo-ajansi.jpg',
      readTime: '5 dk',
      author: 'Bromak Agency',
      authorRole: 'Dijital Pazarlama Yöneticisi',
      published: true
    },
    {
      slug: 'seo-fiyatlari-nasil-belirlenir',
      title: 'SEO Fiyatları Neye Göre Belirlenir?',
      summary: 'Aylık SEO hizmet bedellerinin nasıl hesaplandığını ve bu maliyetlerin arka planında yatan çalışmaları inceliyoruz.',
      content: `
        <p>SEO paketleri sabit olamaz çünkü her sitenin mevcut durumu, sektördeki rekabet seviyesi ve hedefleri birbirinden farklıdır.</p>
        <h3>Maliyeti Etkileyen Faktörler</h3>
        <ul>
          <li><strong>Rekabet Düzeyi:</strong> Hedeflediğiniz anahtar kelimelerin rekabet zorluğu (KD).</li>
          <li><strong>Sitenin Mevcut Durumu:</strong> Teknik hataların yoğunluğu ve otorite puanı.</li>
          <li><strong>İçerik İhtiyacı:</strong> Aylık üretilmesi gereken uzman makale sayısı.</li>
        </ul>
        <p>Markanıza özel bütçe ve süreç planlaması için <a href="/hizmetler/arama-motoru-optimizasyonu-seo">kurumsal SEO hizmetlerimizi</a> inceleyin.</p>
      `,
      category: 'SEO',
      image: '/images/blog/seo-fiyat.jpg',
      readTime: '4 dk',
      author: 'Bromak Agency',
      authorRole: 'SEO Danışmanı',
      published: true
    },
    {
      slug: 'e-ticaret-siteleri-icin-seo-optimizasyonlari',
      title: 'E-Ticaret Siteleri İçin Hayati SEO Optimizasyonları',
      summary: 'E-ticaret sitenizin satışlarını artırmak için ürün kategorilerinde ve sayfa yapılarında uygulamanız gereken temel SEO teknikleri.',
      content: `
        <p>Online mağazanızın trafiğini artırmak ve dönüşüm elde etmek, doğru kurgulanmış bir E-Ticaret SEO stratejisinden geçer.</p>
        <h3>Kategori Optimizasyonu</h3>
        <p>Ürünlerinizden ziyade, asıl arama hacmi kategori sayfalarınızdadır. Kategori metinlerini kullanıcı niyeti doğrultusunda detaylandırmalısınız.</p>
        <h3>Site İçi Arama ve Filtreler</h3>
        <p>Kullanıcıların aradığı ürünü hızlı bulması (URL parametre optimizasyonu) crawling bütçesini doğru kullanmanızı sağlar.</p>
        <p>E-ticaret sitenizin trafiğini katlamak için profesyonel <a href="/hizmetler/arama-motoru-optimizasyonu-seo">Arama Motoru Optimizasyonu</a> ekibimizle yola çıkın.</p>
      `,
      category: 'SEO',
      image: '/images/blog/e-ticaret-seo.jpg',
      readTime: '6 dk',
      author: 'Bromak Agency',
      authorRole: 'E-Ticaret Danışmanı',
      published: true
    }
  ];

  for (const post of posts) {
    await prisma.post.upsert({
      where: { slug: post.slug },
      update: { ...post },
      create: { ...post },
    });
  }

  console.log("5 SEO topic cluster blogs inserted/updated successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
