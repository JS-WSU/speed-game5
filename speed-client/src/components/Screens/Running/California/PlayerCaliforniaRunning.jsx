import React, { useContext } from "react";
import Card from "../../../Card";
import { Piles, UserTypes } from "../../../../utils/Constants.mjs";
import AlertContext from "../../../../context/AlertContext";
import { useDrop } from "react-dnd";
import CardDraggableCalifornia from "../../../CardDraggableCalifornia";

function PlayerCalifornia({
  game,
  socket,
  quitGame,
  speedWinner,
  noSameValueCards,
}) {
  const alertContext = useContext(AlertContext);

  const [{ isOverPlayerOnePileOne }, dropPlayerOnePileOne] = useDrop(
    () => ({
      accept: "card",
      drop: (card) => {
        if (game.playerOne.fieldCards.pileOne[0].hasMultiple) {
          socket.emit(
            "cover_card",
            JSON.parse(localStorage.getItem("gameInSession")).hostName,
            JSON.parse(localStorage.getItem("gameInSession")).userType,
            Piles.PLAYER_ONE_PILE_ONE
          );
        } else {
          alertContext.error(
            `Invalid play, card ${game.playerOne.fieldCards.pileOne[0].name} doesn't have a double!`
          );
        }
      },
      collect: (monitor) => ({
        isOverPlayerOnePileOne: monitor.isOver(),
      }),
    }),
    [game]
  );

  const [{ isOverPlayerOnePileTwo }, dropPlayerOnePileTwo] = useDrop(
    () => ({
      accept: "card",
      drop: (card) => {
        if (game.playerOne.fieldCards.pileTwo[0].hasMultiple) {
          socket.emit(
            "cover_card",
            JSON.parse(localStorage.getItem("gameInSession")).hostName,
            JSON.parse(localStorage.getItem("gameInSession")).userType,
            Piles.PLAYER_ONE_PILE_TWO
          );
        } else {
          alertContext.error(
            `Invalid play, card ${game.playerOne.fieldCards.pileTwo[0].name} doesn't have a double!`
          );
        }
      },
      collect: (monitor) => ({
        isOverPlayerOnePileTwo: monitor.isOver(),
      }),
    }),
    [game]
  );

  const [{ isOverPlayerOnePileThree }, dropPlayerOnePileThree] = useDrop(
    () => ({
      accept: "card",
      drop: (card) => {
        if (game.playerOne.fieldCards.pileThree[0].hasMultiple) {
          socket.emit(
            "cover_card",
            JSON.parse(localStorage.getItem("gameInSession")).hostName,
            JSON.parse(localStorage.getItem("gameInSession")).userType,
            Piles.PLAYER_ONE_PILE_THREE
          );
        } else {
          alertContext.error(
            `Invalid play, card ${game.playerOne.fieldCards.pileThree[0].name} doesn't have a double!`
          );
        }
      },
      collect: (monitor) => ({
        isOverPlayerOnePileThree: monitor.isOver(),
      }),
    }),
    [game]
  );

  const [{ isOverPlayerOnePileFour }, dropPlayerOnePileFour] = useDrop(
    () => ({
      accept: "card",
      drop: (card) => {
        if (game.playerOne.fieldCards.pileFour[0].hasMultiple) {
          socket.emit(
            "cover_card",
            JSON.parse(localStorage.getItem("gameInSession")).hostName,
            JSON.parse(localStorage.getItem("gameInSession")).userType,
            Piles.PLAYER_ONE_PILE_FOUR
          );
        } else {
          alertContext.error(
            `Invalid play, card ${game.playerOne.fieldCards.pileFour[0].name} doesn't have a double!`
          );
        }
      },
      collect: (monitor) => ({
        isOverPlayerOnePileFour: monitor.isOver(),
      }),
    }),
    [game]
  );

  const [{ isOverPlayerTwoPileOne }, dropPlayerTwoPileOne] = useDrop(
    () => ({
      accept: "card",
      drop: (card) => {
        if (game.playerTwo.fieldCards.pileOne[0].hasMultiple) {
          socket.emit(
            "cover_card",
            JSON.parse(localStorage.getItem("gameInSession")).hostName,
            JSON.parse(localStorage.getItem("gameInSession")).userType,
            Piles.PLAYER_TWO_PILE_ONE
          );
        } else {
          alertContext.error(
            `Invalid play, card ${game.playerTwo.fieldCards.pileOne[0].name} doesn't have a double!`
          );
        }
      },
      collect: (monitor) => ({
        isOverPlayerTwoPileOne: monitor.isOver(),
      }),
    }),
    [game]
  );

  const [{ isOverPlayerTwoPileTwo }, dropPlayerTwoPileTwo] = useDrop(
    () => ({
      accept: "card",
      drop: (card) => {
        if (game.playerTwo.fieldCards.pileTwo[0].hasMultiple) {
          socket.emit(
            "cover_card",
            JSON.parse(localStorage.getItem("gameInSession")).hostName,
            JSON.parse(localStorage.getItem("gameInSession")).userType,
            Piles.PLAYER_TWO_PILE_TWO
          );
        } else {
          alertContext.error(
            `Invalid play, card ${game.playerTwo.fieldCards.pileTwo[0].name} doesn't have a double!`
          );
        }
      },
      collect: (monitor) => ({
        isOverPlayerTwoPileTwo: monitor.isOver(),
      }),
    }),
    [game]
  );

  const [{ isOverPlayerTwoPileThree }, dropPlayerTwoPileThree] = useDrop(
    () => ({
      accept: "card",
      drop: (card) => {
        if (game.playerTwo.fieldCards.pileThree[0].hasMultiple) {
          socket.emit(
            "cover_card",
            JSON.parse(localStorage.getItem("gameInSession")).hostName,
            JSON.parse(localStorage.getItem("gameInSession")).userType,
            Piles.PLAYER_TWO_PILE_THREE
          );
        } else {
          alertContext.error(
            `Invalid play, card ${game.playerTwo.fieldCards.pileThree[0].name} doesn't have a double!`
          );
        }
      },
      collect: (monitor) => ({
        isOverPlayerTwoPileThree: monitor.isOver(),
      }),
    }),
    [game]
  );

  const [{ isOverPlayerTwoPileFour }, dropPlayerTwoPileFour] = useDrop(
    () => ({
      accept: "card",
      drop: (card) => {
        if (game.playerTwo.fieldCards.pileFour[0].hasMultiple) {
          socket.emit(
            "cover_card",
            JSON.parse(localStorage.getItem("gameInSession")).hostName,
            JSON.parse(localStorage.getItem("gameInSession")).userType,
            Piles.PLAYER_TWO_PILE_FOUR
          );
        } else {
          alertContext.error(
            `Invalid play, card ${game.playerTwo.fieldCards.pileFour[0].name} doesn't have a double!`
          );
        }
      },
      collect: (monitor) => ({
        isOverPlayerTwoPileFour: monitor.isOver(),
      }),
    }),
    [game]
  );

  return (
    <div className="row text-light g-3 flex-grow-1">
      <div className="d-flex">
        <div className="d-flex flex-column text-center me-auto">
          {JSON.parse(localStorage.getItem("gameInSession")).userType ===
          UserTypes.PLAYER_ONE
            ? game.playerTwo.name
            : game.playerOne.name}{" "}
        </div>
        <div className="d-flex justify-content-evenly">
          {" "}
          <Card
            src="/img/PNG-cards-1.3/cardback.png"
            small={true}
            smallCard={true}
            number={
              JSON.parse(localStorage.getItem("gameInSession")).userType ===
              UserTypes.PLAYER_ONE
                ? game.playerTwo.deck
                : game.playerOne.deck
            }
          />
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
            {JSON.parse(localStorage.getItem("gameInSession")).userType ===
            UserTypes.PLAYER_ONE ? (
              <>
                {" "}
                <Card
                  innerRef={dropPlayerTwoPileFour}
                  name={game.playerTwo.fieldCards.pileFour[0].name}
                  src={game.playerTwo.fieldCards.pileFour[0].src}
                  value={game.playerTwo.fieldCards.pileFour[0].value}
                  number={game.playerTwo.fieldCards.pileFour.length}
                  flip={true}
                  smallCard={true}
                  hover={isOverPlayerTwoPileFour}
                />
                <Card
                  innerRef={dropPlayerTwoPileThree}
                  name={game.playerTwo.fieldCards.pileThree[0].name}
                  src={game.playerTwo.fieldCards.pileThree[0].src}
                  value={game.playerTwo.fieldCards.pileThree[0].value}
                  number={game.playerTwo.fieldCards.pileThree.length}
                  flip={true}
                  smallCard={true}
                  hover={isOverPlayerTwoPileThree}
                />
                <Card
                  innerRef={dropPlayerTwoPileTwo}
                  name={game.playerTwo.fieldCards.pileTwo[0].name}
                  src={game.playerTwo.fieldCards.pileTwo[0].src}
                  value={game.playerTwo.fieldCards.pileTwo[0].value}
                  number={game.playerTwo.fieldCards.pileTwo.length}
                  flip={true}
                  smallCard={true}
                  hover={isOverPlayerTwoPileTwo}
                />
                <Card
                  innerRef={dropPlayerTwoPileOne}
                  name={game.playerTwo.fieldCards.pileOne[0].name}
                  src={game.playerTwo.fieldCards.pileOne[0].src}
                  value={game.playerTwo.fieldCards.pileOne[0].value}
                  number={game.playerTwo.fieldCards.pileOne.length}
                  flip={true}
                  smallCard={true}
                  hover={isOverPlayerTwoPileOne}
                />
              </>
            ) : (
              <>
                {" "}
                <Card
                  innerRef={dropPlayerOnePileFour}
                  name={game.playerOne.fieldCards.pileFour[0].name}
                  src={game.playerOne.fieldCards.pileFour[0].src}
                  value={game.playerOne.fieldCards.pileFour[0].value}
                  number={game.playerOne.fieldCards.pileFour.length}
                  flip={true}
                  smallCard={true}
                  hover={isOverPlayerOnePileFour}
                />
                <Card
                  innerRef={dropPlayerOnePileThree}
                  name={game.playerOne.fieldCards.pileThree[0].name}
                  src={game.playerOne.fieldCards.pileThree[0].src}
                  value={game.playerOne.fieldCards.pileThree[0].value}
                  number={game.playerOne.fieldCards.pileThree.length}
                  flip={true}
                  smallCard={true}
                  hover={isOverPlayerOnePileThree}
                />
                <Card
                  innerRef={dropPlayerOnePileTwo}
                  name={game.playerOne.fieldCards.pileTwo[0].name}
                  src={game.playerOne.fieldCards.pileTwo[0].src}
                  value={game.playerOne.fieldCards.pileTwo[0].value}
                  number={game.playerOne.fieldCards.pileTwo.length}
                  flip={true}
                  smallCard={true}
                  hover={isOverPlayerOnePileTwo}
                />
                <Card
                  innerRef={dropPlayerOnePileOne}
                  name={game.playerOne.fieldCards.pileOne[0].name}
                  src={game.playerOne.fieldCards.pileOne[0].src}
                  value={game.playerOne.fieldCards.pileOne[0].value}
                  number={game.playerOne.fieldCards.pileOne.length}
                  flip={true}
                  smallCard={true}
                  hover={isOverPlayerOnePileOne}
                />
              </>
            )}
          </div>
          <div className="d-flex justify-content-center">
            {JSON.parse(localStorage.getItem("gameInSession")).userType ===
            UserTypes.PLAYER_ONE ? (
              <>
                {" "}
                <Card
                  innerRef={dropPlayerOnePileOne}
                  name={game.playerOne.fieldCards.pileOne[0].name}
                  src={game.playerOne.fieldCards.pileOne[0].src}
                  value={game.playerOne.fieldCards.pileOne[0].value}
                  number={game.playerOne.fieldCards.pileOne.length}
                  smallCard={true}
                  hover={isOverPlayerOnePileOne}
                />
                <Card
                  innerRef={dropPlayerOnePileTwo}
                  name={game.playerOne.fieldCards.pileTwo[0].name}
                  src={game.playerOne.fieldCards.pileTwo[0].src}
                  value={game.playerOne.fieldCards.pileTwo[0].value}
                  number={game.playerOne.fieldCards.pileTwo.length}
                  smallCard={true}
                  hover={isOverPlayerOnePileTwo}
                />
                <Card
                  innerRef={dropPlayerOnePileThree}
                  name={game.playerOne.fieldCards.pileThree[0].name}
                  src={game.playerOne.fieldCards.pileThree[0].src}
                  value={game.playerOne.fieldCards.pileThree[0].value}
                  number={game.playerOne.fieldCards.pileThree.length}
                  smallCard={true}
                  hover={isOverPlayerOnePileThree}
                />
                <Card
                  innerRef={dropPlayerOnePileFour}
                  name={game.playerOne.fieldCards.pileFour[0].name}
                  src={game.playerOne.fieldCards.pileFour[0].src}
                  value={game.playerOne.fieldCards.pileFour[0].value}
                  number={game.playerOne.fieldCards.pileFour.length}
                  smallCard={true}
                  hover={isOverPlayerOnePileFour}
                />
              </>
            ) : (
              <>
                {" "}
                <Card
                  innerRef={dropPlayerTwoPileOne}
                  name={game.playerTwo.fieldCards.pileOne[0].name}
                  src={game.playerTwo.fieldCards.pileOne[0].src}
                  value={game.playerTwo.fieldCards.pileOne[0].value}
                  number={game.playerTwo.fieldCards.pileOne.length}
                  smallCard={true}
                  hover={isOverPlayerTwoPileOne}
                />
                <Card
                  innerRef={dropPlayerTwoPileTwo}
                  name={game.playerTwo.fieldCards.pileTwo[0].name}
                  src={game.playerTwo.fieldCards.pileTwo[0].src}
                  value={game.playerTwo.fieldCards.pileTwo[0].value}
                  number={game.playerTwo.fieldCards.pileTwo.length}
                  smallCard={true}
                  hover={isOverPlayerTwoPileTwo}
                />
                <Card
                  innerRef={dropPlayerTwoPileThree}
                  name={game.playerTwo.fieldCards.pileThree[0].name}
                  src={game.playerTwo.fieldCards.pileThree[0].src}
                  value={game.playerTwo.fieldCards.pileThree[0].value}
                  number={game.playerTwo.fieldCards.pileThree.length}
                  smallCard={true}
                  hover={isOverPlayerTwoPileThree}
                />
                <Card
                  innerRef={dropPlayerTwoPileFour}
                  name={game.playerTwo.fieldCards.pileFour[0].name}
                  src={game.playerTwo.fieldCards.pileFour[0].src}
                  value={game.playerTwo.fieldCards.pileFour[0].value}
                  number={game.playerTwo.fieldCards.pileFour.length}
                  smallCard={true}
                  hover={isOverPlayerTwoPileFour}
                />
              </>
            )}
          </div>
        </>
      )}

      <div className="d-flex justify-content-center">
        <button
          onClick={quitGame}
          className="btn btn-danger align-self-end me-auto"
        >
          Forfeit
        </button>
        <div className="d-flex flex-column">
          <CardDraggableCalifornia
            src="/img/PNG-cards-1.3/cardback.png"
            number={
              JSON.parse(localStorage.getItem("gameInSession")).userType ===
              UserTypes.PLAYER_ONE
                ? game.playerOne.deck
                : game.playerTwo.deck
            }
          />
          {JSON.parse(localStorage.getItem("gameInSession")).userType ===
          UserTypes.PLAYER_ONE ? (
            <button
              onClick={speedWinner}
              className={`border btn btn-primary mx-auto mt-1
              
              ${!game.playerOne.deck ? "opacity-100" : "opacity-0"}
              `}
              disabled={game.playerOne.deck}
            >
              SPEED
            </button>
          ) : (
            <button
              onClick={speedWinner}
              className={`border btn btn-primary mx-auto mt-1 ${
                !game.playerTwo.deck ? "opacity-100" : "opacity-0"
              }`}
              disabled={game.playerTwo.deck}
            >
              SPEED
            </button>
          )}
        </div>
        <div className="d-flex flex-column text-center ms-auto align-self-end">
          {JSON.parse(localStorage.getItem("gameInSession")).userType ===
          UserTypes.PLAYER_ONE
            ? game.playerOne.name
            : game.playerTwo.name}{" "}
        </div>
      </div>
    </div>
  );
}

export default PlayerCalifornia;
