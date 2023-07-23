import React from "react";
import { Link, Navigate } from "react-router-dom";
import { SpeedTypes } from "../utils/Constants.mjs";

export default function Error() {
  if (localStorage.getItem("gameInSession")) {
    return JSON.parse(localStorage.getItem("gameInSession")).speedType ===
      SpeedTypes.REGULAR ? (
      <Navigate to="/regular-speed" replace />
    ) : (
      <Navigate to="/california-speed" replace />
    );
  }

  return (
    <main className="container text-danger text-center">
      <div className="m-auto">
        <h1>Uh oh, you should not be here!</h1>
        <Link to="/" className="btn btn-primary mx-auto border border-3">
          Go to Home
        </Link>
      </div>
    </main>
  );
}
