require('dotenv').config();
import { prisma } from './app/lib/prisma';

async function main() {
  const post = {
    slug: 'seo-calismasi-nasil-yapilir-adim-adim-rehber',
    title: 'SEO Çalışması Nasıl Yapılır? Adım Adım Başarı Rehberi',
    summary: 'Web sitenizin Google sıralamalarını organik olarak yükseltmek için izlemeniz gereken teknik, içerik ve otorite odaklı temel SEO adımlarını uzmanından öğrenin.',
    content: `
      <p>Dijital dünyada var olmak artık sadece şık bir web sitesine sahip olmakla bitmiyor; potansiyel müşterileriniz sizi aradığında bulunabilir olmanız gerekiyor. İşte bu noktada <strong>SEO (Arama Motoru Optimizasyonu)</strong> devreye giriyor. Peki, sıfırdan başlayan bir site için veya trafiğini artırmak isteyen köklü bir marka için SEO çalışması nasıl yapılır? Gelin, süreci adım adım inceleyelim.</p>

      <h2>Adım 1: Anahtar Kelime ve Arama Niyeti Analizi</h2>
      <p>SEO'nun temeli, hedef kitlenizin arama alışkanlıklarını anlamaktır. Kullanıcılar ürününüzü veya hizmetinizi ararken Google'a tam olarak ne yazıyor? Hacmi yüksek ancak rekabeti görece düşük (Low Keyword Difficulty) kelimeleri bularak işe başlamalısınız. Daha da önemlisi, arama niyetini (Search Intent) doğru anlamaktır. Bir kullanıcı bilgi mi arıyor, yoksa doğrudan satın alma aşamasında mı?</p>

      <h2>Adım 2: Teknik SEO Altyapısının Kurulması</h2>
      <p>İçeriğiniz ne kadar iyi olursa olsun, teknik olarak zayıf bir site arama motoru botları tarafından taranamaz. Temel teknik SEO adımları şunları içerir:</p>
      <ul>
        <li><strong>Site Hızı (Core Web Vitals):</strong> Siteniz 3 saniyenin altında yüklenmelidir.</li>
        <li><strong>Mobil Uyumluluk:</strong> Google, mobil öncelikli indeksleme (Mobile-First Indexing) yapar. Tasarımınız mobilde kusursuz çalışmalıdır.</li>
        <li><strong>URL Yapısı ve SSL:</strong> Güvenli (HTTPS) ve kısa, anlaşılır URL yapıları tercih edilmelidir.</li>
      </ul>

      <h2>Adım 3: Sayfa İçi (On-Page) SEO ve İçerik Üretimi</h2>
      <p>Arama motorları botları için değil, insanlar için yazın. Hedeflediğiniz anahtar kelimeleri sayfa başlıklarınızda (H1, H2), meta açıklamalarda ve içeriğin ilk paragraflarında doğal bir şekilde kullanın. Yüzeysel içerikler yerine, kullanıcının sorununu tam anlamıyla çözen "kapsamlı" rehberler oluşturun.</p>

      <h2>Adım 4: Yerel (Local) SEO'nun Gücünü Kullanın</h2>
      <p>Eğer hizmetlerinizi belirli bir şehirde veya bölgede sunuyorsanız, ulusal rakiplerle savaşmak yerine kendi pazarınıza odaklanmak size çok daha hızlı dönüşüm getirir. İşletme profilinizi (Google Business Profile) eksiksiz doldurmak, müşteri yorumları almak ve sitenizde bölgesel terimler kullanmak kritik önem taşır. Örneğin, kendi bölgelerinde organik büyüme hedefleyen işletmelerin <a href="/hizmetler/arama-motoru-optimizasyonu-seo">Konya SEO ajansı</a> uzmanlarımızla çalışarak yerel aramalarda rakiplerini nasıl ezip geçtiğini başarı hikayelerimizde görebilirsiniz.</p>

      <h2>Adım 5: Site Dışı (Off-Page) SEO ve Otorite İnşası</h2>
      <p>Google, sitenizin ne kadar güvenilir olduğunu diğer sitelerin size verdiği "referanslara" (Backlink) bakarak ölçer. Kalitesiz, spam sitelerden alınan yüzlerce link yerine; sektörünüzle alakalı haber sitelerinden, bloglardan ve iş rehberlerinden alacağınız 5 adet kaliteli link sizi zirveye taşıyabilir.</p>

      <h2>Sonuç: SEO Bir Maraton İşidir</h2>
      <p>Kalıcı bir SEO başarısı elde etmek, sürekli analiz ve iyileştirme gerektirir. Algoritmalar her gün değişirken güncel kalmak profesyonel bir takip ister. Sitenizin trafiğini tesadüflere bırakmak istemiyorsanız, süreci şeffaf bir veri analitiğiyle yönetmek en doğrusudur.</p>
    `,
    category: 'SEO',
    image: '/images/hizmetler-banner.avif', 
    readTime: '5 dk',
    author: 'Bromak Agency',
    authorRole: 'SEO Uzmanı',
    published: true
  };

  try {
    const createdPost = await prisma.post.upsert({
      where: { slug: post.slug },
      update: post,
      create: post,
    });
    console.log("Post successfully inserted:", createdPost.title);
  } catch (error) {
    console.error("Error inserting post:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
