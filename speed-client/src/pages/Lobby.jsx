import React from "react";

export default function Lobby({ userSession}) {
  return (
    <main className="container">
      <h1> This is the lobby</h1>
      <div>
        User: {userSession && userSession.username}
      </div>
    </main>
  );
}
