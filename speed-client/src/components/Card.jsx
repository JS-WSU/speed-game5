import React from "react";

function Card({ name, src, value }) {
  return (
    <div className="d-flex  me-2" style={{ maxWidth: "125px" }} value={value}>
      <img className="w-100" src={src} alt={name} />
    </div>
  );
}

export default Card;
