import io from "socket.io-client";
import { useEffect, useState } from "react";

const socket = io.connect("http://localhost:4000/games", {
  autoConnect: false,
});

export default function Game() {
  const [messageRecieved, setMessageReceived] = useState([]);
  const [userMessages, setUserMessages] = useState([]);

  useEffect(() => {
    function messageReceivedHandler(data) {
      console.log(data);
      console.log(data);
      setMessageReceived(data);
    }

    socket.connect();
    // function userMessage(data) {
    //   console.log(data);
    //   console.log(data);
    //   setUserMessages([...userMessages, data]);
    // }
    socket.on("receive_message", messageReceivedHandler);
    // socket.on("user", userMessage);
    socket.emit("user", localStorage.getItem("userSession"));
    return () => {
      // socket.off("user", userMessage);
      socket.off("receive_message", messageReceivedHandler);
      socket.disconnect();
    };
  }, [userMessages]);

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
    </div>
  );
}
