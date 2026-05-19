export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { name, phone, guests, status, message } = body

  if (!name) {
    throw createError({ statusCode: 400, statusMessage: 'Нэр оруулна уу' })
  }

  const db = useDatabase()

  const stmt = db.prepare(`
    INSERT INTO rsvps (name, phone, guests, status, message)
    VALUES (?, ?, ?, ?, ?)
  `)

  const result = stmt.run(
    name,
    phone || null,
    guests || 1,
    status || 'confirmed',
    message || null
  )

  // Send Telegram notification
  const guestText = guests > 1 ? `(+${guests - 1} зочинтой)` : ''
  const statusText = status === 'declined' ? '❌ Ирэхгүй' : '✅ Ирнэ'
  const telegramMessage = `🎉 <b>Шинэ RSVP!</b>\n\n👤 <b>${name}</b> ${guestText}\n📞 ${phone || 'Утас оруулаагүй'}\n${statusText}\n💬 ${message || 'Мессеж үлдээгээгүй'}`

  await sendTelegramNotification(telegramMessage)

  return {
    success: true,
    id: result.lastInsertRowid
  }
})
