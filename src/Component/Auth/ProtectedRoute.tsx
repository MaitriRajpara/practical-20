// src/Component/Auth/ProtectedRoute.tsx
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getUser } from "../../Utils/Storage";

const ProtectedRoute: React.FC = () => {
  const user = getUser();
  console.log("ProtectedRoute user:", user);
  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
