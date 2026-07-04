export type LegalSection = {
  title: string;
  body?: string[];
  items?: string[];
  outro?: string[];
  subsections?: {
    title: string;
    body: string;
  }[];
};

export const privacyPolicy = {
  title: "Gizlilik Politikası",
  updatedAt: "13.05.2026",
  intro: [
    "Bu Gizlilik Politikası, Bromak Agency (“Şirket”, “biz”, “bizim”) tarafından işletilen web sitesini ziyaret eden kullanıcıların kişisel verilerinin hangi kapsamda toplandığını, işlendiğini ve korunduğunu açıklamaktadır.",
    "Web sitemizi ziyaret ederek bu politikada belirtilen şartları kabul etmiş sayılırsınız.",
  ],
  sections: [
    {
      title: "1. Toplanan Veriler",
      body: ["Web sitemiz üzerinden aşağıdaki bilgiler toplanabilir:"],
      items: [
        "Ad ve soyad",
        "Telefon numarası",
        "E-posta adresi",
        "IP adresi",
        "Tarayıcı ve cihaz bilgileri",
        "Site kullanım verileri",
        "Form gönderim bilgileri",
        "Çerez verileri",
        "Reklam ve analiz verileri",
      ],
    },
    {
      title: "2. Verilerin Toplanma Yöntemi",
      body: ["Kişisel verileriniz aşağıdaki yöntemlerle toplanabilir:"],
      items: [
        "İletişim formları",
        "Çerezler (cookies)",
        "Analitik araçlar",
        "Reklam araçları",
        "Site kullanım istatistikleri",
      ],
    },
    {
      title: "3. Verilerin Kullanım Amaçları",
      body: ["Toplanan veriler aşağıdaki amaçlarla kullanılabilir:"],
      items: [
        "Kullanıcı taleplerine dönüş sağlamak",
        "Hizmet süreçlerini yürütmek",
        "Teklif ve iletişim süreçlerini yönetmek",
        "Web sitesi performansını geliştirmek",
        "Reklam performansını analiz etmek",
        "Kullanıcı deneyimini iyileştirmek",
        "Güvenlik süreçlerini sağlamak",
        "Pazarlama ve analiz çalışmaları yürütmek",
      ],
    },
    {
      title: "4. Kullanılan Hizmetler ve Araçlar",
      body: ["Web sitemizde aşağıdaki üçüncü taraf hizmetler kullanılabilir:"],
      subsections: [
        {
          title: "Meta Pixel",
          body: "Meta Pixel, reklam performansını ölçmek ve reklam optimizasyonu yapmak amacıyla kullanılmaktadır.",
        },
        {
          title: "Google Analytics",
          body: "Google Analytics, kullanıcı davranışlarını analiz etmek ve site performansını ölçmek amacıyla kullanılmaktadır.",
        },
        {
          title: "Google Search Console",
          body: "Google Search Console, web sitesi performansını ve arama görünürlüğünü analiz etmek amacıyla kullanılmaktadır.",
        },
        {
          title: "Microsoft Clarity",
          body: "Microsoft Clarity, kullanıcı deneyimini analiz etmek amacıyla oturum kayıtları, tıklama hareketleri ve kullanım davranışlarını inceleyebilir.",
        },
      ],
      outro: ["Bu araçlar anonim veya kısmen anonim veriler toplayabilir."],
    },
    {
      title: "5. Çerezler (Cookies)",
      body: [
        "Web sitemiz kullanıcı deneyimini geliştirmek amacıyla çerezler kullanmaktadır.",
        "Çerezler aşağıdaki amaçlarla kullanılabilir:",
      ],
      items: [
        "Site performansını artırmak",
        "Kullanıcı tercihlerini hatırlamak",
        "Analiz ve istatistik oluşturmak",
        "Reklam optimizasyonu sağlamak",
      ],
      outro: [
        "Tarayıcı ayarlarınız üzerinden çerezleri silebilir veya devre dışı bırakabilirsiniz. Ancak bu durumda bazı site özellikleri düzgün çalışmayabilir.",
      ],
    },
    {
      title: "6. Veri Güvenliği",
      body: [
        "Bromak Agency, kullanıcı verilerinin güvenliği için gerekli teknik ve idari önlemleri almaktadır.",
        "Ancak internet üzerinden gerçekleştirilen veri aktarımlarının tamamen güvenli olduğu garanti edilemez.",
      ],
    },
    {
      title: "7. Üçüncü Taraf Bağlantılar",
      body: [
        "Web sitemiz farklı web sitelerine yönlendirme bağlantıları içerebilir. Bu sitelerin gizlilik uygulamalarından Bromak Agency sorumlu değildir.",
      ],
    },
    {
      title: "8. Kullanıcı Hakları",
      body: ["Kullanıcılar aşağıdaki haklara sahiptir:"],
      items: [
        "Kişisel verilerinin işlenip işlenmediğini öğrenme",
        "İşlenen verilere ilişkin bilgi talep etme",
        "Eksik veya yanlış verilerin düzeltilmesini isteme",
        "Verilerin silinmesini talep etme",
      ],
    },
    {
      title: "9. İletişim",
      body: [
        "Gizlilik politikasıyla ilgili tüm sorularınız için bizimle iletişime geçebilirsiniz.",
        "Bromak Agency",
        "E-posta: merhaba@bromakagency.com",
        "Telefon: 0541 366 0496",
      ],
    },
  ] satisfies LegalSection[],
};

