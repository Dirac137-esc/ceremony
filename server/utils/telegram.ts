export async function sendTelegramNotification(message: string) {
  const config = useRuntimeConfig()
  const botToken = config.telegramBotToken
  const chatId = config.telegramChatId

  if (!botToken || !chatId) {
    console.warn('[Telegram] Bot token or chat ID not configured. Skipping notification.')
    return
  }

  try {
    await $fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      body: {
        chat_id: chatId,
        text: message,
        parse_mode: 'HTML'
      }
    })
    console.log('[Telegram] Notification sent successfully')
  }
  catch (error) {
    console.error('[Telegram] Failed to send notification:', error)
  }
}
