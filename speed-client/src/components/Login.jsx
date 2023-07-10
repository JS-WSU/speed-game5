import React from "react";
import { Navigate } from "react-router-dom";

export default function Login({ userSession }) {
  return userSession ? <Navigate to="/lobby"></Navigate> : <div>Register</div>;
}
