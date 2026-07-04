import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import nodemailer from "nodemailer";

// Rate limiting state (In-memory, clears on serverless cold start which is acceptable)
const rateLimitMap = new Map<string, { count: number, timestamp: number }>();
const RATE_LIMIT_WINDOW = 5 * 60 * 1000; // 5 minutes in milliseconds
const MAX_REQUESTS = 3; // Max 3 requests per IP within the window

export async function POST(request: Request) {
  try {
    // 1. IP Adresini al (Vercel gibi ortamlarda x-forwarded-for kullanılır)
    const forwardedFor = request.headers.get("x-forwarded-for");
    const ip = forwardedFor ? forwardedFor.split(",")[0] : "unknown-ip";

    // 2. Rate Limiting (Hız Sınırı) Kontrolü
    const now = Date.now();
    const rateData = rateLimitMap.get(ip);

    if (rateData) {
      if (now - rateData.timestamp < RATE_LIMIT_WINDOW) {
        if (rateData.count >= MAX_REQUESTS) {
          return NextResponse.json(
            { error: "Çok fazla istek gönderdiniz. Lütfen 5 dakika sonra tekrar deneyin." },
            { status: 429 }
          );
        }
        rateData.count += 1;
      } else {
        // Süre dolduysa sıfırla
        rateLimitMap.set(ip, { count: 1, timestamp: now });
      }
    } else {
      // İlk istek
      rateLimitMap.set(ip, { count: 1, timestamp: now });
    }

    const data = await request.json();
    const { name, email, phone, service, message } = data;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Ad, E-posta ve Mesaj alanları zorunludur." },
        { status: 400 }
      );
    }

    // 1. Veritabanına kaydet
    const newMessage = await prisma.contactMessage.create({
      data: {
        name,
        email,
        phone,
        service,
        message,
      },
    });

    // 2. Nodemailer ile e-posta gönder
    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT) : 465;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    if (smtpHost && smtpUser && smtpPass) {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465, 
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      const mailOptions = {
        from: `"${name}" <${smtpUser}>`, 
        to: smtpUser, 
        replyTo: email,
        subject: `Yeni İletişim Formu Mesajı: ${service || "Genel Bilgi"}`,
        html: `
          <h3>Bromak Agency - Yeni Mesaj</h3>
          <p><strong>Ad Soyad:</strong> ${name}</p>
          <p><strong>E-posta:</strong> ${email}</p>
          <p><strong>Telefon:</strong> ${phone || "-"}</p>
          <p><strong>İlgilenilen Hizmet:</strong> ${service || "-"}</p>
          <p><strong>Mesaj:</strong></p>
          <p>${message.replace(/\n/g, "<br>")}</p>
        `,
      };

      try {
        await transporter.sendMail(mailOptions);
      } catch (mailError) {
        console.error("Mail gönderim hatası:", mailError);
      }
    } else {
      console.warn("SMTP ayarları eksik. Mail sadece veritabanına kaydedildi.");
    }

    return NextResponse.json({ success: true, data: newMessage }, { status: 201 });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Mesaj gönderilirken bir hata oluştu." },
      { status: 500 }
    );
  }
}
