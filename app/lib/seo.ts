import { prisma } from "./prisma"
import { Metadata } from "next"

export async function getSeoMetadata(
  page: string,
  defaults: { title: string; description: string; keywords?: string }
): Promise<Metadata> {
  try {
    const seo = await prisma.seoSettings.findUnique({
      where: { page },
    })

    const title = seo?.title || defaults.title
    const description = seo?.description || defaults.description
    const keywords = seo?.keywords || defaults.keywords
    const ogImage = seo?.ogImage || "https://bromakagency.com/og-default.jpg"

    return {
      title,
      description,
      keywords: keywords ? keywords.split(",").map(k => k.trim()) : undefined,
      openGraph: {
        title,
        description,
        images: [{ url: ogImage }],
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: [ogImage],
      },
    }
  } catch (error) {
    console.error(`Error fetching SEO for ${page}:`, error)
    return {
      title: defaults.title,
      description: defaults.description,
      keywords: defaults.keywords ? defaults.keywords.split(",").map(k => k.trim()) : undefined,
    }
  }
}
