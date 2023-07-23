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

  const [fetchStatusUsers, setFetchStatusUsers] = useState(FetchStatus.LOADING);
  const [fetchStatusUserRegular, setFetchStatusUserRegular] = useState(
    FetchStatus.LOADING
  );
  const [fetchStatusUserCalifornia, setFetchStatusUserCalifornia] = useState(
    FetchStatus.LOADING
  );
  const [onTableCalifornia, setOnTableCalifornia] = useState(false);
  const [onTableRegular, setOnTableRegular] = useState(false);
  const alertContext = useContext(AlertContext);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const {
          data: { users_california, users_regular },
        } = await axios.get("http://localhost:4000/users/top-10-each");
        setUsersRegular(users_regular);
        setUsersCalifornia(users_california);
        setFetchStatusUsers(FetchStatus.SUCCESS);

        let playerFoundRegular = users_regular.find(
          (player) => player.username === localStorage.getItem("userSession")
        );

        if (playerFoundRegular) {
          setOnTableRegular(true);
        }

        let playerFoundCalifornia = users_california.find(
          (player) => player.username === localStorage.getItem("userSession")
        );

        if (playerFoundCalifornia) {
          setOnTableCalifornia(true);
        }
      } catch (error) {
        console.log(GetErrorMessage(error));
        alertContext.error(GetErrorMessage(error));
        setFetchStatusUsers(FetchStatus.FAILURE);
      }

      try {
        const { data } = await axios.get(
          `http://localhost:4000/users/regular/${localStorage.getItem(
            "userSession"
          )}`
        );
        setUserRegular(data);
        setFetchStatusUserRegular(FetchStatus.SUCCESS);
      } catch (error) {
        console.log(GetErrorMessage(error));
        alertContext.error(GetErrorMessage(error));
        setFetchStatusUserRegular(FetchStatus.FAILURE);
      }
      try {
        const { data } = await axios.get(
          `http://localhost:4000/users/california/${localStorage.getItem(
            "userSession"
          )}`
        );
        setUserCalifornia(data);
        setFetchStatusUserCalifornia(FetchStatus.SUCCESS);
      } catch (error) {
        console.log(GetErrorMessage(error));
        alertContext.error(GetErrorMessage(error));
        setFetchStatusUserCalifornia(FetchStatus.FAILURE);
      }
    };

    const timeOut = setTimeout(() => {
      fetchUsers();
    }, 500);

    return () => clearTimeout(timeOut);
  }, []);

  return (
    <main className="container">
      <h1 className="text-center">High Scores Table</h1>
      <Link to="/lobby" className="btn btn-primary mx-auto border border-3">
        Go To Lobby
      </Link>
      {fetchStatusUsers === FetchStatus.SUCCESS &&
      fetchStatusUserCalifornia === FetchStatus.SUCCESS &&
      fetchStatusUserRegular === FetchStatus.SUCCESS ? (
        <div className="row row-cols-md-2 mt-2">
          <Table
            users={usersCalifornia}
            user={userCalifornia}
            onTable={onTableCalifornia}
            speedType={SpeedTypes.CALIFORNIA}
          />
          <Table
            users={usersRegular}
            user={userRegular}
            onTable={onTableRegular}
            speedType={SpeedTypes.REGULAR}
          />
        </div>
      ) : fetchStatusUsers === FetchStatus.FAILURE ||
        fetchStatusUserRegular === FetchStatus.FAILURE ||
        fetchStatusUserCalifornia === FetchStatus.FAILURE ? (
        <>
          {fetchStatusUsers === FetchStatus.FAILURE && (
            <div>Failure in fetching users high scores</div>
          )}
          {fetchStatusUserRegular === FetchStatus.FAILURE && (
            <div>Failure in fetching your high scores for regular</div>
          )}
          {fetchStatusUserCalifornia === FetchStatus.FAILURE && (
            <div>Failure in fetching your high scores for california</div>
          )}
        </>
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
