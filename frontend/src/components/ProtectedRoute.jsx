import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";

function ProtectedRoute() {
  const { user } = useContext(AuthContext);
  if (user) {
    return <Outlet />;
  }
  
  return <Navigate to="/login" replace />;
}

export default ProtectedRoute;
