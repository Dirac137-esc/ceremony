import { listPhotosFromS3, getSignedPhotoUrl } from '../utils/s3'

export default defineEventHandler(async () => {
  try {
    const photos = await listPhotosFromS3()

    // Generate signed URLs for each photo
    const photosWithUrls = await Promise.all(
      photos.map(async (photo) => {
        const url = await getSignedPhotoUrl(photo.key)
        return {
          src: url,
          type: 'image' as const,
          key: photo.key,
          lastModified: photo.lastModified
        }
      })
    )

    return photosWithUrls
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      message: 'Зураг татахад алдаа гарлаа: ' + error.message
    })
  }
})
