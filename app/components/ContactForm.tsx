"use client";

import { useState } from "react";
import { LuSend } from "react-icons/lu";
import { trackLead } from "@/app/lib/meta-client";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      service: formData.get("service"),
      message: formData.get("message"),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        setStatus("error");
        setMessage(data.error || "Bir hata oluştu. Lütfen daha sonra tekrar deneyin.");
        return;
      }

      const audio = new Audio("/assets/form_send_ses.mp3");
      audio.play().catch(e => console.log("Audio play failed", e));

      setStatus("success");
      setMessage("Mesajınız başarıyla gönderildi. En kısa sürede size dönüş yapacağız.");
      
      // Track Meta Lead event
      trackLead({
        email: data.email as string,
        phone: data.phone as string
      });

      (e.target as HTMLFormElement).reset();
    } catch (error) {
      console.error(error);
      setStatus("error");
      setMessage("Bağlantı hatası oluştu. Lütfen daha sonra tekrar deneyin.");
    }
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <input type="text" name="name" placeholder="Adınız Soyadınız" required disabled={status === "loading"} />
        <input type="email" name="email" placeholder="E-posta Adresiniz" required disabled={status === "loading"} />
      </div>

      <div className="form-row">
        <input 
          type="tel" 
          name="phone" 
          placeholder="Telefon Numaranız" 
          disabled={status === "loading"}
          onInput={(e) => {
            e.currentTarget.value = e.currentTarget.value.replace(/[^0-9+\s-]/g, '');
          }}
          maxLength={15}
        />
        <select name="service" defaultValue="" disabled={status === "loading"}>
          <option value="" disabled>
            İlgilendiğiniz Hizmet
          </option>
          <option value="Strateji ve Konumlandırma">Strateji ve Konumlandırma</option>
          <option value="Tasarım ve İçerik Üretimi">Tasarım ve İçerik Üretimi</option>
          <option value="Web Tasarım ve Yazılım">Web Tasarım ve Yazılım</option>
          <option value="Reklam ve Performans">Reklam ve Performans</option>
          <option value="Arama Motoru Optimizasyonu (SEO)">Arama Motoru Optimizasyonu (SEO)</option>
          <option value="Diğer">Diğer</option>
        </select>
      </div>

      <textarea name="message" placeholder="Mesajınız veya Projenizden Bahsedin..." required disabled={status === "loading"}></textarea>

      {message && (
        <div style={{
          padding: "1rem",
          borderRadius: "0.5rem",
          marginBottom: "1rem",
          backgroundColor: status === "success" ? "#d4edda" : "#f8d7da",
          color: status === "success" ? "#155724" : "#721c24",
          fontSize: "0.875rem"
        }}>
          {message}
        </div>
      )}

      <button type="submit" className="contact-submit-btn" disabled={status === "loading"}>
        <span>{status === "loading" ? "Gönderiliyor..." : "Mesajı Gönder"}</span>
        <LuSend className={status === "loading" ? "icon-fly" : ""} style={{ marginLeft: "0.5rem", width: "1.25rem", height: "1.25rem" }} />
      </button>
    </form>
  );
}
