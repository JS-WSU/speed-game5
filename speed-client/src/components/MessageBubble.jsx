import React from "react";
import moment from "moment";
import { format } from "date-fns";

function MessageBubble({ username, body, date, userSession }) {
  const DateTest = new Date(date);

  const convertedDate = moment(DateTest).fromNow();

  return (
    <div className="mb-3 ms-1 d-flex flex-column p-3">
      <div className={`d-flex flex-row`}>
        <div
          className={`d-flex flex-column
        ${username === userSession.username ? "ms-auto" : ""}
        `}
        >
          <div
            className={`text-secondary  ${
              username === userSession.username ? "align-self-end" : ""
            }
        `}
          >
            {convertedDate}
          </div>

          <div
            className={`card ${
              username === userSession.username ? "ms-auto" : ""
            }`}
          >
            <div
              className={`card-body p-2 ${
                username === userSession.username
                  ? "bg-primary text-light rounded"
                  : ""
              }`}
            >
              {body}
            </div>
          </div>
          <div
            className={`
       ${username === userSession.username ? "align-self-end" : ""}`}
          >
            {" "}
            {username}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MessageBubble;
