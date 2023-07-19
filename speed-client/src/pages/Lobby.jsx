import Chat from "../components/Chat";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Popup from "reactjs-popup";

export default function Lobby({ setPopup, setGameInProcess }) {
  const [show, setShow] = useState(false);

  const chooseGameType = () => {
    setShow(true);
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
