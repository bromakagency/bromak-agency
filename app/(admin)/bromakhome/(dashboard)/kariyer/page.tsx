import { prisma } from "@/app/lib/prisma"
import { auth } from "@/auth"
import { redirect } from "next/navigation"
import CareerListClient from "./CareerListClient"

export const metadata = {
  title: "Kariyer Başvuruları | Bromak Admin",
}

export default async function KariyerAdminPage() {
  const session = await auth()
  if (!session?.user) redirect("/bromakhome/login")

  const applications = await prisma.careerApplication.findMany({
    orderBy: { createdAt: "desc" },
  })

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Kariyer & İş Başvuruları</h1>
          <p className="text-gray-500 mt-1">Sistem üzerinden yapılan tüm iş ve staj başvurularını yönetin.</p>
        </div>
      </div>

      <CareerListClient initialApplications={applications} />
    </div>
  )
}
