const express = require('express')
const fs = require('fs')
const path = require('path')
const cors = require('cors')
const {
  connectRedis,
  getCache,
  setCache,
  deleteCache,
  incrementCounter,
} = require('./redis')

const app = express()
app.use(cors())
app.use(express.json())

const DATA_PATH = path.join(__dirname, 'data', 'products.json')
const CACHE_KEY = 'products:all'
const CACHE_EXPIRY = 3600 // 1 hour

function readData() {
  const raw = fs.readFileSync(DATA_PATH, 'utf8')
  return JSON.parse(raw)
}

function writeData(data) {
  fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2), 'utf8')
}

app.get('/api/products', async (req, res) => {
  try {
    // Try to get from Redis cache first
    const cachedData = await getCache(CACHE_KEY)
    if (cachedData) {
      console.log('✓ Returning products from Redis cache')
      return res.json(cachedData)
    }

    // If not in cache, read from file
    const data = readData()

    // Cache the result
    await setCache(CACHE_KEY, data, CACHE_EXPIRY)
    console.log('✓ Products cached in Redis')

    res.json(data)
  } catch (e) {
    console.error(e)
    res.status(500).json({ error: 'Unable to read data' })
  }
})

// increments clicksCount for a productId
app.post('/api/click', async (req, res) => {
  const { productId } = req.body || {}
  if (!productId) return res.status(400).json({ error: 'productId required' })

  try {
    const data = readData()
    const idx = data.findIndex((p) => p.id === productId)
    if (idx === -1) return res.status(404).json({ error: 'product not found' })

    // Increment click counter in Redis
    const clickCount = await incrementCounter(`product:${productId}:clicks`)

    // Update file data
    data[idx].clicksCount = (data[idx].clicksCount || 0) + 1
    writeData(data)

    // Invalidate cache so fresh data is loaded next time
    await deleteCache(CACHE_KEY)

    return res.json({ success: true, product: data[idx], redisClickCount: clickCount })
  } catch (e) {
    console.error(e)
    return res.status(500).json({ error: 'Unable to update clicks' })
  }
})

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// Initialize server and Redis
async function startServer() {
  try {
    // Connect to Redis (optional - app will work without it)
    await connectRedis()
  } catch (err) {
    console.warn('Redis connection failed, continuing without cache:', err.message)
  }

  const PORT = process.env.PORT || 4000
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
    console.log('Data path:', DATA_PATH)
  })
}

startServer()
