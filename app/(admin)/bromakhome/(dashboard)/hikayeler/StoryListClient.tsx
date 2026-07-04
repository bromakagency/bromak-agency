"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { LuEye, LuPen, LuTrash2, LuCircleX, LuCircleCheck } from "react-icons/lu"
import { deleteStory } from "@/app/actions/story"
import { toast } from "react-hot-toast"
import "../blog/blog.css"

export default function StoryListClient({ stories }: { stories: any[] }) {
  const router = useRouter()
  const [isDeleting, setIsDeleting] = useState<string | null>(null)

  const handleDelete = async (id: string) => {
    if (!confirm("Bu başarı hikayesini silmek istediğinize emin misiniz?")) return

    try {
      setIsDeleting(id)
      await deleteStory(id)
      toast.success("Hikaye başarıyla silindi")
      router.refresh()
    } catch (error) {
      toast.error("Bir hata oluştu")
    } finally {
      setIsDeleting(null)
    }
  }

  if (stories.length === 0) {
    return (
      <div className="empty-state">
        <p>Henüz hiç başarı hikayesi eklenmemiş.</p>
      </div>
    )
  }

  return (
    <div className="table-container">
      <table className="data-table">
        <thead>
          <tr>
            <th>Kapak</th>
            <th>Başlık</th>
            <th>Durum</th>
            <th>Tarih</th>
            <th style={{ textAlign: 'right' }}>İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {stories.map((story) => (
            <tr key={story.id}>
              <td>
                {story.coverImage ? (
                  <div className="table-img">
                    <img src={story.coverImage} alt={story.title} />
                  </div>
                ) : (
                  <div className="table-img bg-gray-100 flex items-center justify-center text-xs text-gray-400">Yok</div>
                )}
              </td>
            <td>
              <div className="font-medium">{story.title}</div>
              <div className="text-muted">{story.slug}</div>
            </td>
            <td>
              <span className={`badge-status ${story.published ? 'published' : 'draft'}`}>
                {story.published ? 'Yayında' : 'Taslak'}
              </span>
            </td>
            <td className="text-muted">
              {new Date(story.createdAt).toLocaleDateString("tr-TR")}
            </td>
            <td>
              <div className="actions" style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                <Link href={`/basari-hikayeleri/${story.slug}`} target="_blank" className="btn-edit" title="Görüntüle">
                  <LuEye size={16} /> Görüntüle
                </Link>
                <Link href={`/bromakhome/hikayeler/edit/${story.id}`} className="btn-edit" title="Düzenle">
                  <LuPen size={16} /> Düzenle
                </Link>
                <button 
                  onClick={() => handleDelete(story.id)}
                  className="btn-delete"
                  disabled={isDeleting === story.id}
                  title="Sil"
                >
                  <LuTrash2 size={16} /> Sil
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  )
}
