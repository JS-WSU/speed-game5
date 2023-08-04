import { SpeedTypes } from "../../speed-client/src/utils/Constants.mjs";

const ShuffleCards = (game) => {
  let shuffled = game.deck
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
  game.deck = shuffled;
  if (game.speedType === SpeedTypes.REGULAR) {
    for (let i = 0; i < 5; i++) {
      game.playerOne.sidePile.push(game.deck[i]);
    }
    game.deck.splice(0, 5);

    for (let i = 0; i < 5; i++) {
      game.playerTwo.sidePile.push(game.deck[i]);
    }
    game.deck.splice(0, 5);

    game.playerOne.fieldCards.push(game.deck[0]);
    game.playerTwo.fieldCards.push(game.deck[1]);
    game.deck.splice(0, 2);

    for (let i = 0; i < 5; i++) {
      game.playerOne.hand.push(game.deck[i]);
    }
    game.deck.splice(0, 5);

    for (let i = 0; i < 5; i++) {
      game.playerTwo.hand.push(game.deck[i]);
    }
    game.deck.splice(0, 5);

    for (let i = 0; i < 15; i++) {
      game.playerOne.drawPile.push(game.deck[i]);
    }
    game.deck.splice(0, 15);
    for (let i = 0; i < 15; i++) {
      game.playerTwo.drawPile.push(game.deck[i]);
    }
    game.deck.splice(0, 15);

    console.log(game);
  } else {
    for (let i = 0; i < 26; i++) {
      game.playerOne.deck.push(game.deck[i]);
    }
    game.deck.splice(0, 26);

    for (let i = 0; i < 26; i++) {
      game.playerTwo.deck.push(game.deck[i]);
    }
    game.deck.splice(0, 26);

    for (let i = 0; i < 4; i++) {
      game.playerOne.fieldCards.push(game.playerOne.deck[i]);
    }
    game.playerOne.deck.splice(0, 4);

    for (let i = 0; i < 4; i++) {
      game.playerTwo.fieldCards.push(game.playerTwo.deck[i]);
    }
    game.playerTwo.deck.splice(0, 4);

    console.log(game);
  }
};

export default ShuffleCards;
