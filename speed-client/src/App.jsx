import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import HelloWorld from "./components/HelloWorld";
import Error from "./components/Error";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Register from "./components/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import Lobby from "./components/Lobby";
import axios from "axios";
import "./App.css";

function App() {
  axios.defaults.withCredentials = true;

  const [userSession, setUserSession] = useState(null);

  useEffect(() => {
    const fetchUserAuth = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:4000/users/isLoggedIn`
        );
        setUserSession(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserAuth();
  }, []);

  return (
    <>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<HelloWorld />} />
        <Route
          path="/register"
          element={<Register userSession={userSession} />}
        />
        <Route path="/login" element={<Login userSession={userSession} />} />
        <Route element={<ProtectedRoute userSession={userSession} />}>
          <Route path="/lobby" element={<Lobby />} />
        </Route>
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
}

export default App;
