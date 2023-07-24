import { Navigate } from "react-router-dom";
import { io } from "socket.io-client";
import Game from "../components/Game";
import { SpeedTypes } from "../utils/Constants.mjs";

function RegularSpeed({ socket }) {
  if (localStorage.getItem("gameInSession")) {
    return JSON.parse(localStorage.getItem("gameInSession")).speedType ===
      SpeedTypes.REGULAR ? (
      <Game socket={socket}>This is Regular Speed</Game>
    ) : (
      <Navigate to="/california-speed" replace />
    );
  }
}

export default RegularSpeed;
