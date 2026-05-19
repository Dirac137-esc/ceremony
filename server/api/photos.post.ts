import convert from 'heic-convert'
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

    const imageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/heic', 'image/heif']
    const heicTypes = ['image/heic', 'image/heif']
    const results = []

    for (const part of formData) {
      if (!part.filename || !part.data) continue

      let mimetype = part.type || 'application/octet-stream'
      let buffer: Buffer = Buffer.from(part.data)
      let filename = part.filename

      // Detect HEIC by file extension (some devices send wrong mimetype)
      const ext = filename.toLowerCase().split('.').pop() || ''
      if (ext === 'heic' || ext === 'heif') {
        mimetype = 'image/heic'
      }

      if (!imageTypes.includes(mimetype)) continue

      // Convert HEIC/HEIF to JPEG using heic-convert
      if (heicTypes.includes(mimetype)) {
        const outputBuffer = await convert({
          buffer: buffer,
          format: 'JPEG',
          quality: 0.9
        })
        buffer = Buffer.from(outputBuffer)
        mimetype = 'image/jpeg'
        filename = filename.replace(/\.(heic|heif)$/i, '.jpg')
      }

      const result = await uploadPhotoToS3(buffer, filename, mimetype)
      results.push(result)
    }

    if (results.length === 0) {
      throw createError({
        statusCode: 400,
        message: 'Зөвхөн зургийн файл (JPG, PNG, GIF, WEBP, HEIC) хүлээн авна'
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
