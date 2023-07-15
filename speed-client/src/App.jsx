import React, { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import HelloWorld from "./pages/HelloWorld";
import Error from "./pages/Error";
import Register from "./pages/Register";
import Lobby from "./pages/Lobby";
import axios from "axios";
import "./App.css";
import HighScores from "./pages/HighScores";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import Footer from "./components/Footer";
import Alert from "./components/Alert";
import Home from "./pages/Home";

axios.defaults.withCredentials = true;

function App() {
  const [userSession, setUserSession] = useState(null);
  const [popup, setPopup] = useState(null);
  const [gameInProcess, setGameInProcess] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
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
          navigate("/login");
          setUserSession(null);
          setPopup(
            <div className="modal d-block" tabIndex="-1">
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content text-danger border border-danger">
                  <div className="modal-header">
                    <i className="bi bi-exclamation-octagon me-2 fs-4 text-danger"></i>
                    <h5 className="modal-title">Alert</h5>
                    <button
                      type="button"
                      className="btn-close"
                      onClick={() => setPopup(null)}
                    ></button>
                  </div>
                  <div className="modal-body text-center">
                    <p>Session expired. Please login again.</p>
                  </div>
                </div>
              </div>
            </div>
          );
        }
      }
    };
    fetchUserAuth();
  }, [navigate]);

  return (
    <>
      {popup}
      <div className={`d-flex flex-column vh-100 ${popup ? "opacity-50" : ""}`}>
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
                  setPopup={setPopup}
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
      </div>
    </>
  );
}

export default App;
