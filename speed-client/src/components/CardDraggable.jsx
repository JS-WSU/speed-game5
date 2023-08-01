import { useDrag } from "react-dnd";

function CardDraggable({ name, src, value }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "card",
    item: { name, src, value },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      className={`d-flex flex-grow-1 me-2 ${isDragging ? "opacity-0" : ""}`}
      style={{
        maxWidth: "125px",
      }}
      value={value}
      ref={drag}
      draggable
      onDragStart={() => {
        console.log(`name ${name} src ${src} value ${value}`);
      }}
    >
      <img className="img-fluid" src={src} alt={name} />
    </div>
  );
}

export default CardDraggable;
