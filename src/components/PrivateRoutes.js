import React from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const PrivateRoutes = ({ permittedRoles, children }) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" />;
  }
  if (!permittedRoles.include(user.role)) {
    return <Navigate to="/unauthorized" />;
  }
  return children;
};

export default PrivateRoutes;
