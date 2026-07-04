import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { prisma } from "@/app/lib/prisma"
import Navbar from "@/app/components/Navbar"
import Footer from "@/app/components/Footer"
import Animations from "@/app/components/Animations"
import StoryShareLinks from "./StoryShareLinks"
import "./story-detail.css"

type StoryDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const stories = await prisma.story.findMany({ select: { slug: true } })
  return stories.map((story) => ({
    slug: story.slug,
  }))
}

export async function generateMetadata({ params }: StoryDetailPageProps): Promise<Metadata> {
  const { slug } = await params
  const story = await prisma.story.findUnique({ where: { slug } })

  if (!story) {
    return {
      title: "Hikaye bulunamadı | Bromak Agency",
    }
  }

  return {
    title: `${story.title} | Bromak Başarı Hikayeleri`,
    description: story.summary || story.title,
    alternates: {
      canonical: `/basari-hikayeleri/${story.slug}`,
    },
    openGraph: {
      title: `${story.title} | Bromak Agency`,
      description: story.summary || story.title,
      url: `/basari-hikayeleri/${story.slug}`,
      type: "article",
      images: story.coverImage ? [{ url: story.coverImage }] : [],
    },
  }
}

export default async function StoryDetailPage({ params }: StoryDetailPageProps) {
  const { slug } = await params
  const story = await prisma.story.findUnique({ where: { slug } })

  if (!story || !story.published) {
    notFound()
  }

  const metrics = story.metricsJson ? JSON.parse(story.metricsJson) : []
  const mainMetric = metrics.length > 0 ? metrics[0] : null
  
  const moreStories = await prisma.story.findMany({
    where: { published: true, id: { not: story.id } },
    take: 3,
    orderBy: { createdAt: "desc" }
  })

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `https://bromakagency.com/basari-hikayeleri/${story.slug}/#article`,
    "url": `https://bromakagency.com/basari-hikayeleri/${story.slug}`,
    "headline": story.title,
    "description": story.summary,
    "image": story.coverImage,
    "publisher": {
      "@id": "https://bromakagency.com/#organization"
    }
  }

  return (
    <div className="page-wrapper light-theme">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <Animations />
      <div className="main-wrapper">
        <Navbar />

        <main className="story-detail-page">
          {/* Hero Section */}
          <section className="story-hero" style={{ 
            backgroundImage: story.coverImage ? `url(${story.coverImage})` : 'none',
            '--color1': story.color1 || '#e30613',
            '--color2': story.color2 || '#800000',
          } as React.CSSProperties}>
            <div className="story-hero-overlay"></div>
            
            <div className="story-hero-content wrapper">
              {story.logo && (
                <div className="story-client-logo">
                  <img src={story.logo} alt="Client Logo" />
                </div>
              )}
              
              <h1 className="story-title">{story.title}</h1>
              
              {mainMetric && (
                <div className="story-main-metric">
                  <strong>{mainMetric.value}</strong>
                  <span>{mainMetric.label}</span>
                </div>
              )}
            </div>
          </section>

          {/* Content Section */}
          <section className="story-content-section wrapper">
            <aside className="story-sidebar">
              <div className="story-sticky-nav">
                <h3>Özet</h3>
                {story.summary && <p className="story-sidebar-summary">{story.summary}</p>}
                
                {metrics.length > 0 && (
                  <div className="story-sidebar-metrics">
                    {metrics.map((m: any, i: number) => (
                      <div key={i} className="s-metric">
                        <strong>{m.value}</strong>
                        <span>{m.label}</span>
                      </div>
                    ))}
                  </div>
                )}
                
                <StoryShareLinks url={`https://bromakagency.com/basari-hikayeleri/${story.slug}`} />
              </div>
            </aside>

            <article className="story-rich-content tiptap" dangerouslySetInnerHTML={{ __html: story.content }}>
            </article>
          </section>

          {/* More Stories */}
          {moreStories.length > 0 && (
            <section className="more-stories-section wrapper">
              <h2 style={{ fontSize: '2rem', fontWeight: 600, marginBottom: '40px', color: '#111' }}>Diğer Başarı Hikayelerine Göz Atın</h2>
              <div className="more-stories-grid">
                {moreStories.map((item: any) => (
                  <Link href={`/basari-hikayeleri/${item.slug}`} className="more-story-card" key={item.id}>
                    {item.coverImage ? (
                      <img src={item.coverImage} alt={item.title} className="more-story-bg" />
                    ) : (
                      <div className="more-story-bg placeholder-bg"></div>
                    )}
                    <div className="more-story-overlay"></div>
                    {item.logo && (
                      <div className="more-story-logo">
                        <img src={item.logo} alt="" />
                      </div>
                    )}
                  </Link>
                ))}
              </div>
            </section>
          )}

        </main>
        
        <Footer />
      </div>
    </div>
  )
}
