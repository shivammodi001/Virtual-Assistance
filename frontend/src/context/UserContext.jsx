import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

export const userDataContext = createContext();

function UserContext({ children }) {
  const serverUrl = "https://virtual-assistance-backend-swhd.onrender.com"; // backend URL
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [frontendImage, setFrontendImage] = useState(null);
  const [backendImage, setBackendImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  // Fetch current user from backend
  const handleCurrentUser = async () => {
    try {
      const res = await axios.get(`${serverUrl}/api/user/current`, {
        withCredentials: true, // ✅ send cookies
      });

      // console.log("Current user:", res.data); // debugging
      setUserData(res.data);
    } catch (error) {
      console.error(
        "Error fetching current user:",
        error.response?.data || error.message
      );
      setUserData(null);
    } finally {
      setLoading(false);
    }
  };

  const getGeminiResponse = async (command) => {
    try {
      const res = await axios.post(`${serverUrl}/api/user/asktoassistant`, { command }, {
        withCredentials: true, // ✅ send cookies
      });
      return res.data;
    } catch (error) {
      console.error(
        "Error fetching Gemini response:",
        error.response?.data || error.message
      );
    }
  }

  // Fetch once when context mounts
  useEffect(() => {
    handleCurrentUser();
  }, []);

  const value = {
    serverUrl,
    userData,
    setUserData,
    frontendImage,
    setFrontendImage,
    backendImage,
    setBackendImage,
    selectedImage,
    setSelectedImage,
    getGeminiResponse,
    
  };

  return (
    <userDataContext.Provider value={value}>
      {children}
    </userDataContext.Provider>
  );
}

export default UserContext;
