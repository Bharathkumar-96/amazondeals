const express = require('express')
const fs = require('fs')
const path = require('path')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())

const DATA_PATH = path.join(__dirname, 'data', 'products.json')

function readData() {
  const raw = fs.readFileSync(DATA_PATH, 'utf8')
  return JSON.parse(raw)
}

function writeData(data) {
  fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2), 'utf8')
}

app.get('/api/products', (req, res) => {
  try {
    const data = readData()
    res.json(data)
  } catch (e) {
    console.error(e)
    res.status(500).json({ error: 'Unable to read data' })
  }
})

// increments clicksCount for a productId
app.post('/api/click', (req, res) => {
  const { productId } = req.body || {}
  if (!productId) return res.status(400).json({ error: 'productId required' })

  try {
    const data = readData()
    const idx = data.findIndex((p) => p.id === productId)
    if (idx === -1) return res.status(404).json({ error: 'product not found' })
    data[idx].clicksCount = (data[idx].clicksCount || 0) + 1
    writeData(data)
    return res.json({ success: true, product: data[idx] })
  } catch (e) {
    console.error(e)
    return res.status(500).json({ error: 'Unable to update clicks' })
  }
})

const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
  console.log('Server running on port', PORT)
  console.log('Data path:', DATA_PATH)
})
