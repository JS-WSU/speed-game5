import React from "react";
import { Link } from "react-router-dom";

export default function Error() {
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
