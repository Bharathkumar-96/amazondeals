import React from 'react'
import { CssBaseline, Container, createTheme, ThemeProvider } from '@mui/material'
import Header from './components/Header'
import NavBar from './components/NavBar'
import Home from './pages/Home'
import Footer from './components/Footer'
import BookmarkPopup from './components/BookmarkPopup'
import { useState } from 'react'

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2'
    },
    background: {
      default: '#f6f8fb'
    }
  }
})

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <NavBar selectedCategory={selectedCategory} onSelectCategory={setSelectedCategory} />
      <Container sx={{ mt: 4, mb: 6 }}>
        <Home selectedCategory={selectedCategory} searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      </Container>
      <Footer />
      <BookmarkPopup />
    </ThemeProvider>
  )
}
