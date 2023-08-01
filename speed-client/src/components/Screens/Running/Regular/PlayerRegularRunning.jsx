import Card from "../../../Card";
import CardDraggable from "../../../CardDraggable";
import { UserTypes } from "../../../../utils/Constants.mjs";
import { useDrop } from "react-dnd";
import { useContext } from "react";
import AlertContext from "../../../../context/AlertContext";

function PlayerRegularRunning({ game, socket, quitGame }) {
  let opponentHand = [];

  const alertContext = useContext(AlertContext);

  const [{ isOverPlayerOneField }, dropPlayerOneField] = useDrop(() => ({
    accept: "card",
    drop: (card) => {
      console.log(card);
      console.log(game.playerOne.fieldCards[0]);
      if (
        card.value === game.playerOne.fieldCards[0].value + 1 ||
        card.value === game.playerOne.fieldCards[0].value - 1 ||
        (card.value === 13 && game.playerOne.fieldCards[0].value === 1) ||
        (card.value === 1 && game.playerOne.fieldCards[0].value === 13)
      ) {
        socket.emit(
          "place_card",
          JSON.parse(localStorage.getItem("gameInSession")).hostName,
          card,
          UserTypes.PLAYER_ONE
        );
      } else {
        alertContext.error(
          `Invalid play, card ${card.name} is not one value higher or lower than card ${game.playerOne.fieldCards[0].name}`
        );
      }
    },
    collect: (monitor) => ({
      isOverPlayerOneField: monitor.isOver(),
    }),
  }));

  const [{ isOverPlayerTwoField }, dropPlayerTwoField] = useDrop(() => ({
    accept: "card",
    drop: (card) => {
      console.log(card);
      console.log(game.playerTwo.fieldCards[0]);
      if (
        card.value === game.playerTwo.fieldCards[0].value + 1 ||
        card.value === game.playerTwo.fieldCards[0].value - 1 ||
        (card.value === 13 && game.playerTwo.fieldCards[0].value === 1) ||
        (card.value === 1 && game.playerTwo.fieldCards[0].value === 13)
      ) {
        socket.emit(
          "place_card",
          JSON.parse(localStorage.getItem("gameInSession")).hostName,
          card,
          UserTypes.PLAYER_TWO
        );
      } else {
        alertContext.error(
          `Invalid play, card ${card.name} is not one value higher or lower than card ${game.playerTwo.fieldCards[0].name}`
        );
      }
    },
    collect: (monitor) => ({
      isOverPlayerTwoField: monitor.isOver(),
    }),
  }));

  const opponentHandLength =
    JSON.parse(localStorage.getItem("gameInSession")).userType ===
    UserTypes.PLAYER_ONE
      ? game.playerTwo.hand
      : game.playerOne.hand;

  for (let i = 0; i < opponentHandLength; i++) {
    opponentHand.push(<Card key={i} src="/img/PNG-cards-1.3/cardback.png" />);
  }
  return (
    <div className="row text-light g-3 flex-grow-1">
      <div className="d-flex">
        <div className="d-flex flex-column text-center me-auto">
          <p>
            {JSON.parse(localStorage.getItem("gameInSession")).userType ===
            UserTypes.PLAYER_ONE
              ? game.playerTwo.name
              : game.playerOne.name}{" "}
          </p>
          <Card src="/img/PNG-cards-1.3/cardback.png" />
          <p>
            Deck Size:{" "}
            {JSON.parse(localStorage.getItem("gameInSession")).userType ===
            UserTypes.PLAYER_ONE
              ? game.playerTwo.drawPile
              : game.playerOne.drawPile}{" "}
          </p>
        </div>
        <div className="d-flex justify-content-evenly">
          {opponentHand.map((card) => card)}
        </div>
        <div className="bg-secondary align-self-start p-3 ms-auto">
          Viewers:
          {game.viewers.map((viewer, index) => (
            <div key={index}>{viewer}</div>
          ))}
        </div>
      </div>
      <div className="d-flex justify-content-center">
        <Card
          src="/img/PNG-cards-1.3/cardback.png"
          number={
            JSON.parse(localStorage.getItem("gameInSession")).userType ===
            UserTypes.PLAYER_ONE
              ? game.playerTwo.sidePile
              : game.playerOne.sidePile
          }
        />
        {JSON.parse(localStorage.getItem("gameInSession")).userType ===
        UserTypes.PLAYER_ONE ? (
          <>
            <Card
              innerRef={dropPlayerTwoField}
              name={game.playerTwo.fieldCards[0].name}
              src={game.playerTwo.fieldCards[0].src}
              value={game.playerTwo.fieldCards[0].value}
              number={game.playerTwo.fieldCards.length}
              hover={isOverPlayerTwoField}
            />
            <Card
              innerRef={dropPlayerOneField}
              name={game.playerOne.fieldCards[0].name}
              src={game.playerOne.fieldCards[0].src}
              value={game.playerOne.fieldCards[0].value}
              number={game.playerOne.fieldCards.length}
              hover={isOverPlayerOneField}
            />
          </>
        ) : (
          <>
            <Card
              innerRef={dropPlayerOneField}
              name={game.playerOne.fieldCards[0].name}
              src={game.playerOne.fieldCards[0].src}
              value={game.playerOne.fieldCards[0].value}
              number={game.playerOne.fieldCards.length}
              hover={isOverPlayerOneField}
            />
            <Card
              innerRef={dropPlayerTwoField}
              name={game.playerTwo.fieldCards[0].name}
              src={game.playerTwo.fieldCards[0].src}
              value={game.playerTwo.fieldCards[0].value}
              number={game.playerTwo.fieldCards.length}
              hover={isOverPlayerTwoField}
            />
          </>
        )}
        <Card
          src="/img/PNG-cards-1.3/cardback.png"
          number={
            JSON.parse(localStorage.getItem("gameInSession")).userType ===
            UserTypes.PLAYER_ONE
              ? game.playerOne.sidePile
              : game.playerTwo.sidePile
          }
        />
      </div>
      <div className="d-flex justify-content-center">
        <button
          onClick={quitGame}
          className="btn btn-danger align-self-end me-auto"
        >
          Quit Game
        </button>
        <div className="d-flex">
          {JSON.parse(localStorage.getItem("gameInSession")).userType ===
          UserTypes.PLAYER_ONE
            ? game.playerOne.hand.map((card, index) => (
                <CardDraggable
                  key={index}
                  name={card.name}
                  src={card.src}
                  value={card.value}
                />
              ))
            : game.playerTwo.hand.map((card, index) => (
                <CardDraggable
                  key={index}
                  name={card.name}
                  src={card.src}
                  value={card.value}
                />
              ))}
        </div>
        <div className="d-flex flex-column text-center ms-auto">
          <p>
            {" "}
            {JSON.parse(localStorage.getItem("gameInSession")).userType ===
            UserTypes.PLAYER_ONE
              ? game.playerOne.name
              : game.playerTwo.name}{" "}
          </p>
          <Card src="/img/PNG-cards-1.3/cardback.png" />
          <p>
            Deck Size:{" "}
            {JSON.parse(localStorage.getItem("gameInSession")).userType ===
            UserTypes.PLAYER_ONE
              ? game.playerOne.drawPile
              : game.playerTwo.drawPile}{" "}
          </p>
        </div>
      </div>
    </div>
  );
}

export default PlayerRegularRunning;