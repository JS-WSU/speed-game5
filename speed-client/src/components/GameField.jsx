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

export default function Game({ socket, children, game, setGame }) {
  const navigate = useNavigate();

  const alertContext = useContext(AlertContext);

  const StartGame = () => {
    socket.emit(
      "start_game",
      JSON.parse(localStorage.getItem("gameInSession")).hostName
    );
  };

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

  useEffect(() => {
    socket.emit(
      "join_game",
      JSON.parse(localStorage.getItem("gameInSession")).hostName,
      JSON.parse(localStorage.getItem("gameInSession")).userType,
      localStorage.getItem("userSession")
    );

    const GetGameStatus = (game) => {
      setGame(game);
    };

    const GameStarted = () => {
      alertContext.success("Game has started!");
    };

    const LeftGame = (game, userType, username) => {
      if (userType === UserTypes.PLAYER_TWO) {
        alertContext.error(`Player ${username} has left!`);
      } else if (userType === UserTypes.PLAYER_ONE) {
        alertContext.error(`Host ${username} has left!`);
        QuitGame();
      }
      setGame(game);
    };

    socket.on("game_status", GetGameStatus);
    socket.on("left_game", LeftGame);
    socket.on("game_started", GameStarted);

    return () => {
      socket.off("game_status", GetGameStatus);
      socket.off("left_game", LeftGame);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  return (
    <main className="bg-success container-fluid p-3">
      {game.gameState === GameStates.WAITING ? (
        JSON.parse(localStorage.getItem("gameInSession")).userType ===
        UserTypes.VIEWER ? (
          <ViewerWaiting />
        ) : JSON.parse(localStorage.getItem("gameInSession")).userType ===
          UserTypes.PLAYER_ONE ? (
          <PlayerOneWaiting />
        ) : (
          <PlayerTwoWaiting />
        )
      ) : game.gameState === GameStates.END ? (
        JSON.parse(localStorage.getItem("gameInSession")).userType ===
        UserTypes.VIEWER ? (
          <ViewerEnd />
        ) : JSON.parse(localStorage.getItem("gameInSession")).userType ===
          UserTypes.PLAYER_ONE ? (
          <PlayerOneEnd />
        ) : (
          <PlayerTwoEnd />
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
