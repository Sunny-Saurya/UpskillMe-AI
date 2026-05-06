import React, { createContext, useState, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch user on initial load if token exists
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      setLoading(false);
      return;
    }

    const fetchUser = async () => {
      try {
        const response = await axiosInstance.get(API_PATHS.AUTH.GET_PROFILE);
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
        clearUser(); // ✅ Clear user if token is invalid or expired
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  // ✅ Call this on successful login
  const updateUser = (userData) => {
    setUser(userData);
    localStorage.setItem("accessToken", userData.token); // Keep key consistent
    setLoading(false);
  };

  // ✅ Call this on logout
  const clearUser = () => {
    setUser(null);
    localStorage.removeItem("accessToken");
    setLoading(false);
  };

  return (
    <UserContext.Provider value={{ user, loading, updateUser, clearUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
