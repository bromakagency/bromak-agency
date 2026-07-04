"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import "./navbar.css";

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
      <div
        className={`menu_overlay ${isMenuOpen ? "visible" : ""}`}
        onClick={() => setIsMenuOpen(false)}
      />

      <nav
        data-scrolling-started="false"
        data-scrolling-direction="up"
        className="nav_component"
      >
        <div className="nav_container">
          <div className="custom_nav_pill">
            <div className="nav_left_menu">
              <Link href="/isler" className="custom_nav_link">
                İşlerimiz <span className="nav_dot"></span>
              </Link>
              <Link href="/hizmetler" className="custom_nav_link">
                Hizmetler <span className="nav_dot"></span>
              </Link>
            </div>

            <Link href="/" className="nav_center_logo">
              <img src="/assets/logos/bromak_kirmizi_logo.svg" alt="Bromak Logo" />
            </Link>

            <div className="nav_right_container">
              <div className="nav_right_menu">
                <Link href="/hakkimizda" className="custom_nav_link">
                  Hakkımızda <span className="nav_dot"></span>
                </Link>
                <Link href="/blog" className="custom_nav_link">
                  Blog <span className="nav_dot"></span>
                </Link>
                <Link href="/iletisim" className="custom_nav_link">
                  İletişim
                </Link>
              </div>

              <div className="nav_right_menu_btn">
                <Link href="/iletisim" className="nav_tanisalim_btn">
                  Projenizi Konuşalım <span className="btn_arrow">→</span>
                </Link>
              </div>

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

            <div className={`mobile_menu ${isMenuOpen ? "open" : ""}`}>
              <Link href="/isler" className="mobile_nav_link" onClick={() => setIsMenuOpen(false)}>
                İşlerimiz <span className="nav_dot"></span>
              </Link>
              <Link href="/hizmetler" className="mobile_nav_link" onClick={() => setIsMenuOpen(false)}>
                Hizmetler <span className="nav_dot"></span>
              </Link>
              <Link href="/hakkimizda" className="mobile_nav_link" onClick={() => setIsMenuOpen(false)}>
                Hakkımızda <span className="nav_dot"></span>
              </Link>
              <Link href="/blog" className="mobile_nav_link" onClick={() => setIsMenuOpen(false)}>
                Blog <span className="nav_dot"></span>
              </Link>
              <Link href="/iletisim" className="mobile_nav_link" onClick={() => setIsMenuOpen(false)}>
                İletişim <span className="nav_dot"></span>
              </Link>
              <Link
                href="/iletisim"
                className="nav_tanisalim_btn"
                style={{ justifyContent: "center", marginTop: "1rem" }}
                onClick={() => setIsMenuOpen(false)}
              >
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
