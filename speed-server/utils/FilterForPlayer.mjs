import {
  SpeedTypes,
  UserTypes,
} from "../../speed-client/src/utils/Constants.mjs";

const FilterForPlayer = (game, userType) => {
  if (game.speedType === SpeedTypes.REGULAR) {
    if (userType === UserTypes.PLAYER_ONE) {
      return {
        ...game,
        playerOne: {
          ...game.playerOne,
          pile: game.playerOne.pile.length,
          sidePile: game.playerOne.pile.length,
        },
        playerTwo: {
          ...game.playerTwo,
          pile: game.playerTwo.pile.length,
          sidePile: game.playerTwo.sidePile.length,
          deck: game.playerTwo.deck.length,
        },
      };
    }
    return {
      ...game,
      playerOne: {
        ...game.playerOne,
        pile: game.playerOne.pile.length,
        sidePile: game.playerOne.sidePile.length,
        deck: game.playerOne.deck.length,
      },
      playerTwo: {
        ...game.playerTwo,
        pile: game.playerTwo.pile.length,
        sidePile: game.playerTwo.pile.length,
      },
    };
  } else {
    if (userType === UserTypes.PLAYER_ONE) {
      return {
        ...game,
        playerOne: {
          ...game.playerOne,
          pile: game.playerOne.pile.length,
        },
        playerTwo: {
          ...game.playerTwo,
          pile: game.playerTwo.pile.length,
        },
      };
    }
    return {
      ...game,
      playerOne: {
        ...game.playerOne,
        pile: game.playerOne.pile.length,
      },
      playerTwo: {
        ...game.playerTwo,
        pile: game.playerTwo.pile.length,
      },
    };
  }
};

export default FilterForPlayer;
