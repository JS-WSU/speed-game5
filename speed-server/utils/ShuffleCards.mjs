import { SpeedTypes } from "../../speed-client/src/utils/Constants.mjs";

const ShuffleCards = (game) => {
  if (game.gameState === SpeedTypes.REGULAR) {
    let shuffled = game.deck
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
    game.deck = shuffled;

    for (let i = 0; i < 5; i++) {
      game.playerOne.sidePile.push(game.deck[i]);
      game.deck.splice(i, 1);
    }
    for (let i = 0; i < 5; i++) {
      game.playerTwo.sidePile.push(game.deck[i]);
      game.deck.splice(i, 1);
    }
    game.playerOne.fieldCards.push(game.deck[0]);
    game.playerTwo.fieldCards.push(game.deck[1]);
    game.deck.splice(0, 2);

    for (let i = 0; i < 5; i++) {
      game.playerOne.hand.push(game.deck[i]);
      game.deck.splice(i, 1);
    }

    for (let i = 0; i < 5; i++) {
      game.playerTwo.hand.push(game.deck[i]);
      game.deck.splice(i, 1);
    }

    for (let i = 0; i < 15; i++) {
      game.playerOne.drawPile.push(game.deck[i]);
      game.deck.splice(i, 1);
    }
    for (let i = 0; i < 15; i++) {
      game.playerTwo.drawPile.push(game.deck[i]);
    }
  } else {
  }

  return game;
};

export default ShuffleCards;
