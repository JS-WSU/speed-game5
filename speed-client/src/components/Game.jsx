import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserTypes } from "../utils/Constants.mjs";

export default function Game({ socket, children }) {
  const navigate = useNavigate();

  const [room, setRoom] = useState([]);

  const QuitGame = () => {
    socket.emit(
      "leave_game",
      JSON.parse(localStorage.getItem("gameInSession")).hostName
    );
    localStorage.removeItem("gameInSession");
    navigate("/lobby");
  };

  useEffect(() => {
    socket.connect();

    const GetRoomStatus = (room) => {
      console.log(room);
      setRoom(room);
    };

    socket.emit(
      "join_game",
      JSON.parse(localStorage.getItem("gameInSession")).hostName
    );

    socket.on("room_status", GetRoomStatus);

    return () => {
      socket.disconnect();
      socket.off("room_status", GetRoomStatus);
    };
  }, [socket]);

  return (
    <main className="bg-success container-fluid">
      {!room.playerTwo ? (
        <div className="m-auto bg-light p-3">Waiting for opponent...</div>
      ) : (
        <>
          {JSON.parse(localStorage.getItem("gameInSession")).userType ===
            UserTypes.VIEWER && (
            <div>
              <button onClick={QuitGame} className="btn btn-danger ms-auto">
                Stop Watching Game
              </button>
            </div>
          )}
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
