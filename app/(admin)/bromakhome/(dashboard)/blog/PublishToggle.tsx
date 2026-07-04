"use client"

import { useTransition, useState, useRef, useEffect } from "react"
import { togglePublishStatus as togglePostPublishStatus } from "@/app/actions/blog"
import { toggleWorkPublishStatus } from "@/app/actions/work"
import { FiLoader, FiChevronDown, FiCheck } from "react-icons/fi"

type PublishToggleProps = {
  id: string
  published: boolean
  type?: "blog" | "work"
}

export default function PublishToggle({ id, published, type = "blog" }: PublishToggleProps) {
  const [isPending, startTransition] = useTransition()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleSetStatus = (newStatus: boolean) => {
    if (newStatus === published) {
      setIsOpen(false)
      return
    }
    setIsOpen(false)
    startTransition(async () => {
      try {
        if (type === "blog") {
          await togglePostPublishStatus(id, published)
        } else {
          await toggleWorkPublishStatus(id, published)
        }
      } catch (error) {
        console.error("Failed to update status:", error)
      }
    })
  }

  return (
    <div className="publish-dropdown-container" ref={dropdownRef} style={{ position: "relative", display: "inline-block" }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={isPending}
        className={`badge-status ${published ? "published" : "draft"}`}
        style={{
          cursor: "pointer",
          display: "inline-flex",
          alignItems: "center",
          gap: "6px",
          border: "none",
          fontFamily: "inherit"
        }}
      >
        {isPending && <FiLoader size={12} className="spin" />}
        {published ? "Yayında" : "Taslak"}
        <FiChevronDown size={14} style={{ opacity: 0.6 }} />
      </button>

      {isOpen && (
        <div className="publish-dropdown-menu" style={{
          position: "absolute",
          top: "100%",
          left: "0",
          marginTop: "4px",
          background: "#fff",
          border: "1px solid #e2e8f0",
          borderRadius: "8px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          minWidth: "140px",
          zIndex: 10,
          padding: "4px",
          display: "flex",
          flexDirection: "column",
          gap: "2px"
        }}>
          <button 
            onClick={() => handleSetStatus(true)}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "8px 12px",
              border: "none",
              background: published ? "#f8fafc" : "transparent",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "13px",
              fontWeight: published ? 600 : 500,
              color: published ? "#10b981" : "#475569",
              textAlign: "left"
            }}
          >
            Yayına Al
            {published && <FiCheck size={14} />}
          </button>
          <button 
            onClick={() => handleSetStatus(false)}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "8px 12px",
              border: "none",
              background: !published ? "#f8fafc" : "transparent",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "13px",
              fontWeight: !published ? 600 : 500,
              color: !published ? "#64748b" : "#475569",
              textAlign: "left"
            }}
          >
            Taslağa Al
            {!published && <FiCheck size={14} />}
          </button>
        </div>
      )}
    </div>
  )
}
