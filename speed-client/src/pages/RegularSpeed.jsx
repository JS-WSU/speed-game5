import { Navigate } from "react-router-dom";
import Game from "../components/GameField";
import { SpeedTypes } from "../utils/Constants.mjs";
import { useEffect, useState } from "react";

function RegularSpeed({ socket }) {
  const [game, setGame] = useState({});

  useEffect(() => {
    const Test = (message) => {
      console.log(message);
    };
    socket.on("test", Test);

    return () => Test;
  }, [socket]);

  if (localStorage.getItem("gameInSession")) {
    return JSON.parse(localStorage.getItem("gameInSession")).speedType ===
      SpeedTypes.REGULAR ? (
      <Game socket={socket} game={game} setGame={setGame}>
        This is Regular Speed
      </Game>
    ) : (
      <Navigate to="/california-speed" replace />
    );
  }
}

export default RegularSpeed;
