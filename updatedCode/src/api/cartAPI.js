const BASE_URL = "https://myproductstore-62d1e-default-rtdb.firebaseio.com";
const getUserId = () => localStorage.getItem("userId");

export const fetchCartItems = async () => {
    const userId = getUserId();
    if (!userId) throw new Error("User ID not found.");
    
    const response = await fetch(`${BASE_URL}/carts/${userId}.json`);
    return response.json();
  };
  
  export const saveCartItems = async (cartItems) => {
    const userId = getUserId();
    if (!userId) {
      alert("PLease Login First")
      window.location.href = "/user";
    }
    
    const response = await fetch(`${BASE_URL}/carts/${userId}.json`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cartItems),
    });
    return response.json();
  };

  // export const deleteCartItems = async (cartItems) => {
  //   const userId = getUserId();
  //   const response = await fetch(`${BASE_URL}/carts/${userId}.json`, {
  //     method: "DELETE",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(cartItems),
  //   });
  //   console.log("yes , this is delete cart item ");
  //   return response.json();
    
  // };


  