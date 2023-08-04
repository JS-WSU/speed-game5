import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import Alert from "../components/Alert.jsx";
import AlertContext from "../context/AlertContext";
import axios from "axios";
import GetErrorMessage from "../utils/GetErrorMessage.mjs";

export default function Navbar({
  setIsAuth,
  gameInProcess,
  setGameInProcess,
  children,
}) {
  const alertContext = useContext(AlertContext);

  const navigate = useNavigate();
  const Logout = async () => {
    try {
      await axios.delete(`${process.env.REACT_APP_API}/users/logout`);
      navigate("/login");
      localStorage.removeItem("userSession");
      localStorage.removeItem("gameInSession");
      alertContext.success("You have logged out successfully!");
    } catch (error) {
      alertContext.error(GetErrorMessage(error));
    }
  };

  return (
    <div className="">
      <nav
        className={`navbar bg-primary navbar-expand-lg px-5 text-light ${
          localStorage.getItem("gameInSession") ? "opacity-50" : ""
        }`}
        style={{
          pointerEvents: localStorage.getItem("gameInSession")
            ? "none"
            : "auto",
        }}
        data-bs-theme="dark"
      >
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/">
            Speed
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-between"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav mb-2 mb-lg-0 flex-grow-1 align-items-center justify-content-center">
              <li className="nav-item">
                <NavLink className={`nav-link`} to="/" as={NavLink}>
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/hello-world">
                  Hello World
                </NavLink>
              </li>
              {localStorage.getItem("userSession") && (
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/high-scores">
                      High Scores
                    </NavLink>
                  </li>

                  <li className="nav-item">
                    <NavLink className="nav-link" to="/lobby">
                      Lobby
                    </NavLink>
                  </li>

                  <li className="nav-item">
                    <NavLink className="nav-link" to="/game">
                      Game (TODO)
                    </NavLink>
                  </li>
                </>
              )}
              {localStorage.getItem("userSession") ? (
                <li className="ms-lg-auto text-center">
                  <ul className="navbar-nav dropdown">
                    <li className="nav-item dropdown">
                      <button
                        className="nav-link dropdown-toggle"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        Welcome, {localStorage.getItem("userSession")}
                      </button>
                      <ul className="dropdown-menu">
                        <li className="dropdown-item">
                          <NavLink className="nav-link" onClick={Logout}>
                            Logout
                          </NavLink>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>
              ) : (
                <li className="ms-lg-auto text-center">
                  <ul className="navbar-nav">
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/register">
                        Register
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/login">
                        Login
                      </NavLink>
                    </li>
                  </ul>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
      <Alert />
    </div>
  );
}
