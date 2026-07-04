"use client"

import { useState } from "react"
import { deleteApplication, toggleApplicationStatus } from "@/app/actions/career"
import toast from "react-hot-toast"
import { LuTrash2, LuEye, LuDownload, LuX } from "react-icons/lu"
import "../blog/blog.css"

export default function CareerListClient({ initialApplications }: { initialApplications: any[] }) {
  const [applications, setApplications] = useState(initialApplications)
  const [isLoading, setIsLoading] = useState<string | null>(null)
  const [selectedApp, setSelectedApp] = useState<any | null>(null)

  const handleDelete = async (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!confirm("Bu başvuruyu kalıcı olarak silmek istediğinize emin misiniz?")) return
    
    setIsLoading(id)
    const res = await deleteApplication(id)
    if (res.success) {
      setApplications(applications.filter(a => a.id !== id))
      if (selectedApp && selectedApp.id === id) setSelectedApp(null);
      toast.success("Başvuru silindi.")
    } else {
      toast.error(res.message || "Silinemedi.")
    }
    setIsLoading(null)
  }

  const handleToggleStatus = async (id: string, currentStatus: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setIsLoading(id)
    const res = await toggleApplicationStatus(id, currentStatus)
    
    if (res.success) {
      const newStatus = currentStatus === "UNREAD" ? "READ" : "UNREAD";
      setApplications(applications.map(a => 
        a.id === id ? { ...a, status: newStatus } : a
      ))
      if (selectedApp && selectedApp.id === id) {
        setSelectedApp({ ...selectedApp, status: newStatus });
      }
      toast.success("Durum güncellendi.")
    } else {
      toast.error(res.message || "Güncellenemedi.")
    }
    setIsLoading(null)
  }

  const handleRowClick = async (app: any) => {
    setSelectedApp(app);
    // Eğer okunmamışsa otomatik olarak okundu işaretle
    if (app.status === "UNREAD") {
      const res = await toggleApplicationStatus(app.id, app.status);
      if (res.success) {
        setApplications(applications.map(a => 
          a.id === app.id ? { ...a, status: "READ" } : a
        ));
        setSelectedApp({ ...app, status: "READ" });
      }
    }
  }

  if (applications.length === 0) {
    return (
      <div className="empty-state">
        <p>Henüz sisteminize gelen bir iş veya staj başvurusu yok.</p>
      </div>
    )
  }

  return (
    <>
      <div className="table-container overflow-x-auto">
        <table className="data-table w-full">
          <thead>
            <tr>
              <th>Ad Soyad</th>
              <th>E-Posta / Telefon</th>
              <th>Tip</th>
              <th>Mesaj Özeti</th>
              <th>Durum</th>
              <th>Tarih</th>
              <th style={{ textAlign: "right" }}>İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app: any) => (
              <tr 
                key={app.id} 
                onClick={() => handleRowClick(app)}
                style={{ cursor: "pointer", background: app.status === "UNREAD" ? "#fff9f9" : "transparent" }}
              >
                <td>
                  <div className="font-medium" style={{ fontWeight: app.status === "UNREAD" ? 700 : 500 }}>{app.name}</div>
                </td>
                <td>
                  <div className="text-muted">{app.email}</div>
                  <div className="text-muted" style={{ fontSize: "13px", marginTop: "4px" }}>{app.phone}</div>
                </td>
                <td>
                  <span 
                    className="badge-category" 
                    style={app.type === 'internship' ? { background: '#f3e8ff', color: '#7e22ce' } : { background: '#e0e7ff', color: '#4338ca' }}
                  >
                    {app.type === 'internship' ? 'Staj' : 'İş'}
                  </span>
                </td>
                <td>
                  <div className="text-muted" style={{ maxWidth: "250px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", fontWeight: app.status === "UNREAD" ? 600 : 400 }} title="Tıklayıp okuyun">
                    {app.message || "Mesaj yok..."}
                  </div>
                </td>
                <td>
                  <span className={`badge-status ${app.status === "READ" ? "published" : "draft"}`}>
                    {app.status === "READ" ? "Okundu" : "Okunmadı"}
                  </span>
                </td>
                <td className="text-muted" style={{ fontSize: "14px" }}>
                  {new Date(app.createdAt).toLocaleDateString("tr-TR")}
                </td>
                <td className="actions-cell">
                  <div className="action-buttons">
                    <button 
                      onClick={(e) => { e.stopPropagation(); window.open(app.cvUrl, '_blank'); }}
                      className="btn-edit" 
                      style={{ background: '#eff6ff', color: '#2563eb', borderColor: '#bfdbfe' }} 
                      title="CV İndir"
                    >
                      <LuDownload size={16} /> CV
                    </button>
                    {app.status === "UNREAD" && (
                      <button 
                        onClick={(e) => handleToggleStatus(app.id, app.status, e)}
                        className="btn-edit"
                        disabled={isLoading === app.id}
                        title="Okundu İşaretle"
                      >
                        <LuEye size={16} /> Okundu
                      </button>
                    )}
                    <button 
                      onClick={(e) => handleDelete(app.id, e)}
                      className="btn-delete"
                      disabled={isLoading === app.id}
                      title="Sil"
                    >
                      <LuTrash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedApp && (
        <div style={{
          position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: "rgba(0,0,0,0.5)", zIndex: 9999,
          display: "flex", alignItems: "center", justifyContent: "center",
          padding: "20px"
        }} onClick={() => setSelectedApp(null)}>
          <div style={{
            backgroundColor: "#fff", borderRadius: "24px", width: "100%", maxWidth: "600px",
            maxHeight: "90vh", overflowY: "auto", position: "relative",
            boxShadow: "0 20px 40px rgba(0,0,0,0.1)", padding: "40px"
          }} onClick={e => e.stopPropagation()}>
            
            <button 
              onClick={() => setSelectedApp(null)}
              style={{
                position: "absolute", top: "20px", right: "20px",
                background: "#f4f4f5", border: "none", width: "40px", height: "40px",
                borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer", color: "#3f3f46"
              }}
            >
              <LuX size={20} />
            </button>

            <div style={{ marginBottom: "30px", paddingBottom: "20px", borderBottom: "1px solid #f4f4f5" }}>
              <span 
                className="badge-category" 
                style={selectedApp.type === 'internship' ? { background: '#f3e8ff', color: '#7e22ce', marginBottom: '10px' } : { background: '#e0e7ff', color: '#4338ca', marginBottom: '10px' }}
              >
                {selectedApp.type === 'internship' ? 'Staj Başvurusu' : 'İş Başvurusu'}
              </span>
              <h2 style={{ fontSize: "28px", fontWeight: 800, color: "#111", margin: "5px 0" }}>{selectedApp.name}</h2>
              <p style={{ color: "#71717a", fontSize: "15px", margin: 0 }}>
                {new Date(selectedApp.createdAt).toLocaleDateString("tr-TR", { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "30px" }}>
              <div>
                <p style={{ fontSize: "13px", color: "#71717a", marginBottom: "4px", fontWeight: 600, textTransform: "uppercase" }}>E-Posta</p>
                <a href={`mailto:${selectedApp.email}`} style={{ color: "#111", fontWeight: 500, textDecoration: "none" }}>{selectedApp.email}</a>
              </div>
              <div>
                <p style={{ fontSize: "13px", color: "#71717a", marginBottom: "4px", fontWeight: 600, textTransform: "uppercase" }}>Telefon</p>
                <a href={`tel:${selectedApp.phone}`} style={{ color: "#111", fontWeight: 500, textDecoration: "none" }}>{selectedApp.phone}</a>
              </div>
            </div>

            {selectedApp.portfolioUrl && (
              <div style={{ marginBottom: "30px", padding: "15px", background: "#f8fafc", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
                <p style={{ fontSize: "13px", color: "#64748b", marginBottom: "4px", fontWeight: 600, textTransform: "uppercase" }}>Portfolyo / LinkedIn</p>
                <a href={selectedApp.portfolioUrl} target="_blank" rel="noreferrer" style={{ color: "#2563eb", fontWeight: 500 }}>
                  {selectedApp.portfolioUrl}
                </a>
              </div>
            )}

            <div style={{ marginBottom: "40px" }}>
              <p style={{ fontSize: "13px", color: "#71717a", marginBottom: "10px", fontWeight: 600, textTransform: "uppercase" }}>Ön Yazı / Mesaj</p>
              <div style={{ background: "#f4f4f5", padding: "20px", borderRadius: "16px", color: "#3f3f46", fontSize: "16px", lineHeight: "1.6", whiteSpace: "pre-wrap" }}>
                {selectedApp.message || "Aday mesaj bırakmamış."}
              </div>
            </div>

            <a 
              href={selectedApp.cvUrl} 
              target="_blank" 
              rel="noreferrer" 
              style={{
                display: "flex", alignItems: "center", justifyContent: "center", gap: "10px",
                width: "100%", padding: "16px", background: "#e2130a", color: "#fff",
                borderRadius: "16px", textDecoration: "none", fontWeight: 700, fontSize: "16px",
                transition: "background 0.2s"
              }}
            >
              <LuDownload size={20} /> Özgeçmişi (CV) İndir / Görüntüle
            </a>

          </div>
        </div>
      )}
    </>
  )
}
