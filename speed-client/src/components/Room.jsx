import { Link } from "react-router-dom";

function Room({ hostName, speedType }) {
  return (
    <div className="">
      <div className="card-body border p-3">
        <h5 className="card-title">{speedType}</h5>
        <p className="card-text">
          Host: <span className="ms-start">@{hostName}</span>
        </p>
        <div className="text-center">
          <Link to="/" className="btn btn-primary w-50">
            Join
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Room;
