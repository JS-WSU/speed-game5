import { useState } from "react";
import { useDrag } from "react-dnd";

function Card({ name, src, value }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "card",
    item: { name, src, value },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    options: "copy",
  }));

  return (
    <div
      className={`d-flex flex-grow-1 me-2`}
      style={{ maxWidth: "175px" }}
      value={value}
      ref={drag}
    >
      <img draggable="false" className="img-fluid align-self-center" src={src} alt={name} />
    </div>
  );
}

export default Card;
