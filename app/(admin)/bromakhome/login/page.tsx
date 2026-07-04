import LoginForm from "./LoginForm"
import "./login.css"

export const metadata = {
  title: "Admin Girişi | Bromak",
  robots: { index: false, follow: false },
}

export default function LoginPage() {
  return (
    <main className="admin-login-page">
      <div className="login-card">
        <div className="login-header">
          <img src="/assets/logos/bromak_beyaz_logo.svg" alt="Bromak" className="login-logo" />
          <h1>Admin Paneli</h1>
          <p>Yönetim paneline erişmek için giriş yapın.</p>
        </div>
        <LoginForm />
      </div>
    </main>
  )
}
