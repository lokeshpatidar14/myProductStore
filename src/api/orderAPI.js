// src/api/orderAPI.js

const BASE_URL = 'https://myproductstore-62d1e-default-rtdb.firebaseio.com/orders.json';

// Get all orders
export const getOrders = async () => {
  const response = await fetch(BASE_URL);
  const data = await response.json();
  return data;
};

// Place a new order
export const placeOrder = async (order) => {
  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(order)
  });
  return response.json();
};

// Update an existing order
export const updateOrder = async (id, order) => {
  const response = await fetch(`${BASE_URL}/${id}.json`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(order)
  });
  return response.json();
};

// Delete an order
export const deleteOrder = async (id) => {
  const response = await fetch(`${BASE_URL}/${id}.json`, {
    method: 'DELETE'
  });
  return response.json();
};
