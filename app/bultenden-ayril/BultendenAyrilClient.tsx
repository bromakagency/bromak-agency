"use client";

import { useState } from "react";
import { unsubscribe } from "@/app/actions/newsletter";
import toast, { Toaster } from "react-hot-toast";

export default function BultendenAyrilClient() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      toast.error("Lütfen geçerli bir e-posta adresi girin.");
      return;
    }

    setIsLoading(true);
    const res = await unsubscribe(email);
    setIsLoading(false);

    if (res.success) {
      setIsSuccess(true);
    } else {
      toast.error(res.message);
    }
  };

  if (isSuccess) {
    return (
      <div style={{ maxWidth: "500px", width: "100%", backgroundColor: "#fff", padding: "40px", borderRadius: "12px", boxShadow: "0 10px 30px rgba(0,0,0,0.05)", textAlign: "center" }}>
        <div style={{ width: "60px", height: "60px", backgroundColor: "#e2130a", color: "#fff", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px auto", fontSize: "24px" }}>
          ✓
        </div>
        <h2 style={{ color: "#111", fontSize: "24px", marginBottom: "15px" }}>Abonelik İptal Edildi</h2>
        <p style={{ color: "#666", lineHeight: "1.6", marginBottom: "30px" }}>
          E-posta adresiniz başarıyla bülten listemizden çıkarılmıştır. Artık bizden bildirim almayacaksınız.
        </p>
        <a href="/" style={{ display: "inline-block", padding: "12px 24px", backgroundColor: "#111", color: "#fff", textDecoration: "none", borderRadius: "6px", fontWeight: "500" }}>
          Ana Sayfaya Dön
        </a>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "500px", width: "100%", backgroundColor: "#fff", padding: "40px", borderRadius: "12px", boxShadow: "0 10px 30px rgba(0,0,0,0.05)" }}>
      <Toaster position="top-right" />
      <h1 style={{ color: "#111", fontSize: "24px", marginBottom: "15px", textAlign: "center" }}>Bültenden Ayrıl</h1>
      <p style={{ color: "#666", textAlign: "center", marginBottom: "30px", lineHeight: "1.6" }}>
        E-bülten aboneliğinizi iptal etmek için kayıtlı olduğunuz e-posta adresini giriniz.
      </p>
      
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        <input
          type="email"
          placeholder="E-posta adresiniz"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ width: "100%", padding: "15px", borderRadius: "6px", border: "1px solid #ddd", fontSize: "16px", outline: "none" }}
        />
        <button 
          type="submit" 
          disabled={isLoading}
          style={{ width: "100%", padding: "15px", borderRadius: "6px", border: "none", backgroundColor: "#e2130a", color: "#fff", fontSize: "16px", fontWeight: "bold", cursor: isLoading ? "not-allowed" : "pointer", opacity: isLoading ? 0.7 : 1, transition: "opacity 0.2s" }}
        >
          {isLoading ? "İşleniyor..." : "Aboneliği İptal Et"}
        </button>
      </form>
    </div>
  );
}
