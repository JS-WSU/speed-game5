import React from "react";
import { UserTypes } from "../../../utils/Constants.mjs";

function PlayerOneWaiting({ game, quitGame, socket, readyUp }) {
  const StartGame = () => {
    socket.emit(
      "start_game",
      JSON.parse(localStorage.getItem("gameInSession")).hostName
    );
  };

  return (
    <div className="d-flex flex-column flex-grow-1">
      {!game.playerTwo.name ? (
        <div className="m-auto bg-light p-3">Waiting for opponent...</div>
      ) : (
        <>
          <div className="d-flex text-light">
            <div>
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
            <div className="bg-secondary align-self-start p-3 ms-auto">
              Viewers:
              {game.viewers.map((viewer) => (
                <div>{viewer}</div>
              ))}
            </div>
          </div>
          <div className="m-auto bg-light p-3">
            <div> Opponent {game.playerTwo.name} player has joined!</div>
            <div className="d-flex justify-content-between mt-2 ">
              <button
                onClick={readyUp}
                className={`text-light btn ${
                  game.playerOne.ready ? "bg-primary" : "bg-secondary"
                }`}
              >
                {game.playerOne.ready ? "Not Ready" : "Ready Up"}
              </button>
              <button
                onClick={StartGame}
                className="btn btn-success"
                disabled={!game.playerOne.ready || !game.playerTwo.ready}
              >
                Start Game
              </button>
            </div>
          </div>
        </>
      )}
      <div>
        <button onClick={quitGame} className="btn btn-danger">
          Quit Game
        </button>
      </div>
    </div>
  );
}

export default PlayerOneWaiting;
