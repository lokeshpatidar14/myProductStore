const BASE_URL =
  "https://myproductstore-62d1e-default-rtdb.firebaseio.com/products.json";

export const getProducts = async () => {
  const response = await fetch(BASE_URL);
  const data = await response.json();
  return data;
};

export const addProduct = async (product) => {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });
  return response.json();
};

export const updateProduct = async (id, product) => {
  const response = await fetch(`${BASE_URL}/${id}.json`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });
  return response.json();
};

export const deleteProduct = async (id) => {
  const url = `https://myproductstore-62d1e-default-rtdb.firebaseio.com/products/${id}.json`;
  try {
    const response = await fetch(url, {
      method: "DELETE",
    });
    if (response.ok) {
      // console.log({id});
      return await response.json();
    } else {
      const errorData = await response.text();
      throw new Error(`Deletion failed: ${response.statusText}`);
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};
