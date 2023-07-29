import React from "react";

function ViewerWaiting({ game, quitGame, socket }) {
  return (
    <div className="d-flex flex-column flex-grow-1">
      <div className="d-flex">
        <div>
          <button onClick={quitGame} className="btn btn-danger ms-auto">
            Stop Watching Game
          </button>
        </div>
        <div className="bg-secondary ms-auto p-3">
          Viewers:
          {game.viewers.map((viewer) => (
            <div>{viewer}</div>
          ))}
        </div>
      </div>
      <div className="m-auto bg-light p-3">
        Waiting for host {game.playerOne.name} to start game...
      </div>
    </div>
  );
}

export default ViewerWaiting;
