import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import Animations from "@/app/components/Animations";
import FeaturedWorksSlider from "./FeaturedWorksSlider";
import { prisma } from "@/app/lib/prisma";
import "./isler.css";

import { getSeoMetadata } from "@/app/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return getSeoMetadata("isler", {
    title: "İşlerimiz | Bromak Agency",
    description: "Bromak Agency tarafından markalar için üretilen sosyal medya, tasarım, strateji ve dijital pazarlama çalışmalarını keşfedin.",
    keywords: "işlerimiz, portfolyo, bromak agency çalışmaları, tasarım, sosyal medya"
  }, "/isler");
}

export default async function IslerPage(props: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const searchParams = await props.searchParams;
  const pageParam = typeof searchParams?.page === "string" ? searchParams.page : "1";
  const page = parseInt(pageParam, 10) || 1;
  const limit = 12;
  const skip = (page - 1) * limit;

  const [sliderWorks, gridWorks, totalWorks] = await Promise.all([
    prisma.work.findMany({
      where: { published: true },
      orderBy: [{ order: "asc" }, { createdAt: "desc" }],
      take: 3,
    }),
    prisma.work.findMany({
      where: { published: true },
      orderBy: [{ order: "asc" }, { createdAt: "desc" }],
      take: limit,
      skip,
    }),
    prisma.work.count({ where: { published: true } })
  ]);
  
  const totalPages = Math.ceil(totalWorks / limit);

  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": "https://bromakagency.com/isler/#webpage",
    "url": "https://bromakagency.com/isler",
    "name": "İşlerimiz | Bromak Agency",
    "description": "Bromak Agency tarafından markalar için üretilen sosyal medya, tasarım, strateji ve dijital pazarlama çalışmalarını keşfedin.",
    "publisher": {
      "@id": "https://bromakagency.com/#organization"
    },
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": gridWorks.map((w: any, idx: number) => ({
        "@type": "ListItem",
        "position": idx + 1,
        "url": `https://bromakagency.com/isler/${w.slug}`,
        "name": w.title
      }))
    }
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

        <main className="works-page">
          <div className="featured-section">
            <FeaturedWorksSlider works={sliderWorks} />
          </div>

          <section className="works-grid" aria-label="Bromak işleri">
            {gridWorks.map((work: any) => (
              <Link href={`/isler/${work.slug}`} className="work-card" key={work.id}>
                <div className="work-card-media">
                  <img
                    src={work.coverImage}
                    alt={work.title}
                    loading="lazy"
                    decoding="async"
                    className="cover-img"
                  />
                  {work.heroImage && (
                    <img 
                      src={work.heroImage} 
                      alt={`${work.title} Logo`}
                      className="hover-logo" 
                    />
                  )}
                </div>

                <div className="work-card-meta">
                  <h2>{work.title}</h2>
                </div>
              </Link>
            ))}
          </section>

          {totalPages > 1 && (
            <div className="pagination">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <Link
                  key={p}
                  href={`/isler?page=${p}`}
                  className={`pagination-btn ${p === page ? "active" : ""}`}
                >
                  {p}
                </Link>
              ))}
            </div>
          )}
        </main>

        <Footer />
      </div>
    </div>
  );
}
