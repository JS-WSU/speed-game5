function Table({ users, user, onTable, speedType }) {
  return users.length ? (
    <>
      <table className="table table-responsive table-bordered">
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
                  JSON.parse(localStorage.getItem("userSession")).username ===
                  user.username
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
        <h6 className="text-center">
          Total Regular Speed Games Played: {user.totalGames}
        </h6>
      )}
      {user.totalGames === 0 && (
        <div className="d-flex flex-column">
          {" "}
          <h6>You currently haven't played any Regular Speed games</h6>
        </div>
      )}
    </>
  ) : (
    <div className="text-center">
      No Users High Scores for {speedType} Speed
    </div>
  );
}

export default Table;
