import { useEffect, useState } from "react";
import axios from "axios";
import GetErrorMessage from "../utils/GetErrorMessage.mjs";

function HighScores() {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});

  const [onTable, setOnTable] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await axios.get("http://localhost:4000/users/");
        setUsers(data);
        console.log(data);
      } catch (error) {
        console.log(GetErrorMessage(error));
      }
    };
    fetchUsers();
  }, []);

  const fetchUser = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:4000/users/${
          JSON.parse(localStorage.getItem("userSession")).username
        }`
      );
      setUser(data);
      console.log(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <main className="container">
      {users.length ? (
        <div className="m-auto">
          <h1 className="text-center">High Scores Table</h1>
          <table className="table table-responsive table-bordered">
            <caption className="text-center">Top 10</caption>
            <thead>
              <tr>
                <th scope="col">Place</th>
                <th scope="col">User</th>
                <th scope="col">Win Percentage</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => {
                if (
                  user.username ===
                  JSON.parse(localStorage.getItem("userSession")).username
                ) {
                  setOnTable(true);
                }

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
                </tr>;
              })}
            </tbody>
          </table>
          <div>
            <h2>Your winrate: </h2>
            <h2>Total Games Played:</h2>
          </div>
        </div>
      ) : (
        <h1 className="text-center">No users currently</h1>
      )}
    </main>
  );
}

export default HighScores;
