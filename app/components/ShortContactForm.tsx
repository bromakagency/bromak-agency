"use client";

import { useState } from "react";
import { LuSend } from "react-icons/lu";
import { trackLead } from "@/app/lib/meta-client";

export default function ShortContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      email: "Belirtilmedi (Kısa Form)",
      phone: formData.get("phone"),
      service: "Ön Görüşme Talebi",
      message: "Bu talep açılış sayfasındaki (Hemen Başlayın) kısa form üzerinden hızlı aranma talebi olarak gönderildi.",
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
        setStatus("error");
        setMessage("Bir hata oluştu.");
        return;
      }

      // Opsiyonel: Ses çalma
      const audio = new Audio("/assets/form_send_ses.mp3");
      audio.play().catch(e => console.log("Audio play failed", e));

      setStatus("success");
      setMessage("Talebiniz alındı, kısa sürede arayacağız.");
      
      const nameParts = (data.name as string || "").trim().split(" ");
      trackLead({
        phone: data.phone as string,
        first_name: nameParts[0] || "",
        last_name: nameParts.length > 1 ? nameParts.slice(1).join(" ") : "",
        event_source_url: typeof window !== 'undefined' ? window.location.href : 'https://www.bromakagency.com/hemen-baslayin'
      });

      (e.target as HTMLFormElement).reset();
    } catch (error) {
      console.error(error);
      setStatus("error");
      setMessage("Bağlantı hatası oluştu.");
    }
  };

  return (
    <form className="short-form" onSubmit={handleSubmit}>
      <input 
        type="text" 
        name="name" 
        placeholder="Adınız Soyadınız" 
        required 
        disabled={status === "loading"} 
      />
      <input 
        type="tel" 
        name="phone" 
        placeholder="Telefon Numaranız" 
        required 
        disabled={status === "loading"}
        onInput={(e) => {
          e.currentTarget.value = e.currentTarget.value.replace(/[^0-9+\s-]/g, '');
        }}
        maxLength={15}
      />

      {message && (
        <div style={{
          padding: "0.6rem",
          borderRadius: "0.4rem",
          backgroundColor: status === "success" ? "rgba(37, 211, 102, 0.15)" : "rgba(227, 6, 19, 0.15)",
          color: status === "success" ? "#25d366" : "#ff4444",
          fontSize: "0.8rem",
          textAlign: "center",
          fontWeight: 500
        }}>
          {message}
        </div>
      )}

      <button type="submit" className="short-submit-btn" disabled={status === "loading"}>
        <span>{status === "loading" ? "Gönderiliyor..." : "Sizi Arayalım"}</span>
        <LuSend className={status === "loading" ? "icon-fly" : ""} style={{ marginLeft: "0.5rem", width: "1.1rem", height: "1.1rem" }} />
      </button>
    </form>
  );
}
