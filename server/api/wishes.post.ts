export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { name, message } = body

  if (!name || !message) {
    throw createError({ statusCode: 400, statusMessage: 'Нэр болон мессеж оруулна уу' })
  }

  const db = useDatabase()

  const stmt = db.prepare(`
    INSERT INTO wishes (name, message)
    VALUES (?, ?)
  `)

  const result = stmt.run(name, message)

  // Send Telegram notification for wishes too
  const telegramMessage = `💌 <b>Шинэ ерөөл!</b>\n\n👤 <b>${name}</b>\n💬 "${message}"`
  await sendTelegramNotification(telegramMessage)

  return {
    success: true,
    id: result.lastInsertRowid
  }
})
