import React from "react";
import Card from "../../Card";

function PlayerOneRunning({ game, socket, quitGame }) {
  console.log(game);
  let opponentHand = [];
  for (let i = 0; i < game.playerTwo.hand; i++) {
    opponentHand.push(<Card src="/img/PNG-cards-1.3/cardback.png" />);
  }
  return (
    <div className="d-flex flex-column flex-grow-1">
      <div className="d-flex">
        <div className="d-flex flex-column">
          <p>Opponent {game.playerTwo.name} </p>
          <Card src="/img/PNG-cards-1.3/cardback.png" />
          <p>Deck Size: {game.playerTwo.drawPile} </p>
        </div>
        <div className="d-flex">{opponentHand.map((card) => card)}</div>
        <div className="bg-secondary ms-auto p-3">
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
        <div>
          <button onClick={quitGame} className="btn btn-danger">
            Quit Game
          </button>
        </div>
        <div className="d-flex">
          {game.playerOne.hand.map((card) => (
            <Card name={card.name} src={card.src} value={card.value} />
          ))}
        </div>
        <div className="d-flex flex-column">
          <p>{game.playerOne.name} </p>
          <Card src="/img/PNG-cards-1.3/cardback.png" />
          <p>Deck Size: {game.playerOne.drawPile} </p>
        </div>
      </div>
    </div>
  );
}

export default PlayerOneRunning;
