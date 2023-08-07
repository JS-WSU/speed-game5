import React from "react";
import Card from "../../../Card";

function ViewerCalifornia({ game, quitGame, noSameValueCards }) {
  return (
    <div className="row text-light g-3 flex-grow-1">
      <div className="d-flex">
        <div className="d-flex flex-column text-center me-auto">
          {game.playerTwo.name}
        </div>
        <div className="d-flex justify-content-evenly">
          {noSameValueCards ? null : (
            <Card
              src="/img/PNG-cards-1.3/cardback.png"
              small={true}
              smallCard={true}
              number={game.playerTwo.deck}
            />
          )}{" "}
        </div>
        <div className="bg-secondary align-self-start p-3 ms-auto">
          Viewers:
          {game.viewers.map((viewer) => (
            <div>{viewer}</div>
          ))}
        </div>
      </div>

      {noSameValueCards ? (
        <h2 className="m-auto text-center bg-info">
          No cards on the field have the same value! Reshuffling each player's
          piles and deck cards...
        </h2>
      ) : (
        <>
          <div className="d-flex justify-content-center">
            <Card
              name={game.playerTwo.fieldCards.pileFour[0].name}
              src={game.playerTwo.fieldCards.pileFour[0].src}
              value={game.playerTwo.fieldCards.pileFour[0].value}
              number={game.playerTwo.fieldCards.pileFour.length}
              flip={true}
              smallCard={true}
            />
            <Card
              name={game.playerTwo.fieldCards.pileThree[0].name}
              src={game.playerTwo.fieldCards.pileThree[0].src}
              value={game.playerTwo.fieldCards.pileThree[0].value}
              number={game.playerTwo.fieldCards.pileThree.length}
              flip={true}
              smallCard={true}
            />
            <Card
              name={game.playerTwo.fieldCards.pileTwo[0].name}
              src={game.playerTwo.fieldCards.pileTwo[0].src}
              value={game.playerTwo.fieldCards.pileTwo[0].value}
              number={game.playerTwo.fieldCards.pileTwo.length}
              flip={true}
              smallCard={true}
            />
            <Card
              name={game.playerTwo.fieldCards.pileOne[0].name}
              src={game.playerTwo.fieldCards.pileOne[0].src}
              value={game.playerTwo.fieldCards.pileOne[0].value}
              number={game.playerTwo.fieldCards.pileOne.length}
              flip={true}
              smallCard={true}
            />
          </div>
          <div className="d-flex justify-content-center">
            {" "}
            <Card
              name={game.playerOne.fieldCards.pileOne[0].name}
              src={game.playerOne.fieldCards.pileOne[0].src}
              value={game.playerOne.fieldCards.pileOne[0].value}
              number={game.playerOne.fieldCards.pileOne.length}
              smallCard={true}
            />
            <Card
              name={game.playerOne.fieldCards.pileTwo[0].name}
              src={game.playerOne.fieldCards.pileTwo[0].src}
              value={game.playerOne.fieldCards.pileTwo[0].value}
              number={game.playerOne.fieldCards.pileTwo.length}
              smallCard={true}
            />
            <Card
              name={game.playerOne.fieldCards.pileThree[0].name}
              src={game.playerOne.fieldCards.pileThree[0].src}
              value={game.playerOne.fieldCards.pileThree[0].value}
              number={game.playerOne.fieldCards.pileThree.length}
              smallCard={true}
            />
            <Card
              name={game.playerOne.fieldCards.pileFour[0].name}
              src={game.playerOne.fieldCards.pileFour[0].src}
              value={game.playerOne.fieldCards.pileFour[0].value}
              number={game.playerOne.fieldCards.pileFour.length}
              smallCard={true}
            />
          </div>
        </>
      )}

      <div className="d-flex justify-content-center">
        <button
          onClick={quitGame}
          className="btn btn-danger align-self-end me-auto"
        >
          Stop Watching
        </button>
        <div className="d-flex flex-column">
          {noSameValueCards ? null : (
            <Card
              src="/img/PNG-cards-1.3/cardback.png"
              small={true}
              smallCard={true}
              number={game.playerTwo.deck}
            />
          )}
        </div>
        <div className="d-flex flex-column text-center ms-auto align-self-end">
          {game.playerOne.name}
        </div>
      </div>
    </div>
  );
}

export default ViewerCalifornia;
