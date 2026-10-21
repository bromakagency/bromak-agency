import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/auth"
import { uploadToR2 } from "@/app/lib/r2"
import { v4 as uuidv4 } from "uuid"
import sharp from "sharp"

export async function POST(request: NextRequest) {
  const session = await auth()
  if (!session?.user) {
    return NextResponse.json({ error: "Yetkisiz" }, { status: 401 })
  }

  try {
    const formData = await request.formData()
    const file = formData.get("file") as File
    const folder = formData.get("folder") as string || "uploads"

    if (!file) {
      return NextResponse.json({ error: "Dosya bulunamadı." }, { status: 400 })
    }

    const rawBuffer = Buffer.from(await file.arrayBuffer() as ArrayBuffer)
    let ext = file.name.split(".").pop()?.toLowerCase() || "bin"
    let contentType = file.type
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let finalBuffer: any = rawBuffer

    // Görsel optimizasyonu (SVG hariç)
    if (contentType.startsWith("image/") && contentType !== "image/svg+xml" && contentType !== "image/gif") {
      try {
        finalBuffer = await sharp(rawBuffer)
          .resize({ width: 1920, withoutEnlargement: true }) // Maksimum 1920px genişlik
          .webp({ quality: 80 })
          .toBuffer()
        ext = "webp"
        contentType = "image/webp"
      } catch (sharpError) {
        console.warn("Sharp görsel optimizasyonu atlandı (orijinal yükleniyor):", sharpError)
        // Fallback: Orijinal buffer ile devam et
      }
    }

    const fileName = `${folder}/${uuidv4()}.${ext}`
    const url = await uploadToR2(finalBuffer, fileName, contentType)

    return NextResponse.json({ url })
  } catch (error: any) {
    console.error("Upload API hatası:", error)
    return NextResponse.json({ 
      error: error?.message || "Görsel yüklenirken sunucu hatası oluştu.",
      code: error?.code
    }, { status: 500 })
  }
}
