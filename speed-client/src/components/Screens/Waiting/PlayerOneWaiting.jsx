import React from "react";
import { UserTypes } from "../../../utils/Constants.mjs";

function PlayerOneWaiting({ game, quitGame, socket }) {
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
          <div className="d-flex">
            <div>
              <div>
                Player One: {game.playerOne.ready ? "Ready" : "Not Ready"}
              </div>
              <div>
                Player Two: {game.playerTwo.ready ? "Ready" : "Not Ready"}
              </div>
            </div>
            <div className="bg-secondary ms-auto p-3">
              Viewers:
              {game.viewers.map((viewer) => (
                <div>{viewer}</div>
              ))}
            </div>
          </div>
          <div className="m-auto bg-light p-3">
            <div> Opponent {game.playerTwo.name} player has joined!</div>
            <div className="text-center mt-2">
              <button
                onClick={StartGame}
                className="btn btn-success"
                // disabled={!game.playerOne.ready || !game.playerTwo.ready}
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
