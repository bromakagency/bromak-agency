const { PrismaClient } = require("@prisma/client")
const { PrismaPg } = require("@prisma/adapter-pg")
const { Pool } = require("pg")
require("dotenv").config()

const OLD_URL = "https://pub-your-public-url.r2.dev"
const NEW_URL = process.env.R2_PUBLIC_URL

async function main() {
  if (!NEW_URL || NEW_URL === OLD_URL) {
    console.error("R2_PUBLIC_URL env değişkeni düzgün ayarlanmamış!")
    process.exit(1)
  }

  const pool = new Pool({ connectionString: process.env.DATABASE_URL })
  const adapter = new PrismaPg(pool)
  const prisma = new PrismaClient({ adapter })

  console.log(`Eski URL: ${OLD_URL}`)
  console.log(`Yeni URL: ${NEW_URL}`)

  // Fix Post images
  const posts = await prisma.post.findMany({ where: { image: { contains: OLD_URL } } })
  console.log(`Düzeltilecek yazı sayısı: ${posts.length}`)

  for (const post of posts) {
    const newImage = post.image.replace(OLD_URL, NEW_URL)
    await prisma.post.update({ where: { id: post.id }, data: { image: newImage } })
    console.log(`✓ Yazı güncellendi: ${post.title} → ${newImage}`)
  }

  await pool.end()
  console.log("✅ Tüm görseller güncellendi!")
}

main().catch(console.error)
