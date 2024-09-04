// src/pages/ProfilePage.js

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../slices/authSlice";
import { getUserData} from "../api/userApi"
import UserProfile from "../components/User/UserProfile";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchUserData = async () => {
      if (userId) {
        const userData = await getUserData(userId);
        if (userData) {
          dispatch(updateUser(userData));
        }
      }
    };

    fetchUserData();
  }, [dispatch, userId]);

  return (
    <div>
      <UserProfile />
    </div>
  );
};

export default ProfilePage;
