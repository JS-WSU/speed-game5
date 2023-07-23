import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Game({ socket, children }) {
  const navigate = useNavigate();

  const [room, setRoom] = useState([]);

  const QuitGame = () => {
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
      {room.length === 1 ? (
        <div className="m-auto">Waiting for other player...</div>
      ) : (
        <>
          <div className="m-auto">Other player has joined!</div>

          {children}
        </>
      )}
      <div>
        <button onClick={QuitGame} className="btn btn-danger">
          Quit Game
        </button>
      </div>
    </main>
  );
}
