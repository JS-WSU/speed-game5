import React from "react";

export default function Lobby({ userSession, setPopup, setGameInProcess }) {
  const chooseGameType = () => {
    setPopup(
      <div className="modal d-block" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header d-flex justify-content-center">
              <h5 className="modal-title">Select Speed Type</h5>
              <button
                type="button"
                class="btn-close"
                onClick={() => setPopup(null)}
              ></button>
            </div>
            <div className="modal-body text-center d-flex justify-content-between">
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => setPopup(null)}
              >
                California Speed
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => setPopup(null)}
              >
                Regular Speed
              </button>
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
      <div>User: {userSession && userSession.username}</div>
    </main>
  );
}
