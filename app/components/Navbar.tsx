"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Prevent scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMenuOpen]);

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
        .custom_nav_pill {
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          align-items: center;
          gap: 4.5rem;
          -webkit-backdrop-filter: blur(1.25rem);
          backdrop-filter: blur(1.25rem);
          background-color: rgba(255, 255, 255, 0.85);
          border: 1px solid rgba(0, 0, 0, 0.05);
          border-radius: 50vw;
          padding: 0.5rem 0.75rem 0.5rem 1.5rem;
          width: 100%;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
          position: relative;
          z-index: 1000;
        }
        .nav_left_menu {
          display: flex;
          gap: 5rem;
          align-items: center;
          justify-content: flex-end;
        }
        .footer_logo {
          height: 2.8rem;
        }
        .custom_nav_link {
          color: #000;
          font-weight: 600;
          text-decoration: none;
          font-size: 0.95rem;
          font-family: var(--font-neue-leiden), var(--font-graphik), sans-serif;
          transition: opacity 0.2s;
          display: flex;
          align-items: center;
          gap: 6px;
          white-space: nowrap;
        }
        .custom_nav_link:hover {
          opacity: 0.6;
        }
        .nav_dot {
          width: 4px;
          height: 4px;
          background-color: #ff3b30;
          border-radius: 50%;
          display: inline-block;
        }
        .nav_center_logo {
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .nav_center_logo img {
          height: 30px;
        }
        .nav_right_container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 5rem;
        }
        .nav_right_menu {
          display: flex;
          justify-content: flex-start;
          gap: 5rem;
          align-items: center;
        }
        .nav_tanisalim_btn {
          background-color: #000;
          color: #fff;
          padding: 0.7rem 1.5rem;
          border-radius: 50vw;
          font-weight: 600;
          font-family: var(--font-neue-leiden), var(--font-graphik), sans-serif;
          text-decoration: none;
          font-size: 0.95rem;
          transition: transform 0.2s, background-color 0.2s;
          display: flex;
          align-items: center;
          gap: 8px;
          white-space: nowrap;
        }
        .nav_tanisalim_btn:hover {
          transform: scale(1.05);
          background-color: #222;
        }
        .btn_arrow {
          color: #ff3b30;
          font-size: 1.1rem;
        }

        /* Mobile Hamburger & Dropdown */
        .hamburger_btn {
          display: none;
          background: none;
          border: none;
          color: #000;
          cursor: pointer;
          padding: 0.5rem;
        }
        .mobile_menu {
          display: none;
          flex-direction: column;
          position: absolute;
          top: calc(100% + 12px);
          left: 0;
          right: 0;
          background-color: rgba(255, 255, 255, 0.95);
          -webkit-backdrop-filter: blur(1.25rem);
          backdrop-filter: blur(1.25rem);
          border: 1px solid rgba(0, 0, 0, 0.05);
          border-radius: 1.5rem;
          padding: 2rem;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
          gap: 1.5rem;
          z-index: 1001;
        }
        .mobile_menu.open {
          display: flex;
        }
        .mobile_nav_link {
          color: #000;
          font-weight: 600;
          text-decoration: none;
          font-size: 1.2rem;
          font-family: var(--font-neue-leiden), var(--font-graphik), sans-serif;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        /* Overlay */
        .menu_overlay {
          position: fixed;
          inset: 0;
          background-color: rgba(0, 0, 0, 0.4);
          -webkit-backdrop-filter: blur(8px);
          backdrop-filter: blur(8px);
          z-index: 900;
          opacity: 0;
          visibility: hidden;
          transition: opacity 0.3s, visibility 0.3s;
        }
        .menu_overlay.visible {
          opacity: 1;
          visibility: visible;
        }

        /* Dark mode adaptation if body is dark */
        :global(body) .custom_nav_pill {
          background-color: rgba(24, 24, 27, 0.85); /* Zinc 900 */
          border-color: rgba(255, 255, 255, 0.1);
        }
        :global(body) .custom_nav_link {
          color: #fff;
        }
        :global(body) .nav_tanisalim_btn {
          background-color: #fff;
          color: #000;
        }
        :global(body) .nav_tanisalim_btn:hover {
          background-color: #e4e4e7;
        }
        :global(body) .hamburger_btn {
          color: #fff;
        }
        :global(body) .mobile_menu {
          background-color: rgba(24, 24, 27, 0.95);
          border-color: rgba(255, 255, 255, 0.1);
        }
        :global(body) .mobile_nav_link {
          color: #fff;
        }
        
        @media (max-width: 768px) {
          .nav_left_menu, .nav_right_menu {
            display: none;
          }
          .nav_right_menu_btn {
            display: none;
          }
          .custom_nav_pill {
            display: flex;
            justify-content: space-between;
            padding: 0.5rem 1rem;
          }
          .nav_center_logo {
            justify-content: center;
          }
          .hamburger_btn {
            display: flex;
          }
        }
      `}} />
      
      {/* Background Blur Overlay */}
      <div
        className={`menu_overlay ${isMenuOpen ? 'visible' : ''}`}
        onClick={() => setIsMenuOpen(false)}
      />

      <nav
        data-scrolling-started="false"
        data-scrolling-direction="up"
        className="nav_component"
      >
        <div className="nav_container">
          <div className="custom_nav_pill">
            {/* Sol Menü */}
            <div className="nav_left_menu">
              <Link href="/#islerimiz" className="custom_nav_link">
                İşlerimiz <span className="nav_dot"></span>
              </Link>
              <Link href="/#hizmetlerimiz" className="custom_nav_link">
                Hizmetler <span className="nav_dot"></span>
              </Link>
            </div>

            {/* Orta Logo */}
            <Link href="/" className="nav_center_logo">
              <img src="/assets/logos/bromak_kirmizi_logo.svg" alt="Bromak Logo" />
            </Link>

            {/* Sağ Menü */}
            <div className="nav_right_container">
              <div className="nav_right_menu">
                <Link href="/#hakkimizda" className="custom_nav_link">
                  Hakkımızda <span className="nav_dot"></span>
                </Link>
                <Link href="/blog" className="custom_nav_link">
                  Blog
                </Link>
              </div>

              {/* Buton */}
              <div className="nav_right_menu_btn">
                <Link href="#contact" className="nav_tanisalim_btn">
                  Projenizi Konuşalım <span className="btn_arrow">→</span>
                </Link>
              </div>

              {/* Mobil Hamburger Butonu */}
              <button
                className="hamburger_btn"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle Menu"
              >
                {isMenuOpen ? (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </button>
            </div>

            {/* Mobil Açılır Menü */}
            <div className={`mobile_menu ${isMenuOpen ? 'open' : ''}`}>
              <Link href="/#islerimiz" className="mobile_nav_link" onClick={() => setIsMenuOpen(false)}>
                İşlerimiz <span className="nav_dot"></span>
              </Link>
              <Link href="/#hizmetlerimiz" className="mobile_nav_link" onClick={() => setIsMenuOpen(false)}>
                Hizmetler <span className="nav_dot"></span>
              </Link>
              <Link href="/#hakkimizda" className="mobile_nav_link" onClick={() => setIsMenuOpen(false)}>
                Hakkımızda <span className="nav_dot"></span>
              </Link>
              <Link href="/blog" className="mobile_nav_link" onClick={() => setIsMenuOpen(false)}>
                Blog
              </Link>
              <Link href="#contact" className="nav_tanisalim_btn" style={{ justifyContent: 'center', marginTop: '1rem' }} onClick={() => setIsMenuOpen(false)}>
                Projenizi Konuşalım <span className="btn_arrow">→</span>
              </Link>
            </div>
          </div>
        </div>
        <div className="nav_trigger is-first" />
      </nav>
    </>
  );
}
