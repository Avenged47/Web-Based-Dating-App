import { Route, Routes } from "react-router-dom";
import Homepage from "../pages/Homepage";
import About from "../pages/About";
import UserDashboard from "../pages/UserDashboard";

function AppRoutes() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/Home" element={<Homepage />} />
        <Route path="/About" element={<About />} />
        <Route path="/Dashboard" element={<UserDashboard />} />
      </Routes>
    </div>
  );
}

export default AppRoutes;
