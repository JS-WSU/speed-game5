import React from "react";
import Card from "../../Card";

function ViewerRegularRunning({ game, socket, quitGame }) {
  return (
    <div className="d-flex flex-column flex-grow-1 text-light">
      <div className="d-flex">
        <div>
          <button onClick={quitGame} className="btn btn-danger">
            Stop Watching Game
          </button>
        </div>
        <div className="d-flex flex-column">
          <p>Player Two: {game.playerTwo.name} </p>
          <Card src="/img/PNG-cards-1.3/cardback.png" />
          <p>Deck Size: {game.playerOne.drawPile} </p>
        </div>
        <div className="d-flex">
          {game.playerTwo.hand.map((card) => (
            <Card name={card.name} src={card.src} value={card.value} />
          ))}
        </div>
        <div className="bg-secondary align-self-start p-3 ms-auto">
          Viewers:
          {game.viewers.map((viewer) => (
            <div>{viewer}</div>
          ))}
        </div>
      </div>
      <div className="d-flex">
        <Card src="/img/PNG-cards-1.3/cardback.png" />
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
        <Card src="/img/PNG-cards-1.3/cardback.png" />
      </div>
      <div className="d-flex">
        <div className="d-flex">
          {game.playerOne.hand.map((card) => (
            <Card name={card.name} src={card.src} value={card.value} />
          ))}
        </div>
        <div className="d-flex flex-column">
          <p>Player One: {game.playerOne.name} </p>
          <Card src="/img/PNG-cards-1.3/cardback.png" />
          <p>Deck Size: {game.playerOne.drawPile} </p>
        </div>
      </div>
    </div>
  );
}

export default ViewerRegularRunning;
