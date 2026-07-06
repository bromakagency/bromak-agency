import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/app/lib/prisma";
import "./work-detail.css";
import WorkGalleryClient from "./WorkGalleryClient";
import ReadingProgress from "@/app/components/ReadingProgress";
import MetaViewContentTracker from "@/app/components/MetaViewContentTracker";

type WorkDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  const works = await prisma.work.findMany({ select: { slug: true } });
  return works.map((work: any) => ({
    slug: work.slug,
  }));
}

export async function generateMetadata({ params }: WorkDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const work = await prisma.work.findUnique({ where: { slug } });

  if (!work) {
    return {
      title: "İş bulunamadı | Bromak Agency",
    };
  }

  return {
    title: `${work.title} | Bromak Agency`,
    description: work.summary,
    alternates: {
      canonical: `/isler/${work.slug}`,
    },
    openGraph: {
      title: `${work.title} | Bromak Agency`,
      description: work.summary,
      url: `/isler/${work.slug}`,
      type: "article",
      images: [{ url: work.coverImage }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${work.title} | Bromak Agency`,
      description: work.summary,
      images: [work.coverImage],
    },
  };
}

export default async function WorkDetailPage({ params }: WorkDetailPageProps) {
  const { slug } = await params;
  const work = await prisma.work.findUnique({ where: { slug } });

  if (!work) {
    notFound();
  }

  // Get next work
  const allWorks = await prisma.work.findMany({
    where: { published: true },
    orderBy: [{ order: "asc" }, { createdAt: "desc" }],
    select: { slug: true, title: true, coverImage: true, heroImage: true }
  });
  
  const currentIndex = allWorks.findIndex((item: any) => item.slug === work.slug);
  const nextWork = allWorks[(currentIndex + 1) % allWorks.length];

  const schema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": `https://bromakagency.com/isler/${work.slug}/#webpage`,
    "url": `https://bromakagency.com/isler/${work.slug}`,
    "name": `${work.title} | Bromak Agency`,
    "description": work.summary,
    "image": work.coverImage,
    "creator": {
      "@id": "https://bromakagency.com/#organization"
    },
    "publisher": {
      "@id": "https://bromakagency.com/#organization"
    }
  };

  return (
    <main className="work-detail-page">
      <MetaViewContentTracker content_name={work.title} content_category="Proje" />
      <ReadingProgress />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <div className="work-detail-topbar">
        <Link href="/isler" className="work-detail-back">
          ← İşlere dön
        </Link>
        <div className="work-detail-title">
          <span>{work.service}</span>
          <strong>{work.title}</strong>
        </div>
      </div>
      
      
      {/* Client Meta Info */}
      <section className="work-detail-meta">
        <div className="meta-group">
          <strong>Müşteri</strong>
          <p>{work.client}</p>
        </div>
        <div className="meta-group">
          <strong>Hizmet</strong>
          <p>{work.service}</p>
        </div>
        <div className="meta-group">
          <strong>Süreç</strong>
          <p>{work.duration}</p>
        </div>
        {work.website && (
          <div className="meta-group">
            <strong>Web Sitesi</strong>
            <p><a href={work.website} target="_blank" rel="noreferrer">{work.website}</a></p>
          </div>
        )}
      </section>
      
      {/* Content Text */}
      <section className="work-detail-content">
        <div className="content-block">
          <h3>Firma Hakkında</h3>
          <p>{work.challenge}</p>
        </div>
        <div className="content-block">
          <h3>Kısaca Neler Yaptık?</h3>
          <p>{work.solution}</p>
        </div>
        <div className="content-block">
          <h3>Verilen Hizmetler</h3>
          <p>{work.result}</p>
        </div>
      </section>

      {/* Bento Gallery (Interactive) */}
      <WorkGalleryClient gallery={work.gallery} title={work.title} />

      {nextWork && (
        <section className="next-work-section" aria-label="Sonraki iş">
          <Link href={`/isler/${nextWork.slug}`} className="next-work-card">
            <span>Sonraki iş</span>
            <h2>{nextWork.title}</h2>
            <div className="next-work-image">
              <img
                src={nextWork.coverImage}
                alt={nextWork.title}
                className="cover-img"
                loading="lazy"
                decoding="async"
              />
              {nextWork.heroImage && (
                <img
                  src={nextWork.heroImage}
                  alt={`${nextWork.title} logo`}
                  className="hover-logo"
                  loading="lazy"
                  decoding="async"
                />
              )}
            </div>
          </Link>
        </section>
      )}
    </main>
  );
}
