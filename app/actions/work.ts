"use server"

import { prisma } from "@/app/lib/prisma"
import { revalidatePath } from "next/cache"
import { auth } from "@/auth"

type WorkData = {
  title: string
  slug: string
  client: string
  service: string
  duration: string
  website?: string | null
  summary: string
  coverImage: string
  heroImage: string
  challenge: string
  solution: string
  result: string
  gallery: string[]
  published: boolean
}

export async function createWork(data: WorkData) {
  const session = await auth()
  if (!session?.user) throw new Error("Yetkisiz işlem")

  const newWork = await prisma.work.create({
    data
  })

  revalidatePath("/isler")
  revalidatePath("/bromakhome/works")
  revalidatePath("/bromakhome/dashboard")
  return newWork
}

export async function updateWork(id: string, data: WorkData) {
  const session = await auth()
  if (!session?.user) throw new Error("Yetkisiz işlem")

  const updatedWork = await prisma.work.update({
    where: { id },
    data
  })

  revalidatePath("/isler")
  revalidatePath(`/isler/${updatedWork.slug}`)
  revalidatePath("/bromakhome/works")
  revalidatePath("/bromakhome/dashboard")
  return updatedWork
}

export async function deleteWork(id: string) {
  const session = await auth()
  if (!session?.user) throw new Error("Yetkisiz işlem")

  await prisma.work.delete({
    where: { id }
  })

  revalidatePath("/isler")
  revalidatePath("/bromakhome/works")
  revalidatePath("/bromakhome/dashboard")
}

export async function toggleWorkPublishStatus(id: string, currentStatus: boolean) {
  const session = await auth()
  if (!session?.user) throw new Error("Yetkisiz işlem")

  await prisma.work.update({
    where: { id },
    data: { published: !currentStatus }
  })

  revalidatePath("/isler")
  revalidatePath("/bromakhome/works")
}

export async function deleteBulkWorks(ids: string[]) {
  const session = await auth()
  if (!session?.user) throw new Error("Yetkisiz işlem")

  await prisma.work.deleteMany({
    where: {
      id: { in: ids }
    }
  })

  revalidatePath("/isler")
  revalidatePath("/bromakhome/works")
  revalidatePath("/bromakhome/dashboard")
  return true
}

export async function reorderWorks(orderedIds: string[]) {
  const session = await auth()
  if (!session?.user) throw new Error("Yetkisiz işlem")

  // Update order for all items in a transaction
  await prisma.$transaction(
    orderedIds.map((id, index) => 
      prisma.work.update({
        where: { id },
        data: { order: index }
      })
    )
  )

  revalidatePath("/isler")
  revalidatePath("/bromakhome/works")
  revalidatePath("/bromakhome/dashboard")
  return true
}
