import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './slices/productsSlice';
import bookmarksReducer from './slices/bookmarksSlice';
import uiReducer from './slices/uiSlice';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    bookmarks: bookmarksReducer,
    ui: uiReducer,
  },
});

export default store;
