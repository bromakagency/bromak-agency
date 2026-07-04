import { prisma } from "@/app/lib/prisma"
import { notFound } from "next/navigation"
import WorkForm from "../../WorkForm"

export const metadata = {
  title: "Projeyi Düzenle | Bromak Admin",
}

export default async function EditWorkPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const work = await prisma.work.findUnique({
    where: { id }
  })

  if (!work) {
    notFound()
  }

  return <WorkForm work={work} />
}
