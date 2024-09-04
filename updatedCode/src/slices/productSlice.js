import { createSlice } from '@reduxjs/toolkit';

const productSlice = createSlice({
  name: 'products',
  initialState: { 
    items: [],
    filteredItems: [],
  },
  reducers: {
    setProducts(state, action) {
      state.items = action.payload;
      state.filteredItems = action.payload;
    },
    addProduct(state, action) {
      state.items.push(action.payload);
    },
    updateProduct(state, action) {
      const index = state.items.findIndex(product => product.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    removeProduct(state, action) {
      state.items = state.items.filter(product => product.id !== action.payload);
    },
    filterProducts(state, action) {
      const searchTerm = action.payload.toLowerCase();
      state.filteredItems = state.items.filter(product =>
        product.name.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm)
      );
    },
  },
});

export const { setProducts, addProduct, updateProduct, removeProduct , filterProducts } = productSlice.actions;
export default productSlice.reducer;
