import React from "react";

function MessageBubble({ username, body, date }) {
  const currentDate = new Date();
  console.log(date);
  console.log(currentDate);
  let dateDiff = currentDate - Date.parse(date);
  console.log(dateDiff);
  var messageSentTime = Math.floor(dateDiff / 1000 / 60);

  if (messageSentTime > 1440)
    messageSentTime = Math.floor(messageSentTime / 60 / 24).toString() + " hours ago";
  else if (messageSentTime > 60)
    messageSentTime = Math.floor(messageSentTime / 60).toString() + " minutes ago";

  return (
    <div className="mb-3 ms-1">
      <div className="d-flex flex-row">
        <div class="card">
          <div class="card-body">{body}</div>
        </div>
        <div className="text-muted h8">{messageSentTime}</div>
      </div>
      <div>{username}</div>
    </div>
  );
}

export default MessageBubble;
