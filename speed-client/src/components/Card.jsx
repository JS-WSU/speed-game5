import React from "react";

function Card({ name, src, value, flip }) {
  return (
    <div className="d-flex flex-grow-1 me-2" style={{ maxWidth: "125px" }} value={value}>
      <img
        className="w-100"
        src={src}
        alt={name}
        style={{ transform: flip ? "rotate(180deg)" : "" }}
      />
    </div>
  );
}

export default Card;
