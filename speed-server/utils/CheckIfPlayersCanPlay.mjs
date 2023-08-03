const CheckIfPlayersCanPlay = (game) => {
  game.playerOne.hand.forEach((card) => {
    if (
      card.value === game.playerOne.fieldCards[0].value + 1 ||
      card.value === game.playerOne.fieldCards[0].value - 1 ||
      (card.value === 13 && game.playerOne.fieldCards[0].value === 1) ||
      (card.value === 1 && game.playerOne.fieldCards[0].value === 13)
    ) {
      game.playerOne.unableToPlay = false;
    }
  });
  game.playerOne.hand.forEach((card) => {
    if (
      card.value === game.playerTwo.fieldCards[0].value + 1 ||
      card.value === game.playerTwo.fieldCards[0].value - 1 ||
      (card.value === 13 && game.playerTwo.fieldCards[0].value === 1) ||
      (card.value === 1 && game.playerTwo.fieldCards[0].value === 13)
    ) {
      game.playerOne.unableToPlay = false;
    }
  });

  game.playerTwo.hand.forEach((card) => {
    if (
      card.value === game.playerOne.fieldCards[0].value + 1 ||
      card.value === game.playerOne.fieldCards[0].value - 1 ||
      (card.value === 13 && game.playerOne.fieldCards[0].value === 1) ||
      (card.value === 1 && game.playerOne.fieldCards[0].value === 13)
    ) {
      game.playerTwo.unableToPlay = false;
    }
  });
  game.playerTwo.hand.forEach((card) => {
    if (
      card.value === game.playerTwo.fieldCards[0].value + 1 ||
      card.value === game.playerTwo.fieldCards[0].value - 1 ||
      (card.value === 13 && game.playerTwo.fieldCards[0].value === 1) ||
      (card.value === 1 && game.playerTwo.fieldCards[0].value === 13)
    ) {
      game.playerTwo.unableToPlay = false;
    }
  });
};

export default CheckIfPlayersCanPlay;