import axios from "axios";
import React, { useState } from "react";

export default function HelloWorld() {
  const [record, setRecord] = useState(null);
  const getJohn = async () => {
    try {
      let { data } = await axios.get("http://localhost:4000/records/john");
      setRecord(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div>Hello World!</div>
      {record &&
        Object.keys(record[0]).map((key, index) => {
          console.log(record[0]);
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
