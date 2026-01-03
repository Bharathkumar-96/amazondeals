import React from 'react'
import { Grid, Box, Typography, TextField } from '@mui/material'
import products from '../data/products'
import ProductCard from '../components/ProductCard'

const categories = ['All', 'Electronics', 'Toys', 'Kitchen', 'Health', 'Books']

export default function Home({ selectedCategory = 'All', searchQuery = '', onSearchChange }) {
  const filtered = products.filter((p) => {
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory
    const q = (searchQuery || '').trim().toLowerCase()
    const matchesQuery = !q || p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
    return matchesCategory && matchesQuery
  })

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 700 }}>
        Featured Offers
      </Typography>

      <Box sx={{ display: 'flex', gap: 2, mb: 3, alignItems: 'center', flexWrap: 'wrap' }}>
        <TextField
          size="small"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
        />
      </Box>

      <Grid container spacing={3}>
        {filtered.map((p) => (
          <Grid item key={p.id} xs={12} sm={6} md={4}>
            <ProductCard product={p} />
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}
