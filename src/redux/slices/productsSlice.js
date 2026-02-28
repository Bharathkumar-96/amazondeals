import { createSlice } from '@reduxjs/toolkit';
import initialProducts from '../../data/products';

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: initialProducts,
    loading: false,
    error: null,
  },
  reducers: {
    setProducts: (state, action) => {
      state.items = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    updateProduct: (state, action) => {
      const index = state.items.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
  },
});

export const { setProducts, setLoading, setError, updateProduct } = productsSlice.actions;
export default productsSlice.reducer;
