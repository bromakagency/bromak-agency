import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/auth"
import { uploadToR2 } from "@/app/lib/r2"
import { v4 as uuidv4 } from "uuid"

export const maxDuration = 60
export const dynamic = "force-dynamic"

export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ error: "Yetkisiz işlem. Lütfen tekrar giriş yapın." }, { status: 401 })
    }

    const formData = await request.formData()
    const file = formData.get("file") as File
    const folder = (formData.get("folder") as string) || "uploads"

    if (!file) {
      return NextResponse.json({ error: "Dosya bulunamadı." }, { status: 400 })
    }

    const rawBuffer = Buffer.from(await file.arrayBuffer())
    const ext = file.name.split(".").pop()?.toLowerCase() || "webp"
    const contentType = file.type || "image/webp"

    const fileName = `${folder}/${uuidv4()}.${ext}`
    const url = await uploadToR2(rawBuffer, fileName, contentType)

    return NextResponse.json({ url })
  } catch (error: any) {
    console.error("Upload API hatası:", error)
    return NextResponse.json(
      { error: error?.message || "Görsel yüklenirken sunucu hatası oluştu." },
      { status: 500 }
    )
  }
}
