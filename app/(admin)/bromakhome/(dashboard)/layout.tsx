import { auth } from "@/auth"
import Link from "next/link"
import "./admin.css"
import AdminLayoutClient from "./AdminLayoutClient"

export const metadata = {
  title: "Admin Panel | Bromak",
  robots: { index: false, follow: false },
}

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()

  return (
    <AdminLayoutClient 
      userName={session?.user?.email || "info@bromakagency.com"} 
      userRole="admin"
    >
      {children}
    </AdminLayoutClient>
  )
}
