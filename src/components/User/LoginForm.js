// import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import { signInUser } from "../../slices/authSlice";

// const LoginForm = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const dispatch = useDispatch();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     dispatch(signInUser({ email, password }));
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input
//         type="email"
//         placeholder="Email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         required
//       />
//       <input
//         type="password"
//         placeholder="Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         required
//       />
//       <button type="submit">Login</button>
//     </form>
//   );
// };

// export default LoginForm;

// src/components/User/LoginForm.js

import React, { useState } from 'react';
import { logIn } from '../../api/authAPI';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await logIn(email, password);
    if (result.idToken) {
      // Handle successful login 
      alert("successfull")
    } else {
      // Handle login error
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Log In</h2>
      <label>
        Email:
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </label>
      <button type="submit">Log In</button>
    </form>
  );
};

export default LoginForm;
