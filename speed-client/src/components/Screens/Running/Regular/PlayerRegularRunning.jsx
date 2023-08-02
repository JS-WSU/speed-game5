import Card from "../../../Card";
import CardDraggable from "../../../CardDraggable";
import { UserTypes } from "../../../../utils/Constants.mjs";
import { useDrop } from "react-dnd";
import { useContext, useEffect, useState } from "react";
import AlertContext from "../../../../context/AlertContext";

function PlayerRegularRunning({
  game,
  setGame,
  socket,
  quitGame,
  shufflingSidePile,
  drawingSidePile,
}) {
  let opponentHand = [];

  const alertContext = useContext(AlertContext);

  const [unableToPlay, setUnableToPlay] = useState(null);

  const [drawingFromSidePile, setDrawingFromSidePile] = useState(false);

  useEffect(() => {
    const DrawFromSidePile = (game) => {
      setDrawingFromSidePile(true);
      setTimeout(() => {
        setGame(game);
        setDrawingFromSidePile(false);
      }, 5000);
    };

    socket.on("draw_from_side_pile", DrawFromSidePile);

    return () => socket.off("draw_from_side_pile", DrawFromSidePile);
  }, [socket, setGame]);

  useEffect(() => {
    if (
      JSON.parse(localStorage.getItem("gameInSession")).userType ===
        UserTypes.PLAYER_ONE &&
      (game.playerOne.hand.length === 5 || !game.playerOne.drawPile)
    ) {
      let canPlay = false;

      game.playerOne.hand.forEach((card) => {
        if (
          card.value === game.playerOne.fieldCards[0].value + 1 ||
          card.value === game.playerOne.fieldCards[0].value - 1 ||
          (card.value === 13 && game.playerOne.fieldCards[0].value === 1) ||
          (card.value === 1 && game.playerOne.fieldCards[0].value === 13)
        ) {
          canPlay = true;
        }
      });
      game.playerOne.hand.forEach((card) => {
        if (
          card.value === game.playerTwo.fieldCards[0].value + 1 ||
          card.value === game.playerTwo.fieldCards[0].value - 1 ||
          (card.value === 13 && game.playerTwo.fieldCards[0].value === 1) ||
          (card.value === 1 && game.playerTwo.fieldCards[0].value === 13)
        ) {
          canPlay = true;
        }
      });

      if (canPlay) {
        setUnableToPlay(false);
      } else {
        setUnableToPlay(true);
      }
    } else if (
      JSON.parse(localStorage.getItem("gameInSession")).userType ===
        UserTypes.PLAYER_TWO &&
      (game.playerTwo.hand.length === 5 || !game.playerTwo.drawPile)
    ) {
      let canPlay = false;

      game.playerTwo.hand.forEach((card) => {
        if (
          card.value === game.playerOne.fieldCards[0].value + 1 ||
          card.value === game.playerOne.fieldCards[0].value - 1 ||
          (card.value === 13 && game.playerOne.fieldCards[0].value === 1) ||
          (card.value === 1 && game.playerOne.fieldCards[0].value === 13)
        ) {
          canPlay = true;
        }
      });
      game.playerTwo.hand.forEach((card) => {
        if (
          card.value === game.playerTwo.fieldCards[0].value + 1 ||
          card.value === game.playerTwo.fieldCards[0].value - 1 ||
          (card.value === 13 && game.playerTwo.fieldCards[0].value === 1) ||
          (card.value === 1 && game.playerTwo.fieldCards[0].value === 13)
        ) {
          canPlay = true;
        }
      });

      if (canPlay) {
        setUnableToPlay(false);
      } else {
        setUnableToPlay(true);
      }
    }
  }, [game]);

  const UnableToPlay = () => {
    socket.emit(
      "unable_to_play",
      game.hostName,
      JSON.parse(localStorage.getItem("gameInSession")).userType
    );
  };

  const DrawCard = () => {
    if (
      JSON.parse(localStorage.getItem("gameInSession")).userType ===
      UserTypes.PLAYER_ONE
    ) {
      console.log(game.playerOne.hand.length);
      game.playerOne.hand.length === 5
        ? alertContext.error("Cannot draw a card. You already have 5 cards.")
        : socket.emit("draw_card", game.hostName, UserTypes.PLAYER_ONE);
    } else {
      game.playerTwo.hand.length === 5
        ? alertContext.error("Cannot draw a card. You already have 5 cards.")
        : socket.emit("draw_card", game.hostName, UserTypes.PLAYER_TWO);
    }
  };

  const [{ isOverPlayerOneField }, dropPlayerOneField] = useDrop(
    () => ({
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
    }),
    [game]
  );

  const [{ isOverPlayerTwoField }, dropPlayerTwoField] = useDrop(
    () => ({
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
    }),
    [game]
  );

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
      {drawingFromSidePile ? (
        <h2 className="m-auto text-center bg-info">
          Nobody can play! Drawing a card from each player's side pile...
        </h2>
      ) : shufflingSidePile ? (
        <h2 className="m-auto text-center bg-info">
          Side piles empty! Reshuffling....
        </h2>
      ) : (
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
      )}
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
          {JSON.parse(localStorage.getItem("gameInSession")).userType ===
          UserTypes.PLAYER_ONE ? (
            game.playerOne.drawPile ? (
              <Card src="/img/PNG-cards-1.3/cardback.png" onClick={DrawCard} />
            ) : null
          ) : game.playerTwo.drawPile ? (
            <Card src="/img/PNG-cards-1.3/cardback.png" onClick={DrawCard} />
          ) : null}
          <p>
            Deck Size:{" "}
            {JSON.parse(localStorage.getItem("gameInSession")).userType ===
            UserTypes.PLAYER_ONE
              ? game.playerOne.drawPile
              : game.playerTwo.drawPile}{" "}
          </p>
          {unableToPlay ? (
            <button onClick={UnableToPlay} className="btn btn-danger">
              Unable to Play
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default PlayerRegularRunning;
