import { useEffect, useState } from "react";
import Room from "./Room";

function Rooms({ socket }) {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const GetRooms = (rooms) => {
      setRooms(rooms);
      setTimeout(() => {
        setLoading(false);
      }, 500);
    };
    socket.on("rooms", GetRooms);

    return () => socket.off("rooms", GetRooms);
  }, [socket]);

  return loading ? (
    <div className="d-flex flex-column align-items-center m-auto">
      <h2>Loading Rooms...</h2>
      <div className="spinner-border text-secondary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  ) : rooms.length ? (
    <div className="container-fluid p-2">
      <div className="row row-cols-lg-4 row-cols-md-3 row-cols-sm-2 g-3">
        {rooms.map((room, index) => (
          <Room
            key={index}
            hostName={room.hostName}
            speedType={room.speedType}
            users={room.users}
            socket={socket}
          />
        ))}
      </div>
    </div>
  ) : (
    <h2 className="text-center">Currently no games are being hosted</h2>
  );
}

export default Rooms;
