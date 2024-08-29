// src/slices/orderSlice.js

import { createSlice } from '@reduxjs/toolkit';

const orderSlice = createSlice({
  name: 'orders',
  initialState: {
    items: [],
  },
  reducers: {
    setOrders(state, action) {
      state.items = action.payload;
    },
    addOrder(state, action) {
      state.items.push(action.payload);
    },
    updateOrder(state, action) {
      const index = state.items.findIndex(order => order.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    removeOrder(state, action) {
      state.items = state.items.filter(order => order.id !== action.payload);
    },
  },
});

export const { setOrders, addOrder, updateOrder, removeOrder } = orderSlice.actions;
export default orderSlice.reducer;
