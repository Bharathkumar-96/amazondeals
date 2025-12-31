import React from 'react'
import { Box, Container, Typography, Link } from '@mui/material'

export default function Footer() {
  return (
    <Box sx={{ bgcolor: '#000', color: '#fff', py: 4, mt: 6 }}>
      <Container>
        <Typography variant="subtitle1" sx={{ mb: 1, color: '#fff' }}>
          <span style={{ color: '#1976d2', fontWeight: 700 }}>DiscountShop</span> — curated deals
        </Typography>
        <Typography variant="body2" sx={{ color: '#ddd' }}>
          © {new Date().getFullYear()} DiscountShop. All links point to partner stores.
          <br />
          Built with Love.
        </Typography>
        <Typography variant="caption" display="block" sx={{ mt: 1 }}>
          <Link href="#" sx={{ color: '#1976d2' }}>Terms</Link> • <Link href="#" sx={{ color: '#1976d2' }}>Privacy</Link>
        </Typography>
      </Container>
    </Box>
  )
}
