import { Navigate } from "react-router-dom";
import GameField from "../components/GameField";
import { SpeedTypes } from "../utils/Constants.mjs";
import { useState } from "react";

function CaliforniaSpeed({ socket }) {
  const [game, setGame] = useState({});

  if (localStorage.getItem("gameInSession")) {
    return JSON.parse(localStorage.getItem("gameInSession")).speedType ===
      SpeedTypes.REGULAR ? (
      <Navigate to="/regular-speed" replace />
    ) : (
      <GameField socket={socket} game={game} setGame={setGame}>
        This is California Speed
      </GameField>
    );
  }
}

export default CaliforniaSpeed;
