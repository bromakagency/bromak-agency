import { auth } from "@/auth"
import Link from "next/link"
import { prisma } from "@/app/lib/prisma"
import { LuFileText, LuBriefcase, LuMail, LuGraduationCap, LuUsers, LuMessageSquare, LuChevronRight } from "react-icons/lu"
import { FiEdit } from "react-icons/fi"

export const metadata = {
  title: "Admin Dashboard | Bromak",
}

export default async function AdminDashboard() {
  const session = await auth()

  // Bütün verileri paralel ve hızlıca çekiyoruz
  const [
    postCount,
    workCount,
    storyCount,
    unreadMessages,
    unreadCareers,
    subscriberCount,
    recentPosts,
    recentMessages,
    recentCareers
  ] = await Promise.all([
    prisma.post.count(),
    prisma.work.count(),
    prisma.story.count(),
    prisma.contactMessage.count({ where: { isRead: false } }),
    prisma.careerApplication.count({ where: { status: "UNREAD" } }),
    prisma.newsletterSubscriber.count(),
    prisma.post.findMany({ orderBy: { createdAt: "desc" }, take: 4 }),
    prisma.contactMessage.findMany({ orderBy: { createdAt: "desc" }, take: 5 }),
    prisma.careerApplication.findMany({ orderBy: { createdAt: "desc" }, take: 5 })
  ])

  const totalContent = postCount + workCount + storyCount

  return (
    <div className="dashboard-container" style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
      
      <div className="dashboard-header">
        <div>
          <h1 style={{ fontSize: "32px", fontWeight: 800, color: "#0f172a", marginBottom: "8px" }}>
            Hoş Geldin, {session?.user?.name || "Admin"} 👋
          </h1>
          <p style={{ color: "#64748b", fontSize: "16px" }}>
            Bromak Agency operasyon merkezindesin. İşte bugünün özeti.
          </p>
        </div>
      </div>

      <div className="stats-grid">
        <Link href="/bromakhome/messages" className="stat-card" style={{ textDecoration: "none" }}>
          <div className="stat-icon" style={{ background: unreadMessages > 0 ? "#fee2e2" : "#f1f5f9", color: unreadMessages > 0 ? "#ef4444" : "#64748b" }}>
            <LuMessageSquare size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-value" style={{ color: unreadMessages > 0 ? "#ef4444" : "#0f172a" }}>
              {unreadMessages > 0 ? `${unreadMessages} Yeni` : "0"}
            </span>
            <span className="stat-label">Okunmamış Mesaj</span>
          </div>
        </Link>
        
        <Link href="/bromakhome/kariyer" className="stat-card" style={{ textDecoration: "none" }}>
          <div className="stat-icon" style={{ background: unreadCareers > 0 ? "#e0e7ff" : "#f1f5f9", color: unreadCareers > 0 ? "#4f46e5" : "#64748b" }}>
            <LuGraduationCap size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-value" style={{ color: unreadCareers > 0 ? "#4f46e5" : "#0f172a" }}>
              {unreadCareers > 0 ? `${unreadCareers} Yeni` : "0"}
            </span>
            <span className="stat-label">İş / Staj Başvurusu</span>
          </div>
        </Link>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: "#fef3c7", color: "#d97706" }}>
            <LuFileText size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-value">{totalContent}</span>
            <span className="stat-label">Toplam İçerik</span>
          </div>
        </div>

        <Link href="/bromakhome/ebulten" className="stat-card" style={{ textDecoration: "none" }}>
          <div className="stat-icon" style={{ background: "#dcfce7", color: "#16a34a" }}>
            <LuUsers size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-value">{subscriberCount}</span>
            <span className="stat-label">Bülten Abonesi</span>
          </div>
        </Link>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "30px" }}>
        
        {/* Sol Kolon */}
        <div style={{ display: "flex", flexDirection: "column", gap: "30px" }}>
          <div className="content-section" style={{ background: "#fff", borderRadius: "20px", padding: "24px", boxShadow: "0 4px 20px rgba(0,0,0,0.03)" }}>
            <div className="section-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <h3 style={{ fontSize: "18px", fontWeight: 700, margin: 0, color: "#0f172a", display: "flex", alignItems: "center", gap: "8px" }}>
                <LuMessageSquare color="#ef4444" /> Son Mesajlar
              </h3>
              <Link href="/bromakhome/messages" style={{ fontSize: "14px", color: "#3b82f6", textDecoration: "none", fontWeight: 600 }}>Tümünü Gör</Link>
            </div>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {recentMessages.length === 0 ? (
                <p style={{ color: "#94a3b8", fontSize: "14px", padding: "10px 0", margin: 0 }}>Henüz mesaj yok.</p>
              ) : (
                recentMessages.map((msg) => (
                  <Link href="/bromakhome/messages" key={msg.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 16px", background: msg.isRead ? "#f8fafc" : "#fff1f2", borderRadius: "12px", textDecoration: "none", border: "1px solid #f1f5f9" }}>
                    <div>
                      <h4 style={{ margin: "0 0 4px 0", fontSize: "14px", fontWeight: msg.isRead ? 600 : 700, color: "#0f172a" }}>{msg.name}</h4>
                      <p style={{ margin: 0, fontSize: "13px", color: "#64748b", maxWidth: "200px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{msg.message}</p>
                    </div>
                    <span style={{ fontSize: "12px", color: "#94a3b8" }}>{new Date(msg.createdAt).toLocaleDateString("tr-TR")}</span>
                  </Link>
                ))
              )}
            </div>
          </div>

          <div className="content-section" style={{ background: "#fff", borderRadius: "20px", padding: "24px", boxShadow: "0 4px 20px rgba(0,0,0,0.03)" }}>
            <div className="section-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <h3 style={{ fontSize: "18px", fontWeight: 700, margin: 0, color: "#0f172a", display: "flex", alignItems: "center", gap: "8px" }}>
                <LuGraduationCap color="#4f46e5" /> Son Başvurular
              </h3>
              <Link href="/bromakhome/kariyer" style={{ fontSize: "14px", color: "#3b82f6", textDecoration: "none", fontWeight: 600 }}>Tümünü Gör</Link>
            </div>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {recentCareers.length === 0 ? (
                <p style={{ color: "#94a3b8", fontSize: "14px", padding: "10px 0", margin: 0 }}>Henüz başvuru yok.</p>
              ) : (
                recentCareers.map((app) => (
                  <Link href="/bromakhome/kariyer" key={app.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 16px", background: app.status === "UNREAD" ? "#eef2ff" : "#f8fafc", borderRadius: "12px", textDecoration: "none", border: "1px solid #f1f5f9" }}>
                    <div>
                      <h4 style={{ margin: "0 0 4px 0", fontSize: "14px", fontWeight: app.status === "UNREAD" ? 700 : 600, color: "#0f172a" }}>{app.name}</h4>
                      <p style={{ margin: 0, fontSize: "13px", color: app.type === "internship" ? "#9333ea" : "#2563eb", fontWeight: 600 }}>
                        {app.type === "internship" ? "Staj" : "İş"} Başvurusu
                      </p>
                    </div>
                    <span style={{ fontSize: "12px", color: "#94a3b8" }}>{new Date(app.createdAt).toLocaleDateString("tr-TR")}</span>
                  </Link>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Sağ Kolon */}
        <div style={{ display: "flex", flexDirection: "column", gap: "30px" }}>
          <div className="content-section" style={{ background: "#fff", borderRadius: "20px", padding: "24px", boxShadow: "0 4px 20px rgba(0,0,0,0.03)", flex: 1 }}>
            <div className="section-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <h3 style={{ fontSize: "18px", fontWeight: 700, margin: 0, color: "#0f172a", display: "flex", alignItems: "center", gap: "8px" }}>
                <LuFileText color="#d97706" /> Son Blog Yazıları
              </h3>
              <div style={{ display: "flex", gap: "12px" }}>
                <Link href="/bromakhome/blog/new" style={{ fontSize: "13px", background: "#f1f5f9", color: "#0f172a", padding: "6px 12px", borderRadius: "8px", textDecoration: "none", fontWeight: 600 }}>+ Yeni Yazı</Link>
                <Link href="/bromakhome/blog" style={{ fontSize: "14px", color: "#3b82f6", textDecoration: "none", fontWeight: 600, display: "flex", alignItems: "center" }}>Tümünü Gör</Link>
              </div>
            </div>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {recentPosts.length === 0 ? (
                <p style={{ color: "#94a3b8", fontSize: "14px", padding: "10px 0", margin: 0 }}>Henüz blog yazısı yok.</p>
              ) : (
                recentPosts.map((post) => (
                  <div key={post.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px", background: "#f8fafc", borderRadius: "12px", border: "1px solid #f1f5f9" }}>
                    <div>
                      <h4 style={{ margin: "0 0 6px 0", fontSize: "15px", fontWeight: 600, color: "#0f172a" }}>{post.title}</h4>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "12px" }}>
                        <span style={{ padding: "4px 8px", background: post.published ? "#dcfce7" : "#fef3c7", color: post.published ? "#166534" : "#d97706", borderRadius: "6px", fontWeight: 600 }}>
                          {post.published ? "Yayında" : "Taslak"}
                        </span>
                        <span style={{ color: "#94a3b8" }}>{new Date(post.createdAt).toLocaleDateString("tr-TR")}</span>
                      </div>
                    </div>
                    <Link href={`/bromakhome/blog/${post.id}/edit`} style={{ padding: "8px", background: "#fff", borderRadius: "8px", color: "#64748b", border: "1px solid #e2e8f0", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <FiEdit size={16} />
                    </Link>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

      </div>

    </div>
  )
}
