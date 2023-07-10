import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute({ userSession }) {
  return !userSession ? <Navigate to="/" replace /> : <Outlet />;
}
