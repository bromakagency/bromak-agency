"use client"

import { useState, useTransition } from "react"
import Link from "next/link"
import { FiEdit, FiTrash2 } from "react-icons/fi"
import DeleteButton from "./DeleteButton"
import PublishToggle from "./PublishToggle"
import { deleteBulkPosts } from "@/app/actions/blog"
import { useRouter } from "next/navigation"

type Post = {
  id: string
  title: string
  category: string
  image: string
  published: boolean
  createdAt: Date
}

export default function BlogListClient({ posts }: { posts: Post[] }) {
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedIds(posts.map(p => p.id))
    } else {
      setSelectedIds([])
    }
  }

  const handleSelect = (id: string) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    )
  }

  const handleBulkDelete = () => {
    if (!confirm(`Seçili ${selectedIds.length} blog yazısını silmek istediğinize emin misiniz?`)) return

    startTransition(async () => {
      try {
        await deleteBulkPosts(selectedIds)
        setSelectedIds([])
        router.refresh()
      } catch (error) {
        alert("Toplu silme işlemi başarısız oldu.")
      }
    })
  }

  if (posts.length === 0) {
    return (
      <div className="empty-state">
        <p>Henüz hiç blog yazısı eklemediniz.</p>
      </div>
    )
  }

  return (
    <>
      {selectedIds.length > 0 && (
        <div className="bulk-actions-bar">
          <span>{selectedIds.length} öğe seçildi</span>
          <button 
            onClick={handleBulkDelete} 
            disabled={isPending}
            className="btn-bulk-delete"
          >
            <FiTrash2 size={16} /> {isPending ? "Siliniyor..." : "Seçilenleri Sil"}
          </button>
        </div>
      )}

      <table className="data-table">
        <thead>
          <tr>
            <th className="checkbox-cell">
              <input 
                type="checkbox" 
                className="custom-checkbox"
                checked={selectedIds.length === posts.length && posts.length > 0}
                onChange={handleSelectAll}
              />
            </th>
            <th>Görsel</th>
            <th>Başlık</th>
            <th>Kategori</th>
            <th>Durum</th>
            <th>Tarih</th>
            <th className="actions-cell">İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.id} className={selectedIds.includes(post.id) ? "selected-row" : ""}>
              <td className="checkbox-cell">
                <input 
                  type="checkbox" 
                  className="custom-checkbox"
                  checked={selectedIds.includes(post.id)}
                  onChange={() => handleSelect(post.id)}
                />
              </td>
              <td>
                <div className="table-img">
                  <img src={post.image || "/assets/logos/bromak_kirmizi_logo.svg"} alt={post.title} />
                </div>
              </td>
              <td className="font-medium">{post.title}</td>
              <td><span className="badge-category">{post.category}</span></td>
              <td>
                <PublishToggle id={post.id} published={post.published} />
              </td>
              <td className="text-muted">
                {new Date(post.createdAt).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}
              </td>
              <td className="actions-cell">
                <div className="action-buttons">
                  <Link href={`/bromakhome/blog/${post.id}/edit`} className="btn-edit">
                    <FiEdit size={16} /> Düzenle
                  </Link>
                  <DeleteButton id={post.id} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}
