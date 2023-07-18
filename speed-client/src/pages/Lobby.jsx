import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Popup from "reactjs-popup";
import { io } from "socket.io-client";

const socket = io.connect("http://localhost:4000/chat", { autoConnect: false });

export default function Lobby({ userSession, setPopup, setGameInProcess }) {
  const [show, setShow] = useState(false);
  const [users, setUsers] = useState([]);

  const chooseGameType = () => {
    setShow(true);
  };

  useEffect(() => {
    const GetUsers = (users) => {
      setUsers(users);
    };

    socket.connect();

    socket.on("chat_messages", GetUsers);

    return () => socket.off("chat_messages", GetUsers);
  }, []);

  return (
    <main className="container">
      <div className="d-flex justify-content-between">
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
        <h1>Games</h1>
        <button
          className="btn btn-primary align-self-center"
          onClick={chooseGameType}
        >
          Host Game
        </button>
      </div>
      <div>User: {userSession?.username}</div>
      {users.length &&
        users.map((user) => (
          <div
            className={`${
              user.username === userSession?.username ? "bg-danger" : ""
            }`}
          >
            {JSON.stringify(user)}
          </div>
        ))}
    </main>
  );
}
