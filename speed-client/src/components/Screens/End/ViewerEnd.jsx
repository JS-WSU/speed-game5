import React from "react";
import { useNavigate } from "react-router-dom";

function ViewerEnd({ game, quitGame }) {
  const navigate = useNavigate();

  return (
    <div
      className={`medium-container text-center text-light p-5 bg-secondary
    
    `}
    >
      <div className="fs-1 my-2">Game Over!</div>

      <div className="fs-3 bg-primary">
        Winner:{" "}
        {game.winner === game.playerOne.name
          ? game.playerOne.name
          : game.playerTwo.name}
        !
      </div>
      <div className="fs-3 bg-danger">
        Loser:{" "}
        {game.winner !== game.playerOne.name
          ? game.playerOne.name
          : game.playerTwo.name}
        !
      </div>
      {game.playerOne.rematch ? (
        <div className="my-3">{game.playerOne.name} wants a rematch!</div>
      ) : null}
      {game.playerTwo.rematch ? (
        <div className="my-3">{game.playerTwo.name} wants a rematch!</div>
      ) : null}
      <div className="d-flex justify-content-between mt-4">
        <button
          onClick={quitGame}
          className={`border btn btn-primary me-3
        
     
        `}
        >
          Go To Lobby
        </button>

        <button
          onClick={() => {
            quitGame();
            navigate("/high-scores");
          }}
          className="border btn btn-info"
        >
          Go To High Scores Table
        </button>
      </div>
    </div>
  );
}

export default ViewerEnd;
