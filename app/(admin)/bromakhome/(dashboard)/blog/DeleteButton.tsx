"use client"

import { useTransition } from "react"
import { deletePost } from "@/app/actions/blog"
import { deleteWork } from "@/app/actions/work"
import { FiTrash2, FiLoader } from "react-icons/fi"

type DeleteButtonProps = {
  id: string
  type?: "blog" | "work"
}

export default function DeleteButton({ id, type = "blog" }: DeleteButtonProps) {
  const [isPending, startTransition] = useTransition()

  const handleDelete = () => {
    if (confirm("Bu içeriği silmek istediğinize emin misiniz?")) {
      startTransition(async () => {
        try {
          if (type === "blog") {
            await deletePost(id)
          } else {
            await deleteWork(id)
          }
        } catch (error) {
          alert("Silme işlemi başarısız oldu.")
        }
      })
    }
  }

  return (
    <button 
      onClick={handleDelete} 
      className="btn-delete"
      disabled={isPending}
    >
      <FiTrash2 size={16} /> {isPending ? "Siliniyor..." : "Sil"}
    </button>
  )
}
