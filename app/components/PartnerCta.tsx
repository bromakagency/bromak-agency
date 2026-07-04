"use client";

import { useState } from "react";
import { LuSend } from "react-icons/lu";

export default function PartnerCta({ showImages = true }: { showImages?: boolean }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [isKvkkChecked, setIsKvkkChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<{type: 'success'|'error', message: string} | null>(null);

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const images = [
    "/images/dies-markasi.png",
    "/images/dies-markasi-1.png",
    "/images/dies-markasi-2.png",
    "/images/essen-markasi.png",
    "/images/essen-markasi-1.png",
    "/images/hizmetler-banner.avif"
  ];


  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 11) {
      setPhone(value);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !phone) {
      setStatus({ type: 'error', message: 'Lütfen adınızı ve telefon numaranızı girin.' });
      return;
    }
    if (!isKvkkChecked) {
      setStatus({ type: 'error', message: 'Lütfen KVKK metnini onaylayın.' });
      return;
    }

    setIsLoading(true);
    setStatus(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          email: "Belirtilmedi (Hızlı İletişim)", 
          message: "(Kullanıcı e-posta ve detaylı mesaj yerine sadece telefon numarasını bırakarak 'Birlikte Üretelim' formu üzerinden aranmayı talep etti.)",
          service: "Birlikte Üretelim (Hızlı Form)",
        }),
      });

      if (response.ok) {
        const audio = new Audio("/assets/form_send_ses.mp3");
        audio.play().catch(e => console.log("Audio play failed", e));
        
        setStatus({ type: 'success', message: 'Talebiniz alındı, en kısa sürede dönüş yapacağız.' });
        setName("");
        setPhone("");
        setIsKvkkChecked(false);
      } else {
        const data = await response.json();
        setStatus({ type: 'error', message: data.error || 'Bir hata oluştu.' });
      }
    } catch (error) {
      setStatus({ type: 'error', message: 'Bağlantı hatası oluştu.' });
    } finally {
      setIsLoading(false);
    }
  };

  const formContent = (
    <form className="contactBox" onSubmit={handleSubmit}>
      <h3>Birlikte Üretelim</h3>
      <p>Bilgilerinizi bırakın, sizinle en kısa sürede iletişime geçelim.</p>

      <input 
        type="text" 
        placeholder="Adınız Soyadınız" 
        value={name}
        onChange={(e) => setName(e.target.value)}
        disabled={isLoading}
      />
      <input 
        type="tel" 
        placeholder="Telefon Numaranız" 
        value={phone}
        onChange={handlePhoneChange}
        pattern="[0-9]*"
        inputMode="numeric"
        disabled={isLoading}
      />

      <label className="check" style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
        <input 
          type="checkbox" 
          checked={isKvkkChecked}
          onChange={(e) => setIsKvkkChecked(e.target.checked)}
          disabled={isLoading}
          style={{ flexShrink: 0, marginTop: '4px' }}
        />
        <span style={{ fontSize: '13px', lineHeight: '1.4' }}>
          <a href="/gizlilik-politikasi" target="_blank" style={{ textDecoration: 'underline', color: 'inherit' }}>KVKK aydınlatma metnini</a> ve <a href="/cerez-politikasi" target="_blank" style={{ textDecoration: 'underline', color: 'inherit' }}>Çerez Politikası</a>'nı okudum, onaylıyorum.
        </span>
      </label>

      {status && (
        <div style={{ 
          padding: '10px', 
          borderRadius: '6px', 
          fontSize: '13px', 
          marginTop: '10px',
          marginBottom: '10px',
          backgroundColor: status.type === 'success' ? '#dcfce7' : '#fee2e2',
          color: status.type === 'success' ? '#166534' : '#991b1b'
        }}>
          {status.message}
        </div>
      )}

      <button type="submit" className="contact-submit-btn" disabled={isLoading} style={{ width: '100%', marginTop: status ? '0' : '10px' }}>
        <span>{isLoading ? 'Gönderiliyor...' : 'Hemen Gönder'}</span>
        <LuSend className={isLoading ? "icon-fly" : ""} style={{ marginLeft: "0.5rem", width: "1.25rem", height: "1.25rem" }} />
      </button>
    </form>
  );

  return (
    <>
      <section className={`partnerCta ${!showImages ? 'no-images' : ''}`}>
        <div className="ctaText">
          <h2>
            Tanıştığımıza
            <br />
            memnun olduk,
            <br />
            <span>iş ortağımız!</span>
          </h2>

          <p>
            Markanızı büyüten stratejik çözümler üretiyoruz. Tasarım, dijital
            yönetim, üretim ve reklam hizmetlerimizle güçlü bir iş birliğine
            başlayalım.
          </p>

          
          <button className="mobileCtaBtn" onClick={toggleModal}>
            Teklif Alın <span>→</span>
          </button>
        </div>

        {showImages && (
          <div className="visualGridContainer">
            <div className="imageTrackTop">
              <div className="trackInner">
                {[...images, ...images].map((src, index) => (
                  <img key={`top-${index}`} src={src} alt="Marka çalışması" />
                ))}
              </div>
            </div>
            <div className="imageTrackBottom">
              <div className="trackInner">
                {[...images, ...images].map((src, index) => (
                  <img key={`bottom-${index}`} src={src} alt="Marka çalışması" />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* This form is hidden on mobile via CSS */}
        {formContent}
      </section>

      {/* Modal - Visible only on mobile when triggered */}
      <div className={`formModalOverlay ${isModalOpen ? "active" : ""}`} onClick={toggleModal}>
        <div className="formModalContent" onClick={(e) => e.stopPropagation()}>
          <button className="closeModal" onClick={toggleModal}>✕</button>
          {formContent}
        </div>
      </div>
    </>
  );
}
