function Card({ name, src, value, flip, innerRef, number }) {
  return (
    <div
      ref={innerRef}
      className={`d-flex-column flex-grow-1 me-2`}
      style={{ maxWidth: "125px", transform: flip ? "rotate(180deg)" : "" }}
      value={value}
    >
      {number && <div className="position-absolute text-warning bg-dark p-2 ">{number}</div>}
      <img className="img-fluid align-self-center" src={src} alt={name} />
    </div>
  );
}

export default Card;
