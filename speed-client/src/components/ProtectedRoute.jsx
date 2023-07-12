import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  const userSession = localStorage.getItem("userSession");

  return !userSession ? <Navigate to="/" replace /> : <Outlet />;
}
