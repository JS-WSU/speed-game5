import { SpeedTypes } from "../utils/Constants.mjs";

function Table({ users, user, onTable, speedType }) {
  return users.length ? (
    <div>
      {speedType === SpeedTypes.CALIFORNIA ? (
        <h2 className="bg-danger text-light p-3 text-center">Regular Speed</h2>
      ) : (
        <h2 className="bg-info text-light p-3 text-center">California Speed</h2>
      )}
      <table
        className={`table table-responsive table-bordered mb-1 ${
          speedType === SpeedTypes.CALIFORNIA ? "table-danger" : "table-primary"
        }`}
      >
        <thead>
          <tr>
            <th scope="col">Place</th>
            <th scope="col">User</th>
            <th scope="col">Win Percentage</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => {
            return (
              <tr
                key={index}
                className={`${
                  localStorage.getItem("userSession") === user.username
                    ? "table-active"
                    : ""
                }`}
              >
                <th scope="row">{index + 1}</th>
                <td>{user.username}</td>
                <td>
                  {Number(user.percentage).toLocaleString(undefined, {
                    style: "percent",
                    minimumFractionDigits: 2,
                  })}
                </td>
              </tr>
            );
          })}
          {!onTable && user.totalGames !== 0 && (
            <tr className="table-active">
              <th scope="row">{user.rank}</th>
              <td>{user.username}</td>
              <td>
                {Number(user.percentage).toLocaleString(undefined, {
                  style: "percent",
                  minimumFractionDigits: 2,
                })}
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {user.totalGames !== 0 && (
        <h6
          className={`text-center ${
            speedType === SpeedTypes.REGULAR ? "text-primary" : "text-danger"
          }`}
        >
          Total {speedType} Games You Have Played: {user.totalGames}
        </h6>
      )}
      {user.totalGames === 0 && (
        <div className="d-flex flex-column">
          {" "}
          <h6
            className={`text-center ${
              speedType === SpeedTypes.REGULAR ? "text-primary" : "text-danger"
            }`}
          >
            You currently haven't played any {speedType} games
          </h6>
        </div>
      )}
    </div>
  ) : (
    <div
      className={`text-center ${
        speedType === SpeedTypes.REGULAR ? "text-primary" : "text-danger"
      }`}
    >
      No Users High Scores for {speedType}
    </div>
  );
}

export default Table;
