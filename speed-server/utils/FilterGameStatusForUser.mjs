import {
  SpeedTypes,
  UserTypes,
} from "../../speed-client/src/utils/Constants.mjs";

const FilterGameStatusForUser = (game, userType) => {
  if (game.speedType === SpeedTypes.REGULAR) {
    if (userType === UserTypes.PLAYER_ONE) {
      return {
        //if user is Player One
        ...game,
        playerOne: {
          ...game.playerOne,
          drawPile: game.playerOne.drawPile.length,
          sidePile: game.playerOne.sidePile.length,
        },
        playerTwo: {
          ...game.playerTwo,
          drawPile: game.playerTwo.drawPile.length,
          sidePile: game.playerTwo.sidePile.length,
          hand: game.playerTwo.hand.length,
        },
      };
    } else if (userType === UserTypes.PLAYER_TWO) {
      return {
        // if user is Player Two
        ...game,
        playerOne: {
          ...game.playerOne,
          drawPile: game.playerOne.drawPile.length,
          sidePile: game.playerOne.sidePile.length,
          hand: game.playerOne.hand.length,
        },
        playerTwo: {
          ...game.playerTwo,
          drawPile: game.playerTwo.drawPile.length,
          sidePile: game.playerTwo.sidePile.length,
        },
      };
    }

    // if user is viewer
    return {
      ...game,
      playerOne: {
        ...game.playerOne,
        drawPile: game.playerOne.drawPile.length,
        sidePile: game.playerOne.sidePile.length,
      },
      playerTwo: {
        ...game.playerTwo,
        drawPile: game.playerTwo.drawPile.length,
        sidePile: game.playerTwo.sidePile.length,
      },
    };
  } else {
    // California speed logic stays same regardless of user
    return {
      ...game,
      deck: game.deck.map((card) => {
        return { name: card.name, value: card.value, src: card.src };
      }),
      playerOne: {
        ...game.playerOne,
        fieldCards: {
          pileOne: game.playerOne.fieldCards.pileOne.map((card) => {
            return { name: card.name, value: card.value, src: card.src };
          }),
          pileTwo: game.playerOne.fieldCards.pileTwo.map((card) => {
            return { name: card.name, value: card.value, src: card.src };
          }),
          pileThree: game.playerOne.fieldCards.pileThree.map((card) => {
            return { name: card.name, value: card.value, src: card.src };
          }),
          pileFour: game.playerOne.fieldCards.pileFour.map((card) => {
            return { name: card.name, value: card.value, src: card.src };
          }),
        },
        deck: game.playerOne.deck.length,
      },
      playerTwo: {
        ...game.playerTwo,
        fieldCards: {
          pileOne: game.playerTwo.fieldCards.pileOne.map((card) => {
            return { name: card.name, value: card.value, src: card.src };
          }),
          pileTwo: game.playerTwo.fieldCards.pileTwo.map((card) => {
            return { name: card.name, value: card.value, src: card.src };
          }),
          pileThree: game.playerTwo.fieldCards.pileThree.map((card) => {
            return { name: card.name, value: card.value, src: card.src };
          }),
          pileFour: game.playerTwo.fieldCards.pileFour.map((card) => {
            return { name: card.name, value: card.value, src: card.src };
          }),
        },
        deck: game.playerTwo.deck.length,
      },
    };
  }
};

export default FilterGameStatusForUser;
