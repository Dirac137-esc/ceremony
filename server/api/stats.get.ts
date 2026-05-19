export default defineEventHandler(() => {
  const db = useDatabase()

  const totalRsvps = db.prepare('SELECT COUNT(*) as count FROM rsvps').get() as { count: number }
  const confirmed = db.prepare('SELECT COUNT(*) as count FROM rsvps WHERE status = ?').get('confirmed') as { count: number }
  const declined = db.prepare('SELECT COUNT(*) as count FROM rsvps WHERE status = ?').get('declined') as { count: number }
  const totalGuests = db.prepare('SELECT COALESCE(SUM(guests), 0) as total FROM rsvps WHERE status = ?').get('confirmed') as { total: number }
  const totalWishes = db.prepare('SELECT COUNT(*) as count FROM wishes').get() as { count: number }

  return {
    totalRsvps: totalRsvps.count,
    confirmed: confirmed.count,
    declined: declined.count,
    totalGuests: totalGuests.total,
    totalWishes: totalWishes.count
  }
})
