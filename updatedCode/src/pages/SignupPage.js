import React from "react";
import { signUp } from "../api/authAPI";

const SignupPage = () => {
  const handleSignUp = async () => {
    const email = "user@example.com";
    const password = "password";
    await signUp(email, password);
  };

  return (
    <div>
      <h1>Sign Up</h1>
      <button onClick={handleSignUp}>Sign Up</button>
    </div>
  );
};

export default SignupPage;
