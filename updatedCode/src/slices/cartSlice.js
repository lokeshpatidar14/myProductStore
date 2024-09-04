import { createSlice } from "@reduxjs/toolkit";
import { saveCartItems } from "../api/cartAPI";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    setCartItems(state, action) {
      state.items = action.payload;
      console.log("Cart items set:", state.items);
      saveCartItems(state.items);
    },
    addToCart(state, action) {
      const item = state.items.find((i) => i.id === action.payload.id);
      if (item) {
        item.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      saveCartItems(state.items);
    },
    removeFromCart(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload);
      // deleteCartItems(state.items)
      saveCartItems(state.items);
    },
    updateQuantity(state, action) {
      const { id, quantity } = action.payload;
      const item = state.items.find((i) => i.id === id);
      if (item) {
        item.quantity = quantity;
        saveCartItems(state.items);
      }
    },
  },
});

export const { setCartItems, addToCart, removeFromCart, updateQuantity } =
  cartSlice.actions;
export default cartSlice.reducer;
