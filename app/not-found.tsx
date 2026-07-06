"use client";

import Link from "next/link";
import Image from "next/image";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./not-found.css";

export default function NotFound() {
  return (
    <div className="not-found-layout">
      <Navbar />
      <main className="not-found-main">
        <div className="not-found-bg-elements">
          <div className="bg-glow"></div>
          <div className="bg-grid"></div>
        </div>
        
        <div className="not-found-content">
          <div className="logo-container">
            <Image src="/assets/logos/bromak_app_icon.png" alt="Bromak Icon" className="floating-logo" width={100} height={100} />
          </div>
          
          <h1 className="elegant-title">404</h1>
          <h2>Buralarda Kaybolmuş Gibisiniz</h2>
          <p>
            Aradığınız sayfa silinmiş, adı değiştirilmiş veya geçici olarak
            kullanılamıyor olabilir. Yaratıcı dünyamıza geri dönmek için
            aşağıdaki butonu kullanabilirsiniz.
          </p>
          <Link href="/" className="not-found-btn">
            Ana Sayfaya Dön <span>→</span>
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
