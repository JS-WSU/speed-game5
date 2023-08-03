import { UserTypes } from "../../../utils/Constants.mjs";
import { useNavigate } from "react-router-dom";

function PlayerEnd({ game, quitGame, socket }) {
  const navigate = useNavigate();

  const Rematch = () => {
    socket.emit(
      "rematch",
      game.hostName,
      JSON.parse(localStorage.getItem("gameInSession")).userType
    );
  };
  return (
    <div
      className={`medium-container text-center text-light p-5
    
    ${
      JSON.parse(localStorage.getItem("gameInSession")).userType ===
      UserTypes.PLAYER_ONE
        ? !game.playerOne.hand.length && !game.playerOne.drawPile
          ? "bg-primary"
          : "bg-danger"
        : !game.playerTwo.hand.length && !game.playerTwo.drawPile
        ? "bg-primary"
        : "bg-danger"
    }
    `}
    >
      {JSON.parse(localStorage.getItem("gameInSession")).userType ===
      UserTypes.PLAYER_ONE ? (
        !game.playerOne.hand.length && !game.playerOne.drawPile ? (
          <div className="fs-2 my-4">
            You won against {game.playerTwo.name}!
          </div>
        ) : (
          <div className="fs-2 my-4">You lost to {game.playerTwo.name}!</div>
        )
      ) : !game.playerTwo.hand.length && !game.playerTwo.drawPile ? (
        <div className="fs-2 my-4">You won against {game.playerOne.name}!</div>
      ) : (
        <div className="fs-2 my-4">You lost to {game.playerOne.name}!</div>
      )}
      {game.playerOne.rematch ? (
        <div className="my-3">{game.playerOne.name} wants a rematch!</div>
      ) : null}
      {game.playerTwo.rematch ? (
        <div className="my-3">{game.playerTwo.name} wants a rematch!</div>
      ) : null}
      <div className="d-flex justify-content-between">
        <button
          onClick={quitGame}
          className={`border btn btn-primary me-3
        
        ${
          JSON.parse(localStorage.getItem("gameInSession")).userType ===
          UserTypes.PLAYER_ONE
            ? !game.playerOne.hand.length && !game.playerOne.drawPile
              ? "bg-danger"
              : "bg-primary"
            : !game.playerTwo.hand.length && !game.playerTwo.drawPile
            ? "bg-danger"
            : "bg-primary"
        }
        `}
        >
          Go To Lobby
        </button>
        <button onClick={Rematch} className="border btn btn-warning me-3">
          Rematch
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

export default PlayerEnd;
