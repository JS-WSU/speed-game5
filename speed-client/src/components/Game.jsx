import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserTypes } from "../utils/Constants.mjs";
import AlertContext from "../context/AlertContext";

export default function Game({ socket, children }) {
  const navigate = useNavigate();

  const [room, setRoom] = useState({});

  const alertContext = useContext(AlertContext);

  const Quit = () => {
    socket.emit(
      "quit",
      JSON.parse(localStorage.getItem("gameInSession")).hostName,
      JSON.parse(localStorage.getItem("gameInSession")).userType,
      localStorage.getItem("userSession")
    );
    localStorage.removeItem("gameInSession");
    navigate("/lobby");
  };

  useEffect(() => {
    socket.emit("join_room");

    const GetRoomStatus = (room) => {
      console.log(room);
      setRoom(room);
    };

    const Quit = (room, userType, username) => {
      if (username && userType !== UserTypes.VIEWER) {
        alertContext.error(`Player ${username} has left!`);
      }
      setRoom(room);
    };

    socket.emit(
      "join_game",
      JSON.parse(localStorage.getItem("gameInSession")).hostName
    );

    socket.on("room_status", GetRoomStatus);
    socket.on("quit", Quit);
    socket.on("disconnect", Quit);

    return () => {
      socket.disconnect();
      socket.off("room_status", GetRoomStatus);
      socket.off("quit", Quit);
      socket.off("disconnect", Quit);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  return (
    <main className="bg-success container-fluid">
      {!room.playerTwo ? (
        <div className="m-auto bg-light p-3">Waiting for opponent...</div>
      ) : (
        <>
          {room.viewers.length ? (
            <div className="bg-secondary align-self-end p-3">
              Viewers:
              {room.viewers.map((viewer) => (
                <div>{viewer}</div>
              ))}
            </div>
          ) : null}
          {JSON.parse(localStorage.getItem("gameInSession")).userType ===
            UserTypes.VIEWER && (
            <div>
              <button onClick={Quit} className="btn btn-danger ms-auto">
                Stop Watching Game
              </button>
            </div>
          )}
          {JSON.parse(localStorage.getItem("gameInSession")).userType ===
            UserTypes.PLAYER_ONE && (
            <div className="m-auto bg-light p-3">
              <div> Opponent {room.playerTwo} player has joined!</div>
              <div className="text-center mt-2">
                <button onClick={Quit} className="btn btn-success">
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
          <button onClick={Quit} className="btn btn-danger">
            Quit Game
          </button>
        </div>
      )}
    </main>
  );
}
