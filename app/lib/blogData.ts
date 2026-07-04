export type BlogSection = {
  title: string;
  body: string;
};

export type BlogPost = {
  slug: string;
  title: string;
  summary: string;
  date: string;
  category: string;
  image: string;
  readTime: string;
  author: string;
  authorRole: string;
  quote: string;
  sections: BlogSection[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "marka-stratejisi",
    title: "Marka Stratejisi Oluştururken Dikkat Edilmesi Gereken 5 Kritik Adım",
    summary:
      "Güçlü bir marka stratejisi için hedef, hedef kitle, konumlandırma, mesaj ve ölçümleme adımlarını netleştirin.",
    date: "12 Mayıs 2026",
    category: "Strateji",
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1200",
    readTime: "6 dk okuma",
    author: "Bromak Agency",
    authorRole: "Strateji Ekibi",
    quote:
      "Doğru strateji, markanızı bugün rakiplerinizden ayırır; yarın ise daha güçlü bir konuma taşır.",
    sections: [
      {
        title: "Hedefi ve vizyonu netleştirin",
        body:
          "Markanızın neyi başarmak istediğini ve hangi algıyı oluşturmak istediğini netleştirmek tüm iletişim kararlarının temelidir.",
      },
      {
        title: "Hedef kitlenizi derinlemesine tanıyın",
        body:
          "Kiminle konuştuğunuzu bilmeden doğru mesajı veremezsiniz. İhtiyaçlar, motivasyonlar ve karar alma alışkanlıkları stratejinin merkezinde olmalıdır.",
      },
      {
        title: "Marka konumlandırmanızı belirleyin",
        body:
          "Rakiplerden ayrışan güçlü yönleri görünür kılmak, markanın pazarda daha akılda kalıcı ve tercih edilir olmasını sağlar.",
      },
      {
        title: "Tutarlı bir kimlik ve mesaj geliştirin",
        body:
          "Görsel dil, söylem, kampanya fikri ve kanal kullanımı aynı hikayeyi desteklediğinde marka daha profesyonel ve güvenilir görünür.",
      },
      {
        title: "Ölçümleyin, analiz edin ve geliştirin",
        body:
          "Strateji yaşayan bir yapıdır. Performansı düzenli takip etmek, içerik ve reklam kararlarını daha isabetli hale getirir.",
      },
    ],
  },
  {
    slug: "hedef-kitle-analizi",
    title: "Dijital Pazarlamada Hedef Kitle Analizi Nasıl Yapılır?",
    summary:
      "Doğru hedef kitleyi belirlemek, etkili kampanya ve içerik stratejilerinin ilk adımıdır.",
    date: "24 Nisan 2026",
    category: "Dijital Pazarlama",
    image: "https://images.unsplash.com/photo-1562577309-4932fdd64cd1?q=80&w=1200",
    readTime: "5 dk okuma",
    author: "Bromak Agency",
    authorRole: "Dijital Pazarlama Ekibi",
    quote:
      "Hedef kitle analizi, reklam bütçesini daha verimli kullanmanın ve doğru mesajı doğru kişiye ulaştırmanın başlangıç noktasıdır.",
    sections: [
      {
        title: "Mevcut müşterilerinizi inceleyin",
        body:
          "Satın alan, teklif isteyen ya da etkileşim kuran kişilerin ortak özelliklerini analiz ederek ilk hedef kitle çerçevesini oluşturabilirsiniz.",
      },
      {
        title: "İhtiyaç ve motivasyonları ayırın",
        body:
          "Demografik bilgiler tek başına yeterli değildir. Kitlenin problemi, beklentisi ve satın alma motivasyonu ayrıca değerlendirilmelidir.",
      },
      {
        title: "Kanalları davranışa göre seçin",
        body:
          "Her hedef kitle her platformda aynı davranmaz. Sosyal medya, arama motoru ve web sitesi temasları ayrı ayrı okunmalıdır.",
      },
      {
        title: "Mesajları segmente edin",
        body:
          "Farklı ihtiyaçlara aynı reklam metniyle cevap vermek performansı düşürür. Segmentlere göre mesaj ve kreatif ayrıştırmak gerekir.",
      },
      {
        title: "Veriye göre güncelleyin",
        body:
          "Hedef kitle analizi tek seferlik bir çalışma değildir. Kampanya sonuçları yeni içgörüler ürettikçe hedefleme ve içerik dili güncellenmelidir.",
      },
    ],
  },
  {
    slug: "web-tasarim-trendleri",
    title: "2026 Web Tasarım Trendleri",
    summary:
      "Kullanıcı deneyimini öne çıkaran modern web tasarım yaklaşımlarına kısa bir bakış.",
    date: "21 Nisan 2026",
    category: "Web Tasarım",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200",
    readTime: "4 dk okuma",
    author: "Bromak Agency",
    authorRole: "Web Tasarım Ekibi",
    quote:
      "Modern web sitesi, yalnızca güzel görünen bir vitrin değil; hızlı, anlaşılır ve dönüşüm odaklı bir deneyimdir.",
    sections: [
      {
        title: "Hız ve sade yapı öne çıkıyor",
        body:
          "Kullanıcılar yavaş ve karmaşık sayfalarda uzun süre kalmıyor. Hafif arayüzler ve net hiyerarşi daha güçlü sonuç veriyor.",
      },
      {
        title: "Mobil deneyim ana deneyim haline geliyor",
        body:
          "Tasarım kararlarının mobilde rahat okunabilirlik, dokunma alanları ve hızlı aksiyon alma üzerine kurulması gerekiyor.",
      },
      {
        title: "Görsel kimlik daha sistemli kullanılıyor",
        body:
          "Renk, tipografi, grid ve mikro etkileşimler markanın dijital kimliğini daha tutarlı hale getiriyor.",
      },
      {
        title: "İçerik ve tasarım birlikte planlanıyor",
        body:
          "Metin sonradan doldurulan bir alan değil, sayfanın dönüşüm akışını belirleyen ana bileşenlerden biri olarak ele alınıyor.",
      },
      {
        title: "Ölçülebilir deneyim önem kazanıyor",
        body:
          "Form tamamlama, buton tıklama ve sayfa etkileşimi gibi veriler tasarım kararlarının iyileştirilmesini sağlıyor.",
      },
    ],
  },
  {
    slug: "sosyal-medya-etkilesim",
    title: "Sosyal Medyada Etkileşimi Artırmanın 7 Yolu",
    summary:
      "Markanızın sosyal medya içeriklerinden daha yüksek etkileşim alması için uygulanabilir öneriler.",
    date: "15 Nisan 2026",
    category: "Sosyal Medya",
    image: "https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?q=80&w=1200",
    readTime: "5 dk okuma",
    author: "Bromak Agency",
    authorRole: "Sosyal Medya Ekibi",
    quote:
      "Etkileşim, yalnızca sık paylaşım yapmakla değil, hedef kitlenin gerçekten yanıt vermek isteyeceği içerikler üretmekle artar.",
    sections: [
      {
        title: "Platforma uygun format kullanın",
        body:
          "Instagram, LinkedIn, TikTok ve YouTube aynı dili istemez. İçerik formatını kanal davranışına göre uyarlamak gerekir.",
      },
      {
        title: "İlk saniyeyi güçlü kurun",
        body:
          "Kullanıcı akış içinde çok hızlı karar verir. Başlık, kapak ve ilk cümle ilgiyi yakalayacak kadar net olmalıdır.",
      },
      {
        title: "Tek mesajlı içerikler üretin",
        body:
          "Bir gönderide çok fazla şey anlatmaya çalışmak mesajı dağıtır. Her içerik tek ana fikre hizmet etmelidir.",
      },
      {
        title: "Toplulukla konuşun",
        body:
          "Yorumlara dönüş yapmak, sorular sormak ve kullanıcı tepkilerini takip etmek marka hesabını daha canlı hale getirir.",
      },
      {
        title: "Performansı düzenli okuyun",
        body:
          "Kaydetme, paylaşma, yorum ve erişim verileri hangi içerik tiplerinin daha iyi çalıştığını gösterir.",
      },
    ],
  },
  {
    slug: "seo-uyumlu-icerik",
    title: "SEO Uyumlu İçerik Yazmanın Püf Noktaları",
    summary:
      "Arama motorlarında görünürlüğü artıran içerik üretimi için temel prensipler.",
    date: "12 Nisan 2026",
    category: "SEO",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200",
    readTime: "5 dk okuma",
    author: "Bromak Agency",
    authorRole: "SEO Ekibi",
    quote:
      "SEO uyumlu içerik, arama motoruna değil önce kullanıcıya net ve faydalı cevap veren içeriktir.",
    sections: [
      {
        title: "Arama niyetini anlayın",
        body:
          "Kullanıcı bilgi mi arıyor, ürün mü karşılaştırıyor, yoksa hizmet mi satın almak istiyor? İçerik bu niyete göre yapılandırılmalıdır.",
      },
      {
        title: "Başlık hiyerarşisini doğru kurun",
        body:
          "H1, H2 ve H3 kullanımı hem okuyucunun hem de arama motorlarının sayfayı daha rahat anlamasını sağlar.",
      },
      {
        title: "Kısa ve okunabilir paragraflar yazın",
        body:
          "Uzun blok metinler kullanıcıyı yorar. Net, bölümlenmiş ve kolay taranabilir içerikler daha iyi performans gösterir.",
      },
      {
        title: "İç bağlantılar ekleyin",
        body:
          "İlgili hizmet ve blog sayfalarına verilen bağlantılar kullanıcı yolculuğunu güçlendirir ve site mimarisini destekler.",
      },
      {
        title: "İçeriği güncel tutun",
        body:
          "SEO performansı için içeriklerin belirli aralıklarla güncellenmesi, eksik bilgilerin tamamlanması ve yeni sorulara yanıt vermesi gerekir.",
      },
    ],
  },
  {
    slug: "donusum-orani-stratejileri",
    title: "Dönüşüm Oranınızı Artıracak 5 Strateji",
    summary:
      "Web sitenizin ziyaretçileri daha net aksiyona yönlendirmesi için temel dönüşüm önerileri.",
    date: "9 Nisan 2026",
    category: "Dijital Pazarlama",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200",
    readTime: "4 dk okuma",
    author: "Bromak Agency",
    authorRole: "Performans Ekibi",
    quote:
      "Dönüşüm, kullanıcının ne yapması gerektiğini düşünmeden anlayabildiği sayfalarda yükselir.",
    sections: [
      {
        title: "Değer önerisini ilk ekranda anlatın",
        body:
          "Kullanıcı sayfaya girdiğinde ne sunduğunuzu ve neden sizi tercih etmesi gerektiğini hızlıca anlamalıdır.",
      },
      {
        title: "Çağrı butonlarını netleştirin",
        body:
          "Belirsiz buton metinleri yerine 'Teklif Al', 'Randevu Planla' veya 'Projeni Anlat' gibi doğrudan aksiyon veren ifadeler kullanılmalıdır.",
      },
      {
        title: "Formları sade tutun",
        body:
          "Gereksiz alanlar form tamamlama oranını düşürür. İlk temas için yalnızca gerçekten ihtiyaç duyulan bilgiler istenmelidir.",
      },
      {
        title: "Güven unsurları ekleyin",
        body:
          "Referanslar, önceki işler, ödüller ve açık iletişim bilgileri kullanıcıların karar verme sürecini kolaylaştırır.",
      },
      {
        title: "Performansı test edin",
        body:
          "Başlık, buton, form ve görsel yerleşimleri düzenli test edildiğinde dönüşüm oranı zamanla daha sağlıklı şekilde iyileşir.",
      },
    ],
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}
