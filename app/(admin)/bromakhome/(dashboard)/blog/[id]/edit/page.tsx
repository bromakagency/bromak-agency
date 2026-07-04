import { prisma } from "@/app/lib/prisma"
import { notFound } from "next/navigation"
import BlogForm from "../../BlogForm"

export const metadata = {
  title: "Yazıyı Düzenle | Bromak",
}

export default async function EditBlogPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const post = await prisma.post.findUnique({ where: { id } })

  if (!post) notFound()

  return <BlogForm post={post} />
}
