const BASE_URL =
  "https://myproductstore-62d1e-default-rtdb.firebaseio.com/categories.json";

export const getCategories = async () => {
  const response = await fetch(BASE_URL);
  const data = await response.json();
  return data;
};

export const addCategory = async (category) => {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(category),
  });
  return response.json();
};

export const updateCategory = async (id, category) => {
  const response = await fetch(`${BASE_URL}/${id}.json`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(category),
  });
  return response.json();
};

export const deleteCategory = async (id) => {
  const response = await fetch(`${BASE_URL}/${id}.json`, {
    method: "DELETE",
  });
  return response.json();
};
