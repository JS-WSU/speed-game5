import { useState } from "react";
import { useDrag } from "react-dnd";
import Draggable from "react-draggable";

function Card({ name, src, value }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "card",
    item: { name, src, value },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <Draggable>
      <div
        className={`d-flex flex-grow-1 me-2`}
        style={{ maxWidth: "125px" }}
        value={value}
        ref={drag}
      >
        <img
          draggable="false"
          className="img-fluid"
          src={src}
          alt={name}
          style={{ maxWidth: "125px" }}
        />
      </div>
    </Draggable>
  );
}

export default Card;
