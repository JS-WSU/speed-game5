import io from "socket.io-client";
import { useEffect, useState } from "react";

const socket = io.connect("http://localhost:4000/games", {
  autoConnect: false,
});

export default function Game() {
  const [messageRecieved, setMessageReceived] = useState([]);
  const [userMessages, setUserMessages] = useState([]);

  function sendBack() {
    socket.emit("back_at_ya", messageRecieved);
  }
  useEffect(() => {
    function messageReceivedHandler(data) {
      console.log(data);
      console.log(data);
      setMessageReceived(data);
    }

    socket.connect();
    socket.on("receive_message", messageReceivedHandler);
    socket.emit("user", localStorage.getItem("userSession"));
    

    return () => {
      socket.off("receive_message", messageReceivedHandler);
      socket.disconnect();
    };
  }, []);

  return (
    <div>
      <div>
        Message:{" "}
        {messageRecieved.map((value, index) => {
          return <pre>{JSON.stringify(value)}</pre>;
        })}
        {userMessages.map((value, index) => {
          return <pre>{JSON.stringify(value)}</pre>;
        })}
      </div>
      <div>
        <button onClick={sendBack}>send back</button>
      </div>
    </div>
  );
}
