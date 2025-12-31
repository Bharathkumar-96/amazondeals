import React from 'react'
import { AppBar, Toolbar, Box, Button, Container, useMediaQuery } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'

const categories = ['All', 'Electronics', 'Toys', 'Kitchen', 'Home', 'Fashion', 'Books']

export default function NavBar({ selectedCategory = 'All', onSelectCategory }) {
  const isSmall = useMediaQuery('(max-width:600px)')

  return (
    <AppBar position="static" color="default" elevation={0} sx={{ borderBottom: '1px solid #eee' }}>
      <Container>
        <Toolbar disableGutters sx={{ display: 'flex', gap: 1, overflowX: 'auto' }}>
          {isSmall ? (
            <Button startIcon={<MenuIcon />}>Categories</Button>
          ) : (
            <Box sx={{ display: 'flex', gap: 1 }}>
              {categories.map((c) => (
                <Button
                  key={c}
                  variant={selectedCategory === c ? 'contained' : 'text'}
                  onClick={() => onSelectCategory && onSelectCategory(c)}
                >
                  {c}
                </Button>
              ))}
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  )
}
