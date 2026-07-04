"use client"

import { useState, useTransition, useRef } from "react"
import { useRouter } from "next/navigation"
import { createStory, updateStory } from "@/app/actions/story"
import { FiUploadCloud, FiPlus, FiTrash2 } from "react-icons/fi"
import RichTextEditor from "@/app/components/admin/RichTextEditor"
import "../blog/blog-form.css"
import "../works/works.css"
import "./hikayeler.css"

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

export default function StoryForm({ story }: { story?: any }) {
  const isEditing = !!story?.id
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const [title, setTitle] = useState(story?.title || "")
  const [slug, setSlug] = useState(story?.slug || "")
  const [slugEdited, setSlugEdited] = useState(false)
  const [summary, setSummary] = useState(story?.summary || "")
  const [content, setContent] = useState(story?.content || "")
  
  const [logo, setLogo] = useState(story?.logo || "")
  const [coverImage, setCoverImage] = useState(story?.coverImage || "")
  const [color1, setColor1] = useState(story?.color1 || "#e30613")
  const [color2, setColor2] = useState(story?.color2 || "#800000")
  
  const initialMetrics = story?.metricsJson ? JSON.parse(story.metricsJson) : [{ value: "", label: "" }]
  const [metrics, setMetrics] = useState<{value: string, label: string}[]>(initialMetrics)
  
  const [published, setPublished] = useState(story?.published || false)

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
    if (!slugEdited) setSlug(slugify(e.target.value))
  }

  const addMetric = () => setMetrics([...metrics, { value: "", label: "" }])
  const removeMetric = (index: number) => setMetrics(metrics.filter((_, i) => i !== index))
  const updateMetric = (index: number, field: "value" | "label", val: string) => {
    const newMetrics = [...metrics]
    newMetrics[index][field] = val
    setMetrics(newMetrics)
  }

  const handleFileUpload = async (file: File, setter: (val: string) => void) => {
    if (!file) return
    const formData = new FormData()
    formData.append("file", file)
    try {
      const res = await fetch("/api/upload", { method: "POST", body: formData })
      const data = await res.json()
      if (data.url) setter(data.url)
    } catch (err) {
      console.error("Upload error", err)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    startTransition(async () => {
      try {
        const payload = {
          title, slug, summary, content, logo, coverImage, color1, color2,
          metricsJson: JSON.stringify(metrics.filter(m => m.value || m.label)),
          published
        }

        if (isEditing) {
          await updateStory(story.id, payload)
        } else {
          await createStory(payload)
        }
        router.push("/bromakhome/hikayeler")
        router.refresh()
      } catch (err) {
        console.error("Form submit error", err)
      }
    })
  }

  return (
    <form onSubmit={handleSubmit} className="blog-form-page">
      <div className="form-grid">
        
        <div className="form-main">
          {/* Title */}
          <div className="form-card">
            <label className="form-label">Hikaye Başlığı <span className="required">*</span></label>
            <input type="text" id="title" name="title" className="form-input form-input-lg" value={title} onChange={handleTitleChange} required placeholder="Örn: Essen Markası Organik Trafiğini Nasıl Artırdı?" />
          </div>

          {/* Slug */}
          <div className="form-card">
            <label className="form-label">Kalıcı Bağlantı (Slug) <span className="required">*</span></label>
            <div className="slug-input-wrapper">
              <span className="slug-prefix">bromakagency.com/basari-hikayeleri/</span>
              <input type="text" id="slug" name="slug" className="form-input" style={{border: 'none', background: 'transparent'}} value={slug} onChange={(e) => { setSlug(e.target.value); setSlugEdited(true) }} required />
            </div>
          </div>

          {/* Summary */}
          <div className="form-card">
            <label className="form-label">Özet (Summary)</label>
            <textarea id="summary" name="summary" className="form-input form-textarea" value={summary} onChange={(e) => setSummary(e.target.value)} rows={3} placeholder="Arama sonuçlarında ve listelerde görünecek kısa özet." />
          </div>

          {/* Content */}
          <div className="form-card">
            <h3 className="card-title">Detaylı İçerik</h3>
            <div className="editor-container">
              <RichTextEditor content={content} onChange={setContent} />
            </div>
          </div>

          {/* Metrics Builder */}
          <div className="form-card metrics-card">
            <div className="card-header-flex">
              <h3 className="card-title">Öne Çıkan Metrikler</h3>
              <button type="button" onClick={addMetric} className="btn-outline-dark" style={{ padding: '8px 12px', fontSize: '13px' }}><FiPlus /> Metrik Ekle</button>
            </div>
            <div className="metrics-list">
              {metrics.map((m, i) => (
                <div key={i} className="metric-row">
                  <input type="text" id={`metric-value-${i}`} name={`metric-value-${i}`} className="form-input" placeholder="Değer (Örn: 4x)" value={m.value} onChange={(e) => updateMetric(i, "value", e.target.value)} />
                  <input type="text" id={`metric-label-${i}`} name={`metric-label-${i}`} className="form-input" placeholder="Etiket (Örn: Trafik Artışı)" value={m.label} onChange={(e) => updateMetric(i, "label", e.target.value)} />
                  <button type="button" onClick={() => removeMetric(i)} className="btn-icon text-red-500"><FiTrash2 /></button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="form-sidebar">
          
          <div className="form-card">
            <h3 className="card-title">Yayın Durumu</h3>
            <select id="published" name="published" className="form-input" value={published ? "true" : "false"} onChange={(e) => setPublished(e.target.value === "true")}>
              <option value="false">Taslak</option>
              <option value="true">Yayında</option>
            </select>
            
            <button type="submit" disabled={isPending} className="btn-brand" style={{ width: '100%', marginTop: '24px' }}>
              {isPending ? 'Kaydediliyor...' : isEditing ? 'Değişiklikleri Kaydet' : 'Hikayeyi Oluştur'}
            </button>
          </div>

          {/* Colors */}
          <div className="form-card">
            <h3 className="card-title">Marka Renkleri</h3>
            <p className="text-sm text-gray-500 mb-4">Hero alanındaki animasyonlu arka plan için iki renk seçin.</p>
            <div className="color-pickers mt-4">
              <div className="form-group">
                <label className="form-label">Renk 1 (Açık/Ana)</label>
                <div className="color-input-wrap">
                  <input type="color" value={color1} onChange={(e) => setColor1(e.target.value)} />
                  <input type="text" className="form-input" value={color1} onChange={(e) => setColor1(e.target.value)} />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Renk 2 (Koyu/Gölge)</label>
                <div className="color-input-wrap">
                  <input type="color" value={color2} onChange={(e) => setColor2(e.target.value)} />
                  <input type="text" className="form-input" value={color2} onChange={(e) => setColor2(e.target.value)} />
                </div>
              </div>
            </div>
          </div>

          <div className="form-card">
            <h3 className="card-title">Müşteri Logosu (Beyaz/Saydam önerilir)</h3>
            <div className="image-uploader mt-4">
              {logo ? (
                <div className="image-preview-wrapper dark-bg">
                  <img src={logo} alt="Logo preview" className="image-preview-img" />
                  <label className="image-preview-overlay">
                    <input type="file" accept="image/*" style={{display: 'none'}} onChange={(e) => e.target.files && handleFileUpload(e.target.files[0], setLogo)} />
                    <FiUploadCloud size={24} />
                    <span>Logo Değiştir</span>
                  </label>
                  <button type="button" onClick={() => setLogo("")} className="remove-image-btn" title="Logoyu Sil">✕</button>
                </div>
              ) : (
                <label className="upload-zone">
                  <div className="upload-text">
                    <FiUploadCloud className="upload-icon" />
                    <span>Logo Yükle</span>
                  </div>
                  <input type="file" accept="image/*" style={{display: 'none'}} onChange={(e) => e.target.files && handleFileUpload(e.target.files[0], setLogo)} />
                </label>
              )}
            </div>
          </div>

          <div className="form-card">
            <h3 className="card-title">Arka Plan Görseli (Hero Cover)</h3>
            <div className="image-uploader mt-4">
              {coverImage ? (
                <div className="image-preview-wrapper">
                  <img src={coverImage} alt="Cover preview" className="image-preview-img" />
                  <label className="image-preview-overlay">
                    <input type="file" accept="image/*" style={{display: 'none'}} onChange={(e) => e.target.files && handleFileUpload(e.target.files[0], setCoverImage)} />
                    <FiUploadCloud size={24} />
                    <span>Görseli Değiştir</span>
                  </label>
                  <button type="button" onClick={() => setCoverImage("")} className="remove-image-btn" title="Görseli Sil">✕</button>
                </div>
              ) : (
                <label className="upload-zone">
                  <div className="upload-text">
                    <FiUploadCloud className="upload-icon" />
                    <span>Kapak Görseli Yükle</span>
                  </div>
                  <input type="file" accept="image/*" style={{display: 'none'}} onChange={(e) => e.target.files && handleFileUpload(e.target.files[0], setCoverImage)} />
                </label>
              )}
            </div>
          </div>

        </div>
      </div>
    </form>
  )
}
