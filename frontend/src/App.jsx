import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Customize from "./pages/Customize";
import Home from "./pages/Home"; // ✅ your actual home page
import { userDataContext } from "./context/UserContext";
import Customize2 from "./pages/Customize2";

function App() {
  const { userData, loading } = useContext(userDataContext);

  if (loading) return <div>Loading...</div>;
  // console.log("App render:", userData);


  return (
    <Routes>
      <Route
        path="/"
        element={(userData?.assistantImage || userData?.assistantName) ? <Home /> : <Navigate to="/customize" />}
      />
      <Route
        path="/signup"
        element={userData ? <Navigate to="/" /> : <Signup />}
      />
      <Route
        path="/signin"
        element={userData ? <Navigate to="/" /> : <Signin />}
      />
      <Route
        path="/customize"
        element={userData ? <Customize /> : <Navigate to="/signup" />}
      />
      <Route
        path="/customize2"
        element={userData ? <Customize2 /> : <Navigate to="/signup" />}
      />
    </Routes>
  );
}

export default App;
