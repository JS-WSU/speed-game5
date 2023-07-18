import React from "react";

function MessageBubble({ username, body, date }) {
  const currentDate = new Date();
  let dateDiff = currentDate - Date.parse(date);
  var messageSentTime = Math.floor(dateDiff / 1000 / 60);

  if (messageSentTime > 1440)
    messageSentTime =
      Math.floor(messageSentTime / 60 / 24).toString() + " hours ago";
  else if (messageSentTime > 60)
    messageSentTime =
      Math.floor(messageSentTime / 60).toString() + " minutes ago";

  return (
    <div className="mb-3 ms-1 d-flex flex-column p-3">
      <div className={`d-flex flex-row`}>
        <div
          className={`card ${
            username ===
            JSON.parse(localStorage.getItem("userSession")).username
              ? "ms-auto"
              : ""
          }`}
        >
          <div
            className={`card-body p-2 ${
              username ===
              JSON.parse(localStorage.getItem("userSession")).username
                ? "bg-primary text-light rounded"
                : ""
            }`}
          >
            {body}
          </div>
        </div>
        <div
          className={`text-light h8
        `}
        >
          {messageSentTime}
        </div>
      </div>
      <div
        className={`
       ${
         username === JSON.parse(localStorage.getItem("userSession")).username
           ? "align-self-end"
           : ""
       }`}
      >
        {username}
      </div>
    </div>
  );
}

export default MessageBubble;
