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
import Alert from "./components/Alert";
import Home from "./pages/Home";
import "reactjs-popup/dist/index.css";
import "./App.css";
import AlertContext from "./context/AlertContext";

axios.defaults.withCredentials = true;

function App() {
  const [userSession, setUserSession] = useState(null);
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
      setUserSession(data);
    } catch (error) {
      // if session expired, remove from local storage
      if (localStorage.getItem("userSession")) {
        localStorage.removeItem("userSession");
        setUserSession(null);
        alertContext.error("Session expired, please login again.");
      }
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
        userSession={userSession}
        setUserSession={setUserSession}
        gameInProcess={gameInProcess}
        setGameInProcess={setGameInProcess}
      />
      <Alert />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/hello-world" element={<HelloWorld />} />
        <Route
          path="/register"
          element={<Register setUserSession={setUserSession} />}
        />
        <Route
          path="/login"
          element={<Login setUserSession={setUserSession} />}
        />
        <Route element={<ProtectedRoute />}>
          <Route
            path="/lobby"
            element={
              <Lobby
                userSession={userSession}
                setGameInProcess={setGameInProcess}
              />
            }
          />
          <Route
            path="/high-scores"
            element={<HighScores userSession={userSession} />}
          />
        </Route>
        <Route path="*" element={<Error />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
