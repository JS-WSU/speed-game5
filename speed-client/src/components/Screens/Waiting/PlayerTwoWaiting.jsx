import React from "react";

function PlayerTwoWaiting({ game, quitGame, socket }) {
  return (
    <div className="d-flex flex-column flex-grow-1">
      <div className="d-flex">
        <div>
          <div>Player One: {game.playerOne.ready ? "Ready" : "Not Ready"}</div>
          <div>Player Two: {game.playerTwo.ready ? "Ready" : "Not Ready"}</div>
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
      <div>
        <button onClick={quitGame} className="btn btn-danger">
          Quit Game
        </button>
      </div>
    </div>
  );
}

export default PlayerTwoWaiting;
