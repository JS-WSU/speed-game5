import { Navigate } from "react-router-dom";
import { io } from "socket.io-client";
import Game from "../components/Game";
import { SpeedTypes } from "../utils/Constants.mjs";

const socket = io.connect("http://localhost:4000/regular_speed", {
  autoConnect: false,
});
function RegularSpeed() {
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
