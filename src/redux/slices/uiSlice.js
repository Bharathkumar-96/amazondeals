import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    searchQuery: '',
    selectedCategory: 'All',
    showBookmarkPopup: false,
    theme: 'light',
  },
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    setShowBookmarkPopup: (state, action) => {
      state.showBookmarkPopup = action.payload;
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
    resetUI: (state) => {
      state.searchQuery = '';
      state.selectedCategory = 'All';
      state.showBookmarkPopup = false;
    },
  },
});

export const { setSearchQuery, setSelectedCategory, setShowBookmarkPopup, setTheme, resetUI } = uiSlice.actions;
export default uiSlice.reducer;
