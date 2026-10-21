import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3"

function getR2Client() {
  const accountId = process.env.R2_ACCOUNT_ID
  const accessKeyId = process.env.R2_ACCESS_KEY_ID
  const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY

  const missing: string[] = []
  if (!accountId) missing.push("R2_ACCOUNT_ID")
  if (!accessKeyId) missing.push("R2_ACCESS_KEY_ID")
  if (!secretAccessKey) missing.push("R2_SECRET_ACCESS_KEY")

  if (missing.length > 0) {
    throw new Error(`R2 kimlik bilgileri eksik (${missing.join(", ")}). Lütfen hosting panelinizden (Vercel) Environment Variables ayarlarını kontrol edin.`)
  }

  return new S3Client({
    region: "auto",
    endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: accessKeyId!,
      secretAccessKey: secretAccessKey!,
    },
  })
}

export async function uploadToR2(fileBuffer: Buffer, fileName: string, contentType: string) {
  const client = getR2Client()
  const bucketName = process.env.R2_BUCKET_NAME || "bromakagency"

  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: fileName,
    Body: new Uint8Array(fileBuffer),
    ContentType: contentType,
  })

  await client.send(command)

  // Returns the public URL (Make sure to set R2_PUBLIC_URL in .env if you use a custom domain later)
  const publicUrl = process.env.R2_PUBLIC_URL || `https://pub-your-public-url.r2.dev`
  return `${publicUrl}/${fileName}`
}

export async function deleteFromR2(fileName: string) {
  const client = getR2Client()
  const bucketName = process.env.R2_BUCKET_NAME || "bromakagency"

  const command = new DeleteObjectCommand({
    Bucket: bucketName,
    Key: fileName,
  })

  await client.send(command)
}
