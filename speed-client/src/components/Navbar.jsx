import { NavLink } from "react-router-dom";
import { useContext } from "react";
import Alert from "../components/Alert.jsx";
import AlertContext from "../context/AlertContext";
import axios from "axios";
import GetErrorMessage from "../utils/GetErrorMessage.mjs";

export default function Navbar({
  userSession,
  setUserSession,
  gameInProcess,
  setGameInProcess,
  children,
}) {
  const alertContext = useContext(AlertContext);

  const Logout = async () => {
    try {
      await axios.delete("http://localhost:4000/users/logout");
      setUserSession(null);
      localStorage.removeItem("userSession");
      alertContext.success("You have logged out successfully!");
    } catch (error) {
      alertContext.error(GetErrorMessage(error));
    }
  };

  return (
    <div className="sticky-top">
      <nav
        className={`navbar bg-primary navbar-expand-lg px-5 text-light ${
          gameInProcess ? "opacity-50" : ""
        }`}
        style={{ pointerEvents: gameInProcess ? "none" : "auto" }}
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
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item align-self-center">
                <NavLink className={`nav-link`} to="/" as={NavLink}>
                  Home
                </NavLink>
              </li>
              <li className="nav-item align-self-center">
                <NavLink className="nav-link" to="/hello-world">
                  Hello World
                </NavLink>
              </li>
              {userSession && (
                <>
                  <li className="nav-item align-self-center">
                    <NavLink className="nav-link" to="/high-scores">
                      High Scores
                    </NavLink>
                  </li>

                  <li className="nav-item align-self-center">
                    <NavLink className="nav-link" to="/lobby">
                      Lobby
                    </NavLink>
                  </li>

                  <li className="nav-item align-self-center">
                    <NavLink className="nav-link" to="/game">
                      Game (TODO)
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
            {userSession ? (
              <ul className="navbar-nav dropdown">
                <li className="nav-item dropdown align-self-center">
                  <button
                    className="nav-link dropdown-toggle"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Welcome, {userSession.username}
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
            ) : (
              <ul className="navbar-nav">
                <li className="nav-item align-self-center">
                  <NavLink className="nav-link" to="/register">
                    Register
                  </NavLink>
                </li>
                <li className="nav-item align-self-center">
                  <NavLink className="nav-link" to="/login">
                    Login
                  </NavLink>
                </li>
              </ul>
            )}
          </div>
        </div>
      </nav>
      <Alert />
    </div>
  );
}
