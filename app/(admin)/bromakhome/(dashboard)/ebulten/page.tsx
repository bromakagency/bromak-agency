import { auth } from "@/auth"
import { prisma } from "@/app/lib/prisma"
import EbultenClient from "./EbultenClient"
import { redirect } from "next/navigation"

export const metadata = {
  title: "E-Bülten Aboneleri | Bromak Admin",
}

export default async function EbultenPage() {
  const session = await auth()
  if (!session?.user) redirect("/bromakhome/login")

  const subscribers = await prisma.newsletterSubscriber.findMany({
    orderBy: { createdAt: "desc" },
  })

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div>
          <h1>E-Bülten Aboneleri</h1>
          <p>Bültene kayıt olan kişileri buradan yönetebilirsiniz.</p>
        </div>
      </div>

      <EbultenClient initialSubscribers={subscribers} />
    </div>
  )
}
