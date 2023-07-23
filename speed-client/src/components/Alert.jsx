import React from "react";
import { useContext } from "react";
import AlertContext from "../context/AlertContext";

const Alert = () => {
  const { alert, clear } = useContext(AlertContext);

  return alert && alert.status === "success" ? (
    <button
      className={`w-100 rounded-0 alert alert-success d-flex justify-content-center border border-3`}
      onClick={clear}
    >
      <i className="bi bi-check2-circle me-2 fs-4 text-success"></i>
      <span className="align-self-center">{alert.message}</span>
    </button>
  ) : alert ? (
    <button
      className={`w-100 rounded-0 alert alert-danger d-flex justify-content-center border border-3`}
      onClick={clear}
    >
      <i className="bi bi-exclamation-octagon me-2 fs-4 text-danger"></i>
      <span className="align-self-center">{alert.message}</span>
    </button>
  ) : (
    <></>
  );
};

export default Alert;
