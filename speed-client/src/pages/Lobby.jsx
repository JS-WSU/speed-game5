import React from "react";

export default function Lobby() {
  return (
    <main className="container">
      <h1> This is the lobby</h1>
      <div>
        User: {JSON.parse(localStorage.getItem("userSession")).username}
      </div>
    </main>
  );
}
