"use client"

import { useState, useTransition, useRef } from "react"
import { useRouter } from "next/navigation"
import { createWork, updateWork } from "@/app/actions/work"
import dynamic from "next/dynamic"
import { useEffect } from "react"
import { FiUploadCloud, FiClock, FiGlobe } from "react-icons/fi"
import { LuBriefcase, LuFileText } from "react-icons/lu"
import "../blog/blog-form.css"
import "./works.css"
import SortableGallery from "./SortableGallery"

function slugify(text: string) {
  return text
    .replace(/ğ/g, "g").replace(/G/g, "g")
    .replace(/ü/g, "u").replace(/Ü/g, "u")
    .replace(/ş/g, "s").replace(/Ş/g, "s")
    .replace(/ı/g, "i").replace(/İ/g, "i")
    .replace(/ö/g, "o").replace(/Ö/g, "o")
    .replace(/ç/g, "c").replace(/Ç/g, "c")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-")
}

export default function WorkForm({ work }: { work?: any }) {
  const isEditing = !!work?.id
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const [title, setTitle] = useState(work?.title || "")
  const [slug, setSlug] = useState(work?.slug || "")
  const [slugEdited, setSlugEdited] = useState(false)
  const [client, setClient] = useState(work?.client || "")
  const [service, setService] = useState(work?.service || "")
  const [duration, setDuration] = useState(work?.duration || "")
  const [website, setWebsite] = useState(work?.website || "")
  const [summary, setSummary] = useState(work?.summary || "")
  const [challenge, setChallenge] = useState(work?.challenge || "")
  const [solution, setSolution] = useState(work?.solution || "")
  const [result, setResult] = useState(work?.result || "")
  
  const [coverImage, setCoverImage] = useState(work?.coverImage || "")
  const [heroImage, setHeroImage] = useState(work?.heroImage || "")
  const [gallery, setGallery] = useState<string[]>(work?.gallery || [])
  const [published, setPublished] = useState(work?.published || false)

  const [isMounted, setIsMounted] = useState(false)
  useEffect(() => {
    setIsMounted(true)
  }, [])

  const [uploadingState, setUploadingState] = useState<{ cover: boolean, hero: boolean, gallery: boolean }>({ cover: false, hero: false, gallery: false })
  const [error, setError] = useState("")

  const handleTitleChange = (value: string) => {
    setTitle(value)
    if (!slugEdited) {
      setSlug(slugify(value))
    }
  }

  const handleSlugChange = (value: string) => {
    setSlugEdited(true)
    setSlug(value)
  }

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: 'cover' | 'hero' | 'gallery') => {
    const files = e.target.files
    if (!files || files.length === 0) return

    setUploadingState(prev => ({ ...prev, [type]: true }))
    setError("")

    try {
      const uploadPromises = Array.from(files).map(async (file) => {
        if (file.size > 4.5 * 1024 * 1024) {
          throw new Error(`'${file.name}' dosyası çok büyük (Max 4.5MB). Lütfen daha küçük bir görsel yükleyin.`);
        }
        const formData = new FormData()
        formData.append("file", file)
        formData.append("folder", "works")
        const res = await fetch("/api/upload", { method: "POST", body: formData })
        if (!res.ok) {
          if (res.status === 413) throw new Error("Görsel çok büyük (Sunucu sınırı 4.5MB). Lütfen görseli küçültüp tekrar deneyin.");
          throw new Error(`Yükleme başarısız oldu (Hata Kodu: ${res.status}).`);
        }
        const data = await res.json()
        if (data.error) throw new Error(data.error)
        return data.url
      })

      const urls = await Promise.all(uploadPromises)

      if (type === 'cover') setCoverImage(urls[0])
      else if (type === 'hero') setHeroImage(urls[0])
      else if (type === 'gallery') setGallery(prev => [...prev, ...urls.map(url => `${url}|small`)])

    } catch (err: any) {
      setError(err.message || "Görsel yükleme sırasında bir hata oluştu.")
    } finally {
      setUploadingState(prev => ({ ...prev, [type]: false }))
      // Reset input value
      e.target.value = ""
    }
  }

  const handleSubmit = (publishStatus: boolean) => {
    setError("")
    if (!title || !slug || !client || !service || !coverImage || !heroImage) {
      setError("Lütfen zorunlu alanları (Proje Adı, Slug, Müşteri, Hizmet, Kapak ve Hero Görselleri) doldurun.")
      return
    }

    startTransition(async () => {
      const data = {
        title, slug, client, service, duration, website, summary,
        coverImage, heroImage, challenge, solution, result, gallery,
        published: publishStatus
      }

      try {
        if (isEditing && work.id) {
          await updateWork(work.id, data)
        } else {
          await createWork(data)
        }
        router.push("/bromakhome/works")
      } catch (e: any) {
        setError(e.message || "Bir hata oluştu.")
      }
    })
  }

  return (
    <div className="work-form-page">
      <div className="form-top-bar">
        <div className="form-title-group">
          <h1>{isEditing ? "Projeyi Düzenle" : "Yeni Proje Ekle"}</h1>
          <p>{isEditing ? "Mevcut portfolyo projesini güncelleyin." : "Portfolyonuza yeni bir iş ekleyin."}</p>
        </div>
      </div>

      {error && <div className="form-error">{error}</div>}

      <div className="form-grid">
        <div className="form-main">
          
          <div className="form-card">
            <label className="form-label">Proje Adı <span className="required">*</span></label>
            <input
              type="text"
              className="form-input form-input-lg"
              placeholder="Örn: Dies Markası İçerik Yönetimi"
              value={title}
              onChange={e => handleTitleChange(e.target.value)}
            />
          </div>

          <div className="form-card">
            <label className="form-label">URL (Slug) <span className="required">*</span></label>
            <div className="slug-input-wrapper">
              <span className="slug-prefix">bromak.com/isler/</span>
              <input
                type="text"
                className="form-input slug-input"
                value={slug}
                onChange={e => handleSlugChange(e.target.value)}
              />
            </div>
          </div>

          <div className="form-row-2">
            <div className="form-card">
              <label className="form-label">Marka Adı <span className="required">*</span></label>
              <div className="input-with-icon">
                <LuBriefcase />
                <input
                  type="text"
                  className="form-input"
                  placeholder="Marka adı..."
                  value={client}
                  onChange={e => setClient(e.target.value)}
                />
              </div>
            </div>
            <div className="form-card">
              <label className="form-label">Verilen Hizmetler <span className="required">*</span></label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '6px' }}>
                {[
                  "Web Tasarım",
                  "Seo Optimizasyonu",
                  "Sosyal medya yönetimi",
                  "Reklam Yönetimi",
                  "Kurumsal Kimlik Çalışması",
                  "Video Prodüksiyon"
                ].map((opt: string) => {
                  const currentServices = service.split(',').map((s: string) => s.trim()).filter(Boolean);
                  const isSelected = currentServices.includes(opt);
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => {
                        let newServices = [...currentServices];
                        if (isSelected) {
                          newServices = newServices.filter((s: string) => s !== opt);
                        } else {
                          newServices.push(opt);
                        }
                        setService(newServices.join(', '));
                      }}
                      style={{
                        padding: '6px 12px',
                        borderRadius: '20px',
                        border: isSelected ? '1px solid #e30613' : '1px solid #ddd',
                        background: isSelected ? '#fff4f4' : '#fafafa',
                        color: isSelected ? '#e30613' : '#666',
                        fontWeight: isSelected ? 600 : 400,
                        cursor: 'pointer',
                        fontSize: '13px',
                        transition: 'all 0.2s'
                      }}
                    >
                      {isSelected ? '✓ ' : '+ '}{opt}
                    </button>
                  );
                })}
              </div>
              <input 
                type="text" 
                value={service} 
                onChange={e => setService(e.target.value)}
                style={{ marginTop: '12px', fontSize: '13px', padding: '10px 12px', width: '100%', border: '1px solid #eaeaea', borderRadius: '8px', color: '#666', background: '#fdfdfd' }}
                placeholder="Örn: Özel Yazılım, Danışmanlık..."
              />
            </div>
          </div>

          <div className="form-row-2">
            <div className="form-card">
              <label className="form-label">Süreç (Tarih)</label>
              <div className="input-with-icon">
                <FiClock />
                <input
                  type="text"
                  className="form-input"
                  placeholder="Örn: 2024 - Günümüz"
                  value={duration}
                  onChange={e => setDuration(e.target.value)}
                />
              </div>
            </div>
            <div className="form-card">
              <label className="form-label">Web Sitesi</label>
              <div className="input-with-icon">
                <FiGlobe />
                <input
                  type="url"
                  className="form-input"
                  placeholder="https://..."
                  value={website}
                  onChange={e => setWebsite(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="form-card">
            <label className="form-label">SEO Açıklaması (Özet)</label>
            <textarea
              className="form-input"
              rows={3}
              placeholder="Arama motorları için kısa özet..."
              value={summary}
              onChange={e => setSummary(e.target.value)}
            />
          </div>

          <div className="form-card">
            <h3 className="section-title">Proje Detayları</h3>
            <div className="case-study-fields">
              <div className="form-group">
                <label className="form-label">Firma Hakkında</label>
                <textarea className="form-input" rows={2} value={challenge} onChange={e => setChallenge(e.target.value)} placeholder="Kısaca markadan bahsedin..." />
              </div>
              <div className="form-group">
                <label className="form-label">Kısaca Neler Yaptık?</label>
                <textarea className="form-input" rows={2} value={solution} onChange={e => setSolution(e.target.value)} placeholder="Markaya kattıklarınız..." />
              </div>
              <div className="form-group">
                <label className="form-label">Verilen Hizmetler</label>
                <textarea className="form-input" rows={2} value={result} onChange={e => setResult(e.target.value)} placeholder="Web tasarım, sosyal medya vs..." />
              </div>
            </div>
          </div>

          <div className="form-card">
            <div className="gallery-header">
              <div className="gallery-header-text">
                <h3 className="section-title">Proje Galerisi (Sürükle Bırak)</h3>
                <p>Toplu görsel seçebilirsiniz. Görselleri sürükleyerek sıralarını değiştirebilirsiniz. Otomatik boyutlandırma ile sayfaya tam oturacaktır.</p>
              </div>
              <label className="btn-secondary gallery-upload-btn">
                {uploadingState.gallery ? "Yükleniyor..." : <><FiUploadCloud size={18} /> Görsel Yükle</>}
                <input type="file" multiple accept="image/*" onChange={e => handleUpload(e, 'gallery')} style={{ display: 'none' }} disabled={uploadingState.gallery} />
              </label>
            </div>
            
            {isMounted ? <SortableGallery images={gallery} onChange={setGallery} /> : null}
            
            {gallery.length === 0 && (
              <div className="empty-gallery">
                <FiUploadCloud size={48} />
                <p>Henüz galeriye görsel eklemediniz.</p>
              </div>
            )}
          </div>
        </div>

        <div className="form-sidebar">
          <div className="form-card">
            <label className="form-label">Liste (Kapak) Görseli <span className="required">*</span></label>
            <p className="field-hint">İşler listesinde görünecek kare/dikdörtgen kapak.</p>
            {coverImage ? (
              <div className="image-preview-wrapper">
                <img src={coverImage} alt="Kapak" className="image-preview-img" />
                <label className="image-preview-overlay">
                  <input type="file" accept="image/*" style={{ display: "none" }} onChange={e => handleUpload(e, 'cover')} disabled={uploadingState.cover} />
                  <FiUploadCloud size={24} />
                  <span>{uploadingState.cover ? "Yükleniyor..." : "Görseli Değiştir"}</span>
                </label>
                <button type="button" className="remove-image-btn" onClick={() => setCoverImage("")} title="Görseli Sil">✕</button>
              </div>
            ) : (
              <label className="upload-zone">
                <input type="file" accept="image/*" style={{ display: "none" }} onChange={e => handleUpload(e, 'cover')} disabled={uploadingState.cover} />
                <div className="upload-content">
                  <FiUploadCloud size={32} />
                  <span>{uploadingState.cover ? "Yükleniyor..." : "Görsel Seç veya Sürükle"}</span>
                </div>
              </label>
            )}
          </div>

          <div className="form-card">
            <label className="form-label">Logo Görseli (Hover için) <span className="required">*</span></label>
            <p className="field-hint">İşler listesinde kapağın üzerine gelindiğinde çıkacak olan logo (Örn: beyaz png veya svg).</p>
            {heroImage ? (
              <div className="image-preview-wrapper">
                <img src={heroImage} alt="Hero" className="image-preview-img" />
                <label className="image-preview-overlay">
                  <input type="file" accept="image/*" style={{ display: "none" }} onChange={e => handleUpload(e, 'hero')} disabled={uploadingState.hero} />
                  <FiUploadCloud size={24} />
                  <span>{uploadingState.hero ? "Yükleniyor..." : "Görseli Değiştir"}</span>
                </label>
                <button type="button" className="remove-image-btn" onClick={() => setHeroImage("")} title="Görseli Sil">✕</button>
              </div>
            ) : (
              <label className="upload-zone">
                <input type="file" accept="image/*" style={{ display: "none" }} onChange={e => handleUpload(e, 'hero')} disabled={uploadingState.hero} />
                <div className="upload-content">
                  <FiUploadCloud size={32} />
                  <span>{uploadingState.hero ? "Yükleniyor..." : "Görsel Seç veya Sürükle"}</span>
                </div>
              </label>
            )}
          </div>

          <div className="form-actions-sticky">
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <label className="toggle-switch">
                <input type="checkbox" checked={published} onChange={e => setPublished(e.target.checked)} />
                <span className="toggle-slider"></span>
              </label>
              <span style={{ fontSize: "14px", fontWeight: 600, color: "#374151" }}>Görünür (Yayında)</span>
            </div>
            
            <button type="button" onClick={() => handleSubmit(true)} className="btn-primary" disabled={isPending}>
              {isPending ? "Kaydediliyor..." : (isEditing ? "Projeyi Güncelle" : "Projeyi Yayınla")}
            </button>
            <button type="button" onClick={() => handleSubmit(false)} className="btn-draft" disabled={isPending}>
              Taslak Olarak Kaydet
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
