import React from "react";
import Card from "../../Card";

function PlayerTwoRegularRunning({ game, socket, quitGame }) {
  let opponentHand = [];
  for (let i = 0; i < game.playerOne.hand; i++) {
    opponentHand.push(<Card src="/img/PNG-cards-1.3/cardback.png"></Card>);
  }
  return (
    <div className="d-flex flex-column flex-grow-1 text-light">
      <div className="d-flex">
        <div className="d-flex flex-column">
          <p>Opponent {game.playerOne.name} </p>
          <Card src="/img/PNG-cards-1.3/cardback.png" />
          <p>Deck Size: {game.playerOne.drawPile} </p>
        </div>
        <div className="d-flex">{opponentHand.map((card) => card)}</div>
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
          name={game.playerOne.fieldCards[0].name}
          src={game.playerOne.fieldCards[0].src}
          value={game.playerOne.fieldCards[0].value}
        />
        <Card
          name={game.playerTwo.fieldCards[0].name}
          src={game.playerTwo.fieldCards[0].src}
          value={game.playerTwo.fieldCards[0].value}
        />
        <Card src="/img/PNG-cards-1.3/cardback.png" />
      </div>
      <div className="d-flex">
        <div>
          <button onClick={quitGame} className="btn btn-danger">
            Quit Game
          </button>
        </div>
        <div className="d-flex">
          {game.playerTwo.hand.map((card) => (
            <Card name={card.name} src={card.src} value={card.value} />
          ))}
        </div>
        <div className="d-flex flex-column">
          <p>{game.playerTwo.name} </p>
          <Card src="/img/PNG-cards-1.3/cardback.png" />
          <p>Deck Size: {game.playerTwo.drawPile} </p>
        </div>
      </div>
    </div>
  );
}

export default PlayerTwoRegularRunning;
