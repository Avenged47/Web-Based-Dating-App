import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const isTokenExpired = (token) => {
  if (!token) return true;
  const decodedToken = JSON.parse(atob(token.split(".")[1]));
  const currentTime = Math.floor(Date.now() / 1000);
  return decodedToken.exp < currentTime;
};

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    // console.log("Token retrieved on reload:", token);

    if (token && !isTokenExpired(token)) {
      setIsAuthenticated(true);
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      setUser(decodedToken);
    } else {
      setIsAuthenticated(false);
      setUser(null);
    }

    setLoading(false);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  const login = (token) => {
    localStorage.setItem("token", token);

    const decodedToken = JSON.parse(atob(token.split(".")[1]));
    setUser(decodedToken);
    setIsAuthenticated(true);

    // console.log("Token set, user authenticated:", {
    //   token,
    //   decodedToken,
    //   isAuthenticated: true,
    // });

    setTimeout(() => {
      navigate("/Dashboard");
    }, 0);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, loading, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
