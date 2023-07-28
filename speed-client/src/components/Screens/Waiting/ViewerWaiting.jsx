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
      </div>
      <div className="bg-secondary ms-auto p-3">
        Viewers:
        {game.viewers.map((viewer) => (
          <div>{viewer}</div>
        ))}
      </div>
    </div>
  );
}

export default ViewerWaiting;
