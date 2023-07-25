import { Navigate } from "react-router-dom";
import GameField from "../components/GameField";
import { GameStates, SpeedTypes, UserTypes } from "../utils/Constants.mjs";
import { useState } from "react";

function CaliforniaSpeed({ socket }) {
  const [game, setGame] = useState({});

  if (localStorage.getItem("gameInSession")) {
    return JSON.parse(localStorage.getItem("gameInSession")).speedType ===
      SpeedTypes.REGULAR ? (
      <Navigate to="/regular-speed" replace />
    ) : (
      <GameField socket={socket} game={game} setGame={setGame}>
        {game.gameState === GameStates.RUNNING && (
          <div>
            {JSON.parse(localStorage.getItem("gameInSession")).userType ===
            UserTypes.VIEWER ? (
              <div style={{ pointerEvents: "none" }}>
                <div>
                  <div>Opponent: {game.playerOne.name}</div>
                  <div>{game.playerTwo.name}</div>
                </div>
              </div>
            ) : JSON.parse(localStorage.getItem("gameInSession")).userType ===
              UserTypes.PLAYER_ONE ? (
              <div>
                <div>Opponent: {game.playerOne.name}</div>
                <div>{game.playerTwo.name}</div>
              </div>
            ) : (
              <div>
                <div>Opponent: {game.playerTwo.name}</div>
                <div>{game.playerOne.name}</div>
              </div>
            )}
          </div>
        )}
      </GameField>
    );
  }
}

export default CaliforniaSpeed;
