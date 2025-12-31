// Simple offline analytics: records clicks to localStorage and logs to console.
export default function trackClick(event) {
  try {
    const now = new Date().toISOString()
    const record = { ...event, timestamp: now }
    const key = 'DiscountShop_analytics'
    const raw = localStorage.getItem(key)
    const arr = raw ? JSON.parse(raw) : []
    arr.push(record)
    localStorage.setItem(key, JSON.stringify(arr))
    // In real deployment, replace this with a network call to your analytics endpoint
    console.log('[analytics] recorded click', record)
  } catch (e) {
    // localStorage or serialization error shouldn't break the app
    console.warn('analytics error', e)
  }
}
