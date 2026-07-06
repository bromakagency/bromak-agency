"use client"

import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Image from "@tiptap/extension-image"
import Link from "@tiptap/extension-link"
import Placeholder from "@tiptap/extension-placeholder"
import { Color } from "@tiptap/extension-color"
import { TextStyle } from "@tiptap/extension-text-style"
import { Table } from '@tiptap/extension-table'
import { TableRow } from '@tiptap/extension-table-row'
import { TableCell } from '@tiptap/extension-table-cell'
import { TableHeader } from '@tiptap/extension-table-header'
import { useState, useCallback, useTransition, useRef } from "react"
import { useRouter } from "next/navigation"
import { createPost, updatePost } from "@/app/actions/blog"
import "./blog-form.css"
import {
  LuBold, LuItalic, LuList, LuListOrdered, LuHeading1, LuHeading2,
  LuHeading3, LuHeading4, LuHeading5, LuHeading6, LuPalette,
  LuQuote, LuImage, LuLink2, LuCode, LuUndo2, LuRedo2, LuClock
} from "react-icons/lu"
import { FiUploadCloud, FiX, FiPlus } from "react-icons/fi"

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

type PostData = {
  id?: string
  title?: string
  slug?: string
  summary?: string
  content?: string
  category?: string
  image?: string
  readTime?: string
  author?: string
  authorRole?: string
  faqJson?: string | null
  published?: boolean
}

