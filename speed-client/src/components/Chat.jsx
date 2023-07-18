import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import MessageBubble from "./MessageBubble.jsx";
import { io } from "socket.io-client";
import { MessageTypes } from "../utils/Constants.mjs";

const socket = io.connect("http://localhost:4000/chat", { autoConnect: false });
function Chat() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const GetMessages = (messages) => {
      setMessages(messages.reverse());
      setLoading(false);
    };
    const GetNewMessage = (message) => {
      setMessages((prev) => [message, ...prev]);
    };
    socket.connect();
    socket.on("new_chat_message", GetNewMessage);

    socket.on("chat_messages", GetMessages);

    return () => {
      socket.off("chat_messages", GetMessages);
      socket.off("new_chat_message", GetNewMessage);
      socket.disconnect();
    };
  }, []);

  function handleSendMessage(e) {
    socket.emit("new_chat_message", {
      username: JSON.parse(localStorage.getItem("userSession")).username,
      body: e.target.value,
    });
  }

  return (
    <>
      {loading ? (
        <div className="d-flex flex-column align-items-center">
          <h2>Loading Chat...</h2>
          <div className="spinner-border text-secondary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="border-start border-end border-3 border-secondary">
          <div className="d-flex flex-column">
            <div className="p-2 h4 border-bottom border-3 border-secondary text-primary">
              Chat
            </div>
            <div className="flex-grow-1">
              <div
                className="p-1 overflow-auto d-flex flex-column-reverse"
                style={{ maxHeight: "70vh" }}
              >
                {messages.map((chatMessage, index) => (
                  <MessageBubble
                    username={chatMessage.username}
                    body={chatMessage.body}
                    date={chatMessage.createdAt}
                    key={index}
                  />
                ))}
              </div>
            </div>

            <div className="border-top border-bottom border-3 border-secondary">
              {MessageTypes.map((value) => (
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
