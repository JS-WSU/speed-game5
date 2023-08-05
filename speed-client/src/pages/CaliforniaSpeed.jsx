import { Navigate, useNavigate } from "react-router-dom";
import GameField from "../components/GameField";
import { SpeedTypes, UserTypes } from "../utils/Constants.mjs";
import { useState } from "react";
import ViewerCaliforniaRunning from "../components/Screens/Running/California/ViewerCaliforniaRunning";
import PlayerCaliforniaRunning from "../components/Screens/Running/California/PlayerCaliforniaRunning";

function CaliforniaSpeed({ socket }) {
  const [game, setGame] = useState({});

  const navigate = useNavigate();

  const SpeedWinner = () => {
    console.log("You won!");
    socket.emit(
      "winner",
      game.hostName,
      JSON.parse(localStorage.getItem("gameInSession")).userType
    );
  };

  const QuitGame = () => {
    socket.emit(
      "quit_game",
      JSON.parse(localStorage.getItem("gameInSession")).hostName,
      JSON.parse(localStorage.getItem("gameInSession")).userType,
      localStorage.getItem("userSession"),
      SpeedTypes.CALIFORNIA
    );
    localStorage.removeItem("gameInSession");
    navigate("/lobby");
  };

  if (localStorage.getItem("gameInSession")) {
    return JSON.parse(localStorage.getItem("gameInSession")).speedType ===
      SpeedTypes.REGULAR ? (
      <Navigate to="/regular-speed" replace />
    ) : (
      <GameField
        socket={socket}
        game={game}
        setGame={setGame}
        quitGame={QuitGame}
      >
        {JSON.parse(localStorage.getItem("gameInSession")).userType ===
        UserTypes.VIEWER ? (
          <ViewerCaliforniaRunning
            game={game}
            socket={socket}
            quitGame={QuitGame}
          />
        ) : (
          <PlayerCaliforniaRunning
            game={game}
            socket={socket}
            quitGame={QuitGame}
            speedWinner={SpeedWinner}
          />
        )}
      </GameField>
    );
  }
}

export default CaliforniaSpeed;
