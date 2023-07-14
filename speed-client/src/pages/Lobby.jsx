import React from "react";

export default function Lobby() {
  return (
    <main className="container">
      This is the lobby
      {JSON.parse(localStorage.getItem("userSession")).username}
    </main>
  );
}
