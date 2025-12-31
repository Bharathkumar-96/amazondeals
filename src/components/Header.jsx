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

        {/* DS logo on the right, using SVG in public folder */}
        <Box component="img" src="/ds-logo.svg" alt="DiscountShop logo" sx={{ height: 36, width: 'auto' }} />
      </Container>
    </Box>
  )
}
