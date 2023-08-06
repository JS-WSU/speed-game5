import { Navigate, useNavigate } from "react-router-dom";
import GameField from "../components/GameField";
import { SpeedTypes, UserTypes } from "../utils/Constants.mjs";
import { useEffect, useState } from "react";
import ViewerCaliforniaRunning from "../components/Screens/Running/California/ViewerCaliforniaRunning";
import PlayerCaliforniaRunning from "../components/Screens/Running/California/PlayerCaliforniaRunning";

function CaliforniaSpeed({ socket }) {
  const [game, setGame] = useState({});
  const [noSameValueCards, setNoSameValueCards] = useState(false);

  const navigate = useNavigate();

  const SpeedWinner = () => {
    console.log("You won!");
    socket.emit(
      "winner",
      game.hostName,
      JSON.parse(localStorage.getItem("gameInSession")).userType,
      SpeedTypes.CALIFORNIA
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

  useEffect(() => {
    const NoSameValueCards = (game) => {
      setNoSameValueCards(true);
      setTimeout(() => {
        setGame(game);
        setNoSameValueCards(false);
      }, 2000);
    };

    socket.on("no_same_value_cards", NoSameValueCards);

    return () => socket.off("no_same_value_cards", NoSameValueCards);
  }, [socket]);

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
            quitGame={QuitGame}
            noSameValueCards={noSameValueCards}
          />
        ) : (
          <PlayerCaliforniaRunning
            game={game}
            socket={socket}
            quitGame={QuitGame}
            speedWinner={SpeedWinner}
            noSameValueCards={noSameValueCards}
          />
        )}
      </GameField>
    );
  }
}

export default CaliforniaSpeed;
