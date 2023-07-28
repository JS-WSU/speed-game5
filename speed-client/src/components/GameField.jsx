import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GameStates, UserTypes } from "../utils/Constants.mjs";
import AlertContext from "../context/AlertContext";
import ViewerWaiting from "./Screens/Waiting/ViewerWaiting";
import PlayerOneWaiting from "./Screens/Waiting/PlayerOneWaiting";
import PlayerTwoWaiting from "./Screens/Waiting/PlayerTwoWaiting";
import ViewerEnd from "./Screens/End/ViewerEnd";
import PlayerOneEnd from "./Screens/End/PlayerOneEnd";
import PlayerTwoEnd from "./Screens/End/PlayerTwoEnd";
import Card from "./Card"

export default function GameField({
  socket,
  children,
  game,
  setGame,
  quitGame,
}) {
  const alertContext = useContext(AlertContext);

  const Ready = () => {
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

      socket.emit(
        "quit_game",
        JSON.parse(localStorage.getItem("gameInSession")).hostName,
        JSON.parse(localStorage.getItem("gameInSession")).userType,
        localStorage.getItem("userSession")
      );
      localStorage.removeItem("gameInSession");
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
          <PlayerOneWaiting game={game} quitGame={quitGame} socket={socket} />
        ) : (
          <PlayerTwoWaiting game={game} quitGame={quitGame} socket={socket} />
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
      ) : (
        <>{children}</>
      )}

      <div className="d-flex">
        {JSON.parse(localStorage.getItem("gameInSession")).userType ===
          UserTypes.VIEWER && (
          <div>
            <button onClick={QuitGame} className="btn btn-danger ms-auto">
              Stop Watching Game
            </button>
          </div>
        )}
        {game.viewers ? (
          <div className="bg-secondary ms-auto p-3">
            Viewers:
            {game.viewers.map((viewer) => (
              <div>{viewer}</div>
            ))}
          </div>
        ) : null}
      </div>

      {game.gameState === GameStates.WAITING ? (
        !game.playerTwo.name ? (
          <div className="m-auto bg-light p-3">Waiting for opponent...</div>
        ) : (
          <>
            {JSON.parse(localStorage.getItem("gameInSession")).userType ===
              UserTypes.PLAYER_ONE && (
              <div className="m-auto bg-light p-3">
                <div> Opponent {game.playerTwo.name} player has joined!</div>
                <div className="text-center mt-2">
                  <button onClick={StartGame} className="btn btn-success">
                    Start Game
                  </button>
                  <Card name={game.playerOne.pile[0].name} src={game.playerOne.pile[0].src} value={game.playerOne.pile[0].value} />
                </div>
              </div>
            )}
            {JSON.parse(localStorage.getItem("gameInSession")).userType !==
              UserTypes.PLAYER_ONE && (
              <div className="m-auto bg-light p-3">
                <div>
                  {" "}
                  Waiting for host {game.playerOne.name} to start game....
                </div>
              </div>
            )}
          </>
        )
      ) : game.gameState === GameStates.RUNNING ? (
        <div>{children}</div>
      ) : (
        <div>The Game is Over!</div>
      )}

      {JSON.parse(localStorage.getItem("gameInSession")).userType === UserTypes.PLAYER_ONE && (
        <>
          <Card name={game.playerOne.pile[0].name} src={game.playerOne.pile[0].src} value={game.playerOne.pile[0].value} />
        </>

        
      )}

      {JSON.parse(localStorage.getItem("gameInSession")).userType !==
        UserTypes.VIEWER && (
        <div>
          <button onClick={QuitGame} className="btn btn-danger">
            Quit Game
          </button>
        </div>
      )}
    </main>
  );
}
