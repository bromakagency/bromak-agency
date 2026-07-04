"use server"

import { prisma } from "@/app/lib/prisma"
import { auth } from "@/auth"
import { revalidatePath } from "next/cache"

export async function getSeoSettings() {
  const session = await auth()
  if (!session) return { success: false, message: "Yetkisiz işlem." }

  try {
    const seoList = await prisma.seoSettings.findMany({
      orderBy: { page: "asc" }
    })
    return { success: true, data: seoList }
  } catch (error) {
    console.error("Error fetching seo:", error)
    return { success: false, message: "SEO ayarları alınamadı." }
  }
}

export async function saveSeoSettings(data: {
  page: string;
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
}) {
  const session = await auth()
  if (!session) return { success: false, message: "Yetkisiz işlem." }

  try {
    await prisma.seoSettings.upsert({
      where: { page: data.page },
      update: {
        title: data.title,
        description: data.description,
        keywords: data.keywords,
        ogImage: data.ogImage,
      },
      create: {
        page: data.page,
        title: data.title,
        description: data.description,
        keywords: data.keywords,
        ogImage: data.ogImage,
      }
    })

    // Map page keys to actual paths to revalidate
    let pathToRevalidate = "/"
    if (data.page !== "home") {
      pathToRevalidate = `/${data.page}`
    }
    
    revalidatePath(pathToRevalidate)
    
    return { success: true, message: "SEO ayarları başarıyla kaydedildi." }
  } catch (error) {
    console.error("Error saving seo:", error)
    return { success: false, message: "Ayarlar kaydedilirken hata oluştu." }
  }
}
