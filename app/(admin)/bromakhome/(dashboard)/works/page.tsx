import { auth } from "@/auth"
import { prisma } from "@/app/lib/prisma"
import Link from "next/link"
import { LuPlus } from "react-icons/lu"
import WorksListClient from "./WorksListClient"
import "../blog/blog.css"
import "./works.css"

export const metadata = {
  title: "Portfolyo İşleri | Bromak Admin",
}

export default async function WorksAdminPage() {
  const session = await auth()
  if (!session?.user) return null

  const works = await prisma.work.findMany({
    orderBy: [{ order: "asc" }, { createdAt: "desc" }],
  })

  return (
    <div className="blog-admin-container">
      <div className="page-header">
        <div>
          <h1>Portfolyo İşleri</h1>
          <p>Tüm portfolyo işlerini buradan yönetebilirsiniz.</p>
        </div>
        <Link href="/bromakhome/works/new" className="btn-primary">
          <LuPlus size={18} /> Yeni İş Ekle
        </Link>
      </div>

      <div className="table-container">
        <WorksListClient works={works} />
      </div>
    </div>
  )
}
