import Card from "../../../Card";
import CardDraggable from "../../../CardDraggable";
import { UserTypes } from "../../../../utils/Constants.mjs";
import { useDrop } from "react-dnd";

function PlayerRegularRunning({ game, socket, quitGame }) {
  let opponentHand = [];

  const [{ isOverPlayerOneField }, dropPlayerOneField] = useDrop(() => ({
    accept: "card",
    drop: (card) => {
      console.log(card);
    },
    collect: (monitor) => ({
      isOverPlayerTwoField: monitor.isOver(),
    }),
  }));
  const [{ isOverPlayerTwoField }, dropPlayerTwoField] = useDrop(() => ({
    accept: "card",
    drop: (card) => {
      console.log(card);
    },
    collect: (monitor) => ({
      isOverPlayerOneField: monitor.isOver(),
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
              number={game.playerTwo.fieldCards.length}
            />
            <Card
              innerRef={dropPlayerOneField}
              name={game.playerOne.fieldCards[0].name}
              src={game.playerOne.fieldCards[0].src}
              number={game.playerOne.fieldCards.length}
            />
          </>
        ) : (
          <>
            <Card
              innerRef={dropPlayerOneField}
              name={game.playerOne.fieldCards[0].name}
              src={game.playerOne.fieldCards[0].src}
              number={game.playerOne.fieldCards.length}
            />
            <Card
              innerRef={dropPlayerTwoField}
              name={game.playerTwo.fieldCards[0].name}
              src={game.playerTwo.fieldCards[0].src}
              number={game.playerTwo.fieldCards.length}
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
