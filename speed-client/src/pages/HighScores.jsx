/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import GetErrorMessage from "../utils/GetErrorMessage.mjs";
import AlertContext from "../context/AlertContext";

function HighScores({ userSession }) {
  const [usersRegular, setUsersRegular] = useState([]);
  const [usersCalifornia, setUsersCalifornia] = useState([]);
  const [userRegular, setUserRegular] = useState(null);
  const [userCalifornia, setUserCalifornia] = useState(null);

  const [loading, setLoading] = useState(true);
  const [onTableCalifornia, setOnTableCalifornia] = useState(false);
  const [onTableRegular, setOnTableRegular] = useState(false);
  const alertContext = useContext(AlertContext);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const {
          data: { users_california, users_regular },
        } = await axios.get("http://localhost:4000/users/");
        setUsersRegular(users_regular);
        setUsersCalifornia(users_california);

        let playerFoundRegular = users_regular.find(
          (player) =>
            player.username ===
            JSON.parse(localStorage.getItem("userSession"))?.username
        );

        if (playerFoundRegular) {
          setOnTableRegular(true);
        }

        let playerFoundCalifornia = users_california.find(
          (player) =>
            player.username ===
            JSON.parse(localStorage.getItem("userSession"))?.username
        );

        if (playerFoundCalifornia) {
          setOnTableCalifornia(true);
        }
      } catch (error) {
        console.log(GetErrorMessage(error));
        alertContext.error(GetErrorMessage(error));
      }
    };
    const fetchUser = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:4000/users/regular/${JSON.parse(
            localStorage.getItem("userSession")
          )}`
        );
        setUserRegular(data);
      } catch (error) {
        console.log(GetErrorMessage(error));
        alertContext.error(GetErrorMessage(error));
      }
      try {
        const { data } = await axios.get(
          `http://localhost:4000/users/california/${JSON.parse(
            localStorage.getItem("userSession")
          )}`
        );
        setUserCalifornia(data);
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
      <h1 className="text-center">High Scores Table</h1>
      <Link to="/lobby" className="btn btn-primary mx-auto">
        Go To Lobby
      </Link>
      {usersCalifornia.length && usersRegular.length ? (
        <div className="row row-cols-2">
          <div className="d-flex flex-column">
            <h2 className="text-center">California Speed</h2>
            <table className="table table-responsive table-bordered">
              <thead>
                <tr>
                  <th scope="col">Place</th>
                  <th scope="col">User</th>
                  <th scope="col">Win Percentage</th>
                </tr>
              </thead>
              <tbody>
                {usersCalifornia.map((user, index) => {
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
                })}
                {!onTableCalifornia &&
                  userCalifornia &&
                  userCalifornia.totalGames !== 0 && (
                    <tr className="table-active">
                      <th scope="row">{userCalifornia.rank}</th>
                      <td>{userCalifornia.username}</td>
                      <td>
                        {Number(userCalifornia.percentage).toLocaleString(
                          undefined,
                          {
                            style: "percent",
                            minimumFractionDigits: 2,
                          }
                        )}
                      </td>
                    </tr>
                  )}
              </tbody>
            </table>
            {userCalifornia && userCalifornia.totalGames !== 0 && (
              <h6 className="text-center">
                Total California Speed Games Played: {userCalifornia.totalGames}
              </h6>
            )}
            {userCalifornia && userCalifornia.totalGames === 0 && (
              <div className="d-flex flex-column">
                {" "}
                <h6>You currently haven't played any California speed games</h6>
              </div>
            )}
          </div>
          <div className="d-flex flex-column">
            <h2 className="text-center">Regular Speed</h2>
            <table className="table table-responsive table-bordered">
              <thead>
                <tr>
                  <th scope="col">Place</th>
                  <th scope="col">User</th>
                  <th scope="col">Win Percentage</th>
                </tr>
              </thead>
              <tbody>
                {usersRegular.map((user, index) => {
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
                })}
                {!onTableRegular &&
                  userRegular &&
                  userRegular.totalGames !== 0 && (
                    <tr className="table-active">
                      <th scope="row">{userRegular.rank}</th>
                      <td>{userRegular.username}</td>
                      <td>
                        {Number(userRegular.percentage).toLocaleString(
                          undefined,
                          {
                            style: "percent",
                            minimumFractionDigits: 2,
                          }
                        )}
                      </td>
                    </tr>
                  )}
              </tbody>
            </table>
            {userRegular && userRegular.totalGames !== 0 && (
              <h6 className="text-center">
                Total Regular Speed Games Played: {userRegular.totalGames}
              </h6>
            )}
            {userRegular && userRegular.totalGames === 0 && (
              <div className="d-flex flex-column">
                {" "}
                <h6>You currently haven't played any Regular Speed games</h6>
              </div>
            )}
          </div>
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
