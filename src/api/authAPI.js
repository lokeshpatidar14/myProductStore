const BASE_URL = "https://identitytoolkit.googleapis.com/v1/accounts:";

// API key
const API_KEY = "AIzaSyBd3ZuSzLvNLW-vFOqLr7DjLYWhrKCTA8k";

// Sign up
export const signUp = async (email, password) => {
  const response = await fetch(`${BASE_URL}signUp?key=${API_KEY}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
      returnSecureToken: true,
    }),
  });
  return response.json();
};

// Log in
export const logIn = async (email, password) => {
  const response = await fetch(`${BASE_URL}signInWithPassword?key=${API_KEY}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
      returnSecureToken: true,
    }),
  });
  return response.json();
};

// Reset password
export const resetPassword = async (email) => {
  const response = await fetch(`${BASE_URL}sendOobCode?key=${API_KEY}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      requestType: "PASSWORD_RESET",
      email,
    }),
  });
  return response.json();
};
