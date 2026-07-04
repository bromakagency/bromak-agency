import { prisma } from "@/app/lib/prisma"
import Link from "next/link"
import { LuPlus } from "react-icons/lu"
import { FiEdit } from "react-icons/fi"
import BlogListClient from "./BlogListClient"
import "./blog.css"

export const metadata = {
  title: "Blog Yönetimi | Bromak",
}

export default async function BlogAdminPage() {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" }
  })

  return (
    <div className="blog-admin-container">
      <div className="page-header">
        <div>
          <h1>Blog Yönetimi</h1>
          <p>Sitenizdeki tüm blog yazılarını buradan yönetebilirsiniz.</p>
        </div>
        <Link href="/bromakhome/blog/new" className="btn-primary">
          <LuPlus size={18} /> Yeni Yazı Ekle
        </Link>
      </div>

      <div className="table-container">
        <BlogListClient posts={posts} />
      </div>
    </div>
  )
}
