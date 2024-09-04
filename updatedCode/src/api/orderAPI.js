const BASE_URL =
  "https://myproductstore-62d1e-default-rtdb.firebaseio.com/orders";
export const getOrdersForUser = async () => {
  const userId = localStorage.getItem("userId");
  const response = await fetch(`${BASE_URL}/${userId}.json`);
  const data = await response.json();
  console.log("Fetched orders for user:", data);

  if (data === null || data === undefined) return [];
  return Object.keys(data).map((key) => ({
    id: key,
    ...data[key],
  }));
};

export const getOrdersForAdmin = async () => {
  const response = await fetch(`${BASE_URL}.json`);
  const data = await response.json();
  if (!data) return [];
  return Object.keys(data).flatMap((userId) =>
    Object.keys(data[userId]).map((orderId) => ({
      id: orderId,
      ...data[userId][orderId],
    }))
  );
};

export const placeOrder = async (order) => {
  const userId = localStorage.getItem("userId");
  const response = await fetch(`${BASE_URL}/${userId}.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(order),
  });
  if (!response.ok) throw new Error("Network response was not ok");
  return response.json();
};

export const updateOrder = async (orderId, updates) => {
  const userId = localStorage.getItem("userId");
  const response = await fetch(`${BASE_URL}/${userId}/${orderId}.json`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updates),
  });
  if (!response.ok) throw new Error("Network response was not ok");
  return response.json();
};

export const deleteOrder = async (orderId) => {
  const userId = localStorage.getItem("userId");
  const response = await fetch(`${BASE_URL}/${userId}/${orderId}.json`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Network response was not ok");
  return response.json();
};
