import type { Metadata } from "next";
import { prisma } from "@/app/lib/prisma";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import Animations from "@/app/components/Animations";
import Link from "next/link";
import "./hikayeler.css";

export const metadata: Metadata = {
  title: "Başarı Hikayeleri | Bromak Agency",
  description: "Markaların Bromak Agency ile dijital dünyada elde ettiği başarı hikayelerini ve vaka analizlerini inceleyin.",
  alternates: {
    canonical: "/basari-hikayeleri",
  },
};

export default async function BasariHikayeleriPage() {
  const stories = await prisma.story.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="page-wrapper">
      <Animations />
      
      <main className="main-wrapper">
        <section className="stories-hero">
          <div className="container">
            <h1 className="hero-title animate-fade-up">Başarı <span>Hikayeleri</span></h1>
            <p className="hero-subtitle animate-fade-up" style={{ animationDelay: "0.1s" }}>
              Veri odaklı stratejiler ve yenilikçi tasarımlarla büyüttüğümüz markaların hikayelerini keşfedin.
            </p>
          </div>
        </section>

        <section className="stories-grid-section">
          <div className="container">
            {stories.length === 0 ? (
              <div className="no-stories">Henüz başarı hikayesi eklenmemiş.</div>
            ) : (
              <div className="stories-grid">
                {stories.map((story, i) => {
                  let metrics = [];
                  try {
                    if (story.metricsJson) metrics = JSON.parse(story.metricsJson);
                  } catch (e) {}

                  return (
                    <Link href={`/basari-hikayeleri/${story.slug}`} key={story.id} className="story-card animate-fade-up" style={{ animationDelay: `${i * 0.1}s` }}>
                      <div className="story-card-image">
                        <img loading="lazy" decoding="async" src={story.coverImage || "/assets/images/placeholder.jpg"} alt={story.title} />
                        <div className="story-card-overlay" style={{ background: `linear-gradient(to top, ${story.color2 || '#000'} 0%, transparent 100%)` }}></div>
                        {story.logo && (
                          <div className="story-card-logo">
                            <img loading="lazy" decoding="async" src={story.logo} alt="Logo" />
                          </div>
                        )}
                      </div>
                      
                      <div className="story-card-content">
                        <h3>{story.title}</h3>
                        {story.summary && <p>{story.summary}</p>}
                        
                        {metrics.length > 0 && (
                          <div className="story-card-metrics">
                            {metrics.slice(0, 2).map((m: any, idx: number) => (
                              <div key={idx} className="story-metric">
                                <strong>{m.value}</strong>
                                <span>{m.label}</span>
                              </div>
                            ))}
                          </div>
                        )}
                        
                        <div className="story-card-link">
                          Vakayı İncele →
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      </main>

    </div>
  );
}
