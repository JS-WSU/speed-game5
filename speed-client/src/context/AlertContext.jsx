import React, { useState } from "react";

const AlertContext = React.createContext({});

const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState(null);
  // const [alertText, setAlertText] = useState(null);

  const success = (message) => {
    // setAlertText(text);
    setAlert({ status: "success", message });
    setTimeout(() => {
      clear();
    }, 3000);
  };

  const error = (message) => {
    // setAlertText(text);
    setAlert({ status: "error", message });
    setTimeout(() => {
      clear();
    }, 3000);
  };

  const clear = () => {
    setAlert(null);
  };

  return (
    <AlertContext.Provider
      value={{
        success,
        error,
        clear,
        alert,
      }}
    >
      {children}
    </AlertContext.Provider>
  );
};

export { AlertProvider };
export default AlertContext;
