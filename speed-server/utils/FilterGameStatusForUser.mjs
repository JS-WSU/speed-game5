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
      playerOne: {
        ...game.playerOne,
        deck: game.playerOne.deck.length,
      },
      playerTwo: {
        ...game.playerTwo,
        deck: game.playerTwo.deck.length,
      },
    };
  }
};

export default FilterGameStatusForUser;
