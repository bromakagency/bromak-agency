import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3"

const accountId = process.env.R2_ACCOUNT_ID
const accessKeyId = process.env.R2_ACCESS_KEY_ID
const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY
const bucketName = process.env.R2_BUCKET_NAME || "bromakagency"

if (!accountId || !accessKeyId || !secretAccessKey) {
  throw new Error("R2 kimlik bilgileri eksik (.env dosyanızı kontrol edin)")
}

export const r2Client = new S3Client({
  region: "auto",
  endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
})

export async function uploadToR2(fileBuffer: Buffer, fileName: string, contentType: string) {
  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: fileName,
    Body: new Uint8Array(fileBuffer),
    ContentType: contentType,
  })

  await r2Client.send(command)

  // Returns the public URL (Make sure to set R2_PUBLIC_URL in .env if you use a custom domain later)
  const publicUrl = process.env.R2_PUBLIC_URL || `https://pub-your-public-url.r2.dev`
  return `${publicUrl}/${fileName}`
}

export async function deleteFromR2(fileName: string) {
  const command = new DeleteObjectCommand({
    Bucket: bucketName,
    Key: fileName,
  })

  await r2Client.send(command)
}
