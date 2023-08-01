import { useEffect, useState } from "react";
import GameRoom from "./GameRoom";

function GameRooms({ socket }) {
  const [gameRooms, setGameRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const GetGameRooms = (gameRooms) => {
      setGameRooms(gameRooms);
      setTimeout(() => {
        setLoading(false);
      }, 500);
    };
    socket.on("gameRooms", GetGameRooms);

    return () => socket.off("gameRooms", GetGameRooms);
  }, [socket]);

  return loading ? (
    <div className="d-flex flex-column align-items-center m-auto">
      <h2>Loading Rooms...</h2>
      <div className="spinner-border text-secondary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  ) : gameRooms.length ? (
    <div className="container-fluid p-2">
      <div className="row row-cols-lg-4 row-cols-md-3 row-cols-sm-2 g-3">
        {gameRooms.map((gameRoom, index) => (
          <GameRoom
            key={index}
            hostName={gameRoom.hostName}
            speedType={gameRoom.speedType}
            playerTwo={gameRoom.playerTwo}
            socket={socket}
          />
        ))}
      </div>
    </div>
  ) : (
    <h2 className="text-center">Currently no games are being hosted</h2>
  );
}

export default GameRooms;
