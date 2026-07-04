"use client"

import { useState } from "react"
import { LuLogOut } from "react-icons/lu"
import { signOut } from "next-auth/react"

export default function LogoutButton() {
  const [showPopup, setShowPopup] = useState(false)
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const handleLogoutClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setShowPopup(true)
  }

  const handleConfirm = async () => {
    setIsLoggingOut(true)
    await signOut({ callbackUrl: "/bromakhome/login" })
  }

  const handleCancel = () => {
    setShowPopup(false)
  }

  return (
    <>
      <button onClick={handleLogoutClick} className="logout-btn" style={{ border: 'none', background: 'transparent', cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left', width: '100%' }}>
        <LuLogOut size={18} /> Çıkış Yap
      </button>

      {showPopup && (
        <div className="logout-modal-overlay">
          <div className="logout-modal">
            <h3>Çıkış Yap</h3>
            <p>Bromak agency için yeteri kadar çalıştın mı emin misin?</p>
            <div className="logout-modal-actions">
              <button onClick={handleCancel} className="btn-cancel" disabled={isLoggingOut}>
                Hayır, çalışmaya devam
              </button>
              <button onClick={handleConfirm} className="btn-confirm" disabled={isLoggingOut}>
                {isLoggingOut ? "Çıkış Yapılıyor..." : "Evet, çıkış yap"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
