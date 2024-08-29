// src/api/productAPI.js

const BASE_URL = 'https://myproductstore-62d1e-default-rtdb.firebaseio.com/products.json';

// Get all products
export const getProducts = async () => {
  const response = await fetch(BASE_URL);
  const data = await response.json();
  return data;
};

// Add a new product
export const addProduct = async (product) => {
  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(product)
  });
  return response.json();
};

// Update an existing product
export const updateProduct = async (id, product) => {
  const response = await fetch(`${BASE_URL}/${id}.json`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(product)
  });
  return response.json();
};

// Delete a product
export const deleteProduct = async (id) => {
  const response = await fetch(`${BASE_URL}/${id}.json`, {
    method: 'DELETE'
  });
  return response.json();
};
