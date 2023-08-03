import React from "react";
import Card from "../../../Card";

function ViewerRegularRunning({
  game,
  quitGame,
  drawingSidePile,
  shufflingSidePile,
}) {
  return (
    <div className="row text-light g-3 flex-grow-1">
      {game.playerOne.unableToPlay ? (
        <div className="bg-danger mt-0 text-center">
          {game.playerOne.name} unable to play!
        </div>
      ) : null}
      {game.playerTwo.unableToPlay ? (
        <div className="bg-danger mt-1 text-center">
          {game.playerTwo.name} unable to play!
        </div>
      ) : null}
      <div className="d-flex">
        <div className="d-flex flex-column text-center me-auto">
          <Card
            src="/img/PNG-cards-1.3/cardback.png"
            number={game.playerTwo.sidePile}
          />
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
      {drawingSidePile ? (
        <h2 className="m-auto text-center bg-info">
          Nobody can play! Drawing a card from each player's side pile...
        </h2>
      ) : shufflingSidePile ? (
        <h2 className="m-auto text-center bg-info">
          Side piles empty! Reshuffling...
        </h2>
      ) : (
        <div className="d-flex justify-content-center">
          <Card
            src="/img/PNG-cards-1.3/cardback.png"
            number={game.playerTwo.sidePile}
          />
          <Card
            name={game.playerTwo.fieldCards[0].name}
            src={game.playerTwo.fieldCards[0].src}
            value={game.playerTwo.fieldCards[0].value}
            number={game.playerTwo.fieldCards.length}
          />
          <Card
            name={game.playerOne.fieldCards[0].name}
            src={game.playerOne.fieldCards[0].src}
            value={game.playerOne.fieldCards[0].value}
            number={game.playerOne.fieldCards.length}
          />
          <Card
            src="/img/PNG-cards-1.3/cardback.png"
            number={game.playerOne.sidePile}
          />
        </div>
      )}
      <div className="d-flex justify-content-center">
        <button
          onClick={quitGame}
          className="btn btn-danger align-self-end me-auto"
        >
          Quit Watching Game
        </button>
        <div className="d-flex">
          {game.playerOne.hand.map((card) => (
            <Card name={card.name} src={card.src} />
          ))}
        </div>
        <div className="d-flex flex-column text-center ms-auto">
          <Card
            src="/img/PNG-cards-1.3/cardback.png"
            number={game.playerOne.sidePile}
          />
        </div>
      </div>
    </div>
  );
}

export default ViewerRegularRunning;
