import "swiper/css";
import Animations from "./components/Animations";
import Navbar from "./components/Navbar";
import PreviewSection from "./components/PreviewSection";
import SliderSection from "./components/SliderSection";
import UsesSection from "./components/UsesSection";
import Footer from "./components/Footer";
import AwardsShowcase from "./components/AwardsShowcase";
import ReviewsSection from "./components/ReviewsSection";
import HomeBlogSection from "./components/HomeBlogSection";
import HomeServicesBento from "./components/HomeServicesBento";
import SeoTextSection from "./components/SeoTextSection";

import { getSeoMetadata } from "@/app/lib/seo";

export async function generateMetadata() {
  return getSeoMetadata("home", {
    title: "Bromak Agency - Konya Web Tasarım ve Reklam Ajansı",
    description: "Bromak Agency, Konya merkezli bir reklam ve dijital pazarlama ajansıdır. Strateji, tasarım, dijital pazarlama ve içerik üretimi hizmetleri sunuyoruz.",
    keywords: "konya reklam ajansı, bromak agency, dijital pazarlama konya"
  });
}

export default function Home() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://bromakagency.com/#organization",
        "name": "Bromak Agency",
        "url": "https://bromakagency.com/",
        "logo": {
          "@type": "ImageObject",
          "url": "https://bromakagency.com/assets/logos/bromak_kirmizi_logo.png"
        },
        "sameAs": [
          "https://www.instagram.com/bromakagency/",
          "https://www.linkedin.com/company/bromakagency/"
        ],
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+90-541-366-04-96",
          "contactType": "customer service",
          "email": "merhaba@bromakagency.com",
          "areaServed": "TR",
          "availableLanguage": "Turkish"
        }
      },
      {
        "@type": "WebSite",
        "@id": "https://bromakagency.com/#website",
        "url": "https://bromakagency.com/",
        "name": "Bromak Agency",
        "publisher": {
          "@id": "https://bromakagency.com/#organization"
        },
        "inLanguage": "tr-TR"
      },
      {
        "@type": "AdvertisingAgency",
        "name": "Bromak Agency - Konya Reklam Ajansı",
        "image": "https://bromakagency.com/images/bromak-og-image.jpg",
        "@id": "https://bromakagency.com",
        "url": "https://bromakagency.com",
        "telephone": "+905413660496",
        "email": "info@bromakagency.com",
        "priceRange": "$$",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Esenler Mh. Horasan Sk. Görgülü Center No:4/4",
          "addressLocality": "Selçuklu",
          "addressRegion": "Konya",
          "postalCode": "42080",
          "addressCountry": "TR"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 37.8902847,
          "longitude": 32.4648995
        },
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday"
            ],
            "opens": "08:30",
            "closes": "19:00"
          }
        ],
        "sameAs": [
          "https://www.instagram.com/bromakagency",
          "https://www.linkedin.com/company/bromakagency",
          "https://x.com/bromakagency"
        ],
        "knowsAbout": [
          "Dijital Pazarlama",
          "Sosyal Medya Yönetimi",
          "Web Tasarım",
          "SEO ve Arama Motoru Optimizasyonu",
          "Kurumsal Kimlik Tasarımı",
          "Grafik Tasarım",
          "Prodüksiyon ve Reklam Filmi"
        ]
      }
    ]
  };

  return (
    <div className="page-wrapper">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <Animations />
      <div className="main-wrapper">
        <Navbar />
        <AwardsShowcase />
        <PreviewSection />
        <SliderSection />
        <HomeServicesBento />
        <UsesSection />
        <ReviewsSection />
        <HomeBlogSection />
        <SeoTextSection />
        <Footer />

      </div>
    </div>
  );
}

