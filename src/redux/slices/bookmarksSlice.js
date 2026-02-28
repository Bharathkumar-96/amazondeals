import { createSlice } from '@reduxjs/toolkit';

const bookmarksSlice = createSlice({
  name: 'bookmarks',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    addBookmark: (state, action) => {
      const exists = state.items.find(item => item.id === action.payload.id);
      if (!exists) {
        state.items.push(action.payload);
        localStorage.setItem('bookmarks', JSON.stringify(state.items));
      }
    },
    removeBookmark: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      localStorage.setItem('bookmarks', JSON.stringify(state.items));
    },
    loadBookmarks: (state, action) => {
      state.items = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { addBookmark, removeBookmark, loadBookmarks, setLoading, setError } = bookmarksSlice.actions;
export default bookmarksSlice.reducer;
