import Chat from "../components/Chat";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Popup from "reactjs-popup";
import { io } from "socket.io-client";
import Room from "../components/Room";
import { SpeedTypes } from "../utils/Constants.mjs";

const socket = io.connect("http://localhost:4000/", { autoConnect: false });
export default function Lobby({ setGameInProcess }) {
  const [show, setShow] = useState(false);

  const chooseGameType = () => {
    setShow(true);
  };

  const [messages, setMessages] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [loadingChat, setLoadingChat] = useState(true);
  const [loadingRooms, setLoadingRooms] = useState(true);

  useEffect(() => {
    socket.connect();

    const GetMessages = (messages) => {
      setMessages(messages.reverse());
      setTimeout(() => {
        setLoadingChat(false);
      }, 1000);
    };
    const GetNewMessage = (message) => {
      setMessages((prev) => [message, ...prev]);
    };

    const GetRooms = (rooms) => {
      setRooms(rooms);
      setTimeout(() => {
        setLoadingRooms(false);
      }, 1000);
    };

    socket.on("chat_messages", GetMessages);
    socket.on("new_chat_message", GetNewMessage);
    socket.on("rooms", GetRooms);

    const interval = setInterval(() => {
      socket.emit("update_chat_messages");
    }, 1000);

    return () => {
      socket.off("chat_messages", GetMessages);
      socket.off("new_chat_message", GetNewMessage);
      socket.off("rooms", GetRooms);

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

  const HostRegularSpeed = () => {
    socket.emit("host_game", {
      hostName: JSON.parse(localStorage.getItem("userSession")).username,
      speedType: SpeedTypes.REGULAR,
    });
  };

  const HostCaliforniaSpeed = () => {
    socket.emit("host_game", {
      hostName: JSON.parse(localStorage.getItem("userSession")).username,
      speedType: SpeedTypes.CALIFORNIA,
    });
  };

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
            <Link to="/game">
              <button
                type="button"
                className="btn btn-danger"
                onClick={HostCaliforniaSpeed}
              >
                California Speed
              </button>
            </Link>
            <Link to="/game">
              <button
                type="button"
                className="btn btn-primary"
                onClick={HostRegularSpeed}
              >
                Regular Speed
              </button>
            </Link>
          </div>
        </div>
      </Popup>
      <main>
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
            {loadingRooms ? (
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
                    />
                  ))}
                </div>
              </div>
            ) : (
              <div>Currently no games are being hosted</div>
            )}
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
