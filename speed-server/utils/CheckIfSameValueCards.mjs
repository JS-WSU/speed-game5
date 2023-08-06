const CheckIfSameValueCards = (game) => {
  const combine = [
    game.playerOne.fieldCards.pileOne[0],
    game.playerOne.fieldCards.pileTwo[0],
    game.playerOne.fieldCards.pileThree[0],
    game.playerOne.fieldCards.pileFour[0],
    game.playerTwo.fieldCards.pileOne[0],
    game.playerTwo.fieldCards.pileTwo[0],
    game.playerTwo.fieldCards.pileThree[0],
    game.playerTwo.fieldCards.pileFour[0],
  ];

  for (let pile in game.playerOne.fieldCards) {
    for (let j = 0; j < combine.length; ++j) {
      if (
        game.playerOne.fieldCards[pile][0].name !== combine[j].name &&
        game.playerOne.fieldCards[pile][0].value === combine[j].value
      ) {
        game.playerOne.fieldCards[pile][0].hasMultiple = true;
      }
    }
  }

  for (let pile in game.playerTwo.fieldCards) {
    for (let j = 0; j < combine.length; ++j) {
      if (
        game.playerTwo.fieldCards[pile][0].name !== combine[j].name &&
        game.playerTwo.fieldCards[pile][0].value === combine[j].value
      ) {
        game.playerTwo.fieldCards[pile][0].hasMultiple = true;
      }
    }
  }

  // for (let i = 0; i < 4; ++i) {
  //   for (let j = 0; j < 8; ++j) {
  //     if (
  //       game.playerOne.fieldCards[i].name !== combine[j].name &&
  //       game.playerOne.fieldCards[i].value === combine[j].value
  //     ) {
  //       game.playerOne.fieldCards[i].hasMultiple = true;
  //     }
  //     if (
  //       game.playerTwo.fieldCards[i].name !== combine[j].name &&
  //       game.playerTwo.fieldCards[i].value === combine[j].value
  //     ) {
  //       game.playerTwo.fieldCards[i].hasMultiple = true;
  //     }
  //   }
  // }
};

export default CheckIfSameValueCards;
