import { Navigate, Outlet } from "react-router-dom";

export default function InGameProtectedRoute() {
  return !localStorage.getItem("gameInSession") ? (
    <Navigate to="/lobby" replace />
  ) : (
    <Outlet />
  );
}
