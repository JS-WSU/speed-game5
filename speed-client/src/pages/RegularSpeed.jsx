import { Navigate, useNavigate } from "react-router-dom";
import GameField from "../components/GameField";
import { SpeedTypes, UserTypes } from "../utils/Constants.mjs";
import { useEffect, useState } from "react";
import ViewerRegularRunning from "../components/Screens/Running/Regular/ViewerRegularRunning";
import PlayerRegularRunning from "../components/Screens/Running/Regular/PlayerRegularRunning";

function RegularSpeed({ socket }) {
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

  useEffect(() => {}, [socket]);

  if (localStorage.getItem("gameInSession")) {
    return JSON.parse(localStorage.getItem("gameInSession")).speedType ===
      SpeedTypes.REGULAR ? (
      <GameField
        socket={socket}
        game={game}
        setGame={setGame}
        quitGame={QuitGame}
      >
        {JSON.parse(localStorage.getItem("gameInSession")).userType ===
        UserTypes.VIEWER ? (
          <ViewerRegularRunning
            game={game}
            socket={socket}
            quitGame={QuitGame}
          />
        ) : (
          <PlayerRegularRunning
            game={game}
            socket={socket}
            quitGame={QuitGame}
          />
        )}
      </GameField>
    ) : (
      <Navigate to="/california-speed" replace />
    );
  }
}

export default RegularSpeed;
