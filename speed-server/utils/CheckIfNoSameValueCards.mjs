const CheckIfNoSameValueCards = (game) => {
  let count = 0;

  if (!game.playerOne.fieldCards.pileOne[0].hasMultiple) {
    count++;
  }
  if (!game.playerOne.fieldCards.pileTwo[0].hasMultiple) {
    count++;
  }
  if (!game.playerOne.fieldCards.pileThree[0].hasMultiple) {
    count++;
  }
  if (!game.playerOne.fieldCards.pileFour[0].hasMultiple) {
    count++;
  }
  if (!game.playerTwo.fieldCards.pileOne[0].hasMultiple) {
    count++;
  }
  if (!game.playerTwo.fieldCards.pileTwo[0].hasMultiple) {
    count++;
  }
  if (!game.playerTwo.fieldCards.pileThree[0].hasMultiple) {
    count++;
  }
  if (!game.playerTwo.fieldCards.pileFour[0].hasMultiple) {
    count++;
  }

  if (count === 8) {
    return true;
  }
  return false;
};

export default CheckIfNoSameValueCards;
