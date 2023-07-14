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
import "./App.css";
import HighScores from "./pages/HighScores";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import Footer from "./components/Footer";
import Alert from "./components/Alert";
import Home from "./pages/Home";
import GetErrorMessage from "./utils/GetErrorMessage.mjs";
import AlertContext from "./context/AlertContext";

axios.defaults.withCredentials = true;

function App() {
  const [isAuth, setIsAuth] = useState(false);

  const alertContext = useContext(AlertContext);

  const navigate = useNavigate();

  useEffect(() => {
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
        if (localStorage.getItem("userSession")) {
          localStorage.removeItem("userSession");
          navigate("/login");
        }
        if (error.code === "ECONNABORTED") {
          alertContext.error(GetErrorMessage(error));
        }
        setIsAuth(false);
      }
    };
    fetchUserAuth();
  }, [navigate, alertContext]);

  return (
    <>
      <Navbar isAuth={isAuth} setIsAuth={setIsAuth} />
      <Alert />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/hello-world" element={<HelloWorld />} />
        <Route path="/register" element={<Register setIsAuth={setIsAuth} />} />
        <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/lobby" element={<Lobby />} />
          <Route path="/high-scores" element={<HighScores />} />
        </Route>
        <Route path="*" element={<Error />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
