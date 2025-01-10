import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const isAuthenticated = !!token;
  return isAuthenticated ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
