// src/store/store.js

import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../slices/authSlice';
import productReducer from '../slices/productSlice';
import categoryReducer from '../slices/categorySlice';
import orderReducer from '../slices/orderSlice';
import cartReducer from '../slices/cartSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
    categories: categoryReducer,
    orders: orderReducer,
    cart: cartReducer,
  },
});

export default store;
