import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GameStates, UserTypes } from "../utils/Constants.mjs";
import AlertContext from "../context/AlertContext";
import ViewerWaiting from "./Screens/Waiting/ViewerWaiting";
import PlayerOneWaiting from "./Screens/Waiting/PlayerOneWaiting";
import PlayerTwoWaiting from "./Screens/Waiting/PlayerTwoWaiting";
import ViewerEnd from "./Screens/End/ViewerEnd";
import PlayerOneEnd from "./Screens/End/PlayerOneEnd";
import PlayerTwoEnd from "./Screens/End/PlayerTwoEnd";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Countdown from "react-countdown";

export default function GameField({
  socket,
  children,
  game,
  setGame,
  quitGame,
}) {
  const alertContext = useContext(AlertContext);

  const navigate = useNavigate();

  const ReadyUp = () => {
    socket.emit(
      "ready_to_play",
      JSON.parse(localStorage.getItem("gameInSession")).hostName,
      JSON.parse(localStorage.getItem("gameInSession")).userType,
      localStorage.getItem("userSession")
    );
  };

  useEffect(() => {
    setTimeout(() => {
      if (localStorage.getItem("gameInSession")) {
        socket.emit(
          "join_game",
          JSON.parse(localStorage.getItem("gameInSession")).hostName,
          JSON.parse(localStorage.getItem("gameInSession")).userType,
          localStorage.getItem("userSession")
        );
      }
    }, 3000);

    const GetGameStatus = (game) => {
      console.log(game);
      if (!game.gameState) {
        localStorage.removeItem("gameInSession");
        navigate("/lobby");
      }
      setGame(game);
    };

    const GameStarted = (game) => {
      setTimerIsGoing(true);
      setGame(game);
    };

    const LeftGame = (game, userType, username) => {
      if (userType !== UserTypes.VIEWER) {
        alertContext.error(`Player ${username} has left!`);
        quitGame();
      }
      setGame(game);
    };

    socket.on("game_status", GetGameStatus);
    socket.on("left_game", LeftGame);
    socket.on("game_started", GameStarted);

    return () => {
      socket.off("game_status", GetGameStatus);
      socket.off("left_game", LeftGame);
      socket.off("game_status", GetGameStatus);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  const [timerIsGoing, setTimerIsGoing] = useState(false);
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

  return (
    <main className="bg-success container-fluid p-3">
      {game.gameState === GameStates.WAITING ? (
        JSON.parse(localStorage.getItem("gameInSession")).userType ===
        UserTypes.VIEWER ? (
          <ViewerWaiting game={game} quitGame={quitGame} socket={socket} />
        ) : JSON.parse(localStorage.getItem("gameInSession")).userType ===
          UserTypes.PLAYER_ONE ? (
          <PlayerOneWaiting
            game={game}
            quitGame={quitGame}
            socket={socket}
            readyUp={ReadyUp}
          />
        ) : (
          <PlayerTwoWaiting
            game={game}
            quitGame={quitGame}
            socket={socket}
            readyUp={ReadyUp}
          />
        )
      ) : game.gameState === GameStates.END ? (
        JSON.parse(localStorage.getItem("gameInSession")).userType ===
        UserTypes.VIEWER ? (
          <ViewerEnd game={game} quitGame={quitGame} socket={socket} />
        ) : JSON.parse(localStorage.getItem("gameInSession")).userType ===
          UserTypes.PLAYER_ONE ? (
          <PlayerOneEnd game={game} quitGame={quitGame} socket={socket} />
        ) : (
          <PlayerTwoEnd game={game} quitGame={quitGame} socket={socket} />
        )
      ) : game.gameState === GameStates.RUNNING ? (
        timerIsGoing ? (
          <Countdown
            date={Date.now() + 3000}
            precision={0}
            renderer={countdownRendered}
          ></Countdown>
        ) : (
          <DndProvider backend={HTML5Backend}>{children}</DndProvider>
        )
      ) : (
        <div className="m-auto d-flex flex-column align-items-center text-light">
          <h1>Loading Game...</h1>
          <div className="spinner-border">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
    </main>
  );
}
