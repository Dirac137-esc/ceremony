import { S3Client, PutObjectCommand, ListObjectsV2Command, GetObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

const region = process.env.AWS_REGION || 'ap-northeast-1'
const bucket = process.env.AWS_S3_BUCKET || ''
const accessKeyId = process.env.AWS_ACCESS_KEY_ID || ''
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY || ''
const FOLDER = 'ceremony/photos'

const s3Client = new S3Client({
  region,
  credentials: {
    accessKeyId,
    secretAccessKey
  }
})

export async function uploadPhotoToS3(file: Buffer, filename: string, mimetype: string) {
  const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`
  const sanitized = filename.replace(/[^a-zA-Z0-9._-]/g, '-').replace(/-+/g, '-')
  const key = `${FOLDER}/${unique}-${sanitized}`

  await s3Client.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: file,
      ContentType: mimetype
    })
  )

  return { key, filename: sanitized }
}

export async function listPhotosFromS3() {
  const command = new ListObjectsV2Command({
    Bucket: bucket,
    Prefix: `${FOLDER}/`
  })

  const response = await s3Client.send(command)
  const contents = response.Contents || []

  // Filter only image files
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.heic']
  const photos = contents
    .filter((obj) => {
      const key = (obj.Key || '').toLowerCase()
      return imageExtensions.some(ext => key.endsWith(ext))
    })
    .sort((a, b) => {
      // Sort by last modified descending (newest first)
      const dateA = a.LastModified?.getTime() || 0
      const dateB = b.LastModified?.getTime() || 0
      return dateB - dateA
    })
    .map(obj => ({
      key: obj.Key!,
      size: obj.Size,
      lastModified: obj.LastModified?.toISOString()
    }))

  return photos
}

export async function getSignedPhotoUrl(key: string) {
  const command = new GetObjectCommand({
    Bucket: bucket,
    Key: key
  })

  return await getSignedUrl(s3Client, command, { expiresIn: 3600 }) // 1 hour
}

export async function deletePhotoFromS3(key: string) {
  await s3Client.send(
    new DeleteObjectCommand({
      Bucket: bucket,
      Key: key
    })
  )
}
