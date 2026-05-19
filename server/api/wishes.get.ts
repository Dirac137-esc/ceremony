export default defineEventHandler(() => {
  const db = useDatabase()
  const wishes = db.prepare('SELECT * FROM wishes ORDER BY created_at DESC').all()
  return wishes
})
