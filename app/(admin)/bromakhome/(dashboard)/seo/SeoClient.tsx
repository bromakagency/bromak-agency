"use client"

import { useState } from "react"
import { saveSeoSettings } from "@/app/actions/seo"
import toast from "react-hot-toast"
import { LuSave, LuChevronDown, LuChevronUp, LuGlobe, LuImage, LuSearch } from "react-icons/lu"
import "../blog/blog.css"

type SeoSetting = {
  page: string;
  label: string;
  path: string;
  title: string;
  description: string;
  keywords: string;
  ogImage: string;
  isCustomized: boolean;
  defaultTitle: string;
  defaultDescription: string;
  defaultKeywords: string;
}

export default function SeoClient({ initialSettings }: { initialSettings: SeoSetting[] }) {
  const [settings, setSettings] = useState<SeoSetting[]>(initialSettings)
  const [expandedRow, setExpandedRow] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<string | null>(null)

  const handleChange = (pageKey: string, field: keyof SeoSetting, value: string) => {
    setSettings(prev => prev.map(s => s.page === pageKey ? { ...s, [field]: value } : s))
  }

  const handleSave = async (setting: SeoSetting) => {
    setIsLoading(setting.page)
    const res = await saveSeoSettings({
      page: setting.page,
      title: setting.title,
      description: setting.description,
      keywords: setting.keywords,
      ogImage: setting.ogImage
    })
    
    if (res.success) {
      toast.success(res.message)
    } else {
      toast.error(res.message)
    }
    setIsLoading(null)
  }

  const toggleRow = (pageKey: string) => {
    if (expandedRow === pageKey) {
      setExpandedRow(null)
    } else {
      setExpandedRow(pageKey)
    }
  }

  return (
    <div className="table-container">
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {settings.map(setting => (
          <div key={setting.page} style={{ 
            border: "1px solid #e2e8f0", 
            borderRadius: "16px", 
            overflow: "hidden",
            transition: "all 0.3s ease",
            boxShadow: expandedRow === setting.page ? "0 10px 25px rgba(0,0,0,0.05)" : "none",
            background: "#fff"
          }}>
            {/* Row Header */}
            <div 
              onClick={() => toggleRow(setting.page)}
              style={{ 
                display: "flex", alignItems: "center", justifyContent: "space-between", 
                padding: "20px", cursor: "pointer", background: expandedRow === setting.page ? "#f8fafc" : "#fff",
                borderBottom: expandedRow === setting.page ? "1px solid #e2e8f0" : "none"
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: "#f1f5f9", display: "flex", alignItems: "center", justifyContent: "center", color: "#64748b" }}>
                  <LuGlobe size={20} />
                </div>
                <div>
                  <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#0f172a", margin: 0 }}>{setting.label}</h3>
                  <p style={{ fontSize: "13px", color: "#64748b", margin: "4px 0 0 0" }}>{setting.path}</p>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                {setting.isCustomized ? (
                  <span style={{ fontSize: "12px", background: "#dcfce7", color: "#166534", padding: "4px 10px", borderRadius: "20px", fontWeight: 600 }}>Özelleştirildi</span>
                ) : (
                  <span style={{ fontSize: "12px", background: "#f1f5f9", color: "#475569", padding: "4px 10px", borderRadius: "20px", fontWeight: 600 }}>Varsayılan</span>
                )}
                <div style={{ color: "#94a3b8" }}>
                  {expandedRow === setting.page ? <LuChevronUp size={24} /> : <LuChevronDown size={24} />}
                </div>
              </div>
            </div>

            {/* Row Body / Edit Form */}
            {expandedRow === setting.page && (
              <div style={{ padding: "30px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "20px", marginBottom: "30px" }}>
                  
                  <div>
                    <label style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "14px", fontWeight: 600, color: "#334155", marginBottom: "8px" }}>
                      SEO Başlığı (Title) <span style={{ color: "#e2130a" }}>*</span>
                    </label>
                    <input 
                      type="text" 
                      value={setting.title}
                      onChange={e => handleChange(setting.page, "title", e.target.value)}
                      placeholder="Örn: Hizmetlerimiz | Bromak Agency"
                      style={{ width: "100%", padding: "12px 16px", borderRadius: "12px", border: "1px solid #cbd5e1", fontSize: "15px", outline: "none", transition: "border 0.2s" }}
                    />
                    <p style={{ fontSize: "12px", color: "#64748b", marginTop: "6px" }}>Google arama sonuçlarında görünen mavi başlık (Önerilen: 50-60 karakter).</p>
                  </div>

                  <div>
                    <label style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "14px", fontWeight: 600, color: "#334155", marginBottom: "8px" }}>
                      Meta Açıklaması (Description) <span style={{ color: "#e2130a" }}>*</span>
                    </label>
                    <textarea 
                      value={setting.description}
                      onChange={e => handleChange(setting.page, "description", e.target.value)}
                      placeholder="Sayfanın içeriğini kısaca anlatan çarpıcı bir metin..."
                      rows={3}
                      style={{ width: "100%", padding: "12px 16px", borderRadius: "12px", border: "1px solid #cbd5e1", fontSize: "15px", outline: "none", resize: "vertical", fontFamily: "inherit" }}
                    />
                    <p style={{ fontSize: "12px", color: "#64748b", marginTop: "6px" }}>Arama sonuçlarında başlığın altında görünen açıklama metni (Önerilen: 150-160 karakter).</p>
                  </div>

                  <div>
                    <label style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "14px", fontWeight: 600, color: "#334155", marginBottom: "8px" }}>
                      Anahtar Kelimeler (Keywords)
                    </label>
                    <input 
                      type="text" 
                      value={setting.keywords}
                      onChange={e => handleChange(setting.page, "keywords", e.target.value)}
                      placeholder="Örn: reklam ajansı, dijital pazarlama, web tasarım..."
                      style={{ width: "100%", padding: "12px 16px", borderRadius: "12px", border: "1px solid #cbd5e1", fontSize: "15px", outline: "none" }}
                    />
                    <p style={{ fontSize: "12px", color: "#64748b", marginTop: "6px" }}>Aralarına virgül koyarak yazınız.</p>
                  </div>

                  <div>
                    <label style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "14px", fontWeight: 600, color: "#334155", marginBottom: "8px" }}>
                      <LuImage size={16} /> Paylaşım Görseli (OG Image URL)
                    </label>
                    <input 
                      type="text" 
                      value={setting.ogImage}
                      onChange={e => handleChange(setting.page, "ogImage", e.target.value)}
                      placeholder="https://bromakagency.com/assets/..."
                      style={{ width: "100%", padding: "12px 16px", borderRadius: "12px", border: "1px solid #cbd5e1", fontSize: "15px", outline: "none", color: "#2563eb" }}
                    />
                    <p style={{ fontSize: "12px", color: "#64748b", marginTop: "6px" }}>Bu sayfa WhatsApp, Twitter, LinkedIn gibi platformlarda paylaşıldığında görünecek resmin linki.</p>
                  </div>

                </div>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid #f1f5f9", paddingTop: "20px" }}>
                  <button
                    onClick={() => {
                      handleChange(setting.page, "title", setting.defaultTitle);
                      handleChange(setting.page, "description", setting.defaultDescription);
                      handleChange(setting.page, "keywords", setting.defaultKeywords);
                    }}
                    style={{
                      display: "flex", alignItems: "center", gap: "6px",
                      background: "transparent", color: "#64748b", border: "1px solid #cbd5e1",
                      padding: "8px 16px", borderRadius: "10px", fontSize: "14px", fontWeight: 600,
                      cursor: "pointer", transition: "all 0.2s"
                    }}
                  >
                    Eski Haline Döndür
                  </button>

                  <button 
                    onClick={() => handleSave(setting)}
                    disabled={isLoading === setting.page}
                    style={{ 
                      display: "flex", alignItems: "center", gap: "8px", 
                      padding: "12px 24px", background: "#111", color: "#fff", 
                      borderRadius: "12px", fontWeight: 600, fontSize: "15px",
                      cursor: "pointer", border: "none", transition: "all 0.2s",
                      opacity: isLoading === setting.page ? 0.7 : 1
                    }}
                  >
                    <LuSave size={18} /> {isLoading === setting.page ? "Kaydediliyor..." : "Ayarları Kaydet"}
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
