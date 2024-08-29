// src/api/categoryAPI.js

const BASE_URL = 'https://myproductstore-62d1e-default-rtdb.firebaseio.com/categories.json';

// Get all categories
export const getCategories = async () => {
  const response = await fetch(BASE_URL);
  const data = await response.json();
  return data;
};

// Add a new category
export const addCategory = async (category) => {
  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(category)
  });
  return response.json();
};

// Update an existing category
export const updateCategory = async (id, category) => {
  const response = await fetch(`${BASE_URL}/${id}.json`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(category)
  });
  return response.json();
};

// Delete a category
export const deleteCategory = async (id) => {
  const response = await fetch(`${BASE_URL}/${id}.json`, {
    method: 'DELETE'
  });
  return response.json();
};
