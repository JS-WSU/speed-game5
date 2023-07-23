import moment from "moment";

function MessageBubble({ username, body, date, dateIsVisible }) {
  const convertedDate = moment(new Date(date)).fromNow();

  return (
    <div className="ms-1 d-flex flex-column p-3">
      <div className={`d-flex flex-row`}>
        <div
          className={`d-flex flex-column
        ${username === localStorage.getItem("userSession") ? "ms-auto" : ""}
        `}
        >
          <div className="d-flex flex-row">
            <div>
              <div
                className={`card ${
                  username === localStorage.getItem("userSession")
                    ? "ms-auto"
                    : "me-auto"
                }`}
              >
                <div
                  className={`card-body p-2 
                    ${
                      username === localStorage.getItem("userSession")
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
                    username === localStorage.getItem("userSession")
                      ? "align-self-end"
                      : ""
                  }
                `}
              >
                {" "}
                {username}
              </div>
            </div>
            {dateIsVisible ? (
              <div
                className={`text-secondary align-baseline

                `}
              >
                {convertedDate}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MessageBubble;
