/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import GetErrorMessage from "../utils/GetErrorMessage.mjs";
import AlertContext from "../context/AlertContext";

function HighScores({ userSession }) {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const alertContext = useContext(AlertContext);
  const [onTable, setOnTable] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await axios.get("http://localhost:4000/users/");
        setUsers(data);

        let playerFound = data.find(
          (player) =>
            player.username ===
            JSON.parse(localStorage.getItem("userSession"))?.username
        );

        if (playerFound) {
          setOnTable(true);
        }
      } catch (error) {
        console.log(GetErrorMessage(error));
        alertContext.error(GetErrorMessage(error));
      }
    };
    const fetchUser = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:4000/users/user/${
            JSON.parse(localStorage.getItem("userSession"))?.username
          }`
        );
        setUser(data);
      } catch (error) {
        console.log(GetErrorMessage(error));
        alertContext.error(GetErrorMessage(error));
      }
    };
    const timeOut = setTimeout(() => {
      fetchUsers();
      fetchUser();
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timeOut);
  }, []);

  return (
    <main className="container">
      {users.length ? (
        <div className="m-auto">
          <h1 className="text-center">High Scores Table</h1>
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
                if (user.totalGames > 0) {
                  return (
                    <tr
                      key={index}
                      className={`${
                        userSession && userSession.username === user.username
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
                } else {
                  console.log(`${user.username} has not played any games`);
                  return "";
                }
              })}
              {!onTable && user && user.totalGames !== 0 && (
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

          {user && user.totalGames !== 0 && (
            <h4 className="text-center">
              Total Games Played: {user.totalGames}
            </h4>
          )}
          {user && user.totalGames === 0 && (
            <div className="d-flex flex-column">
              {" "}
              <h4>You currently haven't played any games</h4>
              <Link to="/lobby" className="btn btn-primary mx-auto">
                Go To Lobby
              </Link>
            </div>
          )}
        </div>
      ) : !loading ? (
        <h1 className="text-center m-auto">No users currently</h1>
      ) : (
        <h1 className="spinner-border m-auto">
          <span className="visually-hidden">Loading...</span>
        </h1>
      )}
    </main>
  );
}

export default HighScores;
