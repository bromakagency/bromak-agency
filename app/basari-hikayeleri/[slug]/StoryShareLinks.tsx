"use client"

import { FiTwitter, FiLinkedin, FiFacebook, FiLink } from "react-icons/fi"
import { toast } from "react-hot-toast"

export default function StoryShareLinks({ url }: { url: string }) {
  const copyLink = async () => {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(url)
    } else {
      const textArea = document.createElement("textarea")
      textArea.value = url
      textArea.style.position = "absolute"
      textArea.style.left = "-999999px"
      document.body.prepend(textArea)
      textArea.select()
      try {
        document.execCommand('copy')
      } catch (error) {
        console.error("Kopyalama hatası", error)
      } finally {
        textArea.remove()
      }
    }
    toast.success("Bağlantı kopyalandı!")
  }

  return (
    <div className="story-share">
      <h4>Paylaş</h4>
      <div className="story-share-links">
        <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`} target="_blank" rel="noopener noreferrer" className="share-btn">
          <FiTwitter size={20} />
        </a>
        <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`} target="_blank" rel="noopener noreferrer" className="share-btn">
          <FiLinkedin size={20} />
        </a>
        <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`} target="_blank" rel="noopener noreferrer" className="share-btn">
          <FiFacebook size={20} />
        </a>
        <button onClick={copyLink} className="share-btn" title="Bağlantıyı Kopyala">
          <FiLink size={20} />
        </button>
      </div>
    </div>
  )
}
