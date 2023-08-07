import { SpeedTypes } from "../../speed-client/src/utils/Constants.mjs";
import CheckIfSameValueCards from "./CheckIfSameValueCards.mjs";
import CheckIfNoSameValueCards from "./CheckIfNoSameValueCards.mjs";
import ReshuffleCalifornia from "./ReshuffleCalifornia.mjs";

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
  } else {
    for (let i = 0; i < 26; i++) {
      game.playerOne.deck.push(game.deck[i]);
    }
    game.deck.splice(0, 26);

    for (let i = 0; i < 26; i++) {
      game.playerTwo.deck.push(game.deck[i]);
    }
    game.deck.splice(0, 26);

    game.playerOne.fieldCards.pileOne.push(game.playerOne.deck[0]);
    game.playerOne.fieldCards.pileTwo.push(game.playerOne.deck[1]);
    game.playerOne.fieldCards.pileThree.push(game.playerOne.deck[2]);
    game.playerOne.fieldCards.pileFour.push(game.playerOne.deck[3]);

    game.playerOne.deck.splice(0, 4);

    game.playerTwo.fieldCards.pileOne.push(game.playerTwo.deck[0]);
    game.playerTwo.fieldCards.pileTwo.push(game.playerTwo.deck[1]);
    game.playerTwo.fieldCards.pileThree.push(game.playerTwo.deck[2]);
    game.playerTwo.fieldCards.pileFour.push(game.playerTwo.deck[3]);

    game.playerTwo.deck.splice(0, 4);

    CheckIfSameValueCards(game);

    while (CheckIfNoSameValueCards(game)) {
      ReshuffleCalifornia(game);
    }
  }
};

export default ShuffleCards;
