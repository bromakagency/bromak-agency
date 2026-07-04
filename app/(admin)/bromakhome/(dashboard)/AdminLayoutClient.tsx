"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { LuMenu, LuX } from "react-icons/lu"
import SidebarNav from "./SidebarNav"
import LogoutButton from "./LogoutButton"
import { usePathname } from "next/navigation"

export default function AdminLayoutClient({ 
  children, 
  userName, 
  userRole 
}: { 
  children: React.ReactNode, 
  userName: string, 
  userRole: string 
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const pathname = usePathname()

  // Sayfa değiştiğinde mobilde menüyü otomatik kapat
  useEffect(() => {
    setIsSidebarOpen(false)
  }, [pathname])

  // Menü açıkken arkadaki kaydırmayı engelle
  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isSidebarOpen])

  return (
    <div className="admin-layout">
      
      {/* Mobile Header (Only visible on mobile) */}
      <div className="mobile-header">
        <button className="hamburger-btn" onClick={() => setIsSidebarOpen(true)}>
          <LuMenu size={24} />
        </button>
        <img src="/assets/logos/bromak_kirmizi_logo.svg" alt="Bromak" className="mobile-logo" style={{ height: "32px" }} />
        <div style={{ width: "24px" }}></div> {/* Placeholder for centering */}
      </div>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div className="mobile-overlay" onClick={() => setIsSidebarOpen(false)}></div>
      )}

      {/* Sidebar */}
      <aside className={`admin-sidebar ${isSidebarOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <img src="/assets/logos/bromak_beyaz_logo.svg" alt="Bromak Agency" className="sidebar-logo" />
          <button className="close-sidebar-btn" onClick={() => setIsSidebarOpen(false)}>
            <LuX size={24} />
          </button>
        </div>

        <SidebarNav />

        <div className="sidebar-footer">
          <div className="user-info">
            <span className="user-name">{userName}</span>
            <span className="user-role">{userRole}</span>
          </div>
          <LogoutButton />
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="admin-main">
        <header className="admin-header desktop-only">
          <h2>Bromak Agency Panel</h2>
        </header>
        
        <div className="admin-content-wrapper">
          {children}
        </div>
      </div>
    </div>
  )
}
