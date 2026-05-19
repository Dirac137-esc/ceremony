import { deletePhotoFromS3 } from '../utils/s3'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const key = body?.key

    if (!key || typeof key !== 'string') {
      throw createError({
        statusCode: 400,
        message: 'key шаардлагатай'
      })
    }

    // Only allow deleting from ceremony/photos/ folder
    if (!key.startsWith('ceremony/photos/')) {
      throw createError({
        statusCode: 403,
        message: 'Зөвхөн ceremony/photos/ хавтаснаас устгах боломжтой'
      })
    }

    await deletePhotoFromS3(key)

    return { success: true, deleted: key }
  }
  catch (error: any) {
    if (error.statusCode) throw error
    throw createError({
      statusCode: 500,
      message: 'Зураг устгахад алдаа гарлаа: ' + error.message
    })
  }
})
