import { useNavigate } from "react-router-dom";
import { SpeedTypes, UserTypes } from "../utils/Constants.mjs";

function GameRoom({ hostName, speedType, playerTwo, socket }) {
  const navigate = useNavigate();

  const JoinGame = (e) => {
    localStorage.setItem(
      "gameInSession",
      JSON.stringify({
        hostName,
        userType: e.currentTarget.value,
        speedType,
      })
    );
    if (speedType === SpeedTypes.CALIFORNIA) {
      navigate("/california-speed");
    } else {
      navigate("/regular-speed");
    }
  };

  return (
    <div className="text-light">
      <div
        className={`h-100 card-body border border-3 p-3 d-flex flex-column ${
          speedType === SpeedTypes.REGULAR ? "bg-primary" : "bg-danger"
        }`}
      >
        <h5 className="card-title">{speedType}</h5>
        <p className="card-text">
          Host: <span className="ms-start">@{hostName}</span>
        </p>
        <div className="text-center mt-auto">
          {!playerTwo ? (
            <button
              onClick={JoinGame}
              className="btn btn-success w-50 border"
              value={UserTypes.PLAYER_TWO}
            >
              Join
            </button>
          ) : (
            <button
              onClick={JoinGame}
              className="btn btn-secondary w-50 border"
              value={UserTypes.VIEWER}
            >
              Watch
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default GameRoom;
