/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import HelloWorld from "./pages/HelloWorld";
import Error from "./pages/Error";
import Register from "./pages/Register";
import Lobby from "./pages/Lobby";
import axios from "axios";
import HighScores from "./pages/HighScores";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Game from "./pages/Game";
import "reactjs-popup/dist/index.css";
import "./App.css";
import AlertContext from "./context/AlertContext";
import GetErrorMessage from "./utils/GetErrorMessage.mjs";

axios.defaults.withCredentials = true;

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const alertContext = useContext(AlertContext);
  const [gameInProcess, setGameInProcess] = useState(false);

  const navigate = useNavigate();
  const fetchUserAuth = async () => {
    // check if session exists
    try {
      const { data } = await axios.get(
        `http://localhost:4000/users/authenticated`
      );
      localStorage.setItem("userSession", JSON.stringify(data));
      setIsAuth(true);
    } catch (error) {
      // if session expired, remove from local storage
      console.log(error);
      if (
        error.code === "ERR_BAD_REQUEST" &&
        localStorage.getItem("userSession")
      ) {
        localStorage.removeItem("userSession");

        alertContext.error("Session expired, please login again.");
      } else if (error.code === "ERR_NETWORK") {
        localStorage.removeItem("userSession");
        alertContext.error(
          GetErrorMessage(error) + ", speed-server is not running"
        );
      }
      setIsAuth(false);
    }
  };

  useEffect(() => {
    fetchUserAuth();
  }, [navigate]);

  useEffect(() => {
    const checkSessionExpired = setInterval(fetchUserAuth, 5000);
    return () => clearInterval(checkSessionExpired);
  }, []);

  return (
    <>
      <Navbar
        setIsAuth={setIsAuth}
        gameInProcess={gameInProcess}
        setGameInProcess={setGameInProcess}
      ></Navbar>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/hello-world" element={<HelloWorld />} />
        <Route path="/register" element={<Register setIsAuth={setIsAuth} />} />
        <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
        <Route element={<ProtectedRoute />}>
          <Route
            path="/lobby"
            element={<Lobby setGameInProcess={setGameInProcess} />}
          />
          <Route
            path="/high-scores"
            element={<HighScores setIsAuth={setIsAuth} />}
          />
          <Route path="/game" element={<Game setIsAuth={setIsAuth} />} />
        </Route>
        <Route path="*" element={<Error />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
