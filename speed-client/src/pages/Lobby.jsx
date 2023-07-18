import Chat from "../components/Chat";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Popup from "reactjs-popup";

export default function Lobby({ userSession, setPopup, setGameInProcess }) {
  const [show, setShow] = useState(false);

  const chooseGameType = () => {
    setShow(true);
  };

  return (
    <main className="container">
      <div className="d-flex h-100">
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
        <Chat />
      </div>
    </main>
  );
}
