import { useDrag } from "react-dnd";
import Card from "./Card";

function CardDraggableCalifornia({ src, number }) {
  const [, drag] = useDrag(() => ({
    type: "card",
    item: number,
  }));

  return <Card californiaRef={drag} src={src} number={number} />;
}

export default CardDraggableCalifornia;
