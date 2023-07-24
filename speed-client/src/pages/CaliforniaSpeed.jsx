import { Navigate } from "react-router-dom";
import { io } from "socket.io-client";
import Game from "../components/Game";
import { SpeedTypes } from "../utils/Constants.mjs";

function CaliforniaSpeed({socket}) {
  if (localStorage.getItem("gameInSession")) {
    return JSON.parse(localStorage.getItem("gameInSession")).speedType ===
      SpeedTypes.REGULAR ? (
      <Navigate to="/regular-speed" replace />
    ) : (
      <Game socket={socket}>This is California Speed</Game>
    );
  }
}

export default CaliforniaSpeed;
