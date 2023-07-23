import { Link } from "react-router-dom";
import { SpeedTypes } from "../utils/Constants.mjs";

function Room({ hostName, speedType }) {
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
          <Link to="/" className="btn btn-success primary w-50 border">
            Join
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Room;
