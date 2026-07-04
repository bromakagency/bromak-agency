"use server"

import { prisma } from "@/app/lib/prisma"
import { auth } from "@/auth"
import { revalidatePath } from "next/cache"
import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || "465"),
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

async function notifySubscribers(post: any) {
  try {
    const subscribers = await prisma.newsletterSubscriber.findMany({
      where: { status: "SUBSCRIBED" }
    })
    
    if (subscribers.length === 0) return

    const emails = subscribers.map(s => s.email)
    
    const postUrl = `https://bromakagency.com/blog/${post.slug}`
    
    await transporter.sendMail({
      from: `"Bromak Agency" <${process.env.SMTP_USER}>`,
      bcc: emails, // Gizli kopya ile toplu gönderim
      subject: `Yeni Yazı: ${post.title}`,
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.05); border: 1px solid #eaeaea;">
          
          <!-- Header / Cover Image -->
          <div style="width: 100%; height: 250px; background-color: #111; overflow: hidden; position: relative;">
            <img src="${post.image || 'https://bromakagency.com/assets/images/default-blog.jpg'}" alt="${post.title}" style="width: 100%; height: 100%; object-fit: cover; opacity: 0.9;" />
            <div style="position: absolute; top: 20px; left: 20px; background: #e2130a; padding: 6px 14px; border-radius: 4px; color: #fff; font-size: 12px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px;">
              YENİ YAZI
            </div>
          </div>

          <!-- Content Body -->
          <div style="padding: 40px 30px;">
            <h1 style="color: #111; margin: 0 0 15px 0; font-size: 24px; line-height: 1.3;">${post.title}</h1>
            
            <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 25px; color: #666; font-size: 13px;">
              <span>Yazar: <strong>${post.author || 'Bromak Agency'}</strong></span>
              <span>•</span>
              <span>${post.readTime || '5 dk'} okuma süresi</span>
            </div>

            <p style="color: #444; font-size: 16px; line-height: 1.6; margin: 0 0 30px 0;">
              ${post.summary}
            </p>

            <!-- CTA Button -->
            <div style="text-align: center; margin-top: 40px;">
              <a href="${postUrl}" style="display: inline-block; background-color: #e2130a; color: #ffffff; text-decoration: none; padding: 15px 35px; border-radius: 8px; font-size: 16px; font-weight: bold; box-shadow: 0 4px 6px rgba(226, 19, 10, 0.2);">
                Yazıyı Hemen Oku
              </a>
            </div>
          </div>

          <!-- Footer -->
          <div style="background-color: #f9f9f9; padding: 30px; text-align: center; border-top: 1px solid #eaeaea;">
            <p style="color: #888; font-size: 13px; margin: 0;">Bu e-postayı Bromak Agency bültenine abone olduğunuz için alıyorsunuz.</p>
            <p style="color: #aaa; font-size: 12px; margin: 10px 0 0 0;">
              Abonelikten ayrılmak isterseniz <a href="https://bromakagency.com/bultenden-ayril" style="color: #e2130a; text-decoration: underline;">tıklayın</a>.<br/><br/>
              © ${new Date().getFullYear()} Bromak Agency. Tüm hakları saklıdır.
            </p>
          </div>
        </div>
      `,
    })
  } catch (err) {
    console.error("Abonelere mail gönderilirken hata oluştu:", err)
  }
}


export async function createPost(data: any) {
  const session = await auth()
  if (!session?.user) throw new Error("Yetkisiz işlem")

  const post = await prisma.post.create({
    data: {
      title: data.title,
      slug: data.slug,
      summary: data.summary,
      content: data.content,
      category: data.category,
      image: data.image,
      readTime: data.readTime,
      author: data.author,
      authorRole: data.authorRole,
      faqJson: data.faqJson,
      published: data.published,
    }
  })

  if (post.published) {
    notifySubscribers(post)
  }

  revalidatePath("/bromakhome/blog")
  return post
}

export async function updatePost(id: string, data: any) {
  const session = await auth()
  if (!session?.user) throw new Error("Yetkisiz işlem")

  const previousPost = await prisma.post.findUnique({ where: { id } })

  const post = await prisma.post.update({
    where: { id },
    data: {
      title: data.title,
      slug: data.slug,
      summary: data.summary,
      content: data.content,
      category: data.category,
      image: data.image,
      readTime: data.readTime,
      author: data.author,
      authorRole: data.authorRole,
      faqJson: data.faqJson,
      published: data.published,
    }
  })

  if (previousPost && !previousPost.published && post.published) {
    notifySubscribers(post)
  }

  revalidatePath("/blog")
  revalidatePath(`/blog/${id}/edit`)
  return post
}

export async function deletePost(id: string) {
  const session = await auth()
  if (!session?.user) throw new Error("Yetkisiz işlem")

  await prisma.post.delete({
    where: { id }
  })

  revalidatePath("/bromakhome/blog")
  return true
}

export async function togglePublishStatus(id: string, currentStatus: boolean) {
  const session = await auth()
  if (!session?.user) throw new Error("Yetkisiz işlem")

  const post = await prisma.post.update({
    where: { id },
    data: { published: !currentStatus }
  })

  if (!currentStatus) {
    // false -> true (yayınlandı)
    notifySubscribers(post)
  }

  revalidatePath("/bromakhome/blog")
}

export async function deleteBulkPosts(ids: string[]) {
  const session = await auth()
  if (!session?.user) throw new Error("Yetkisiz işlem")

  await prisma.post.deleteMany({
    where: {
      id: { in: ids }
    }
  })

  revalidatePath("/bromakhome/blog")
  return true
}
