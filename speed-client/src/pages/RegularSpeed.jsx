import { Navigate, useNavigate } from "react-router-dom";
import GameField from "../components/GameField";
import { GameStates, SpeedTypes, UserTypes } from "../utils/Constants.mjs";
import { useEffect, useState } from "react";
import ViewerRegularRunning from "../components/Screens/Running/Regular/ViewerRegularRunning";
import PlayerRegularRunning from "../components/Screens/Running/Regular/PlayerRegularRunning";
import Countdown from "react-countdown";

function RegularSpeed({ socket }) {
  const [game, setGame] = useState({});
  const [timerIsGoing, setTimerIsGoing] = useState(false);

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

  const countdownRendered = ({ seconds, completed }) => {
    if (completed) {
      setTimerIsGoing(false);
    }
    return (
      <div className="text-center m-auto text-black bg-light p-3">
        <div>Game starting in...</div>
        <span>{seconds}</span>
      </div>
    );
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
        setTimerIsGoing={setTimerIsGoing}
      >
        {timerIsGoing ? (
          <Countdown
            date={Date.now() + 3000}
            precision={0}
            renderer={countdownRendered}
          ></Countdown>
        ) : (
          <>
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
          </>
        )}
      </GameField>
    ) : (
      <Navigate to="/california-speed" replace />
    );
  }
}

export default RegularSpeed;
