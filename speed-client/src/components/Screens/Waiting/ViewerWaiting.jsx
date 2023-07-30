import React from "react";

function ViewerWaiting({ game, quitGame, socket }) {
  return (
    <div className="d-flex flex-column flex-grow-1 text-light">
      <div className="d-flex">
        <div>
          <button onClick={quitGame} className="btn btn-danger ms-auto">
            Stop Watching Game
          </button>
          <div className="mt-2">
            <div
              className={`mb-2 p-3 ${
                game.playerOne.ready ? "bg-primary" : "bg-danger"
              }`}
            >
              Player One {game.playerOne.name}:{" "}
              {game.playerOne.ready ? "Ready" : "Not Ready"}
            </div>
            <div
              className={`p-3 ${
                game.playerTwo.ready ? "bg-primary" : "bg-danger"
              }`}
            >
              Player Two {game.playerTwo.name}:{" "}
              {game.playerTwo.ready ? "Ready" : "Not Ready"}
            </div>
          </div>
        </div>
        <div className="bg-secondary align-self-start p-3 ms-auto">
          Viewers:
          {game.viewers.map((viewer) => (
            <div>{viewer}</div>
          ))}
        </div>
      </div>
      <div className="m-auto bg-light p-3 text-dark">
        Waiting for host {game.playerOne.name} to start game...
      </div>
    </div>
  );
}

export default ViewerWaiting;
