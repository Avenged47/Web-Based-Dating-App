import { Router } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return <AppRoutes />;
}

export default App;
