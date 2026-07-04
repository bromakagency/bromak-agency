"use server"

import { auth } from "@/auth"
import { prisma } from "@/app/lib/prisma"
import { revalidatePath } from "next/cache"
import { headers } from "next/headers"
import nodemailer from "nodemailer"

// Rate limiting
const rateLimitMap = new Map<string, { count: number; timestamp: number }>()
const RATE_LIMIT_WINDOW = 5 * 60 * 1000 // 5 dakika
const MAX_REQUESTS = 3 // 5 dakikada maks 3 deneme

// Nodemailer yapılandırması
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || "465"),
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

export async function subscribeToNewsletter(email: string) {
  try {
    // Rate limiting
    const headersList = await headers()
    const ip = headersList.get("x-forwarded-for") || "unknown"
    const now = Date.now()
    const rateData = rateLimitMap.get(ip)

    if (rateData) {
      if (now - rateData.timestamp < RATE_LIMIT_WINDOW) {
        if (rateData.count >= MAX_REQUESTS) {
          return { success: false, message: "Çok fazla deneme yaptınız. Lütfen 5 dakika sonra tekrar deneyin." }
        }
        rateData.count += 1
      } else {
        rateLimitMap.set(ip, { count: 1, timestamp: now })
      }
    } else {
      rateLimitMap.set(ip, { count: 1, timestamp: now })
    }

    if (!email || !email.includes("@")) {
      return { success: false, message: "Lütfen geçerli bir e-posta adresi girin." }
    }

    const existing = await prisma.newsletterSubscriber.findUnique({
      where: { email },
    })

    if (existing) {
      if (existing.status === "UNSUBSCRIBED") {
        await prisma.newsletterSubscriber.update({
          where: { email },
          data: { status: "SUBSCRIBED" },
        })
        return { success: true, message: "Bültene tekrar hoş geldiniz!" }
      }
      return { success: false, message: "Bu e-posta adresi zaten bültene kayıtlı." }
    }

    await prisma.newsletterSubscriber.create({
      data: { email },
    })

    // Hoş geldin maili gönder
    try {
      await transporter.sendMail({
        from: `"Bromak Agency" <${process.env.SMTP_USER}>`,
        to: email,
        subject: "Bültenimize Hoş Geldiniz! 🎉",
        html: `
          <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.05); border: 1px solid #eaeaea;">
            
            <!-- Header -->
            <div style="background-color: #e2130a; padding: 40px 20px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 28px; letter-spacing: 1px;">Aramıza Hoş Geldiniz!</h1>
            </div>

            <!-- Content Body -->
            <div style="padding: 40px 30px;">
              <p style="color: #444; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">Merhaba,</p>
              
              <p style="color: #444; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                <strong>Bromak Agency</strong> bültenine başarıyla kayıt oldunuz. Dijital dünyadaki gelişmeleri, strateji ipuçlarını ve ajans dünyasından trendleri artık ilk siz öğreneceksiniz.
              </p>

              <div style="background-color: #f5f5f5; border-left: 4px solid #e2130a; padding: 20px; margin: 30px 0; border-radius: 4px;">
                <p style="color: #555; font-size: 15px; margin: 0; line-height: 1.5;">
                  Blog yazılarımız yayınlandığı an e-posta kutunuza düşecek. Eğer bizden haber almak istemezseniz dilediğiniz zaman ayrılabilirsiniz.
                </p>
              </div>

              <p style="color: #444; font-size: 16px; line-height: 1.6; margin: 0 0 30px 0;">Yeni yazılarımızda görüşmek üzere!</p>

              <!-- CTA Button -->
              <div style="text-align: center; margin-top: 40px;">
                <a href="https://bromakagency.com/blog" style="display: inline-block; background-color: #111; color: #ffffff; text-decoration: none; padding: 15px 35px; border-radius: 8px; font-size: 16px; font-weight: bold;">
                  Bloga Göz Atın
                </a>
              </div>
            </div>

            <!-- Footer -->
            <div style="background-color: #f9f9f9; padding: 30px; text-align: center; border-top: 1px solid #eaeaea;">
              <p style="color: #888; font-size: 13px; margin: 0;">Bu e-postayı bültene kayıt olduğunuz için alıyorsunuz.</p>
              <p style="color: #aaa; font-size: 12px; margin: 10px 0 0 0;">
                Abonelikten ayrılmak isterseniz <a href="https://bromakagency.com/bultenden-ayril" style="color: #e2130a; text-decoration: underline;">tıklayın</a>.<br/><br/>
                © ${new Date().getFullYear()} Bromak Agency. Tüm hakları saklıdır.
              </p>
            </div>
          </div>
        `,
      })
    } catch (mailError) {
      console.error("Hoşgeldin maili gönderilemedi:", mailError)
      // Mail gönderilemese bile kayıt başarılı sayılır
    }

    return { success: true, message: "Bültene başarıyla kayıt oldunuz!" }
  } catch (error) {
    console.error("Bülten kayıt hatası:", error)
    return { success: false, message: "Bir hata oluştu. Lütfen daha sonra tekrar deneyin." }
  }
}

export async function unsubscribe(email: string) {
  try {
    await prisma.newsletterSubscriber.update({
      where: { email },
      data: { status: "UNSUBSCRIBED" },
    })
    revalidatePath("/bromakhome/ebulten")
    return { success: true, message: "Bültenden ayrıldınız." }
  } catch (error) {
    return { success: false, message: "Bir hata oluştu." }
  }
}

// Admin fonksiyonları
export async function deleteSubscriber(id: string) {
  const session = await auth()
  if (!session) throw new Error("Unauthorized")

  try {
    await prisma.newsletterSubscriber.delete({
      where: { id },
    })
    revalidatePath("/bromakhome/ebulten")
    return { success: true }
  } catch (error) {
    return { success: false, message: "Silinemedi." }
  }
}

export async function toggleSubscriberStatus(id: string, newStatus: string) {
  const session = await auth()
  if (!session) throw new Error("Unauthorized")

  try {
    await prisma.newsletterSubscriber.update({
      where: { id },
      data: { status: newStatus },
    })
    revalidatePath("/bromakhome/ebulten")
    return { success: true }
  } catch (error) {
    return { success: false, message: "Durum güncellenemedi." }
  }
}
