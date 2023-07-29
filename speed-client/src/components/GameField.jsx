import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GameStates, UserTypes } from "../utils/Constants.mjs";
import AlertContext from "../context/AlertContext";
import ViewerWaiting from "./Screens/Waiting/Viewer";
import PlayerOneWaiting from "./Screens/Waiting/PlayerOne";
import PlayerTwoWaiting from "./Screens/Waiting/PlayerTwo";
import ViewerEnd from "./Screens/End/Viewer";
import PlayerOneEnd from "./Screens/End/PlayerOne";
import PlayerTwoEnd from "./Screens/End/PlayerTwo";

export default function GameField({
  socket,
  children,
  game,
  setGame,
  quitGame,
}) {
  const alertContext = useContext(AlertContext);

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
      socket.emit(
        "join_game",
        JSON.parse(localStorage.getItem("gameInSession")).hostName,
        JSON.parse(localStorage.getItem("gameInSession")).userType,
        localStorage.getItem("userSession")
      );
    }, 500);

    const GetGameStatus = (game) => {
      console.log(game);
      setGame(game);
    };

    const GameStarted = () => {
      alertContext.success("Game has started!");
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
        <>{children}</>
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
