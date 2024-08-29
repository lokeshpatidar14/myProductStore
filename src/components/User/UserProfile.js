// src/components/User/UserProfile.js

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateUser } from '../../slices/authSlice';

const UserProfile = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const dispatch = useDispatch();

  const handleSave = () => {
    dispatch(updateUser({ name, email, phone }));
  };

  return (
    <div>
      <h2>User Profile</h2>
      <label>
        Name:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <label>
        Email:
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <label>
        Phone:
        <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
      </label>
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default UserProfile;
