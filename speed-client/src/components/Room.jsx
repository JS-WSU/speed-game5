import { useNavigate } from "react-router-dom";
import { SpeedTypes, UserTypes } from "../utils/Constants.mjs";

function Room({ hostName, speedType, users, socket }) {
  const navigate = useNavigate();

  const JoinGame = () => {
    socket.emit("join_game", { hostName });
    localStorage.setItem(
      "gameInSession",
      JSON.stringify({
        hostName,
        userType: UserTypes.PLAYER_TWO,
      })
    );
    if (speedType === SpeedTypes.CALIFORNIA) {
      navigate("/california-speed");
    } else {
      navigate("/regular-speed");
    }
  };

  const WatchGame = () => {
    socket.emit("watch_game", { hostName });
    localStorage.setItem(
      "gameInSession",
      JSON.stringify({
        hostName,
        userType: UserTypes.VIEWER,
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
          {users < 2 ? (
            <button onClick={JoinGame} className="btn btn-success w-50 border">
              Join
            </button>
          ) : (
            <button
              onClick={WatchGame}
              className="btn btn-secondary w-50 border"
            >
              Watch
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Room;
