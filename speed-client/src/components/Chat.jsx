import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import MessageBubble from "./MessageBubble.jsx";

function Chat() {
  const [messageHistory, setMessageHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMessages = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(`http://localhost:4000/chat/`);
        console.log(data);
        data.map((chatMessage) =>
          setMessageHistory((prevMessages) => [
            ...prevMessages,
            {
              username: chatMessage.username,
              body: chatMessage.body,
              date: chatMessage.date,
            },
          ])
        );
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchMessages();
  }, []);

  const messages = [
    "I AM SPEED",
    "That was fun",
    "GG",
    "Are you ready to rumble!?",
    "Anyone up for a game?",
    "Well Played",
  ];

  function handleSendMessage(e) {
    e.preventDefault();
    console.log(e.target.value);
    console.log(JSON.parse(localStorage.getItem("userSession")).username);
    try {
      const { data } = axios.post(`http://localhost:4000/chat/sendMessage`, {
        username: JSON.parse(localStorage.getItem("userSession")).username,
        body: e.target.value,
        date: Date(),
      });
      console.log(JSON.stringify(data));
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      {loading ? (
        <div className="d-flex flex-column align-items-center">
          <h2>Loading Chat...</h2>
          <div class="spinner-border text-secondary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="border-start border-end border-3 border-secondary">
          <div className="">
            <div className="p-2 h4 border-bottom border-3 border-secondary text-primary">
              Chat
            </div>
            <div className="p-1 overflow-auto " style={{ maxHeight: "450px" }}>
              {messageHistory.map((chatMessage) => (
                <MessageBubble
                  username={chatMessage.username}
                  body={chatMessage.body}
                  date={chatMessage.date}
                />
              ))}
            </div>
            <div className="border-top border-bottom border-3 border-secondary">
              {messages.map((value) => (
                <button
                  type="button"
                  className="btn btn-primary m-1"
                  key={value}
                  value={value}
                  onClick={handleSendMessage}
                >
                  {value}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Chat;