export const termsOfUse = {
  title: "Kullanım Şartları",
  updatedAt: "13.05.2026",
  intro: [
    "Bu web sitesini kullanan tüm ziyaretçiler aşağıdaki kullanım şartlarını kabul etmiş sayılır.",
  ],
  sections: [
    {
      title: "1. Genel",
      body: [
        "Bromak Agency web sitesi bilgilendirme amacıyla hazırlanmıştır. Site içerisindeki içerikler önceden haber verilmeksizin güncellenebilir veya değiştirilebilir.",
      ],
    },
    {
      title: "2. Fikri Mülkiyet Hakları",
      body: ["Web sitesinde yer alan tüm içerikler;"],
      items: [
        "Tasarımlar",
        "Görseller",
        "Logolar",
        "Metinler",
        "Marka öğeleri",
        "Videolar",
        "Arayüz tasarımları",
      ],
      outro: [
        "Bromak Agency’e aittir veya kullanım hakkı alınmıştır.",
        "İzinsiz şekilde kopyalanamaz, çoğaltılamaz, yayınlanamaz veya ticari amaçla kullanılamaz.",
      ],
    },
    {
      title: "3. Kullanıcı Sorumlulukları",
      body: ["Siteyi kullanan ziyaretçiler:"],
      items: [
        "Hukuka aykırı işlem yapmamayı",
        "Siteye zarar verecek girişimlerde bulunmamayı",
        "Yanıltıcı bilgi paylaşmamayı",
        "Spam veya kötü amaçlı işlem gerçekleştirmemeyi",
      ],
      outro: ["kabul etmiş sayılır."],
    },
    {
      title: "4. Form ve İletişim Alanları",
      body: [
        "Web sitemizde bulunan iletişim formlarına girilen bilgilerin doğruluğu kullanıcı sorumluluğundadır.",
        "Bromak Agency, iletişim formları üzerinden iletilen taleplere dönüş yapma hakkını saklı tutar.",
      ],
    },
    {
      title: "5. Üçüncü Taraf Hizmetler",
      body: ["Web sitesinde aşağıdaki üçüncü taraf hizmetler kullanılabilir:"],
      items: [
        "Meta Pixel",
        "Google Analytics",
        "Google Search Console",
        "Microsoft Clarity",
      ],
      outro: ["Bu hizmetlerin kullanım koşulları kendi politikalarına tabidir."],
    },
    {
      title: "6. Sorumluluk Reddi",
      body: [
        "Web sitesinde yer alan bilgilerin güncel ve doğru olması için gerekli özen gösterilmektedir. Ancak oluşabilecek hata, eksiklik veya kesintilerden dolayı Bromak Agency sorumluluk kabul etmez.",
      ],
    },
    {
      title: "7. Değişiklik Hakkı",
      body: [
        "Bromak Agency kullanım şartlarını dilediği zaman değiştirme hakkını saklı tutar.",
      ],
    },
    {
      title: "8. İletişim",
      body: [
        "Bromak Agency",
        "E-posta: merhaba@bromakagency.com",
        "Telefon: 0541 366 0496",
      ],
    },
  ] satisfies LegalSection[],
};

export const cookiePolicy = {
  title: "Çerez Politikası",
  updatedAt: "13.05.2026",
  intro: [
    "Bu Çerez Politikası, Bromak Agency web sitesinde kullanılan çerezler hakkında bilgi vermektedir.",
  ],
  sections: [
    {
      title: "1. Çerez Nedir?",
      body: [
        "Çerezler (cookies), ziyaret ettiğiniz internet siteleri tarafından tarayıcınıza kaydedilen küçük veri dosyalarıdır.",
        "Bu dosyalar sayesinde site tercihleri hatırlanabilir ve kullanıcı deneyimi geliştirilebilir.",
      ],
    },
    {
      title: "2. Kullanılan Çerez Türleri",
      subsections: [
        {
          title: "Zorunlu Çerezler",
          body: "Web sitesinin temel işlevlerinin çalışabilmesi için gereklidir.",
        },
        {
          title: "Performans Çerezleri",
          body: "Site performansını analiz etmek amacıyla kullanılabilir.",
        },
        {
          title: "Analitik Çerezler",
          body: "Kullanıcı davranışlarını analiz etmek için kullanılabilir.",
        },
        {
          title: "Reklam ve Pazarlama Çerezleri",
          body: "Reklam performansını ölçmek ve optimize etmek amacıyla kullanılabilir.",
        },
      ],
    },
    {
      title: "3. Kullanılan Hizmetler",
      body: ["Web sitemizde aşağıdaki hizmetler çerez kullanabilir:"],
      items: [
        "Meta Pixel",
        "Google Analytics",
        "Google Search Console",
        "Microsoft Clarity",
      ],
      outro: [
        "Bu servisler kullanıcı davranışlarını analiz etmek amacıyla veri toplayabilir.",
      ],
    },
    {
      title: "4. Çerezlerin Yönetilmesi",
      body: ["Kullanıcılar tarayıcı ayarları üzerinden:"],
      items: [
        "Çerezleri silebilir",
        "Çerez kullanımını engelleyebilir",
        "Çerez tercihlerini değiştirebilir",
      ],
      outro: [
        "Ancak bazı site özellikleri bu durumda düzgün çalışmayabilir.",
      ],
    },
    {
      title: "5. Üçüncü Taraf Çerezleri",
      body: [
        "Web sitemiz üçüncü taraf servis sağlayıcıların çerezlerini kullanabilir. Bu servislerin veri işleme süreçleri kendi gizlilik politikalarına tabidir.",
      ],
    },
    {
      title: "6. İletişim",
      body: [
        "Çerez politikası hakkında sorularınız için:",
        "Bromak Agency",
        "E-posta: merhaba@bromakagency.com",
        "Telefon: 0541 366 0496",
      ],
    },
  ] satisfies LegalSection[],
};
