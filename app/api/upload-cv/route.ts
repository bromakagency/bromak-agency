import { NextRequest, NextResponse } from "next/server"
import { uploadToR2 } from "@/app/lib/r2"
import { v4 as uuidv4 } from "uuid"

// Max 5 MB
const MAX_FILE_SIZE = 5 * 1024 * 1024; 

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json({ error: "Lütfen bir CV dosyası yükleyin." }, { status: 400 })
    }

    // PDF Doğrulaması
    if (file.type !== "application/pdf") {
      return NextResponse.json({ error: "Sadece PDF formatında dosya yükleyebilirsiniz." }, { status: 400 })
    }

    // Boyut Doğrulaması
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: "Dosya boyutu 5 MB'ı aşamaz." }, { status: 400 })
    }

    const buffer = Buffer.from(await file.arrayBuffer() as ArrayBuffer)
    
    // Güvenlik için dosya adını benzersiz yap
    const fileName = `cvs/${uuidv4()}.pdf`
    
    // Cloudflare R2'ye yükle
    const url = await uploadToR2(buffer, fileName, "application/pdf")

    return NextResponse.json({ url })
  } catch (error: any) {
    console.error("CV yükleme hatası:", error)
    return NextResponse.json({ error: "Yükleme başarısız. Lütfen tekrar deneyin." }, { status: 500 })
  }
}
