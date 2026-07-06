"use client"

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import { Table } from '@tiptap/extension-table'
import { TableRow } from '@tiptap/extension-table-row'
import { TableCell } from '@tiptap/extension-table-cell'
import { TableHeader } from '@tiptap/extension-table-header'
import { useCallback, useRef, useState } from 'react'
import './editor.css'

interface RichTextEditorProps {
  content: string
  onChange: (html: string) => void
}

import {
  LuBold, LuItalic, LuList, LuListOrdered, LuHeading1, LuHeading2,
  LuHeading3, LuHeading4, LuHeading5, LuHeading6,
  LuQuote, LuImage, LuLink2, LuCode, LuUndo2, LuRedo2, LuClock
} from "react-icons/lu"
import { FiX } from "react-icons/fi"

export default function RichTextEditor({ content, onChange }: RichTextEditorProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isUploading, setIsUploading] = useState(false)

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({
        inline: true,
        allowBase64: true,
      }),
      Link.configure({
        openOnClick: false,
      }),
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
  })

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file || !editor) return

    setIsUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) throw new Error('Yükleme başarısız')

      const data = await response.json()
      editor.chain().focus().setImage({ src: data.url }).run()
    } catch (error) {
      alert('Görsel yüklenirken bir hata oluştu.')
      console.error(error)
    } finally {
      setIsUploading(false)
      if (fileInputRef.current) fileInputRef.current.value = ''
    }
  }

  const triggerFileInput = useCallback(() => {
    fileInputRef.current?.click()
  }, [])

  const setLink = useCallback(() => {
    const previousUrl = editor?.getAttributes('link').href
    const url = window.prompt('URL adresi:', previousUrl)

    if (url === null) return
    if (url === '') {
      editor?.chain().focus().extendMarkRange('link').unsetLink().run()
      return
    }

    editor?.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
  }, [editor])

  if (!editor) {
    return <div className="editor-loading">Editör yükleniyor...</div>
  }

  return (
    <div className="editor-card" style={{ padding: 0, border: '1px solid #ddd', borderRadius: '12px', overflow: 'hidden' }}>
      <div className="editor-toolbar">
        <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} className={`toolbar-btn ${editor.isActive('bold') ? 'active' : ''}`} title="Kalın"><LuBold /></button>
        <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} className={`toolbar-btn ${editor.isActive('italic') ? 'active' : ''}`} title="İtalik"><LuItalic /></button>
        
        <div className="toolbar-divider" />
        <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={`toolbar-btn ${editor.isActive('heading', { level: 2 }) ? 'active' : ''}`} title="Başlık 2"><LuHeading2 /></button>
        <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} className={`toolbar-btn ${editor.isActive('heading', { level: 3 }) ? 'active' : ''}`} title="Başlık 3"><LuHeading3 /></button>
        <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()} className={`toolbar-btn ${editor.isActive('heading', { level: 4 }) ? 'active' : ''}`} title="Başlık 4"><LuHeading4 /></button>
        
        <div className="toolbar-divider" />
        <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()} className={`toolbar-btn ${editor.isActive('bulletList') ? 'active' : ''}`} title="Madde Listesi"><LuList /></button>
        <button type="button" onClick={() => editor.chain().focus().toggleOrderedList().run()} className={`toolbar-btn ${editor.isActive('orderedList') ? 'active' : ''}`} title="Numaralı Liste"><LuListOrdered /></button>
        <button type="button" onClick={() => editor.chain().focus().toggleBlockquote().run()} className={`toolbar-btn ${editor.isActive('blockquote') ? 'active' : ''}`} title="Alıntı"><LuQuote /></button>
        <button type="button" onClick={() => editor.chain().focus().toggleCode().run()} className={`toolbar-btn ${editor.isActive('code') ? 'active' : ''}`} title="Kod"><LuCode /></button>
        
        <div className="toolbar-divider" />
        <button type="button" onClick={setLink} className={`toolbar-btn ${editor.isActive('link') ? 'active' : ''}`} title="Bağlantı"><LuLink2 /></button>
        
        <button type="button" onClick={triggerFileInput} className="toolbar-btn" disabled={isUploading} title="Görsel Ekle">
          {isUploading ? <div className="spin"><LuClock /></div> : <LuImage />}
        </button>
        <input type="file" ref={fileInputRef} onChange={handleFileUpload} accept="image/*" style={{ display: 'none' }} />
        
        <div className="toolbar-divider" />
        <button type="button" onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()} className="toolbar-btn" style={{fontSize:'12px', width:'auto', padding:'0 8px'}} title="Tablo Ekle">Tablo</button>
        {editor.isActive('table') && (
          <>
            <button type="button" onClick={() => editor.chain().focus().addColumnAfter().run()} disabled={!editor.can().addColumnAfter()} className="toolbar-btn" style={{fontSize:'12px', width:'auto', padding:'0 8px'}}>Sütun +</button>
            <button type="button" onClick={() => editor.chain().focus().deleteColumn().run()} disabled={!editor.can().deleteColumn()} className="toolbar-btn" style={{fontSize:'12px', width:'auto', padding:'0 8px'}}>Sütun -</button>
            <button type="button" onClick={() => editor.chain().focus().addRowAfter().run()} disabled={!editor.can().addRowAfter()} className="toolbar-btn" style={{fontSize:'12px', width:'auto', padding:'0 8px'}}>Satır +</button>
            <button type="button" onClick={() => editor.chain().focus().deleteRow().run()} disabled={!editor.can().deleteRow()} className="toolbar-btn" style={{fontSize:'12px', width:'auto', padding:'0 8px'}}>Satır -</button>
            <button type="button" onClick={() => editor.chain().focus().deleteTable().run()} disabled={!editor.can().deleteTable()} className="toolbar-btn" style={{fontSize:'12px', width:'auto', padding:'0 8px'}}>Tabloyu Sil</button>
          </>
        )}
        
        <div className="toolbar-divider" />
        <button type="button" onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()} className="toolbar-btn" title="Geri Al"><LuUndo2 /></button>
        <button type="button" onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()} className="toolbar-btn" title="Yinele"><LuRedo2 /></button>
      </div>
      
      <div className="tiptap-wrapper">
        <EditorContent editor={editor} className="tiptap-editor" />
      </div>
    </div>
  )
}
