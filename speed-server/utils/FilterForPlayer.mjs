import {
  SpeedTypes,
  UserTypes,
} from "../../speed-client/src/utils/Constants.mjs";

const FilterForPlayer = (game, userType) => {
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
          hand: game.playerTwo.hand.length
        },
      };
    }
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
  } else {
    // California speed logic
    if (userType === UserTypes.PLAYER_ONE) {
      // California player one
      return {
        ...game,
        playerOne: {
          ...game.playerOne,
          drawPile: game.playerOne.drawPile.length,
        },
        playerTwo: {
          ...game.playerTwo,
          drawPile: game.playerTwo.drawPile.length,
        },
      };
    }
    return {
      // California player two
      ...game,
      playerOne: {
        ...game.playerOne,
        drawPile: game.playerOne.drawPile.length,
      },
      playerTwo: {
        ...game.playerTwo,
        drawPile: game.playerTwo.drawPile.length,
      },
    };
  }
};

export default FilterForPlayer;
