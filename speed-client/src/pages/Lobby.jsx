import React from "react";
import Chat from "../components/Chat";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function Lobby() {
  return (
    <div className="d-flex h-100">
      <main className="container">
        This is the lobby
        {JSON.parse(localStorage.getItem("userSession")) &&
          JSON.parse(localStorage.getItem("userSession")).username}
      </main>
      <Chat></Chat>
    </div>
  );
}
