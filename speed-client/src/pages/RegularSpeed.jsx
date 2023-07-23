import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import Game from "../components/Game";

const socket = io.connect("http://localhost:4000/regular_speed", {
  autoConnect: false,
});
function RegularSpeed() {
  return <Game socket={socket}>This is Regular Speed</Game>;
}

export default RegularSpeed;
