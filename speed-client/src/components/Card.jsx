function Card({ name, src, value, flip, innerRef }) {
  return (
    <div
      ref={innerRef}
      className={`d-flex flex-grow-1 me-2`}
      style={{ maxWidth: "125px", transform: flip ? "rotate(180deg)" : "" }}
      value={value}
    >
      <img className="img-fluid" src={src} alt={name} />
    </div>
  );
}

export default Card;
