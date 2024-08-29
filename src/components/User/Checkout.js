// src/components/User/Checkout.js

import React from 'react';
import { useSelector } from 'react-redux';

const Checkout = () => {
  const cartItems = useSelector((state) => state.cart.items);

  const handlePlaceOrder = () => {
    // Handle placing the order
  };

  return (
    <div>
      <h2>Checkout</h2>
      <ul>
        {cartItems.map(item => (
          <li key={item.id}>
            <img src={item.image} alt={item.name} />
            <h3>{item.name}</h3>
            <p>${item.price}</p>
            <p>Quantity: {item.quantity}</p>
          </li>
        ))}
      </ul>
      <button onClick={handlePlaceOrder}>Place Order</button>
    </div>
  );
};

export default Checkout;
