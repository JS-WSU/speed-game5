import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";

function Chat() {
  const [messageHistory, setMessageHistory] = useState({
    username: "",
    body: "",
    date: null,
  });

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { chatHistory } = axios.get(`http://localhost:4000/chat/`);
        setMessageHistory({
          ...messageHistory,
          username: chatHistory.username,
          body: chatHistory.body,
          date: chatHistory.date,
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchMessages();
  }, []);

  const messages = ["You up for round 2?", "Well Played", "GG", "I AM SPEED"];

  return (
    <div className="border-start border-dark w-25">
      <div className="h-100">
        <div className="p-2 h4 border-bottom border-dark text-primary">
          Chat
        </div>
        <div className="h-75">
          <div>{messageHistory.body}</div>
        </div>
        <div className="border-top border-dark p-1">
          {messages.map((value) => (
            <button type="button" className="btn btn-primary m-1" key={value}>
              {value}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Chat;
