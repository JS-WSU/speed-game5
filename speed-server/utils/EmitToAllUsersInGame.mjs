import { UserTypes } from "../../speed-client/src/utils/Constants.mjs";
import FilterGameStatusForUser from "./FilterGameStatusForUser.mjs";

const EmitToAllUsersInGame = (io, game, event, args) => {
  if (event === "left_game") {
    io.to(game.hostName).emit(
      event,
      FilterGameStatusForUser(game, UserTypes.PLAYER_ONE),
      args[0],
      args[1]
    );
    io.to(game.playerTwo.name).emit(
      event,
      FilterGameStatusForUser(game, UserTypes.PLAYER_TWO),
      args[0],
      args[1]
    );

    game.viewers.map((viewer) => {
      io.to(viewer).emit(
        event,
        FilterGameStatusForUser(game, UserTypes.VIEWER),
        args[0],
        args[1]
      );
    });
  } else {
    io.to(game.hostName).emit(
      event,
      FilterGameStatusForUser(game, UserTypes.PLAYER_ONE)
    );
    io.to(game.playerTwo.name).emit(
      event,
      FilterGameStatusForUser(game, UserTypes.PLAYER_TWO)
    );

    game.viewers.map((viewer) => {
      io.to(viewer).emit(
        event,
        FilterGameStatusForUser(game, UserTypes.VIEWER)
      );
    });
  }
};

export default EmitToAllUsersInGame;
