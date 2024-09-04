import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "orders",
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
      const { id, updates } = action.payload;
      const index = state.items.findIndex((order) => order.id === id);
      if (index !== -1) {
        state.items[index] = { ...state.items[index], ...updates };
      }
    },
    removeOrder(state, action) {
      const id = action.payload;
      state.items = state.items.filter((order) => order.id !== id);
    },
  },
});

export const { setOrders, addOrder, updateOrder, removeOrder } = orderSlice.actions;
export default orderSlice.reducer;
