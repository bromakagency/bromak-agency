import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import Animations from "@/app/components/Animations";
import FeaturedWorksSlider from "./FeaturedWorksSlider";
import { prisma } from "@/app/lib/prisma";
import "./isler.css";

import { getSeoMetadata } from "@/app/lib/seo";

export const revalidate = 60; // ISR: Cache on Edge CDN, revalidate in background

export async function generateMetadata(): Promise<Metadata> {
  return getSeoMetadata("isler", {
    title: "İşlerimiz | Bromak Agency",
    description: "Bromak Agency tarafından markalar için üretilen sosyal medya, tasarım, strateji ve dijital pazarlama çalışmalarını keşfedin.",
    keywords: "işlerimiz, portfolyo, bromak agency çalışmaları, tasarım, sosyal medya"
  }, "/isler");
}

const WORK_SELECT = {
  id: true,
  slug: true,
  title: true,
  coverImage: true,
  heroImage: true,
  duration: true,
} as const;

export default async function IslerPage(props: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const searchParams = await props.searchParams;
  const pageParam = typeof searchParams?.page === "string" ? searchParams.page : "1";
  const page = parseInt(pageParam, 10) || 1;
  const limit = 12;
  const skip = (page - 1) * limit;

  let sliderWorks: Array<any> = [];
  let gridWorks: Array<any> = [];
  let totalWorks = 0;

  // On page 1, slider works are simply the first 3 items of grid works (saves a redundant DB query)
  if (skip === 0) {
    const [works, count] = await Promise.all([
      prisma.work.findMany({
        where: { published: true },
        orderBy: [{ order: "asc" }, { createdAt: "desc" }],
        take: limit,
        select: WORK_SELECT,
      }),
      prisma.work.count({ where: { published: true } }),
    ]);
    gridWorks = works;
    sliderWorks = works.slice(0, 3);
    totalWorks = count;
  } else {
    const [slider, grid, count] = await Promise.all([
      prisma.work.findMany({
        where: { published: true },
        orderBy: [{ order: "asc" }, { createdAt: "desc" }],
        take: 3,
        select: WORK_SELECT,
      }),
      prisma.work.findMany({
        where: { published: true },
        orderBy: [{ order: "asc" }, { createdAt: "desc" }],
        take: limit,
        skip,
        select: WORK_SELECT,
      }),
      prisma.work.count({ where: { published: true } }),
    ]);
    sliderWorks = slider;
    gridWorks = grid;
    totalWorks = count;
  }
  
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
          <h1 className="sr-only">Bromak Agency Portfolyo ve Referans Projelerimiz</h1>
          <div className="featured-section">
            <FeaturedWorksSlider works={sliderWorks} />
          </div>

          <section className="works-grid" aria-label="Bromak işleri">
            {gridWorks.map((work: any) => (
              <Link href={`/isler/${work.slug}`} className="work-card" key={work.id}>
                <div className="work-card-media">
                  <Image
                    src={work.coverImage}
                    alt={work.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    loading="lazy"
                    decoding="async"
                    className="cover-img"
                  />
                  {work.heroImage && (
                    <img 
                      src={work.heroImage} 
                      alt={`${work.title} Logo`}
                      className="hover-logo" 
                      loading="lazy"
                      decoding="async"
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
