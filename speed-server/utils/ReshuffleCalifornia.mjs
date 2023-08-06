import CheckIfNoSameValueCards from "./CheckIfNoSameValueCards.mjs";
import CheckIfSameValueCards from "./CheckIfSameValueCards.mjs";

const ReshuffleCalifornia = (game) => {
  // player one reshuffle
  game.playerOne.deck = [
    ...game.playerOne.deck,
    ...game.playerOne.fieldCards.pileOne,
    ...game.playerOne.fieldCards.pileTwo,
    ...game.playerOne.fieldCards.pileThree,
    ...game.playerOne.fieldCards.pileFour,
  ];

  console.log(game.playerOne.deck.length)

  game.playerOne.fieldCards = {
    pileOne: [],
    pileTwo: [],
    pileThree: [],
    pileFour: [],
  };

  game.playerOne.deck = game.playerOne.deck
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);

  console.log(game.playerOne.deck.length)

   

  game.playerOne.deck = game.playerOne.deck.map((card) => {
    return { ...card, hasMultiple: false };
  });

  console.log(game.playerOne.deck.length)

  game.playerOne.fieldCards.pileOne.push(game.playerOne.deck[0]);
  game.playerOne.fieldCards.pileTwo.push(game.playerOne.deck[1]);
  game.playerOne.fieldCards.pileThree.push(game.playerOne.deck[2]);
  game.playerOne.fieldCards.pileFour.push(game.playerOne.deck[3]);

  game.playerOne.deck.splice(0, 4);

  console.log(game.playerOne.deck.length)


  // player two reshuffle
  game.playerTwo.deck = [
    ...game.playerTwo.deck,
    ...game.playerTwo.fieldCards.pileOne,
    ...game.playerTwo.fieldCards.pileTwo,
    ...game.playerTwo.fieldCards.pileThree,
    ...game.playerTwo.fieldCards.pileFour,
  ];

  game.playerTwo.fieldCards = {
    pileOne: [],
    pileTwo: [],
    pileThree: [],
    pileFour: [],
  };

  game.playerTwo.deck = game.playerTwo.deck
    .map((value) => ({ value, sort: Math.random(), hasMultiple: false }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);

  game.playerTwo.deck = game.playerTwo.deck.map((card) => {
    return { ...card, hasMultiple: false };
  });

  game.playerTwo.fieldCards.pileOne.push(game.playerTwo.deck[0]);
  game.playerTwo.fieldCards.pileTwo.push(game.playerTwo.deck[1]);
  game.playerTwo.fieldCards.pileThree.push(game.playerTwo.deck[2]);
  game.playerTwo.fieldCards.pileFour.push(game.playerTwo.deck[3]);

  game.playerTwo.deck.splice(0, 4);

  CheckIfSameValueCards(game);
};

export default ReshuffleCalifornia;
