import React from "react";
import Card from "../../../Card";

function ViewerRegularRunning({ game, socket, quitGame }) {
  return (
    <div className="row text-light g-3 flex-grow-1">
      <div className="d-flex">
        <div className="d-flex flex-column text-center me-auto">
          <p className="m-0">{game.playerTwo.name} </p>
          <Card src="/img/PNG-cards-1.3/cardback.png" />
          <p className="m-0">Deck Size: {game.playerTwo.drawPile} </p>
        </div>
        <div className="d-flex justify-content-evenly">
          {game.playerTwo.hand.map((card) => (
            <Card
              name={card.name}
              src={card.src}
              value={card.value}
              flip={true}
            />
          ))}
        </div>
        <div className="bg-secondary align-self-start p-3 ms-auto">
          Viewers:
          {game.viewers.map((viewer) => (
            <div>{viewer}</div>
          ))}
        </div>
      </div>
      <div className="d-flex justify-content-center">
        <Card
          src="/img/PNG-cards-1.3/cardback.png"
          number={game.playerTwo.sidePile}
        />
        <Card
          name={game.playerTwo.fieldCards[0].name}
          src={game.playerTwo.fieldCards[0].src}
          number={game.playerTwo.fieldCards.length}
        />
        <Card
          name={game.playerOne.fieldCards[0].name}
          src={game.playerOne.fieldCards[0].src}
          number={game.playerOne.fieldCards.length}
        />
        <Card
          src="/img/PNG-cards-1.3/cardback.png"
          number={game.playerOne.sidePile}
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
          {game.playerOne.hand.map((card) => (
            <Card name={card.name} src={card.src} />
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

export default ViewerRegularRunning;
