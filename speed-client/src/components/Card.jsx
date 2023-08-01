function Card({ name, src, value, flip, innerRef, number, hover }) {
  return (
    <div
      ref={innerRef}
      className={`d-flex flex-column flex-grow-1 me-2 ${number ? "border " : ""}
     `}
      style={{ maxWidth: "125px", transform: flip ? "rotate(180deg)" : "" }}
      value={value}
    >
      {number && (
        <div>
          <span
            className={`text-warning bg-dark px-2 
          `}
          >
            {number}
          </span>
        </div>
      )}
      <div
        className={`d-flex flex-grow-1
      ${hover ? "bg-dark p-3" : ""} `}
      >
        <img
          className={`img-fluid ${hover ? "opacity-25" : ""}`}
          src={src}
          alt={name}
        />
      </div>
    </div>
  );
}

export default Card;
