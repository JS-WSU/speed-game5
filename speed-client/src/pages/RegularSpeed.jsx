import { Navigate, useNavigate } from "react-router-dom";
import GameField from "../components/GameField";
import { SpeedTypes, UserTypes } from "../utils/Constants.mjs";
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
    if (completed){
      return <>
        {
          JSON.parse(localStorage.getItem("gameInSession")).userType ===
          UserTypes.VIEWER ? (
            <Viewer game={game} socket={socket} quitGame={QuitGame} />
          ) : (
            <Player game={game} socket={socket} quitGame={QuitGame} />
          )
          // JSON.parse(localStorage.getItem("gameInSession")).userType ===
          //   UserTypes.PLAYER_ONE ? (
          //   <PlayerOneRegularRunning
          //     game={game}
          //     socket={socket}
          //     quitGame={QuitGame}
          //   />
          // ) : (
          //   <PlayerTwoRegularRunning
          //     game={game}
          //     socket={socket}
          //     quitGame={QuitGame}
          //   />
          // )
        }
      </>
    } else {
      return <div className="h-100 text-center">
        <div Style={"top:50%, left:50%"}>
          <div>Game starting in...</div>
          <span>{seconds}</span>
        </div>
      </div>
    }
  }

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
        timerIsGoing={timerIsGoing}
      >
        {game.gameState === GameStates.RUNNING ? (
          <>
            {timerIsGoing ? (
              <>
              <Countdown 
                date={Date.now() + 5000}
                precision={0}
                renderer={countdownRendered} 
                className=""
              >

              </Countdown>
              </>
            ) : (
              <>
                {
                  JSON.parse(localStorage.getItem("gameInSession")).userType ===
                  UserTypes.VIEWER ? (
                    <ViewerRegularRunning game={game} socket={socket} quitGame={QuitGame} />
                  ) : (
                    <Player game={game} socket={socket} quitGame={QuitGame} />
                  )
                  // JSON.parse(localStorage.getItem("gameInSession")).userType ===
                  //   UserTypes.PLAYER_ONE ? (
                  //   <PlayerOneRegularRunning
                  //     game={game}
                  //     socket={socket}
                  //     quitGame={QuitGame}
                  //   />
                  // ) : (
                  //   <PlayerTwoRegularRunning
                  //     game={game}
                  //     socket={socket}
                  //     quitGame={QuitGame}
                  //   />
                  // )
                }
              </>
            )}
          </>
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
