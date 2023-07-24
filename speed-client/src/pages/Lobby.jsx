import Chat from "../components/Chat";
import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Popup from "reactjs-popup";
import { io } from "socket.io-client";
import { SpeedTypes } from "../utils/Constants.mjs";
import Rooms from "../components/Rooms";
import { UserTypes } from "../utils/Constants.mjs";

const socket = io.connect("http://localhost:4000/", { autoConnect: false });
export default function Lobby() {
  const navigate = useNavigate();

  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    socket.emit("join_lobby");

    return () => {
      socket.emit("leave_lobby");
    };
  }, []);

  const HostGame = (e) => {
    socket.emit(
      "host_game",
      localStorage.getItem("userSession"),
      e.currentTarget.value
    );

    localStorage.setItem(
      "gameInSession",
      JSON.stringify({
        hostName: localStorage.getItem("userSession"),
        userType: UserTypes.PLAYER_ONE,
        speedType: e.currentTarget.value,
      })
    );

    if (e.currentTarget.value === SpeedTypes.CALIFORNIA) {
      navigate("/california-speed");
    } else {
      navigate("/regular-speed");
    }
  };

  if (localStorage.getItem("gameInSession")) {
    return JSON.parse(localStorage.getItem("gameInSession")).speedType ===
      SpeedTypes.REGULAR ? (
      <Navigate to="/regular-speed" replace />
    ) : (
      <Navigate to="/california-speed" replace />
    );
  }
  return (
    <>
      <Popup
        open={showPopup}
        className="popup-content"
        onClose={() => setShowPopup(false)}
      >
        <div className="">
          <h5 className="text-center ">Select Speed Type</h5>
          <div className="d-flex justify-content-evenly">
            <button
              type="button"
              className="btn btn-danger border border-3"
              onClick={HostGame}
              value={SpeedTypes.CALIFORNIA}
            >
              California Speed
            </button>
            <button
              type="button"
              className="btn btn-primary border border-3"
              onClick={HostGame}
              value={SpeedTypes.REGULAR}
            >
              Regular Speed
            </button>
          </div>
        </div>
      </Popup>
      <main>
        <div className="row">
          <div className="col-12 col-md-9 px-5">
            <div className="d-flex border-bottom border-5">
              <h1>Games</h1>
              <button
                className="btn btn-primary ms-auto align-self-center border border-3"
                onClick={() => setShowPopup(true)}
              >
                Host Game
              </button>
            </div>
            <Rooms socket={socket} />
          </div>
          <div className="col-12 col-md-3">
            <Chat socket={socket} />
          </div>
        </div>
      </main>
    </>
  );
}
