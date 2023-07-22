import Chat from "../components/Chat";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Popup from "reactjs-popup";
import { io } from "socket.io-client";
import Room from "../components/Room";
import { SpeedTypes } from "../utils/Constants.mjs";
import Rooms from "../components/Rooms";

const socket = io.connect("http://localhost:4000/", { autoConnect: false });
export default function Lobby({ setGameInProcess }) {
  const [show, setShow] = useState(false);

  const chooseGameType = () => {
    setShow(true);
  };

  useEffect(() => {
    socket.connect();

   
    return () => {

      socket.disconnect();
    };
  }, []);

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
           <Rooms socket={socket}/>
          </div>
          <div className="col-12 col-md-3">
            <Chat socket={socket} />
          </div>
        </div>
      </main>
    </>
  );
}
