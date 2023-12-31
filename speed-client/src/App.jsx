/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import InGameProtectedRoute from "./components/InGameProtectedRoute";
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
import "reactjs-popup/dist/index.css";
import "./App.css";
import AlertContext from "./context/AlertContext";
import GetErrorMessage from "./utils/GetErrorMessage.mjs";
import RegularSpeed from "./pages/RegularSpeed";
import CaliforniaSpeed from "./pages/CaliforniaSpeed";
import { io } from "socket.io-client";

axios.defaults.withCredentials = true;

const socket = io.connect("http://localhost:4000/", {
  autoConnect: false,
});
function App() {
  // eslint-disable-next-line no-unused-vars
  const alertContext = useContext(AlertContext);

  const navigate = useNavigate();
  const fetchUserAuth = async () => {
    // check if session exists
    try {
      const {
        data: { username },
      } = await axios.get(`http://localhost:4000/users/authenticated`);
      localStorage.setItem("userSession", username);
      socket.connect();
    } catch (error) {
      // if session expired, remove from local storage
      if (
        error.code === "ERR_BAD_REQUEST" &&
        localStorage.getItem("userSession")
      ) {
        alertContext.error("Session expired, please login again.");
      } else if (error.code === "ERR_NETWORK") {
        alertContext.error(
          GetErrorMessage(error) + ", speed-server is not running"
        );
      }
      // setIsAuth(false);
      // make user quit if session expired and if ingame
      if (localStorage.getItem("gameInSession")) {
        socket.emit(
          "quit_game",
          JSON.parse(localStorage.getItem("gameInSession")).hostName,
          JSON.parse(localStorage.getItem("gameInSession")).userType,
          localStorage.getItem("userSession")
        );
        localStorage.removeItem("gameInSession");
      }
      localStorage.removeItem("userSession");
      socket.disconnect();
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
      <Navbar></Navbar>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/hello-world" element={<HelloWorld />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/lobby" element={<Lobby socket={socket} />} />
          <Route path="/high-scores" element={<HighScores />} />
          <Route element={<InGameProtectedRoute />}>
            <Route
              path="/regular-speed"
              element={<RegularSpeed socket={socket} />}
            />
            <Route
              path="/california-speed"
              element={<CaliforniaSpeed socket={socket} />}
            />
          </Route>
        </Route>
        <Route path="*" element={<Error />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
