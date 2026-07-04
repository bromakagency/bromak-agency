import { auth } from "@/auth"
import { prisma } from "@/app/lib/prisma"
import Link from "next/link"
import { LuPlus } from "react-icons/lu"
import StoryListClient from "./StoryListClient"
import "../blog/blog.css"
import "../works/works.css"

export const metadata = {
  title: "Başarı Hikayeleri | Bromak Admin",
}

export default async function HikayelerAdminPage() {
  const session = await auth()
  if (!session?.user) return null

  const stories = await prisma.story.findMany({
    orderBy: { createdAt: "desc" },
  })

  return (
    <div className="blog-admin-container">
      <div className="page-header">
        <div>
          <h1>Başarı Hikayeleri</h1>
          <p>Tüm müşteri başarı hikayelerini buradan yönetebilirsiniz.</p>
        </div>
        <Link href="/bromakhome/hikayeler/new" className="btn-primary">
          <LuPlus size={18} /> Yeni Hikaye Ekle
        </Link>
      </div>

      <div className="table-container">
        <StoryListClient stories={stories} />
      </div>
    </div>
  )
}
