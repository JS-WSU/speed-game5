import Chat from "../components/Chat";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Popup from "reactjs-popup";
import { io } from "socket.io-client";

const socket = io.connect("http://localhost:4000/", { autoConnect: false });
export default function Lobby({ setGameInProcess }) {
  const [show, setShow] = useState(false);

  const chooseGameType = () => {
    setShow(true);
  };

  const [messages, setMessages] = useState([]);
  const [loadingChat, setLoadingChat] = useState(true);

  useEffect(() => {
    socket.connect();

    const GetMessages = (messages) => {
      setMessages(messages.reverse());
      setLoadingChat(false);
    };
    const GetNewMessage = (message) => {
      setMessages((prev) => [message, ...prev]);
    };

    socket.on("new_chat_message", GetNewMessage);

    socket.on("chat_messages", GetMessages);

    const interval = setInterval(() => {
      socket.emit("update_chat_messages");
    }, 1000);

    return () => {
      socket.off("chat_messages", GetMessages);
      socket.off("new_chat_message", GetNewMessage);
      socket.disconnect();
      clearInterval(interval);
    };
  }, []);

  function handleSendMessage(e) {
    socket.emit("new_chat_message", {
      username: JSON.parse(localStorage.getItem("userSession")).username,
      body: e.target.value,
    });
  }

  return (
    <>
      <Popup
        open={show}
        className="popup-content"
        onClose={() => setShow(false)}
      >
        <div className="">
          <h5 className="text-center ">Select Speed Type</h5>
          <div className="d-flex justify-content-evenly">
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => setShow(false)}
            >
              California Speed
            </button>
            <Link to="/">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => setShow(false)}
              >
                Regular Speed
              </button>
            </Link>
          </div>
        </div>
      </Popup>
      <main className="container-fluid">
        <div className="row">
          <div className="col-12 col-md-9 px-5">
            <div className="d-flex border-bottom border-5">
              <h1>Games</h1>
              <button
                className="btn btn-primary ms-auto align-self-center"
                onClick={chooseGameType}
              >
                Host Game
              </button>
            </div>
          </div>
          <div className="col-12 col-md-3">
            <Chat
              loadingChat={loadingChat}
              messages={messages}
              handleSendMessage={handleSendMessage}
            />
          </div>
        </div>
      </main>
    </>
  );
}
