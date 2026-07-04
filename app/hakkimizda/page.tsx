import type { Metadata } from "next";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import StoryTimeline from "./StoryTimeline";
import AwardsCarousel from "./AwardsCarousel";
import "./hakkimizda.css";
import { getSeoMetadata } from "@/app/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return getSeoMetadata("hakkimizda", {
    title: "Hakkımızda | Bromak Agency",
    description: "Bromak Agency'nin kuruluşu, vizyonu ve hedefleri.",
    keywords: "hakkımızda, bromak agency, vizyon, misyon"
  });
}





export default function HakkimizdaPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": "https://bromakagency.com/hakkimizda/#webpage",
    "url": "https://bromakagency.com/hakkimizda",
    "name": "Hakkımızda | Bromak Agency",
    "description": "Strateji, tasarım ve teknolojiyi bir araya getirerek markaların dijital dünyada güçlü bir etki bırakmasını sağlıyoruz.",
    "publisher": {
      "@id": "https://bromakagency.com/#organization"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <Navbar />

      <main className="about-page">
        <section className="about-hero">
          <div>
            <span className="about-hero-eyebrow">HAKKIMIZDA</span>
            <h1>
              Yaratıcı fikirleri gerçeğe dönüştüren <br />
              bir ajans<span>.</span>
            </h1>
            <p>
              Markaların dijital dünyada güçlü bir etki bırakması için
              strateji, tasarım ve teknolojiyi bir araya getiriyoruz.
            </p>
          </div>

          <div className="about-hero-visual">
            <div className="hero-m-wrap">
              <img src="/assets/m.svg" alt="Bromak" className="hero-m-svg" />
            </div>
          </div>
        </section>



        <StoryTimeline />

        <AwardsCarousel />


      </main>

      <Footer />
    </>
  );
}
