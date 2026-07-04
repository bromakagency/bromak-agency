"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LuLayoutDashboard, LuPenTool, LuBriefcase, LuSearch, LuMail, LuGraduationCap } from "react-icons/lu"

export default function SidebarNav() {
  const pathname = usePathname()

  return (
    <nav className="sidebar-nav">
      <Link href="/bromakhome" className={`nav-item ${pathname === '/bromakhome' ? 'active' : ''}`}>
        <LuLayoutDashboard size={20} />
        <span>Dashboard</span>
      </Link>
      <Link href="/bromakhome/blog" className={`nav-item ${pathname.includes('/bromakhome/blog') ? 'active' : ''}`}>
        <LuPenTool size={20} />
        <span>Blog Yönetimi</span>
      </Link>
      <Link href="/bromakhome/works" className={`nav-item ${pathname.includes('/bromakhome/works') ? 'active' : ''}`}>
        <LuBriefcase size={20} />
        <span>İşler (Portfolyo)</span>
      </Link>
      <Link href="/bromakhome/hikayeler" className={`nav-item ${pathname.includes('/bromakhome/hikayeler') ? 'active' : ''}`}>
        <LuBriefcase size={20} />
        <span>Başarı Hikayeleri</span>
      </Link>
      <Link href="/bromakhome/seo" className={`nav-item ${pathname.includes('/bromakhome/seo') ? 'active' : ''}`}>
        <LuSearch size={20} />
        <span>SEO Ayarları</span>
      </Link>
      <Link href="/bromakhome/messages" className={`nav-item ${pathname.includes('/bromakhome/messages') ? 'active' : ''}`}>
        <LuMail size={20} />
        <span>Gelen Mesajlar</span>
      </Link>
      <Link href="/bromakhome/ebulten" className={`nav-item ${pathname.includes('/bromakhome/ebulten') ? 'active' : ''}`}>
        <LuMail size={20} />
        <span>E-Bülten</span>
      </Link>
      <Link href="/bromakhome/kariyer" className={`nav-item ${pathname.includes('/bromakhome/kariyer') ? 'active' : ''}`}>
        <LuGraduationCap size={20} />
        <span>Kariyer Başvuruları</span>
      </Link>
    </nav>
  )
}
