export default defineEventHandler(() => {
  const db = useDatabase()
  const rsvps = db.prepare('SELECT * FROM rsvps ORDER BY created_at DESC').all()
  return rsvps
})
