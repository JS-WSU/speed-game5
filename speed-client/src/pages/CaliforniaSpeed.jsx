import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import Game from "../components/Game";

const socket = io.connect("http://localhost:4000/california_speed", {
  autoConnect: false,
});
function CaliforniaSpeed() {

  


  return <Game socket={socket}>This is California Speed</Game>;
}

export default CaliforniaSpeed;
