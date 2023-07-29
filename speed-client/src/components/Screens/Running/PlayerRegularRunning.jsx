import React from "react";
import Card from "../../Card";
import { UserTypes } from "../../../utils/Constants.mjs";

function PlayerRegularRunning({ game, socket, quitGame }) {
  console.log(game);
  let opponentHand = [];

  const opponentHandLength =
    JSON.parse(localStorage.getItem("gameInSession")).userType ===
    UserTypes.PLAYER_ONE
      ? game.playerTwo.hand
      : game.playerOne.hand;

  for (let i = 0; i < opponentHandLength; i++) {
    opponentHand.push(<Card src="/img/PNG-cards-1.3/cardback.png" />);
  }
  return (
    <div className="row text-light g-3 flex-grow-1">
      <div className="d-flex">
        <div className="d-flex flex-column text-center me-auto">
          <p className="m-0">
            {JSON.parse(localStorage.getItem("gameInSession")).userType ===
            UserTypes.PLAYER_ONE
              ? game.playerTwo.name
              : game.playerOne.name}{" "}
          </p>
          <Card src="/img/PNG-cards-1.3/cardback.png" />
          <p className="m-0">
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
          {game.viewers.map((viewer) => (
            <div>{viewer}</div>
          ))}
        </div>
      </div>
      <div className="d-flex justify-content-center">
        <Card src="/img/PNG-cards-1.3/cardback.png" />
        {JSON.parse(localStorage.getItem("gameInSession")).userType ===
        UserTypes.PLAYER_ONE ? (
          <>
            <Card
              name={game.playerTwo.fieldCards[0].name}
              src={game.playerTwo.fieldCards[0].src}
              value={game.playerTwo.fieldCards[0].value}
            />
            <Card
              name={game.playerOne.fieldCards[0].name}
              src={game.playerOne.fieldCards[0].src}
              value={game.playerOne.fieldCards[0].value}
            />
          </>
        ) : (
          <>
            <Card
              name={game.playerOne.fieldCards[0].name}
              src={game.playerOne.fieldCards[0].src}
              value={game.playerOne.fieldCards[0].value}
            />
            <Card
              name={game.playerTwo.fieldCards[0].name}
              src={game.playerTwo.fieldCards[0].src}
              value={game.playerTwo.fieldCards[0].value}
            />
          </>
        )}

        <Card src="/img/PNG-cards-1.3/cardback.png" />
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
            ? game.playerOne.hand.map((card) => (
                <Card name={card.name} src={card.src} value={card.value} />
              ))
            : game.playerTwo.hand.map((card) => (
                <Card name={card.name} src={card.src} value={card.value} />
              ))}
        </div>
        <div className="d-flex flex-column text-center ms-auto">
          <p>{game.playerOne.name} </p>
          <Card src="/img/PNG-cards-1.3/cardback.png" />
          <p>Deck Size: {game.playerOne.drawPile} </p>
        </div>
      </div>
    </div>
  );
}

export default PlayerRegularRunning;
