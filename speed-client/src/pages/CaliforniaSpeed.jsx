import { Navigate, useNavigate } from "react-router-dom";
import GameField from "../components/GameField";
import { GameStates, SpeedTypes, UserTypes } from "../utils/Constants.mjs";
import { useState } from "react";
import Viewer from "../components/Screens/Running/California/Viewer";
import Player from "../components/Screens/Running/California/Player";

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
              <Viewer
                game={game}
                socket={socket}
                quitGame={QuitGame}
              />
            ) : (
              <Player
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
