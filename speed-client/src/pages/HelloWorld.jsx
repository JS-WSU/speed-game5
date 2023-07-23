import axios from "axios";
import React, { useContext, useState } from "react";
import AlertContext from "../context/AlertContext";
import GetErrorMessage from "../utils/GetErrorMessage.mjs";

export default function HelloWorld() {
  const [record, setRecord] = useState(null);
  const alertContext = useContext(AlertContext);

  const getJohn = async () => {
    try {
      let { data } = await axios.get("http://localhost:4000/records/john");
      setRecord(data);
    } catch (error) {
      console.log(error.message);
      alertContext.error(GetErrorMessage(error));
    }
  };

  return (
    <main className="container">
      <div>
        <h1>Hello World!</h1>
        <button className="btn btn-primary border border-3" onClick={getJohn}>
          Click Me!
        </button>
      </div>
      {record &&
        Object.keys(record).map((key, index) => {
          console.log(record);
          return (
            <div key={index}>
              <div>
                {key}: {record[key]}
              </div>
            </div>
          );
        })}
    </main>
  );
}
