/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import GetErrorMessage from "../utils/GetErrorMessage.mjs";
import AlertContext from "../context/AlertContext";
import { FetchStatus } from "../utils/Constants.mjs";

function HighScores() {
  const [usersRegular, setUsersRegular] = useState([]);
  const [usersCalifornia, setUsersCalifornia] = useState([]);
  const [userRegular, setUserRegular] = useState(null);
  const [userCalifornia, setUserCalifornia] = useState(null);

  const [fetchStatus, setFetchStatus] = useState(FetchStatus.LOADING);
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
            JSON.parse(localStorage.getItem("userSession")).username
        );

        if (playerFoundRegular) {
          setOnTableRegular(true);
        }

        let playerFoundCalifornia = users_california.find(
          (player) =>
            player.username ===
            JSON.parse(localStorage.getItem("userSession")).username
        );

        if (playerFoundCalifornia) {
          setOnTableCalifornia(true);
        }

        let response = await axios.get(
          `http://localhost:4000/users/regular/${
            JSON.parse(localStorage.getItem("userSession")).username
          }`
        );
        setUserRegular(response.data);

        response = await axios.get(
          `http://localhost:4000/users/california/${
            JSON.parse(localStorage.getItem("userSession")).username
          }`
        );
        setUserCalifornia(response.data);
        setFetchStatus(FetchStatus.SUCCESS);
      } catch (error) {
        console.log(GetErrorMessage(error));
        alertContext.error(GetErrorMessage(error));
        setFetchStatus(FetchStatus.FAILURE);
      }
    };

    const timeOut = setTimeout(() => {
      fetchUsers();
    }, 1000);

    return () => clearTimeout(timeOut);
  }, []);

  return (
    <main className="container">
      <h1 className="text-center">High Scores Table</h1>
      <Link to="/lobby" className="btn btn-primary mx-auto">
        Go To Lobby
      </Link>
      {fetchStatus === FetchStatus.SUCCESS ? (
        <div className="row row-cols-2">
          <div className="d-flex flex-column">
            <h2 className="text-center">California Speed</h2>
            {usersCalifornia.length ? (
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
                    {usersCalifornia.map((user, index) => {
                      return (
                        <tr
                          key={index}
                          className={`${
                            JSON.parse(localStorage.getItem("userSession"))
                              .username === user.username
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
                    {!onTableCalifornia && userCalifornia.totalGames !== 0 && (
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
                {userCalifornia.totalGames !== 0 && (
                  <h6 className="text-center">
                    Total California Speed Games Played:{" "}
                    {userCalifornia.totalGames}
                  </h6>
                )}
                {userCalifornia.totalGames === 0 && (
                  <div className="d-flex flex-column">
                    {" "}
                    <h6>
                      You currently haven't played any California speed games
                    </h6>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center">
                No Users High Scores for California Speed
              </div>
            )}
          </div>

          <div className="d-flex flex-column">
            <h2 className="text-center">Regular Speed</h2>
            {usersRegular.length ? (
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
                    {usersRegular.map((user, index) => {
                      return (
                        <tr
                          key={index}
                          className={`${
                            JSON.parse(localStorage.getItem("userSession"))
                              .username === user.username
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
                    {!onTableRegular && userRegular.totalGames !== 0 && (
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
                {userRegular.totalGames !== 0 && (
                  <h6 className="text-center">
                    Total Regular Speed Games Played: {userRegular.totalGames}
                  </h6>
                )}
                {userRegular.totalGames === 0 && (
                  <div className="d-flex flex-column">
                    {" "}
                    <h6>
                      You currently haven't played any Regular Speed games
                    </h6>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center">
                No Users High Scores for Regular Speed
              </div>
            )}
          </div>
        </div>
      ) : fetchStatus === FetchStatus.FAILURE ? (
        <div>Failed to fetch users high scores</div>
      ) : (
        <div className="m-auto d-flex flex-column align-items-center">
          <h1>Loading High Scores...</h1>
          <div className="spinner-border">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}

      {/* <h1 className="text-center m-auto">No users currently</h1>
      
      <div className="m-auto d-flex flex-column align-items-center">
        <h1>Loading High Scores...</h1>
        <div className="spinner-border">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div> */}
    </main>
  );
}

export default HighScores;
