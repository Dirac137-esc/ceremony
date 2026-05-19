import { uploadPhotoToS3 } from '../utils/s3'

export default defineEventHandler(async (event) => {
  try {
    const contentType = getRequestHeader(event, 'content-type') || ''

    if (!contentType.includes('multipart/form-data')) {
      throw createError({
        statusCode: 400,
        message: 'multipart/form-data хүлээж байна'
      })
    }

    const formData = await readMultipartFormData(event)
    if (!formData || formData.length === 0) {
      throw createError({
        statusCode: 400,
        message: 'Файл олдсонгүй'
      })
    }

    const imageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/heic']
    const results = []

    for (const part of formData) {
      if (!part.filename || !part.data) continue

      const mimetype = part.type || 'application/octet-stream'
      if (!imageTypes.includes(mimetype)) continue

      const result = await uploadPhotoToS3(part.data, part.filename, mimetype)
      results.push(result)
    }

    if (results.length === 0) {
      throw createError({
        statusCode: 400,
        message: 'Зөвхөн зургийн файл (JPG, PNG, GIF, WEBP) хүлээн авна'
      })
    }

    return {
      success: true,
      uploaded: results.length,
      files: results
    }
  }
  catch (error: any) {
    if (error.statusCode) throw error
    throw createError({
      statusCode: 500,
      message: 'Зураг байршуулахад алдаа гарлаа: ' + error.message
    })
  }
})
