import React, { useState } from "react";
import axios from "axios";

function App() {
  axios.defaults.withCredentials = true;
  const [record, setRecord] = useState(null);
  async function getJohn() {
    try {
      let { data } = await axios.get("http://localhost:4000/records/john");
      setRecord(data);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>
      <div>Hello World!</div>
      {record &&
        Object.keys(record[0]).map((key, index) => {
          console.log(record)
          return (
            <div key={index}>
              <div>
                {key}: {record[0][key]}
              </div>
            </div>
          );
        })}
      <button onClick={getJohn}>Click Me!</button>
    </div>
  );
}

export default App;
