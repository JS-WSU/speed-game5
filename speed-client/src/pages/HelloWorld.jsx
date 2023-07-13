import axios from "axios";
import React, { useState } from "react";

export default function HelloWorld() {
  const [record, setRecord] = useState(null);
  const getJohn = async () => {
    try {
      let { data } = await axios.get("http://localhost:4000/records/john");
      setRecord(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <main className="container">
      <div>
        <h1>Hello World!</h1>
        <button className="btn btn-primary" onClick={getJohn}>
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
