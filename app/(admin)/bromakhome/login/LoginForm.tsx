"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      })

      if (res?.error) {
        setError("E-posta adresi veya şifre hatalı.")
      } else {
        router.push("/bromakhome")
        router.refresh()
      }
    } catch (err) {
      setError("Bir hata oluştu. Lütfen tekrar deneyin.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      {error && <div className="login-error">{error}</div>}
      
      <div className="form-group">
        <label htmlFor="email">E-posta</label>
        <input 
          id="email"
          type="email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="admin@bromak.com"
          required 
          disabled={loading}
        />
      </div>

      <div className="form-group">
        <label htmlFor="password">Şifre</label>
        <input 
          id="password"
          type="password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          required 
          disabled={loading}
        />
      </div>

      <button type="submit" className="login-btn" disabled={loading}>
        {loading ? "Giriş Yapılıyor..." : "Giriş Yap"}
      </button>
    </form>
  )
}
