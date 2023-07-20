import moment from "moment";

function MessageBubble({ username, body, date, dateIsVisible}) {
  const convertedDate = moment(new Date(date)).fromNow();

  return (
    <div className="ms-1 d-flex flex-column p-3">
      <div className={`d-flex flex-row`}>
        <div
          className={`d-flex flex-column
        ${
          username === JSON.parse(localStorage.getItem("userSession")).username
            ? "ms-auto"
            : ""
        }
        `}
        >
          <div className="d-flex flex-row">
            <div>
              <div
                className={`card ${
                  username ===
                  JSON.parse(localStorage.getItem("userSession")).username
                    ? "ms-auto"
                    : "me-auto"
                }`}
              >
                <div
                  className={`card-body p-2 
                    ${
                      username ===
                      JSON.parse(localStorage.getItem("userSession")).username
                        ? "bg-primary text-light rounded"
                        : ""
                    }
                  `}
                >
                  {body}
                </div>
              </div>
              <div
                className={`
                  ${
                    username ===
                    JSON.parse(localStorage.getItem("userSession")).username
                      ? "align-self-end"
                      : ""
                  }
                `}
              >
                {" "}
                {username}
              </div>
            </div>
            {
              dateIsVisible ? 
              <div
                className={`text-secondary align-baseline

                `}
              >
                {convertedDate}
              </div> 
              : 
              null
            }

          </div>
        </div>
      </div>
    </div>
  );
}

export default MessageBubble;
