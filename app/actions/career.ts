"use server"

import { auth } from "@/auth"
import { prisma } from "@/app/lib/prisma"
import { revalidatePath } from "next/cache"
import { headers } from "next/headers"
import nodemailer from "nodemailer"

// In-memory rate limiting map
const rateLimitMap = new Map<string, { count: number, timestamp: number }>()
const RATE_LIMIT_WINDOW = 5 * 60 * 1000 // 5 minutes
const MAX_REQUESTS = 3

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || "465"),
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

export async function submitApplication(data: {
  name: string
  email: string
  phone: string
  type: string
  portfolioUrl?: string
  cvUrl: string
  message?: string
}) {
  try {
    const headersList = await headers();
    const ip = headersList.get("x-forwarded-for") || "unknown";
    const now = Date.now();
    const rateData = rateLimitMap.get(ip);

    if (rateData) {
      if (now - rateData.timestamp < RATE_LIMIT_WINDOW) {
        if (rateData.count >= MAX_REQUESTS) {
          return { success: false, message: "Çok fazla başvuru gönderdiniz. Lütfen 5 dakika sonra tekrar deneyin." }
        }
        rateData.count += 1;
      } else {
        rateLimitMap.set(ip, { count: 1, timestamp: now });
      }
    } else {
      rateLimitMap.set(ip, { count: 1, timestamp: now });
    }

    const application = await prisma.careerApplication.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        type: data.type,
        portfolioUrl: data.portfolioUrl || null,
        cvUrl: data.cvUrl,
        message: data.message || null,
        status: "UNREAD",
      },
    })

    // Admin'e bildirim gönder
    try {
      const typeLabel = data.type === "internship" ? "Staj" : "İş";
      await transporter.sendMail({
        from: `"Bromak Kariyer" <${process.env.SMTP_USER}>`,
        to: "info@bromakagency.com",
        subject: `Yeni ${typeLabel} Başvurusu: ${data.name}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
            <h2 style="color: #e2130a;">Yeni ${typeLabel} Başvurusu Geldi!</h2>
            <p>Sistem üzerinden yeni bir başvuru alındı. Detaylar aşağıdadır:</p>
            <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
              <tr><td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Ad Soyad:</strong></td><td style="padding: 10px; border-bottom: 1px solid #ddd;">${data.name}</td></tr>
              <tr><td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>E-Posta:</strong></td><td style="padding: 10px; border-bottom: 1px solid #ddd;">${data.email}</td></tr>
              <tr><td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Telefon:</strong></td><td style="padding: 10px; border-bottom: 1px solid #ddd;">${data.phone}</td></tr>
              <tr><td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Portfolyo:</strong></td><td style="padding: 10px; border-bottom: 1px solid #ddd;">${data.portfolioUrl ? `<a href="${data.portfolioUrl}">${data.portfolioUrl}</a>` : 'Yok'}</td></tr>
              <tr><td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Ön Yazı / Mesaj:</strong></td><td style="padding: 10px; border-bottom: 1px solid #ddd;">${data.message || 'Yok'}</td></tr>
            </table>
            
            <div style="text-align: center; margin-top: 30px;">
              <a href="${data.cvUrl}" style="background-color: #e2130a; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block; margin-right: 10px;">CV'yi İndir / Görüntüle</a>
              <a href="https://bromakagency.com/bromakhome/kariyer" style="background-color: #111; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">Admin Paneline Git</a>
            </div>
          </div>
        `,
      })
    } catch (mailError) {
      console.error("Kariyer bildirim maili gönderilemedi:", mailError)
    }

    revalidatePath("/bromakhome/kariyer")
    return { success: true, message: "Başvurunuz başarıyla alındı!" }
  } catch (error) {
    console.error("Başvuru kaydetme hatası:", error)
    return { success: false, message: "Bir hata oluştu. Lütfen tekrar deneyin." }
  }
}

export async function deleteApplication(id: string) {
  const session = await auth()
  if (!session) throw new Error("Unauthorized")

  try {
    await prisma.careerApplication.delete({
      where: { id },
    })
    revalidatePath("/bromakhome/kariyer")
    return { success: true }
  } catch (error) {
    return { success: false, message: "Silinemedi." }
  }
}

export async function toggleApplicationStatus(id: string, currentStatus: string) {
  const session = await auth()
  if (!session) throw new Error("Unauthorized")

  try {
    const newStatus = currentStatus === "UNREAD" ? "READ" : "UNREAD";
    await prisma.careerApplication.update({
      where: { id },
      data: { status: newStatus },
    })
    revalidatePath("/bromakhome/kariyer")
    return { success: true }
  } catch (error) {
    return { success: false, message: "Durum güncellenemedi." }
  }
}
