import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  return !localStorage.getItem("userSession") ? (
    <Navigate to="/login" replace />
  ) : (
    <Outlet />
  );
}
