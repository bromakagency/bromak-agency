import { auth } from "@/auth"
import Link from "next/link"
import { LuArrowLeft } from "react-icons/lu"
import StoryForm from "../StoryForm"

export const metadata = {
  title: "Yeni Hikaye Ekle | Bromak Admin",
}

export default async function NewStoryPage() {
  const session = await auth()
  if (!session?.user) return null

  return (
    <div className="blog-admin-container">
      <div className="page-header">
        <div>
          <div className="flex items-center gap-4 mb-2">
            <Link href="/bromakhome/hikayeler" className="btn-outline-dark" style={{ padding: '8px 16px', fontSize: '14px', marginBottom: '16px' }}>
              <LuArrowLeft size={16} /> Geri Dön
            </Link>
          </div>
          <h1>Yeni Başarı Hikayesi Ekle</h1>
        </div>
      </div>
      
      <div className="form-wrapper">
        <StoryForm />
      </div>
    </div>
  )
}
