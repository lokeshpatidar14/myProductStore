import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.css";
import { setAdmin } from "../../slices/authSlice";
import { useDispatch } from "react-redux";
// import { logOut } from "../../slices/authSlice"; 

const AdminLogin = () => {
  const [email, setEmail] = useState("lokesh@patidar.com");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}signInWithPassword?key=${process.env.REACT_APP_API_KEY}`,
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      );

      const { idToken } = response.data;
      if (response.idToken) {
        dispatch(setAdmin({ adminToken: idToken }));
      }
      // dispatch(logOut());
      localStorage.setItem("adminToken", idToken);
      localStorage.removeItem("token");
     

      navigate("/admin-products");
    } catch (error) {
      console.error(
        "Login failed:",
        error.response ? error.response.data : error.message
      );
      setError("Invalid password. Please try again.");
    }
  };

  const handleHomePage = () => {
    navigate("/user");
  };

  return (
    <div className="login-page-container">
      <div className="login-card">
        <h3>Admin Login</h3>
        <form className="login-form" onSubmit={handleLogin}>
          <div className="password-container">
            <input
              type="email"
              placeholder="Enter your Email"
              value={email}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              className="eye-icon"
              onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? "👁️" : "👁️‍🗨️"}
            </span>
          </div>
          {error && <div className="error-message">{error}</div>}
          <button type="submit" className="login-button">
            Login
          </button>
          <br />
          <button
            type="submit"
            className="go-back-button"
            onClick={handleHomePage}>
            Go back
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
