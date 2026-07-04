"use client"

import { useState } from "react"
import { submitApplication } from "@/app/actions/career"
import toast, { Toaster } from "react-hot-toast"
import { LuUpload, LuBriefcase, LuGraduationCap } from "react-icons/lu"

export default function CareerClient() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    type: "job",
    portfolioUrl: "",
    message: "",
  })
  
  const [file, setFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0]
    if (selected) {
      if (selected.type !== "application/pdf") {
        toast.error("Lütfen sadece PDF formatında CV yükleyin.")
        return
      }
      if (selected.size > 5 * 1024 * 1024) {
        toast.error("Dosya boyutu 5 MB'dan küçük olmalıdır.")
        return
      }
      setFile(selected)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!file) {
      toast.error("Lütfen CV'nizi PDF formatında yükleyin.")
      return
    }

    setIsSubmitting(true)
    
    try {
      // 1. Upload CV to R2
      setIsUploading(true)
      const uploadData = new FormData()
      uploadData.append("file", file)
      
      const uploadRes = await fetch("/api/upload-cv", {
        method: "POST",
        body: uploadData,
      })
      
      const uploadResult = await uploadRes.json()
      
      if (!uploadRes.ok) {
        throw new Error(uploadResult.error || "CV yüklenirken bir hata oluştu.")
      }
      setIsUploading(false)
      
      // 2. Submit application
      const res = await submitApplication({
        ...formData,
        cvUrl: uploadResult.url,
      })
      
      if (res.success) {
        setIsSuccess(true)
        toast.success(res.message)
      } else {
        throw new Error(res.message)
      }
      
    } catch (error: any) {
      setIsUploading(false)
      toast.error(error.message || "Başvurunuz gönderilemedi.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="career-card success-state">
        <div className="success-icon">✓</div>
        <h2>Başvurunuz Alındı!</h2>
        <p>
          İlginiz için teşekkür ederiz. Başvurunuzu başarıyla aldık ve ilgili departmanımıza ilettik. Değerlendirme sürecinin ardından sizinle en kısa sürede iletişime geçeceğiz.
        </p>
        <button onClick={() => window.location.href = "/"} className="home-btn">
          Ana Sayfaya Dön
        </button>
      </div>
    )
  }

  return (
    <div className="career-card">
      <Toaster position="top-right" />
      
      <form onSubmit={handleSubmit}>
        
        {/* Tip Seçimi */}
        <div className="type-selectors">
          <button
            type="button"
            onClick={() => setFormData({ ...formData, type: "job" })}
            className={`type-btn ${formData.type === "job" ? "active" : ""}`}
          >
            <LuBriefcase size={22} /> İş Başvurusu
          </button>
          <button
            type="button"
            onClick={() => setFormData({ ...formData, type: "internship" })}
            className={`type-btn ${formData.type === "internship" ? "active" : ""}`}
          >
            <LuGraduationCap size={24} /> Staj Başvurusu
          </button>
        </div>

        <div className="form-grid">
          <div className="form-group">
            <label>Ad Soyad <span className="required">*</span></label>
            <input
              type="text"
              required
              className="form-control"
              placeholder="Adınızı ve soyadınızı giriniz"
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
          
          <div className="form-group">
            <label>E-Posta <span className="required">*</span></label>
            <input
              type="email"
              required
              className="form-control"
              placeholder="Geçerli bir e-posta adresi giriniz"
              value={formData.email}
              onChange={e => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
          
          <div className="form-group">
            <label>Telefon Numarası <span className="required">*</span></label>
            <input
              type="tel"
              required
              className="form-control"
              placeholder="05XX XXX XX XX"
              value={formData.phone}
              onChange={e => setFormData({ ...formData, phone: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>Portfolyo / LinkedIn (İsteğe Bağlı)</label>
            <input
              type="url"
              className="form-control"
              placeholder="https://"
              value={formData.portfolioUrl}
              onChange={e => setFormData({ ...formData, portfolioUrl: e.target.value })}
            />
          </div>
        </div>

        <div className="form-group" style={{ marginBottom: "30px" }}>
          <label>Ön Yazı / Mesajınız (İsteğe Bağlı)</label>
          <textarea
            className="form-control"
            placeholder="Bize kendinizden ve hedeflerinizden bahsedin..."
            value={formData.message}
            onChange={e => setFormData({ ...formData, message: e.target.value })}
          ></textarea>
        </div>

        {/* CV Yükleme */}
        <div className="form-group">
          <label>Özgeçmiş (CV) Yükle <span className="required">*</span></label>
          <div>
            <input
              type="file"
              accept=".pdf"
              id="cv-upload"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
            <label
              htmlFor="cv-upload"
              className={`cv-upload-area ${file ? "has-file" : ""}`}
            >
              <div className="upload-icon">
                <LuUpload />
              </div>
              <p style={{ margin: "0 0 5px 0", fontSize: "16px" }}>
                {file ? (
                  <span style={{ fontWeight: 600 }}>{file.name}</span>
                ) : (
                  <><span style={{ fontWeight: 600, color: "var(--black)" }}>Tıklayın</span> veya sürükleyip bırakın</>
                )}
              </p>
              <p style={{ margin: 0, fontSize: "13px", color: "var(--dark-3)" }}>Sadece PDF (Maks: 5MB)</p>
            </label>
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="submit-btn"
        >
          {isSubmitting ? (isUploading ? "CV Yükleniyor..." : "Başvuru Gönderiliyor...") : "Başvuruyu Gönder"}
        </button>
        
      </form>
    </div>
  )
}
