import React from "react";

function ViewerCalifornia({ game, socket, quitGame }) {
  return (
    <div className="row text-light g-3 flex-grow-1">
      <div className="d-flex">
        <div className="d-flex flex-column text-center me-auto"></div>
        <div className="d-flex justify-content-evenly"></div>
        <div className="bg-secondary align-self-start p-3 ms-auto">
          Viewers:
          {game.viewers.map((viewer) => (
            <div>{viewer}</div>
          ))}
        </div>
      </div>

      <div className="d-flex justify-content-center">
        <button
          onClick={quitGame}
          className="btn btn-danger align-self-end me-auto"
        >
          Quit Watching Game
        </button>
        <div className="d-flex"></div>
        <div className="d-flex flex-column text-center ms-auto"></div>
      </div>
    </div>
  );
}

export default ViewerCalifornia;
