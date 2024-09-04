const BASE_URL = `https://myproductstore-62d1e-default-rtdb.firebaseio.com/users`;

export const getUserData = async (userId) => {
  try {
    const response = await fetch(`${BASE_URL}/${userId}.json`);
    if (!response.ok) {
      throw new Error("Failed to fetch user data.");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const saveUserData = async (userId, userData) => {
  try {
    const response = await fetch(`${BASE_URL}/${userId}.json`, {
      method: "PUT",
      body: JSON.stringify(userData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to save user data.");
    }
  } catch (error) {
    console.log(error);
  }
};
