import React from "react";
import { Link } from "react-router-dom";

export default function Lobby({ userSession, setPopup, setGameInProcess }) {
  const chooseGameType = () => {
    setPopup(
      <div className="modal d-block" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <button
              type="button"
              class="btn-close ms-auto mt-2 me-2"
              onClick={() => setPopup(null)}
            ></button>
            <div className="modal-header d-flex justify-content-center pt-0">
              <h5 className="modal-title ">Select Speed Type</h5>
            </div>
            <div className="modal-body text-center d-flex justify-content-between">
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => setPopup(null)}
              >
                California Speed
              </button>
              <Link to="/">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => setPopup(null)}
                >
                  Regular Speed
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <main className="container">
      <div className="d-flex justify-content-between">
        <h1>Games</h1>
        <button
          className="btn btn-primary align-self-center"
          onClick={chooseGameType}
        >
          Host Game
        </button>
      </div>
      <div>User: {userSession?.username}</div>
    </main>
  );
}
