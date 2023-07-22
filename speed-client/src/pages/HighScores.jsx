/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import GetErrorMessage from "../utils/GetErrorMessage.mjs";
import AlertContext from "../context/AlertContext";
import { FetchStatus, SpeedTypes } from "../utils/Constants.mjs";
import Table from "../components/Table";

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
            <Table
              users={usersCalifornia}
              user={userCalifornia}
              onTable={onTableCalifornia}
              speedType={SpeedTypes.CALIFORNIA}
            />
          </div>

          <div className="d-flex flex-column">
            <h2 className="text-center">Regular Speed</h2>
            <Table
              users={usersRegular}
              user={userRegular}
              onTable={onTableRegular}
              speedType={SpeedTypes.REGULAR}
            />
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
