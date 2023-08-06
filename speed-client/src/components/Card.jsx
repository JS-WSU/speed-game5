function Card({
  name,
  src,
  value,
  flip,
  innerRef,
  number,
  hover,
  onClick,
  small,
  smallCard,
  californiaRef,
}) {
  return (
    <div
      ref={innerRef}
      className={`d-flex flex-column flex-grow-1 me-2  ${
        number || number === 0 ? "border" : ""
      }
     `}
      style={{
        maxWidth: smallCard ? "100px" : "125px",
        cursor: onClick && number ? "pointer" : "auto",
      }}
      value={value}
      onClick={number ? onClick : null}
    >
      {(number || number === 0) && (
        <div className={`align-self-center`}>
          <span
            className={`text-warning bg-dark px-2 
          `}
          >
            {number}
          </span>
        </div>
      )}
      <div
        ref={californiaRef}
        className={`d-flex flex-grow-1
      ${hover ? "bg-dark p-3" : ""} `}
      >
        <img
          className={`img-fluid ${hover ? "opacity-25" : ""} ${
            number === 0 ? "opacity-0" : "opacity-100"
          } ${small ? "align-self-center" : ""} 
          ${number || number === 0 ? "p-2" : ""}`}
          src={src}
          alt={name}
          style={{ transform: flip ? "rotate(180deg)" : "" }}
        />
      </div>
    </div>
  );
}

export default Card;
