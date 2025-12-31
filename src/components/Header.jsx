import React from 'react'
import { Box, Container, Typography } from '@mui/material'

export default function Header() {
  return (
    <Box sx={{ bgcolor: '#e3f2fd', py: 3, borderBottom: '1px solid #cfe8ff' }}>
      <Container sx={{ display: 'flex', alignItems: 'center', gap: 2, justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography variant="h4" component="div" sx={{ fontWeight: 700, color: '#0b63b3' }}>
            DiscountShop
          </Typography>
          <Typography variant="subtitle1" sx={{ color: '#255e98' }}>
            Best picks — deals & recommendations
          </Typography>
        </Box>

          {/* Logo on the right. Prefer /logo.png (your uploaded image); fall back to /ds-logo.svg */}
          <Box
            component="img"
            src="/logo.jpeg"
            alt="DavidsShop logo"
            sx={{ height: 36, width: 'auto' }}
            onError={(e) => {
              // fallback to the SVG we generated earlier if /logo.png isn't present
              e.currentTarget.onerror = null
              e.currentTarget.src = '/ds-logo.svg'
            }}
          />
      </Container>
    </Box>
  )
}
