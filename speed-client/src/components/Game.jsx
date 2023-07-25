import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserTypes } from "../utils/Constants.mjs";
import AlertContext from "../context/AlertContext";

export default function Game({ socket, children }) {
  const navigate = useNavigate();

  const [room, setRoom] = useState({});

  const alertContext = useContext(AlertContext);

  const QuitGame = () => {
    navigate("/lobby");
  };

  useEffect(() => {
    socket.emit(
      "join_game",
      JSON.parse(localStorage.getItem("gameInSession")).hostName,
      JSON.parse(localStorage.getItem("gameInSession")).userType,
      localStorage.getItem("userSession")
    );

    const GetGameStatus = (room) => {
      setRoom(room);
    };

    const LeftGame = (room, userType, username) => {
      console.log(userType);
      if (userType === UserTypes.PLAYER_TWO) {
        alertContext.error(`Player ${username} has left!`);
      } else if (userType === UserTypes.PLAYER_ONE) {
        alertContext.error(`Host ${username} has left!`);
        navigate("/lobby");
      }
      setRoom(room);
    };

    socket.on("game_status", GetGameStatus);
    socket.on("left_game", LeftGame);

    return () => {
      socket.emit(
        "quit_game",
        JSON.parse(localStorage.getItem("gameInSession")).hostName,
        JSON.parse(localStorage.getItem("gameInSession")).userType,
        localStorage.getItem("userSession")
      );
      localStorage.removeItem("gameInSession");
      socket.off("game_status", GetGameStatus);
      socket.off("left_game", LeftGame);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  return (
    <main className="bg-success container-fluid p-3">
      <div className="d-flex">
        {JSON.parse(localStorage.getItem("gameInSession")).userType ===
          UserTypes.VIEWER && (
          <div>
            <button onClick={QuitGame} className="btn btn-danger ms-auto">
              Stop Watching Game
            </button>
          </div>
        )}
        {room.viewers ? (
          <div className="bg-secondary ms-auto p-3">
            Viewers:
            {room.viewers.map((viewer) => (
              <div>{viewer}</div>
            ))}
          </div>
        ) : null}
      </div>

      {!room.playerTwo ? (
        <div className="m-auto bg-light p-3">Waiting for opponent...</div>
      ) : (
        <>
          {JSON.parse(localStorage.getItem("gameInSession")).userType ===
            UserTypes.PLAYER_ONE && (
            <div className="m-auto bg-light p-3">
              <div> Opponent {room.playerTwo} player has joined!</div>
              <div className="text-center mt-2">
                <button onClick={QuitGame} className="btn btn-success">
                  Start Game
                </button>
              </div>
            </div>
          )}
          {JSON.parse(localStorage.getItem("gameInSession")).userType !==
            UserTypes.PLAYER_ONE && (
            <div className="m-auto bg-light p-3">
              <div> Waiting for host {room.playerOne} to start game....</div>
            </div>
          )}
          {children}
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
