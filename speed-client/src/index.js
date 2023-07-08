import React, {useState} from 'react';
import ReactDOM from 'react-dom/client';
import axios from "axios";
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";
const root = ReactDOM.createRoot(document.getElementById('root'));

const App = () => {
  axios.defaults.withCredentials = true;
  const [message, setMessage] = useState("");
  async function getHello(){
    await axios
    .get("http://localhost:4000/hello")
    .then((res) => {
      setMessage(res.data);
    })
    .catch((err) => {
      console.log(err.message);
    });
  }
  return (
    <div>
      <div>{message}</div>
      <button onClick={getHello}>Click Me!</button>
    </div>
  )
}

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
