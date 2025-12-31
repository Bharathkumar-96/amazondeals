import React from 'react'
import { Card, CardContent, CardMedia, Typography, Box, Chip, Button } from '@mui/material'
import trackClick from '../utils/analytics'

export default function ProductCard({ product }) {
  const { name, mrpPrice, discountPercent, currentPrice, description, image, affiliateUrl } = product

  const fmt = (v) => {
    try {
      return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 2 }).format(v)
    } catch (e) {
      return `₹${v}`
    }
  }

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {image && (
        <CardMedia component="img" height="160" image={image} alt={name} loading="lazy" />
      )}
      <CardContent sx={{ flexGrow: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', gap: 1 }}>
          <Typography variant="h6" component="div" sx={{ fontSize: 16 }}>
            {name}
          </Typography>
          <Chip label={`-${discountPercent}%`} color="primary" size="small" />
        </Box>

        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          {description}
        </Typography>

        <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
              {fmt(currentPrice)}
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ textDecoration: 'line-through' }}>
                {fmt(mrpPrice)}
            </Typography>
          </Box>
          <Button
            variant="contained"
            size="small"
            sx={{ ml: 'auto' }}
            component="a"
            href={affiliateUrl || '#'}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              // try to reliably send click to server. Use sendBeacon if available (survives navigation),
              // otherwise fire-and-forget fetch.
              try {
                const base = import.meta.env.VITE_API_BASE || ''
                const url = `${base}/api/click`
                const payload = JSON.stringify({ productId: product.id })
                if (navigator && typeof navigator.sendBeacon === 'function') {
                  const blob = new Blob([payload], { type: 'application/json' })
                  navigator.sendBeacon(url, blob)
                } else {
                  fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: payload }).catch((e) => console.warn('click update failed', e))
                }
              } catch (e) {
                console.warn('click tracking error', e)
              }
              // always record local analytics as well
              trackClick({ productId: product.id, name })
            }}
          >
            View Deal
          </Button>
        </Box>
      </CardContent>
    </Card>
  )
}
