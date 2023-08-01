import { useState, useContext } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import AlertContext from "../context/AlertContext";
import {sha256} from "js-sha256";
import axios from "axios";
import GetErrorMessage from "../utils/GetErrorMessage.mjs";
import { SpeedTypes } from "../utils/Constants.mjs";

export default function Login({ setIsAuth, socket }) {
  const alertContext = useContext(AlertContext);

  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
    loading: false,
  });

  const [isEmailValid, setIsEmailValid] = useState(null);
  const [isPasswordValid, setIsPasswordValid] = useState(null);

  const handleFormChange = (e) => {
    const { name, value } = e.currentTarget;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const verifyForm = () => {
    let formValid = true;

    if (!form.email) {
      setIsEmailValid(false);
      formValid = false;
    } else {
      setIsEmailValid(true);
    }

    if (!form.password) {
      setIsPasswordValid(false);
      formValid = false;
    } else {
      setIsPasswordValid(true);
    }

    return formValid;
  };

  const LoginUser = async (e) => {
    e.preventDefault();

    if (!verifyForm()) {
      return;
    }

    setForm((prev) => ({ ...prev, loading: true }));

    let salt;

    try {
      const { data } = await axios.post(
        "http://localhost:4000/users/get-salt",
        {
          email: form.email,
        }
      );
      salt = data;
    } catch (error) {
      alertContext.error(GetErrorMessage(error));
      setForm((prev) => ({ ...prev, loading: false }));
      return;
    }

    try {
      const { data } = await axios.post("http://localhost:4000/users/login", {
        email: form.email,
        password: sha256(form.password + salt),
      });
      navigate("/lobby");
      localStorage.setItem("userSession", data.username);
      alertContext.success(`Login successful ${data.username}, welcome!`);
    } catch (error) {
      console.log(error);
      const {
        response: { data },
      } = error;
      alertContext.error(data);
    }

    setTimeout(() => {
      setForm((prev) => ({ ...prev, loading: false }));
    }, 500);
  };

  if (localStorage.getItem("gameInSession")) {
    return JSON.parse(localStorage.getItem("gameInSession")).speedType ===
      SpeedTypes.REGULAR ? (
      <Navigate to="/regular-speed" replace />
    ) : (
      <Navigate to="/california-speed" replace />
    );
  }
  return localStorage.getItem("userSession") ? (
    <Navigate to="/lobby" />
  ) : form.loading ? (
    <div className="m-auto d-flex flex-column">
      <h1>Logging in...</h1>
      <h1 className="spinner-border align-self-center">
        <span className="visually-hidden">Loading...</span>
      </h1>
    </div>
  ) : (
    <main className="container">
      <div className="small-container">
        <h1 className="text-center">Login</h1>
        <form
          onSubmit={(e) => LoginUser(e)}
          className="p-3 rounded-3 border border-3"
        >
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              value={form.email}
              type="name"
              className={`form-control`}
              id="email"
              aria-describedby="email"
              onChange={handleFormChange}
              name="email"
            />
          </div>
          {isEmailValid === false && (
            <div className="alert alert-danger p-1 d-flex">
              <i className="bi bi-exclamation-octagon me-1 fs-4 text-danger"></i>
              <span className="align-self-center">
                {" "}
                Please enter in a email
              </span>
            </div>
          )}

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              value={form.password}
              type="password"
              className="form-control"
              id="password"
              aria-describedby="password"
              onChange={handleFormChange}
              name="password"
            />
          </div>
          {isPasswordValid === false && (
            <div className="alert alert-danger p-1 d-flex">
              <i className="bi bi-exclamation-octagon me-1 fs-4 text-danger"></i>
              <span className="align-self-center">
                {" "}
                Please enter in a password
              </span>
            </div>
          )}
          <button
            type="submit"
            className="btn btn-primary w-100 border border-3"
          >
            Login
          </button>
        </form>
        <div className="form-text text-center border border-2 mt-3 p-1">
          Don't have an account? <Link to="/register">Register here</Link>
        </div>
      </div>
    </main>
  );
}
