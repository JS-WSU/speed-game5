import { Navigate, useNavigate } from "react-router-dom";
import GameField from "../components/GameField";
import { GameStates, SpeedTypes, UserTypes } from "../utils/Constants.mjs";
import { useState } from "react";
import ViewerCaliforniaRunning from "../components/Screens/Running/ViewerCaliforniaRunning";
import PlayerOneCaliforniaRunning from "../components/Screens/Running/PlayerOneCaliforniaRunning";
import PlayerTwoCaliforniaRunning from "../components/Screens/Running/PlayerTwoCaliforniaRunning";

function CaliforniaSpeed({ socket }) {
  const [game, setGame] = useState({});

  const navigate = useNavigate();

  const QuitGame = () => {
    socket.emit(
      "quit_game",
      JSON.parse(localStorage.getItem("gameInSession")).hostName,
      JSON.parse(localStorage.getItem("gameInSession")).userType,
      localStorage.getItem("userSession")
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
        {game.gameState === GameStates.RUNNING ? (
          <>
            {JSON.parse(localStorage.getItem("gameInSession")).userType ===
            UserTypes.VIEWER ? (
              <ViewerCaliforniaRunning
                game={game}
                socket={socket}
                quitGame={QuitGame}
              />
            ) : JSON.parse(localStorage.getItem("gameInSession")).userType ===
              UserTypes.PLAYER_ONE ? (
              <PlayerOneCaliforniaRunning
                game={game}
                socket={socket}
                quitGame={QuitGame}
              />
            ) : (
              <PlayerTwoCaliforniaRunning
                game={game}
                socket={socket}
                quitGame={QuitGame}
              />
            )}
          </>
        ) : (
          <div className="m-auto d-flex flex-column align-items-center text-light">
            <h1>Loading Game...</h1>
            <div className="spinner-border">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}
      </GameField>
    );
  }
}

export default CaliforniaSpeed;
