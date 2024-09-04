import React from "react";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();
  const handleUserLogin = (e) => {
    e.preventDefault();

    navigate("./user-login");
  };
  const handleAdminLogin = (e) => {
    e.preventDefault();

    navigate("./admin-login");
  };
  return (
    <>
      <span className="d-flex justify-content-center ">
        <button onClick={handleUserLogin}>User Login</button>
        <button onClick={handleAdminLogin}>Admin Login</button>

      </span>
    </>
  );
};

export default LoginForm;
