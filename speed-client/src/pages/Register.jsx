import React, { useContext, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import AlertContext from "../context/AlertContext";
import SHA256 from "../utils/SHA256.mjs";
import axios from "axios";
import GetErrorMessage from "../utils/GetErrorMessage.mjs";
import { SpeedTypes } from "../utils/Constants.mjs";

export default function Register({ setIsAuth, socket }) {
  const alertContext = useContext(AlertContext);

  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    username: "",
    password: "",
    passwordAgain: "",
    loading: false,
  });

  const [isEmailValid, setIsEmailValid] = useState(null);
  const [isUsernameValid, setIsUsernameValid] = useState(null);
  const [doPasswordsMatch, setDoPasswordsMatch] = useState(null);
  const [metAtLeastTwelveCharacters, setMetAtLeastTwelveCharacters] =
    useState(null);
  const [metAtLeastOneUppercase, setMetAtLeastOneUppercase] = useState(null);
  const [metAtLeastOneLowercase, setMetAtLeastOneLowercase] = useState(null);
  const [metAtLeastOneSpecialCharacter, setMetAtLeastOneSpecialCharacter] =
    useState(null);
  const [metAtLeastOneDigit, setMetAtLeastOneDigit] = useState(null);

  const handleFormChange = (e) => {
    const { name, value } = e.currentTarget;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const verifyEmail = () => {
    let emailValid = true;

    if (/^[\w.]+@([\w-]+\.)+[\w]{3,4}$/g.test(form.email)) {
      setIsEmailValid(true);
    } else {
      setIsEmailValid(false);
      emailValid = false;
    }
    return emailValid;
  };

  const verifyPassword = () => {
    let passwordValid = true;

    if (/.{12,}/g.test(form.password)) {
      setMetAtLeastTwelveCharacters(true);
    } else {
      setMetAtLeastTwelveCharacters(false);
      passwordValid = false;
    }
    if (/(?=.*[A-Z])/g.test(form.password)) {
      setMetAtLeastOneUppercase(true);
    } else {
      setMetAtLeastOneUppercase(false);
      passwordValid = false;
    }
    if (/(?=.*[a-z])/g.test(form.password)) {
      setMetAtLeastOneLowercase(true);
    } else {
      setMetAtLeastOneLowercase(false);
      passwordValid = false;
    }
    if (/(?=.*[!~`'"?*()@#$%^&+=-])/g.test(form.password)) {
      setMetAtLeastOneSpecialCharacter(true);
    } else {
      setMetAtLeastOneSpecialCharacter(false);
      passwordValid = false;
    }
    if (/(?=.*\d)/g.test(form.password)) {
      setMetAtLeastOneDigit(true);
    } else {
      setMetAtLeastOneDigit(false);
      passwordValid = false;
    }

    if (form.password !== form.passwordAgain) {
      setDoPasswordsMatch(false);
      passwordValid = false;
    } else {
      setDoPasswordsMatch(true);
    }

    return passwordValid;
  };

  const verifyForm = () => {
    let isFormComplete = true;

    if (!form.username) {
      isFormComplete = false;
      setIsUsernameValid(false);
    } else {
      setIsUsernameValid(null);
    }

    if (!verifyEmail()) {
      isFormComplete = false;
    }

    if (!verifyPassword()) {
      isFormComplete = false;
    }

    return isFormComplete;
  };

  const RegisterUser = async (e) => {
    e.preventDefault();

    if (!verifyForm()) {
      return;
    }

    setForm((prev) => ({ ...prev, loading: true }));

    let salt;

    try {
      const { data } = await axios.post(
        "http://localhost:4000/users/make-salt",
        {
          email: form.email,
          username: form.username,
        }
      );
      salt = data;
      setIsUsernameValid(true);
      setIsEmailValid(true);
    } catch (error) {
      alertContext.error(GetErrorMessage(error));
      setIsUsernameValid(null);
      setIsEmailValid(null);
      setForm((prev) => ({ ...prev, loading: false }));
      return;
    }

    try {
      const { data } = await axios.post(
        "http://localhost:4000/users/register",
        {
          email: form.email,
          username: form.username,
          password: await SHA256(form.password + salt),
          salt,
        }
      );
      navigate("/lobby");
      localStorage.setItem("userSession", data.username);

      alertContext.success(`Your account, ${form.username}, has been created!`);
    } catch (error) {
      const {
        response: { data },
      } = error;
      alertContext.error(
        `Uh oh, your account, ${form.username}, was not registered! Reason: ${data}`
      );
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
      <h1>Registering account...</h1>
      <h1 className="spinner-border align-self-center">
        <span className="visually-hidden">Loading...</span>
      </h1>
    </div>
  ) : (
    <main className="container">
      <div className="small-container">
        <h1 className="text-center">Register</h1>
        <form
          onSubmit={(e) => RegisterUser(e)}
          className="small-container mx-auto p-3 rounded-3 border border-3"
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
                Please enter in a valid email
              </span>
            </div>
          )}
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Username
            </label>
            <input
              value={form.username}
              type="name"
              className={`form-control`}
              id="username"
              aria-describedby="username"
              onChange={handleFormChange}
              name="username"
            />
          </div>
          {isUsernameValid === false && (
            <div className="alert alert-danger p-1 d-flex">
              <i className="bi bi-exclamation-octagon me-1 fs-4 text-danger"></i>
              <span className="align-self-center">
                Please enter in a username
              </span>
            </div>
          )}
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Enter in a password that contains at least:
            </label>
            <ul className="">
              <li className="small-font">12 characters </li>
              <li className="small-font">1 uppercase letter (A-Z)</li>
              <li className="small-font">1 lowercase letter (a-z)</li>
              <li className="small-font">1 number (0-9)</li>
              <li className="small-font">
                1 special character Ex. (!~`'"?*()@#$%^&+=-)
              </li>
            </ul>
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
          <div className="mb-3">
            <label htmlFor="passwordAgain" className="form-label">
              Reenter your password again
            </label>
            <input
              value={form.passwordAgain}
              type="password"
              className="form-control"
              id="passwordAgain"
              aria-describedby="passwordAgain"
              onChange={handleFormChange}
              name="passwordAgain"
            />
          </div>
          <ul className="list-group-flush list-group small-font">
            {metAtLeastOneDigit === false && (
              <li className="list-group-item p-1 list-group-item-danger rounded border border-danger-subtle d-flex">
                <i className="bi bi-exclamation-octagon me-1 fs-4 text-danger"></i>
                <span className="align-self-center">
                  {" "}
                  Password must contain at least 1 digit
                </span>
              </li>
            )}
            {metAtLeastOneLowercase === false && (
              <li className="list-group-item p-1 list-group-item-danger rounded border border-danger-subtle d-flex">
                <i className="bi bi-exclamation-octagon me-1 fs-4 text-danger"></i>
                <span className="align-self-center">
                  {" "}
                  Password must contain at least 1 lowercase letter
                </span>
              </li>
            )}
            {metAtLeastOneSpecialCharacter === false && (
              <li className="list-group-item p-1 list-group-item-danger rounded border border-danger-subtle d-flex">
                <i className="bi bi-exclamation-octagon me-1 fs-4 text-danger"></i>
                <span className="align-self-center">
                  {" "}
                  Password must contain at least 1 special character
                </span>
              </li>
            )}
            {metAtLeastOneUppercase === false && (
              <li className="list-group-item p-1 list-group-item-danger rounded border border-danger-subtle d-flex">
                <i className="bi bi-exclamation-octagon me-1 fs-4 text-danger"></i>
                <span className="align-self-center">
                  {" "}
                  Password must contain at least 1 uppercase letter
                </span>
              </li>
            )}
            {metAtLeastTwelveCharacters === false && (
              <li className="list-group-item p-1 list-group-item-danger rounded border border-danger-subtle d-flex">
                <i className="bi bi-exclamation-octagon me-1 fs-4 text-danger"></i>
                <span className="align-self-center">
                  {" "}
                  Password must contain at least 12 characters
                </span>
              </li>
            )}
            {doPasswordsMatch === false && (
              <li className="list-group-item p-1 list-group-item-danger rounded border border-danger-subtle d-flex">
                <i className="bi bi-exclamation-octagon me-1 fs-4 text-danger"></i>
                <span className="align-self-center">
                  Passwords do not match
                </span>
              </li>
            )}
          </ul>

          <button
            type="submit"
            className="btn btn-primary w-100 mt-3 border border-3"
          >
            Register
          </button>
        </form>
        <div className="form-text text-center border border-2 mt-3 p-1">
          Already have an account? <Link to="/login">Login here</Link>
        </div>
      </div>
    </main>
  );
}
