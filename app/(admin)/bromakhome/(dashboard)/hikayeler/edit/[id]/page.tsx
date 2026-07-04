import { auth } from "@/auth"
import { prisma } from "@/app/lib/prisma"
import { notFound } from "next/navigation"
import Link from "next/link"
import { LuArrowLeft } from "react-icons/lu"
import StoryForm from "../../StoryForm"

export const metadata = {
  title: "Hikaye Düzenle | Bromak Admin",
}

export default async function EditStoryPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session?.user) return null

  const { id } = await params
  const story = await prisma.story.findUnique({
    where: { id }
  })

  if (!story) {
    notFound()
  }

  return (
    <div className="blog-admin-container">
      <div className="page-header">
        <div>
          <div className="flex items-center gap-4 mb-2">
            <Link href="/bromakhome/hikayeler" className="btn-outline-dark" style={{ padding: '8px 16px', fontSize: '14px', marginBottom: '16px' }}>
              <LuArrowLeft size={16} /> Geri Dön
            </Link>
          </div>
          <h1>Hikaye Düzenle: {story.title}</h1>
        </div>
      </div>
      
      <div className="form-wrapper">
        <StoryForm story={story} />
      </div>
    </div>
  )
}
