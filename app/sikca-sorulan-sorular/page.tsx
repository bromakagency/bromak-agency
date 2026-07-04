import type { Metadata } from "next";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import Animations from "@/app/components/Animations";
import FAQClient from "./FAQClient";
import "./sss.css";

import { getSeoMetadata } from "@/app/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return getSeoMetadata("sss", {
    title: "Sıkça Sorulan Sorular | Bromak Agency",
    description: "Bromak Agency ile çalışma süreçleri, hizmetlerimiz ve dijital dünyayla ilgili en çok merak edilen soruların cevapları.",
    keywords: "sıkça sorulan sorular, sss, bromak agency süreçler, destek"
  });
}

export default function SikcaSorulanSorular() {
  return (
    <div className="page-wrapper sss-page">
      <Animations />
      <div className="main-wrapper">
        <Navbar />

        <main>
          <section className="sss-hero">
            <h1>Nasıl yardımcı<br />olabiliriz?</h1>
            <p>
              Bromak Agency ile çalışma süreçleri, hizmetlerimiz ve dijital dünyayla ilgili en çok merak edilen soruların cevaplarını burada bulabilirsiniz.
            </p>
          </section>

          <section className="sss-content">
            <FAQClient />
          </section>
        </main>
        
        <Footer />
      </div>
    </div>
  );
}
