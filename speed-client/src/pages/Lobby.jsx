import Chat from "../components/Chat";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Popup from "reactjs-popup";
import { io } from "socket.io-client";

const socket = io.connect("http://localhost:4000/chat", { autoConnect: false });

export default function Lobby({ userSession, setPopup, setGameInProcess }) {
  const [show, setShow] = useState(false);
  const [messages, setMessages] = useState([]);

  const chooseGameType = () => {
    setShow(true);
  };

  useEffect(() => {
    const GetMessages = (messages) => {
      setMessages(messages);
    };

    socket.connect();

    socket.on("chat_messages", GetMessages);

    return () => {
      socket.off("chat_messages", GetMessages);
      socket.disconnect();
    };
  }, []);

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
          <div className="d-flex col-12 col-md-9">
            <div className="border-bottom border-5">
              <div className="d-flex border-bottom border-5">
                <h1>Games</h1>
                <button
                  className="btn btn-primary ms-auto"
                  onClick={chooseGameType}
                >
                  Host Game
                </button>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-3">
            <Chat />
          </div>
        </div>
      </main>
    </>
  );
}
