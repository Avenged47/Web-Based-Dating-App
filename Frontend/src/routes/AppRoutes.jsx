import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Homepage from "../pages/Homepage";
import About from "../pages/About";
import UserDashboard from "../pages/UserDashboard";
import { AuthContext } from "../contexts/AuthContext";
import { useContext, useEffect, useState } from "react";

function AppRoutes() {
  const { isAuthenticated } = useContext(AuthContext);
  // console.log("isAuthenticated after login also", isAuthenticated);

  // const navigate = useNavigate();

  // useEffect(() => {
  //   console.log("isAuthenticated inside useEffect", isAuthenticated);
  //   if (isAuthenticated) {
  //     navigate("/Dashboard");
  //   } else {
  //     navigate("/");
  //   }
  // }, [isAuthenticated, navigate]);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/Home" element={<Homepage />} />
        <Route path="/About" element={<About />} />
        <Route
          path="/Dashboard"
          element={isAuthenticated ? <UserDashboard /> : <Navigate to="/" />}
        />
      </Routes>
    </div>
  );
}

export default AppRoutes;
