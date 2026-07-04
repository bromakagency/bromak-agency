"use server"

import { prisma } from "@/app/lib/prisma"
import { auth } from "@/auth"
import { revalidatePath } from "next/cache"

export async function createStory(data: any) {
  const session = await auth()
  if (!session?.user) throw new Error("Yetkisiz işlem")

  const story = await prisma.story.create({
    data: {
      title: data.title,
      slug: data.slug,
      summary: data.summary,
      content: data.content,
      logo: data.logo,
      coverImage: data.coverImage,
      color1: data.color1,
      color2: data.color2,
      metricsJson: data.metricsJson,
      published: data.published,
    }
  })

  revalidatePath("/bromakhome/hikayeler")
  return story
}

export async function updateStory(id: string, data: any) {
  const session = await auth()
  if (!session?.user) throw new Error("Yetkisiz işlem")

  const story = await prisma.story.update({
    where: { id },
    data: {
      title: data.title,
      slug: data.slug,
      summary: data.summary,
      content: data.content,
      logo: data.logo,
      coverImage: data.coverImage,
      color1: data.color1,
      color2: data.color2,
      metricsJson: data.metricsJson,
      published: data.published,
    }
  })

  revalidatePath("/bromakhome/hikayeler")
  return story
}

export async function deleteStory(id: string) {
  const session = await auth()
  if (!session?.user) throw new Error("Yetkisiz işlem")

  await prisma.story.delete({
    where: { id }
  })

  revalidatePath("/bromakhome/hikayeler")
}
