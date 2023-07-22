import MessageBubble from "./MessageBubble.jsx";
import { MessageTypes } from "../utils/Constants.mjs";
import { useEffect, useState } from "react";

function Chat({ socket }) {
  const [dateIsVisible, setDateIsVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState([]);

  function handleShowDate() {
    setDateIsVisible(!dateIsVisible);
  }

  function handleSendMessage(e) {
    socket.emit("new_chat_message", {
      username: JSON.parse(localStorage.getItem("userSession")).username,
      body: e.target.value,
    });
  }

  useEffect(() => {
    const GetMessages = (messages) => {
      setMessages(messages.reverse());
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    };
    const GetNewMessage = (message) => {
      setMessages((prev) => [message, ...prev]);
    };

    socket.on("chat_messages", GetMessages);
    socket.on("new_chat_message", GetNewMessage);

    const interval = setInterval(() => {
      socket.emit("update_chat_messages");
    }, 1000);

    return () => {
      socket.off("chat_messages", GetMessages);
      socket.off("new_chat_message", GetNewMessage);

      clearInterval(interval);
    };
  }, [socket]);

  return (
    <div className="w-100 h-100">
      {loading ? (
        <div className="d-flex flex-column align-items-center m-auto">
          <h2>Loading Chat...</h2>
          <div className="spinner-border text-secondary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div>
          <div
            className="border-start border-1 border-secondary"
            onClick={handleShowDate}
          >
            <div className="d-flex flex-column">
              <div className="p-2 h4 border-bottom border-1 border-secondary text-primary">
                Chat
              </div>
              <div className="flex-grow-1">
                <div
                  className="p-1 overflow-auto d-flex flex-column-reverse"
                  style={{ height: "70vh" }}
                >
                  {messages.length ? (
                    messages.map((chatMessage, index) => (
                      <MessageBubble
                        username={chatMessage.username}
                        body={chatMessage.body}
                        date={chatMessage.createdAt}
                        dateIsVisible={dateIsVisible}
                        key={index}
                      />
                    ))
                  ) : (
                    <div className="m-auto">Chat currently empty</div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="border-top border-bottom border-start border-1 border-secondary">
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
      )}
    </div>
  );
}

export default Chat;
