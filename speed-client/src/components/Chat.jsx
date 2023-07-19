import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import MessageBubble from "./MessageBubble.jsx";
import { MessageTypes } from "../utils/Constants.mjs";

function Chat({ loadingChat, messages, handleSendMessage }) {
  return (
    <>
      {loadingChat ? (
        <div className="d-flex flex-column align-items-center m-auto">
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
                style={{ height: "70vh" }}
              >
                {messages.length ? (
                  messages.map((chatMessage, index) => (
                    <MessageBubble
                      username={chatMessage.username}
                      body={chatMessage.body}
                      date={chatMessage.createdAt}
                      key={index}
                    />
                  ))
                ) : (
                  <div className="m-auto">Chat currently empty</div>
                )}
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
