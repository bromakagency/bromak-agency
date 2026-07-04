"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import "./cookie-banner.css";

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState({
    essential: true, // Her zaman açık olmalı
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    const consent = localStorage.getItem("bromak_cookie_consent");
    if (!consent) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      // Daha önce onaylandıysa tercihleri yükle
      try {
        const saved = JSON.parse(consent);
        setPreferences(saved);
      } catch (e) {
        // Eski sürüm string onayı varsa temizle
      }
    }
  }, []);

  const savePreferences = (prefs: any) => {
    localStorage.setItem("bromak_cookie_consent", JSON.stringify(prefs));
    setPreferences(prefs);
    setIsVisible(false);
    setShowSettings(false);
  };

  const handleAcceptAll = () => {
    savePreferences({ essential: true, analytics: true, marketing: true });
  };

  const handleRejectAll = () => {
    savePreferences({ essential: true, analytics: false, marketing: false });
  };

  const handleSaveSettings = () => {
    savePreferences(preferences);
  };

  const togglePreference = (key: keyof typeof preferences) => {
    if (key === "essential") return; // Zorunlular değiştirilemez
    setPreferences((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  if (!isVisible) return null;

  return (
    <>
      <div className={`cookie-banner-overlay ${showSettings ? 'blur-background' : ''}`}>
        {!showSettings ? (
          <div className="cookie-banner official-banner">
            <div className="cookie-content">
              <div className="cookie-text">
                <h4>Gizlilik ve Çerez Tercihleri</h4>
                <p>
                  Sizlere daha iyi hizmet sunabilmek, site kullanımını analiz etmek ve pazarlama faaliyetlerini 
                  kişiselleştirmek amacıyla çerezler (cookies) kullanıyoruz. Devam ederek çerez kullanımını 
                  onaylamış olursunuz. Detaylı bilgi için <Link href="/cerez-politikasi" className="cookie-link">Çerez Politikamızı</Link> ve <Link href="/gizlilik-politikasi" className="cookie-link">Gizlilik Politikamızı</Link> inceleyebilirsiniz.
                </p>
              </div>
            </div>
            <div className="cookie-actions official-actions">
              <button onClick={() => setShowSettings(true)} className="cookie-btn-outline">
                Tercihleri Yönet
              </button>
              <div className="cookie-actions-main">
                <button onClick={handleRejectAll} className="cookie-btn-secondary">
                  Sadece Zorunlular
                </button>
                <button onClick={handleAcceptAll} className="cookie-btn-primary">
                  Tümünü Kabul Et
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="cookie-settings-modal">
            <div className="cookie-settings-header">
              <h4>Çerez Tercihlerinizi Yönetin</h4>
              <button onClick={() => setShowSettings(false)} className="cookie-btn-close">✕</button>
            </div>
            
            <div className="cookie-settings-body">
              <div className="cookie-setting-item">
                <div className="setting-info">
                  <h5>Zorunlu Çerezler</h5>
                  <p>Sitenin temel işlevlerini yerine getirebilmesi için gereklidir ve kapatılamaz.</p>
                </div>
                <div className="setting-toggle">
                  <input type="checkbox" checked={true} disabled className="toggle-checkbox" />
                </div>
              </div>

              <div className="cookie-setting-item">
                <div className="setting-info">
                  <h5>Analiz Çerezleri</h5>
                  <p>Site trafiğini analiz etmemize ve performans iyileştirmeleri yapmamıza yardımcı olur.</p>
                </div>
                <div className="setting-toggle">
                  <label className="toggle-switch">
                    <input 
                      type="checkbox" 
                      checked={preferences.analytics}
                      onChange={() => togglePreference("analytics")} 
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
              </div>

              <div className="cookie-setting-item">
                <div className="setting-info">
                  <h5>Pazarlama Çerezleri</h5>
                  <p>İlgi alanlarınıza göre kişiselleştirilmiş reklamlar sunmamızı sağlar.</p>
                </div>
                <div className="setting-toggle">
                  <label className="toggle-switch">
                    <input 
                      type="checkbox" 
                      checked={preferences.marketing}
                      onChange={() => togglePreference("marketing")} 
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
              </div>
            </div>

            <div className="cookie-settings-footer">
              <button onClick={handleSaveSettings} className="cookie-btn-primary full-width">
                Seçimlerimi Kaydet
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