export default function BlogForm({ post }: { post?: PostData }) {
  const isEditing = !!post?.id
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const [title, setTitle] = useState(post?.title || "")
  const [slug, setSlug] = useState(post?.slug || "")
  const [slugEdited, setSlugEdited] = useState(false)
  const [summary, setSummary] = useState(post?.summary || "")
  const [category, setCategory] = useState(post?.category || "")
  const [image, setImage] = useState(post?.image || "")
  const [readTime, setReadTime] = useState(post?.readTime || "")
  const [author, setAuthor] = useState(post?.author || "Bromak Ekibi")
  const [authorRole, setAuthorRole] = useState(post?.authorRole || "Dijital Pazarlama Uzmanı")
  const [faqs, setFaqs] = useState<{question: string, answer: string}[]>(() => {
    try {
      return post?.faqJson ? JSON.parse(post.faqJson) : []
    } catch {
      return []
    }
  })
  const [published, setPublished] = useState(post?.published || false)
  const [imageUploading, setImageUploading] = useState(false)
  const [editorImageUploading, setEditorImageUploading] = useState(false)
  const [error, setError] = useState("")
  
  const [linkModalOpen, setLinkModalOpen] = useState(false)
  const [linkUrl, setLinkUrl] = useState("")
  const [linkNewTab, setLinkNewTab] = useState(true)

  const [colorPickerOpen, setColorPickerOpen] = useState(false)
  
  const presetColors = [
    "#000000", "#475569", "#e2130a", "#f97316", "#eab308", 
    "#22c55e", "#06b6d4", "#3b82f6", "#8b5cf6", "#ec4899"
  ]

  const editorImageInputRef = useRef<HTMLInputElement>(null)

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({ allowBase64: false }),
      Link.configure({ openOnClick: false }),
      Placeholder.configure({ placeholder: "Blog içeriğini buraya yazın..." }),
      TextStyle,
      Color,
      Table.configure({ resizable: true }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    content: post?.content || "",
    onUpdate: ({ editor }) => {
      // Auto-calculate read time from word count (200 words/min)
      const text = editor.getText()
      const words = text.trim().split(/\s+/).filter(Boolean).length
      const minutes = Math.max(1, Math.ceil(words / 200))
      setReadTime(`${minutes} dk okuma`)
    },
  })

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

  const addFaq = () => setFaqs([...faqs, { question: "", answer: "" }])
  const updateFaq = (index: number, key: "question" | "answer", value: string) => {
    const newFaqs = [...faqs]
    newFaqs[index][key] = value
    setFaqs(newFaqs)
  }
  const removeFaq = (index: number) => {
    setFaqs(faqs.filter((_, i) => i !== index))
  }

  const handleImageUpload = async (file: File) => {
    setImageUploading(true)
    try {
      const formData = new FormData()
      formData.append("file", file)
      formData.append("folder", "blog")
      const res = await fetch("/api/upload", { method: "POST", body: formData })
      const data = await res.json()
      if (data.url) {
        setImage(data.url)
      } else {
        setError("Görsel yükleme başarısız.")
      }
    } catch {
      setError("Görsel yükleme sırasında bir hata oluştu.")
    } finally {
      setImageUploading(false)
    }
  }

  const handleEditorImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setEditorImageUploading(true)
    try {
      const formData = new FormData()
      formData.append("file", file)
      formData.append("folder", "blog")
      const res = await fetch("/api/upload", { method: "POST", body: formData })
      const data = await res.json()
      if (data.url) {
        editor?.chain().focus().setImage({ src: data.url }).run()
      } else {
        setError("Görsel yükleme başarısız.")
      }
    } catch {
      setError("Görsel yükleme sırasında bir hata oluştu.")
    } finally {
      setEditorImageUploading(false)
      // Reset input
      if (editorImageInputRef.current) {
        editorImageInputRef.current.value = ""
      }
    }
  }

  const handleSubmit = async (publishStatus: boolean) => {
    setError("")
    if (!title || !slug || !summary || !category || !readTime) {
      setError("Lütfen tüm zorunlu alanları doldurun.")
      return
    }
    const content = editor?.getHTML() || ""

    startTransition(async () => {
      try {
        const faqJsonString = faqs.length > 0 ? JSON.stringify(faqs) : null
        
        if (isEditing && post.id) {
          await updatePost(post.id, { title, slug, summary, content, category, image, readTime, author, authorRole, faqJson: faqJsonString, published: publishStatus })
        } else {
          await createPost({ title, slug, summary, content, category, image, readTime, author, authorRole, faqJson: faqJsonString, published: publishStatus })
        }
        router.push("/bromakhome/blog")
      } catch (e: any) {
        setError(e.message || "Bir hata oluştu.")
      }
    })
  }

  const openLinkModal = useCallback(() => {
    const previousUrl = editor?.getAttributes("link").href
    const target = editor?.getAttributes("link").target
    setLinkUrl(previousUrl || "")
    setLinkNewTab(target === "_blank")
    setLinkModalOpen(true)
  }, [editor])

  const applyLink = useCallback(() => {
    if (linkUrl === "") {
      editor?.chain().focus().extendMarkRange("link").unsetLink().run()
    } else {
      let finalUrl = linkUrl
      // Ensure absolute URL
      if (!/^https?:\/\//i.test(finalUrl) && !finalUrl.startsWith('mailto:') && !finalUrl.startsWith('tel:')) {
        finalUrl = `https://${finalUrl}`
      }
      editor?.chain().focus().extendMarkRange("link").setLink({ 
        href: finalUrl,
        target: linkNewTab ? "_blank" : "_self"
      }).run()
    }
    setLinkModalOpen(false)
  }, [editor, linkUrl, linkNewTab])

  return (
    <div className="blog-form-page">
      <div className="form-top-bar">
        <div className="form-title-group">
          <h1>{isEditing ? "Yazıyı Düzenle" : "Yeni Blog Yazısı"}</h1>
          <p>{isEditing ? "Mevcut yazıyı güncelleyin." : "Yeni bir blog yazısı ekleyin."}</p>
        </div>
        <div className="form-top-actions">
          <button
            type="button"
            onClick={() => handleSubmit(false)}
            disabled={isPending}
            className="btn-outline-dark"
          >
            {isPending ? "Kaydediliyor..." : "Taslak Kaydet"}
          </button>
          <button
            type="button"
            onClick={() => handleSubmit(true)}
            disabled={isPending}
            className="btn-brand"
          >
            {isPending ? "İşleniyor..." : (isEditing ? "Güncelle" : "Yayınla")}
          </button>
        </div>
      </div>

      {error && <div className="form-error">{error}</div>}

      <div className="form-grid">
        {/* Main Column */}
        <div className="form-main">
          <div className="form-card">
            <label className="form-label">Başlık <span className="required">*</span></label>
            <input
              type="text"
              id="title"
              name="title"
              className="form-input form-input-lg"
              placeholder="Blog yazısının başlığı..."
              value={title}
              onChange={e => handleTitleChange(e.target.value)}
            />
          </div>

          <div className="form-card">
            <label className="form-label">URL (Slug) <span className="required">*</span></label>
            <div className="slug-input-wrapper">
              <span className="slug-prefix">bromak.com/blog/</span>
              <input
                type="text"
                id="slug"
                name="slug"
                className="form-input slug-input"
                value={slug}
                onChange={e => handleSlugChange(e.target.value)}
              />
            </div>
          </div>

          <div className="form-card editor-card">
            <label className="form-label">İçerik <span className="required">*</span></label>
            <div className="editor-toolbar">
              <button type="button" onClick={() => editor?.chain().focus().toggleBold().run()} className={`toolbar-btn ${editor?.isActive("bold") ? "active" : ""}`} title="Kalın"><LuBold /></button>
              <button type="button" onClick={() => editor?.chain().focus().toggleItalic().run()} className={`toolbar-btn ${editor?.isActive("italic") ? "active" : ""}`} title="İtalik"><LuItalic /></button>
              <div className="toolbar-divider" />
              <button type="button" onClick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()} className={`toolbar-btn ${editor?.isActive("heading", { level: 1 }) ? "active" : ""}`} title="Başlık 1"><LuHeading1 /></button>
              <button type="button" onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()} className={`toolbar-btn ${editor?.isActive("heading", { level: 2 }) ? "active" : ""}`} title="Başlık 2"><LuHeading2 /></button>
              <button type="button" onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()} className={`toolbar-btn ${editor?.isActive("heading", { level: 3 }) ? "active" : ""}`} title="Başlık 3"><LuHeading3 /></button>
              <button type="button" onClick={() => editor?.chain().focus().toggleHeading({ level: 4 }).run()} className={`toolbar-btn ${editor?.isActive("heading", { level: 4 }) ? "active" : ""}`} title="Başlık 4"><LuHeading4 /></button>
              <button type="button" onClick={() => editor?.chain().focus().toggleHeading({ level: 5 }).run()} className={`toolbar-btn ${editor?.isActive("heading", { level: 5 }) ? "active" : ""}`} title="Başlık 5"><LuHeading5 /></button>
              <button type="button" onClick={() => editor?.chain().focus().toggleHeading({ level: 6 }).run()} className={`toolbar-btn ${editor?.isActive("heading", { level: 6 }) ? "active" : ""}`} title="Başlık 6"><LuHeading6 /></button>
              <div className="toolbar-divider" />
              
              <div className="color-picker-wrapper" title="Metin Rengi" style={{ position: 'relative' }}>
                <button 
                  type="button" 
                  className="toolbar-btn" 
                  onClick={() => setColorPickerOpen(!colorPickerOpen)}
                >
                  <LuPalette style={{ color: editor?.getAttributes('textStyle').color || '#000000' }} />
                </button>
                
                {colorPickerOpen && (
                  <div className="color-picker-dropdown" onClick={(e) => e.stopPropagation()}>
                    <div className="color-swatches">
                      {presetColors.map(color => (
                        <button
                          key={color}
                          type="button"
                          className="color-swatch"
                          style={{ backgroundColor: color }}
                          onClick={() => {
                            editor?.chain().focus().setColor(color).run()
                            setColorPickerOpen(false)
                          }}
                        />
                      ))}
                    </div>
                    <div className="color-picker-custom">
                      <label>Özel Renk:</label>
                      <input
                        type="color"
                        onChange={event => editor?.chain().focus().setColor(event.target.value).run()}
                        value={editor?.getAttributes('textStyle').color || '#000000'}
                      />
                    </div>
                  </div>
                )}
              </div>
              
              <div className="toolbar-divider" />
              <button type="button" onClick={() => editor?.chain().focus().toggleBulletList().run()} className={`toolbar-btn ${editor?.isActive("bulletList") ? "active" : ""}`} title="Madde Listesi"><LuList /></button>
              <button type="button" onClick={() => editor?.chain().focus().toggleOrderedList().run()} className={`toolbar-btn ${editor?.isActive("orderedList") ? "active" : ""}`} title="Numaralı Liste"><LuListOrdered /></button>
              <button type="button" onClick={() => editor?.chain().focus().toggleBlockquote().run()} className={`toolbar-btn ${editor?.isActive("blockquote") ? "active" : ""}`} title="Alıntı"><LuQuote /></button>
              <button type="button" onClick={() => editor?.chain().focus().toggleCode().run()} className={`toolbar-btn ${editor?.isActive("code") ? "active" : ""}`} title="Kod"><LuCode /></button>
              <div className="toolbar-divider" />
              <button type="button" onClick={openLinkModal} className={`toolbar-btn ${editor?.isActive("link") ? "active" : ""}`} title="Bağlantı"><LuLink2 /></button>
              
              <button type="button" onClick={() => editorImageInputRef.current?.click()} className="toolbar-btn" title="Görsel Ekle" disabled={editorImageUploading}>
                {editorImageUploading ? <div className="spin"><LuClock /></div> : <LuImage />}
              </button>
              <input 
                type="file" 
                accept="image/*" 
                ref={editorImageInputRef} 
                onChange={handleEditorImageUpload} 
                style={{ display: "none" }} 
              />
              
              <div className="toolbar-divider" />
              <button type="button" onClick={() => editor?.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()} className="toolbar-btn" style={{fontSize:'12px', width:'auto', padding:'0 8px'}} title="Tablo Ekle">Tablo</button>
              {editor?.isActive('table') && (
                <>
                  <button type="button" onClick={() => editor?.chain().focus().addColumnAfter().run()} disabled={!editor?.can().addColumnAfter()} className="toolbar-btn" style={{fontSize:'12px', width:'auto', padding:'0 8px'}} title="Sütun Ekle">Sütun +</button>
                  <button type="button" onClick={() => editor?.chain().focus().deleteColumn().run()} disabled={!editor?.can().deleteColumn()} className="toolbar-btn" style={{fontSize:'12px', width:'auto', padding:'0 8px'}} title="Sütun Sil">Sütun -</button>
                  <button type="button" onClick={() => editor?.chain().focus().addRowAfter().run()} disabled={!editor?.can().addRowAfter()} className="toolbar-btn" style={{fontSize:'12px', width:'auto', padding:'0 8px'}} title="Satır Ekle">Satır +</button>
                  <button type="button" onClick={() => editor?.chain().focus().deleteRow().run()} disabled={!editor?.can().deleteRow()} className="toolbar-btn" style={{fontSize:'12px', width:'auto', padding:'0 8px'}} title="Satır Sil">Satır -</button>
                  <button type="button" onClick={() => editor?.chain().focus().deleteTable().run()} disabled={!editor?.can().deleteTable()} className="toolbar-btn" style={{fontSize:'12px', width:'auto', padding:'0 8px'}} title="Tablo Sil">Tabloyu Sil</button>
                </>
              )}
              
              <div className="toolbar-divider" />
              <button type="button" onClick={() => editor?.chain().focus().undo().run()} disabled={!editor?.can().undo()} className="toolbar-btn" title="Geri Al"><LuUndo2 /></button>
              <button type="button" onClick={() => editor?.chain().focus().redo().run()} disabled={!editor?.can().redo()} className="toolbar-btn" title="Yinele"><LuRedo2 /></button>
            </div>
            <div className="tiptap-wrapper">
              <EditorContent editor={editor} className="tiptap-editor" />
            </div>
            
            {/* Link Modal */}
            {linkModalOpen && (
              <div className="link-modal-overlay" onClick={() => setLinkModalOpen(false)}>
                <div className="link-modal" onClick={e => e.stopPropagation()}>
                  <div className="link-modal-header">
                    <h3>Bağlantı Ekle</h3>
                    <button type="button" className="close-btn" onClick={() => setLinkModalOpen(false)}><FiX /></button>
                  </div>
                  <div className="link-modal-body">
                    <div className="form-group">
                      <label>URL</label>
                      <input 
                        type="url" 
                        value={linkUrl} 
                        onChange={e => setLinkUrl(e.target.value)} 
                        placeholder="https://..." 
                        className="form-input"
                        autoFocus
                      />
                    </div>
                    <div className="form-group checkbox-group">
                      <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                        <input 
                          type="checkbox" 
                          checked={linkNewTab} 
                          onChange={e => setLinkNewTab(e.target.checked)} 
                        />
                        Yeni sekmede aç
                      </label>
                    </div>
                  </div>
                  <div className="link-modal-footer">
                    <button type="button" className="btn-secondary" onClick={() => setLinkModalOpen(false)}>İptal</button>
                    <button type="button" className="btn-primary" onClick={applyLink}>Uygula</button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* FAQ Editor */}
          <div className="form-card faq-card" style={{ marginTop: '2rem' }}>
            <div className="faq-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <label className="form-label" style={{ margin: 0 }}>Sıkça Sorulan Sorular (SEO için)</label>
              <button type="button" className="btn-outline-dark" onClick={addFaq} style={{ padding: '8px 12px', fontSize: '13px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <FiPlus /> Soru Ekle
              </button>
            </div>
            {faqs.length === 0 ? (
              <p style={{ color: '#888', fontSize: '0.875rem' }}>Henüz SSS eklenmedi. Blog yazısının altına SEO uyumlu SSS ekleyebilirsiniz.</p>
            ) : (
              <div className="faq-list" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {faqs.map((faq, index) => (
                  <div key={index} className="faq-item" style={{ background: '#f9f9f9', padding: '1rem', borderRadius: '8px', position: 'relative', border: '1px solid #eee' }}>
                    <button type="button" onClick={() => removeFaq(index)} style={{ position: 'absolute', top: '10px', right: '10px', background: 'none', border: 'none', color: '#ff4d4f', cursor: 'pointer', fontSize: '1rem' }} title="Sil">✕</button>
                    <div style={{ marginBottom: '0.5rem', paddingRight: '20px' }}>
                      <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#555', marginBottom: '0.25rem' }}>Soru</label>
                      <input type="text" id={`faq-q-${index}`} name={`faq-q-${index}`} className="form-input" value={faq.question} onChange={(e) => updateFaq(index, 'question', e.target.value)} placeholder="Soru yazın..." />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#555', marginBottom: '0.25rem' }}>Cevap</label>
                      <textarea id={`faq-a-${index}`} name={`faq-a-${index}`} className="form-input form-textarea" value={faq.answer} onChange={(e) => updateFaq(index, 'answer', e.target.value)} placeholder="Cevap yazın..." rows={2} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Sidebar Column */}
        <div className="form-sidebar">
          <div className="form-card">
            <label className="form-label">Kapak Görseli</label>
            {image ? (
              <div className="image-preview-wrapper">
                <img src={image} alt="Kapak" className="image-preview-img" />
                <label className="image-preview-overlay">
                  <input
                    type="file"
                    id="coverImage"
                    name="coverImage"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={e => {
                      const file = e.target.files?.[0]
                      if (file) handleImageUpload(file)
                    }}
                  />
                  <FiUploadCloud size={24} />
                  <span>{imageUploading ? "Yükleniyor..." : "Görseli Değiştir"}</span>
                </label>
                <button type="button" className="remove-image-btn" onClick={() => setImage("")} title="Görseli Sil">✕</button>
              </div>
            ) : (
              <label className="upload-zone">
                <input
                  type="file"
                  id="coverImage"
                  name="coverImage"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={e => {
                    const file = e.target.files?.[0]
                    if (file) handleImageUpload(file)
                  }}
                />
                {imageUploading ? (
                  <span className="upload-text">
                    <FiUploadCloud size={28} style={{ color: "#aaa" }} />
                    Yükleniyor...
                  </span>
                ) : (
                  <span className="upload-text">
                    <FiUploadCloud size={28} style={{ color: "#aaa" }} />
                    Görsel seç veya sürükle
                  </span>
                )}
              </label>
            )}
          </div>

          <div className="form-card">
            <label className="form-label">Kategori <span className="required">*</span></label>
            <select id="category" name="category" className="form-input" value={category} onChange={e => setCategory(e.target.value)}>
              <option value="">Kategori seçin...</option>
              <option value="Dijital Pazarlama">Dijital Pazarlama</option>
              <option value="SEO">SEO</option>
              <option value="Sosyal Medya">Sosyal Medya</option>
              <option value="İçerik Pazarlama">İçerik Pazarlama</option>
              <option value="E-ticaret">E-ticaret</option>
              <option value="Web Tasarım">Web Tasarım</option>
              <option value="Genel">Genel</option>
            </select>
          </div>

          <div className="form-card">
            <label className="form-label">Özet <span className="required">*</span></label>
            <textarea
              id="summary"
              name="summary"
              className="form-input form-textarea"
              placeholder="Yazının kısa özeti (SEO meta description olarak kullanılır)..."
              value={summary}
              onChange={e => setSummary(e.target.value)}
              rows={3}
            />
          </div>

          <div className="form-card">
            <label className="form-label">Okuma Süresi</label>
            <div className="readtime-display">
              <LuClock size={16} style={{ color: "#999", flexShrink: 0 }} />
              <span>{readTime || "Otomatik hesaplanacak (içerik girin)"}</span>
            </div>
          </div>

          <div className="form-card">
            <label className="form-label">Yazar</label>
            <select
              id="author"
              name="author"
              className="form-input"
              value={author}
              onChange={e => {
                const val = e.target.value;
                setAuthor(val);
                if (val === "Recep Aydoğan") setAuthorRole("Kurucu & Creative Director");
                else if (val === "Bromak Agency") setAuthorRole("Ajans");
              }}
            >
              <option value="Bromak Agency">Bromak Agency</option>
              <option value="Recep Aydoğan">Recep Aydoğan</option>
            </select>
            
            <label className="form-label" style={{ marginTop: "12px" }}>Yazar Unvanı</label>
            <input
              type="text"
              id="authorRole"
              name="authorRole"
              className="form-input"
              value={authorRole}
              onChange={e => setAuthorRole(e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
