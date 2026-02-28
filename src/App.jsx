import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CssBaseline, Container, createTheme, ThemeProvider } from '@mui/material'
import Header from './components/Header'
import NavBar from './components/NavBar'
import Home from './pages/Home'
import Footer from './components/Footer'
import BookmarkPopup from './components/BookmarkPopup'
import { setSelectedCategory, setSearchQuery } from './redux/slices/uiSlice'

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
  const dispatch = useDispatch()
  const selectedCategory = useSelector(state => state.ui.selectedCategory)
  const searchQuery = useSelector(state => state.ui.searchQuery)

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <NavBar selectedCategory={selectedCategory} onSelectCategory={(cat) => dispatch(setSelectedCategory(cat))} />
      <Container sx={{ mt: 4, mb: 6 }}>
        <Home selectedCategory={selectedCategory} searchQuery={searchQuery} onSearchChange={(query) => dispatch(setSearchQuery(query))} />
      </Container>
      <Footer />
      <BookmarkPopup />
    </ThemeProvider>
  )
}
