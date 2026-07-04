"use client"

import { useState } from "react"
import { deleteSubscriber, toggleSubscriberStatus } from "@/app/actions/newsletter"
import { LuTrash2, LuRefreshCw } from "react-icons/lu"
import toast from "react-hot-toast"

import "../blog/blog.css"

export default function EbultenClient({ initialSubscribers }: { initialSubscribers: any[] }) {
  const [subscribers, setSubscribers] = useState(initialSubscribers)
  const [isLoading, setIsLoading] = useState<string | null>(null)

  const handleDelete = async (id: string) => {
    if (!confirm("Bu aboneyi silmek istediğinize emin misiniz?")) return
    
    setIsLoading(id)
    const res = await deleteSubscriber(id)
    if (res.success) {
      setSubscribers(subscribers.filter(s => s.id !== id))
      toast.success("Abone silindi.")
    } else {
      toast.error(res.message || "Silinemedi.")
    }
    setIsLoading(null)
  }

  const handleToggleStatus = async (id: string, currentStatus: string) => {
    setIsLoading(id)
    const newStatus = currentStatus === "SUBSCRIBED" ? "UNSUBSCRIBED" : "SUBSCRIBED"
    const res = await toggleSubscriberStatus(id, newStatus)
    
    if (res.success) {
      setSubscribers(subscribers.map(s => 
        s.id === id ? { ...s, status: newStatus } : s
      ))
      toast.success("Durum güncellendi.")
    } else {
      toast.error(res.message || "Güncellenemedi.")
    }
    setIsLoading(null)
  }

  if (subscribers.length === 0) {
    return (
      <div className="empty-state">
        <p>Henüz bülteninize abone olan kimse yok.</p>
      </div>
    )
  }

  return (
    <div className="table-container">
      <table className="data-table">
        <thead>
          <tr>
            <th>E-Posta Adresi</th>
            <th>Kayıt Tarihi</th>
            <th>Durum</th>
            <th style={{ textAlign: "right" }}>İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {subscribers.map(sub => (
            <tr key={sub.id}>
              <td className="font-medium">{sub.email}</td>
              <td className="text-muted">
                {new Date(sub.createdAt).toLocaleDateString("tr-TR", {
                  year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit"
                })}
              </td>
              <td>
                <span className={`badge-status ${sub.status === "SUBSCRIBED" ? "published" : "draft"}`}>
                  {sub.status === "SUBSCRIBED" ? "Aktif" : "Ayrıldı"}
                </span>
              </td>
              <td style={{ textAlign: "right" }}>
                <div className="actions" style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                  <button 
                    onClick={() => handleToggleStatus(sub.id, sub.status)}
                    className="btn-edit"
                    disabled={isLoading === sub.id}
                    title={sub.status === "SUBSCRIBED" ? "Abonelikten Çıkar" : "Tekrar Abone Yap"}
                  >
                    <LuRefreshCw size={16} /> Durum Değiştir
                  </button>
                  <button 
                    onClick={() => handleDelete(sub.id)}
                    className="btn-delete"
                    disabled={isLoading === sub.id}
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
