import "./loadEnvironment.mjs";
import "./db/conn.mjs";
import MongoDBStore from "./db/sessions.mjs";
import session from "express-session";
import express from "express";
import cors from "cors";
import records from "./routes/records.mjs";
import users from "./routes/users.mjs";
import http from "http";
import { Server } from "socket.io";
import User from "./db/models/UserSchema.mjs";
import ChatMessage from "./db/models/ChatMessageSchema.mjs";
import {
  GameStates,
  Piles,
  SpeedTypes,
  UserTypes,
} from "../speed-client/src/utils/Constants.mjs";
import { Deck } from "./utils/Constants.mjs";
import FilteredGames from "./utils/FilteredGames.mjs";
import ShuffleCards from "./utils/ShuffleCards.mjs";
import EmitToAllUsersInGame from "./utils/EmitToAllUsersInGame.mjs";
import CheckIfSameValueCards from "./utils/CheckIfSameValueCards.mjs";
import CheckIfNoSameValueCards from "./utils/CheckIfNoSameValueCards.mjs";
import ReshuffleCalifornia from "./utils/ReshuffleCalifornia.mjs";

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    name: "session-id",
    store: MongoDBStore,
    cookie: { maxAge: 2629800000, sameSite: false, secure: false },
    resave: false,
    saveUninitialized: true,
  })
);

app.use("/records", records);
app.use("/users", users);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: true,
  },
});

let games = [];

io.on("connection", async (socket) => {
  console.log(`${socket.id} has joined the main namespace.`);

  socket.on("test", (num) => {
    console.log(num);
  });

  socket.on("join_lobby", async () => {
    socket.join("lobby");
    console.log(`${socket.id} has joined the lobby`);
    socket.emit("chat_messages", await ChatMessage.find({}));

    socket.emit("gameRooms", FilteredGames(games));
  });

  socket.on("leave_lobby", () => {
    socket.leave("lobby");
    console.log(`${socket.id} has left the lobby`);
  });

  socket.on("update_chat_messages", async () => {
    socket.emit("chat_messages", await ChatMessage.find({}));
  });

  socket.on("new_chat_message", async ({ username, body }) => {
    const newMessage = new ChatMessage({
      username,
      body,
    });

    await newMessage.save();

    io.emit("new_chat_message", newMessage);
  });

  socket.on("host_game", (hostName, speedType) => {
    if (speedType === SpeedTypes.REGULAR) {
      games.push({
        deck: Deck,
        hostName,
        speedType,
        winner: null,
        playerOne: {
          name: hostName,
          fieldCards: [],
          hand: [],
          sidePile: [],
          drawPile: [],
          ready: false,
          unabletoPlay: false,
          rematch: null,
        },
        playerTwo: {
          name: null,
          fieldCards: [],
          hand: [],
          sidePile: [],
          drawPile: [],
          ready: false,
          unableToPlay: false,
          rematch: null,
        },
        viewers: [],
        gameState: GameStates.WAITING,
      });
    } else {
      games.push({
        deck: Deck.map((card) => {
          return { ...card, hasMultiple: false };
        }),
        hostName,
        speedType,
        winner: null,
        playerOne: {
          name: hostName,
          deck: [],
          fieldCards: {
            pileOne: [],
            pileTwo: [],
            pileThree: [],
            pileFour: [],
          },
          ready: false,
        },
        playerTwo: {
          name: null,
          deck: [],
          fieldCards: {
            pileOne: [],
            pileTwo: [],
            pileThree: [],
            pileFour: [],
          },
          ready: false,
        },
        viewers: [],
        gameState: GameStates.WAITING,
      });
    }

    io.to("lobby").emit("gameRooms", FilteredGames(games));
  });

  socket.on("join_game", (hostName, userType, username) => {
    socket.join(username);

    const gameIndex = games.findIndex((game) => game.hostName === hostName);

    if (gameIndex === -1) {
      socket.emit("game_status", -1);
    } else {
      if (userType === UserTypes.PLAYER_TWO) {
        games[gameIndex] = {
          ...games[gameIndex],
          playerTwo: { ...games[gameIndex].playerTwo, name: username },
        };
      } else if (userType === UserTypes.VIEWER) {
        const viewerFound = games[gameIndex].viewers.find(
          (viewer) => viewer === username
        );
        if (!viewerFound) {
          games[gameIndex] = {
            ...games[gameIndex],
            viewers: [...games[gameIndex].viewers, username],
          };
        }
      }

      EmitToAllUsersInGame(io, games[gameIndex], "game_status");

      io.to("lobby").emit("gameRooms", FilteredGames(games));
    }
  });

  socket.on("quit_game", async (hostName, userType, username, speedType) => {
    socket.leave(username);
    console.log(`${socket.id} left room ${username}`);
    const gameIndex = games.findIndex((room) => room.hostName === hostName);

    if (gameIndex !== -1) {
      if (userType === UserTypes.PLAYER_ONE) {
        if (games[gameIndex].gameState === GameStates.RUNNING) {
          const playerOneName = games[gameIndex].playerOne.name;
          const playerTwoName = games[gameIndex].playerTwo.name;

          if (speedType === SpeedTypes.CALIFORNIA) {
            await User.findOneAndUpdate(
              { username: playerOneName },
              { $inc: { california_losses: 1 } }
            );
            await User.findOneAndUpdate(
              { username: playerTwoName },
              { $inc: { california_wins: 1 } }
            );
          } else {
            await User.findOneAndUpdate(
              { username: playerOneName },
              { $inc: { regular_losses: 1 } }
            );
            await User.findOneAndUpdate(
              { username: playerTwoName },
              { $inc: { regular_wins: 1 } }
            );
          }
        }
        games[gameIndex].playerOne.name = null;
      } else if (userType === UserTypes.PLAYER_TWO) {
        if (games[gameIndex].gameState === GameStates.RUNNING) {
          const playerOneName = games[gameIndex].playerOne.name;
          const playerTwoName = games[gameIndex].playerTwo.name;

          if (speedType === SpeedTypes.CALIFORNIA) {
            await User.findOneAndUpdate(
              { username: playerOneName },
              { $inc: { california_wins: 1 } }
            );
            await User.findOneAndUpdate(
              { username: playerTwoName },
              { $inc: { california_losses: 1 } }
            );
          } else {
            await User.findOneAndUpdate(
              { username: playerOneName },
              { $inc: { regular_wins: 1 } }
            );
            await User.findOneAndUpdate(
              { username: playerTwoName },
              { $inc: { regular_losses: 1 } }
            );
          }
        }
        games[gameIndex].playerTwo.name = null;
        games[gameIndex].playerOne.ready = false;
        games[gameIndex].playerTwo.ready = false;
      } else {
        let viewers = games[gameIndex].viewers;
        viewers = viewers.filter((viewer) => viewer !== username);
        games[gameIndex].viewers = viewers;
      }

      EmitToAllUsersInGame(io, games[gameIndex], "left_game", [
        userType,
        username,
      ]);

      if (
        !games[gameIndex].playerOne.name ||
        (!games[gameIndex].playerTwo.name &&
          games[gameIndex].gameState !== GameStates.WAITING)
      ) {
        games = games.filter(
          (game) => game.hostName !== games[gameIndex].hostName
        );
      }
      io.to("lobby").emit("gameRooms", FilteredGames(games));
    }
  });

  socket.on("start_game", (hostName) => {
    const gameIndex = games.findIndex((game) => game.hostName === hostName);

    games[gameIndex].gameState = GameStates.RUNNING;

    ShuffleCards(games[gameIndex]);

    EmitToAllUsersInGame(io, games[gameIndex], "game_started");

    if (games[gameIndex].speedType === SpeedTypes.CALIFORNIA) {
      while (CheckIfNoSameValueCards(games[gameIndex])) {
        ReshuffleCalifornia(games[gameIndex]);
        EmitToAllUsersInGame(io, games[gameIndex], "no_same_value_cards");
      }
    }
  });

  socket.on("ready_to_play", (hostName, userType) => {
    const gameIndex = games.findIndex((game) => game.hostName === hostName);

    if (userType === UserTypes.PLAYER_ONE) {
      games[gameIndex].playerOne.ready = !games[gameIndex].playerOne.ready;
    } else {
      games[gameIndex].playerTwo.ready = !games[gameIndex].playerTwo.ready;
    }

    EmitToAllUsersInGame(io, games[gameIndex], "game_status");
  });

  socket.on("place_card", (hostName, card, userType) => {
    const gameIndex = games.findIndex((game) => game.hostName === hostName);

    let playerOneHand = games[gameIndex].playerOne.hand;
    let playerTwoHand = games[gameIndex].playerTwo.hand;

    playerOneHand = playerOneHand.filter(
      (playerOneCard) => playerOneCard.name !== card.name
    );
    playerTwoHand = playerTwoHand.filter(
      (playerTwoCard) => playerTwoCard.name !== card.name
    );

    if (userType === UserTypes.PLAYER_ONE) {
      games[gameIndex].playerOne.fieldCards = [
        card,
        ...games[gameIndex].playerOne.fieldCards,
      ];
    } else {
      games[gameIndex].playerTwo.fieldCards = [
        card,
        ...games[gameIndex].playerTwo.fieldCards,
      ];
    }

    games[gameIndex].playerOne.hand = playerOneHand;
    games[gameIndex].playerTwo.hand = playerTwoHand;

    games[gameIndex].playerOne.unableToPlay = false;
    games[gameIndex].playerTwo.unableToPlay = false;

    EmitToAllUsersInGame(io, games[gameIndex], "game_status");
  });

  socket.on("cover_card", (hostName, userType, pile) => {
    const gameIndex = games.findIndex((game) => game.hostName === hostName);

    if (userType === UserTypes.PLAYER_ONE) {
      switch (pile) {
        case Piles.PLAYER_ONE_PILE_ONE:
          games[gameIndex].playerOne.fieldCards.pileOne = [
            games[gameIndex].playerOne.deck[0],
            ...games[gameIndex].playerOne.fieldCards.pileOne,
          ];
          break;

        case Piles.PLAYER_ONE_PILE_TWO:
          games[gameIndex].playerOne.fieldCards.pileTwo = [
            games[gameIndex].playerOne.deck[0],
            ...games[gameIndex].playerOne.fieldCards.pileTwo,
          ];
          break;

        case Piles.PLAYER_ONE_PILE_THREE:
          games[gameIndex].playerOne.fieldCards.pileThree = [
            games[gameIndex].playerOne.deck[0],
            ...games[gameIndex].playerOne.fieldCards.pileThree,
          ];
          break;

        case Piles.PLAYER_ONE_PILE_FOUR:
          games[gameIndex].playerOne.fieldCards.pileFour = [
            games[gameIndex].playerOne.deck[0],
            ...games[gameIndex].playerOne.fieldCards.pileFour,
          ];
          break;

        case Piles.PLAYER_TWO_PILE_ONE:
          games[gameIndex].playerTwo.fieldCards.pileOne = [
            games[gameIndex].playerOne.deck[0],
            ...games[gameIndex].playerTwo.fieldCards.pileOne,
          ];
          break;

        case Piles.PLAYER_TWO_PILE_TWO:
          games[gameIndex].playerTwo.fieldCards.pileTwo = [
            games[gameIndex].playerOne.deck[0],
            ...games[gameIndex].playerTwo.fieldCards.pileTwo,
          ];
          break;

        case Piles.PLAYER_TWO_PILE_THREE:
          games[gameIndex].playerTwo.fieldCards.pileThree = [
            games[gameIndex].playerOne.deck[0],
            ...games[gameIndex].playerTwo.fieldCards.pileThree,
          ];
          break;

        case Piles.PLAYER_TWO_PILE_FOUR:
          games[gameIndex].playerTwo.fieldCards.pileFour = [
            games[gameIndex].playerOne.deck[0],
            ...games[gameIndex].playerTwo.fieldCards.pileFour,
          ];
          break;

        default:
          console.log("failed in placing in pile");
      }
      games[gameIndex].playerOne.deck.splice(0, 1);
    } else {
      switch (pile) {
        case Piles.PLAYER_ONE_PILE_ONE:
          games[gameIndex].playerOne.fieldCards.pileOne = [
            games[gameIndex].playerTwo.deck[0],
            ...games[gameIndex].playerOne.fieldCards.pileOne,
          ];
          break;

        case Piles.PLAYER_ONE_PILE_TWO:
          games[gameIndex].playerOne.fieldCards.pileTwo = [
            games[gameIndex].playerTwo.deck[0],
            ...games[gameIndex].playerOne.fieldCards.pileTwo,
          ];
          break;

        case Piles.PLAYER_ONE_PILE_THREE:
          games[gameIndex].playerOne.fieldCards.pileThree = [
            games[gameIndex].playerTwo.deck[0],
            ...games[gameIndex].playerOne.fieldCards.pileThree,
          ];
          break;

        case Piles.PLAYER_ONE_PILE_FOUR:
          games[gameIndex].playerOne.fieldCards.pileFour = [
            games[gameIndex].playerTwo.deck[0],
            ...games[gameIndex].playerOne.fieldCards.pileFour,
          ];
          break;

        case Piles.PLAYER_TWO_PILE_ONE:
          games[gameIndex].playerTwo.fieldCards.pileOne = [
            games[gameIndex].playerTwo.deck[0],
            ...games[gameIndex].playerTwo.fieldCards.pileOne,
          ];
          break;

        case Piles.PLAYER_TWO_PILE_TWO:
          games[gameIndex].playerTwo.fieldCards.pileTwo = [
            games[gameIndex].playerTwo.deck[0],
            ...games[gameIndex].playerTwo.fieldCards.pileTwo,
          ];
          break;

        case Piles.PLAYER_TWO_PILE_THREE:
          games[gameIndex].playerTwo.fieldCards.pileThree = [
            games[gameIndex].playerTwo.deck[0],
            ...games[gameIndex].playerTwo.fieldCards.pileThree,
          ];
          break;

        case Piles.PLAYER_TWO_PILE_FOUR:
          games[gameIndex].playerTwo.fieldCards.pileFour = [
            games[gameIndex].playerTwo.deck[0],
            ...games[gameIndex].playerTwo.fieldCards.pileFour,
          ];
          break;

        default:
          console.log("failed in placing in pile");
      }
      games[gameIndex].playerTwo.deck.splice(0, 1);
    }

    CheckIfSameValueCards(games[gameIndex]);
    while (CheckIfNoSameValueCards(games[gameIndex])) {
      ReshuffleCalifornia(games[gameIndex]);

      EmitToAllUsersInGame(io, games[gameIndex], "no_same_value_cards");
    }

    EmitToAllUsersInGame(io, games[gameIndex], "game_status");
  });

  socket.on("draw_card", (hostName, userType) => {
    const gameIndex = games.findIndex((game) => game.hostName === hostName);

    if (
      userType === UserTypes.PLAYER_ONE &&
      games[gameIndex].playerOne.hand.length < 5
    ) {
      games[gameIndex].playerOne.hand = [
        ...games[gameIndex].playerOne.hand,
        games[gameIndex].playerOne.drawPile[0],
      ];
      games[gameIndex].playerOne.drawPile.splice(0, 1);
      games[gameIndex].playerOne.unableToPlay = false;
    } else if (games[gameIndex].playerTwo.hand.length < 5) {
      games[gameIndex].playerTwo.hand = [
        ...games[gameIndex].playerTwo.hand,
        games[gameIndex].playerTwo.drawPile[0],
      ];
      games[gameIndex].playerTwo.drawPile.splice(0, 1);
      games[gameIndex].playerTwo.unableToPlay = false;
    }

    EmitToAllUsersInGame(io, games[gameIndex], "game_status");
  });

  socket.on("unable_to_play", (hostName, userType) => {
    const gameIndex = games.findIndex((game) => game.hostName === hostName);

    if (userType === UserTypes.PLAYER_ONE) {
      games[gameIndex].playerOne.unableToPlay = true;
    } else {
      games[gameIndex].playerTwo.unableToPlay = true;
    }

    EmitToAllUsersInGame(io, games[gameIndex], "game_status");

    if (
      games[gameIndex].playerOne.unableToPlay &&
      games[gameIndex].playerTwo.unableToPlay &&
      games[gameIndex].playerOne.sidePile.length
    ) {
      games[gameIndex].playerOne.fieldCards = [
        games[gameIndex].playerOne.sidePile[0],
        ...games[gameIndex].playerOne.fieldCards,
      ];
      games[gameIndex].playerOne.sidePile.splice(0, 1);
      games[gameIndex].playerTwo.fieldCards = [
        games[gameIndex].playerTwo.sidePile[0],
        ...games[gameIndex].playerTwo.fieldCards,
      ];
      games[gameIndex].playerTwo.sidePile.splice(0, 1);

      games[gameIndex].playerOne.unableToPlay = false;
      games[gameIndex].playerTwo.unableToPlay = false;

      EmitToAllUsersInGame(io, games[gameIndex], "draw_from_side_pile");
    } else if (
      games[gameIndex].playerOne.unableToPlay &&
      games[gameIndex].playerTwo.unableToPlay &&
      !games[gameIndex].playerOne.sidePile.length
    ) {
      games[gameIndex].playerOne.sidePile = games[
        gameIndex
      ].playerOne.fieldCards
        .map((value) => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);

      games[gameIndex].playerTwo.sidePile = games[
        gameIndex
      ].playerTwo.fieldCards
        .map((value) => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);

      games[gameIndex].playerOne.fieldCards = [
        games[gameIndex].playerOne.sidePile[0],
      ];
      games[gameIndex].playerOne.sidePile.splice(0, 1);

      games[gameIndex].playerTwo.fieldCards = [
        games[gameIndex].playerTwo.sidePile[0],
      ];
      games[gameIndex].playerTwo.sidePile.splice(0, 1);

      games[gameIndex].playerOne.unableToPlay = false;
      games[gameIndex].playerTwo.unableToPlay = false;

      EmitToAllUsersInGame(io, games[gameIndex], "shuffle_side_pile");
    }
  });

  socket.on("winner", async (hostName, userType, speedType) => {
    const gameIndex = games.findIndex((game) => game.hostName === hostName);

    if (games[gameIndex].winner) {
      return;
    }

    const playerOneName = games[gameIndex].playerOne.name;
    const playerTwoName = games[gameIndex].playerTwo.name;

    games[gameIndex].gameState = GameStates.END;

    if (userType === UserTypes.PLAYER_ONE) {
      games[gameIndex].winner = playerOneName;

      if (speedType === SpeedTypes.CALIFORNIA) {
        await User.findOneAndUpdate(
          { username: playerOneName },
          { $inc: { california_wins: 1 } }
        );
        await User.findOneAndUpdate(
          { username: playerTwoName },
          { $inc: { california_losses: 1 } }
        );
      } else {
        await User.findOneAndUpdate(
          { username: playerOneName },
          { $inc: { regular_wins: 1 } }
        );
        await User.findOneAndUpdate(
          { username: playerTwoName },
          { $inc: { regular_losses: 1 } }
        );
      }
    } else {
      games[gameIndex].winner = playerTwoName;

      if (speedType === SpeedTypes.CALIFORNIA) {
        await User.findOneAndUpdate(
          { username: playerTwoName },
          { $inc: { california_wins: 1 } }
        );
        await User.findOneAndUpdate(
          { username: playerOneName },
          { $inc: { california_losses: 1 } }
        );
      } else {
        await User.findOneAndUpdate(
          { username: playerTwoName },
          { $inc: { regular_wins: 1 } }
        );
        await User.findOneAndUpdate(
          { username: playerOneName },
          { $inc: { regular_losses: 1 } }
        );
      }
    }

    EmitToAllUsersInGame(io, games[gameIndex], "game_status");
  });

  socket.on("rematch", (hostName, userType, speedType) => {
    const gameIndex = games.findIndex((game) => game.hostName === hostName);

    if (userType === UserTypes.PLAYER_ONE) {
      games[gameIndex].playerOne.rematch = true;
    } else {
      games[gameIndex].playerTwo.rematch = true;
    }

    if (
      games[gameIndex].playerOne.rematch &&
      games[gameIndex].playerTwo.rematch
    ) {
      if (speedType === SpeedTypes.REGULAR) {
        games[gameIndex] = {
          deck: Deck,
          hostName,
          speedType: SpeedTypes.REGULAR,
          winner: null,
          playerOne: {
            name: hostName,
            fieldCards: [],
            hand: [],
            sidePile: [],
            drawPile: [],
            ready: false,
            unabletoPlay: false,
            rematch: null,
          },
          playerTwo: {
            name: games[gameIndex].playerTwo.name,
            fieldCards: [],
            hand: [],
            sidePile: [],
            drawPile: [],
            ready: false,
            unableToPlay: false,
            rematch: null,
          },
          viewers: games[gameIndex].viewers,
          gameState: GameStates.WAITING,
        };
      } else {
        games[gameIndex] = {
          deck: Deck.map((card) => {
            return { ...card, hasMultiple: false };
          }),
          hostName,
          speedType,
          winner: null,
          playerOne: {
            name: hostName,
            deck: [],
            fieldCards: {
              pileOne: [],
              pileTwo: [],
              pileThree: [],
              pileFour: [],
            },
            ready: false,
          },
          playerTwo: {
            name: games[gameIndex].playerTwo.name,
            deck: [],
            fieldCards: {
              pileOne: [],
              pileTwo: [],
              pileThree: [],
              pileFour: [],
            },
            ready: false,
          },
          viewers: games[gameIndex].viewers,
          gameState: GameStates.WAITING,
        };
      }
    }

    EmitToAllUsersInGame(io, games[gameIndex], "game_status");
  });

  socket.on("disconnect", () => {
    console.log(`Socket ${socket.id} disconnected from main namespace`);
  });
});

// const regularSpeedNameSpace = io.of("regular_speed");

// regularSpeedNameSpace.on("connection", (socket) => {
//   console.log(`${socket.id} has joined the regular speed namespace.`);

//   socket.on("disconnect", () => {
//     console.log(
//       `Socket ${socket.id} disconnected from regular speed namespace`
//     );
//   });

//   socket.on("join_game", (hostName) => {
//     socket.join(hostName);

//     const room = games.find((room) => room.hostName === hostName);

//     console.log(games);

//     regularSpeedNameSpace.to(hostName).emit("game_status", room);
//   });

//   socket.on("quit", (hostName, userType, username) => {
//     socket.leave(hostName);
//     const gameIndex = games.findIndex((room) => room.hostName === hostName);

//     if (userType === UserTypes.PLAYER_ONE) {
//       games[gameIndex].playerOne = undefined;
//     } else if (userType === UserTypes.PLAYER_TWO) {
//       games[gameIndex].playerTwo = undefined;
//     } else {
//       let viewers = games[gameIndex].viewers;
//       viewers = viewers.filter((viewer) => viewer !== username);
//       games[gameIndex].viewers = viewers;
//     }

//     if (!games[gameIndex].playerOne && !games[gameIndex].playerTwo) {
//       games = games.filter(
//         (room) => room.hostName !== games[gameIndex].hostName
//       );
//     } else {
//       regularSpeedNameSpace
//         .to(hostName)
//         .emit("quit", games[gameIndex], userType, username);
//     }

//     io.emit("gameRooms", games);
//   });
// });

// // California Speed namespace
// const californiaSpeedNameSpace = io.of("california_speed");

// californiaSpeedNameSpace.on("connection", (socket) => {
//   console.log(`${socket.id} has joined the california namespace.`);

//   socket.on("disconnect", () => {
//     console.log(
//       `Socket ${socket.id} disconnected from california speed namespace`
//     );
//   });

//   socket.on("join_game", (hostName) => {
//     socket.join(hostName);

//     const room = games.find((room) => room.hostName === hostName);

//     console.log(games);

//     californiaSpeedNameSpace.to(hostName).emit("game_status", room);
//   });

//   socket.on("quit", (hostName, userType, username) => {
//     const gameIndex = games.findIndex((room) => room.hostName === hostName);

//     if (userType === UserTypes.PLAYER_ONE) {
//       games[gameIndex].playerOne = undefined;
//     } else if (userType === UserTypes.PLAYER_TWO) {
//       games[gameIndex].playerTwo = undefined;
//     } else {
//       let viewers = games[gameIndex].viewers;
//       viewers = viewers.filter((viewer) => viewer !== username);
//       games[gameIndex].viewers = viewers;
//     }

//     if (!games[gameIndex].playerOne && !games[gameIndex].playerTwo) {
//       games = games.filter(
//         (room) => room.hostName !== games[gameIndex].hostName
//       );
//     } else {
//       californiaSpeedNameSpace
//         .to(hostName)
//         .emit("quit", games[gameIndex], userType, username);
//     }

//     io.emit("gameRooms", games);

//     socket.leave(hostName);
//   });
// });

// // Game namespace
// const gameNameSpace = io.of("/games");

// gameNameSpace.on("connection", (socket) => {
//   console.log(`${socket.id} has joined the game namespace.`);

//   socket.on("disconnect", () => {
//     console.log(`Socket ${socket.id} disconnected`);
//   });

//   gameNameSpace.emit("receive_message", [
//     {
//       name: "Aleix Melon",
//       id: "E00245",
//       role: ["Dev", "DBA"],
//       age: 23,
//       doj: "11-12-2019",
//       married: false,
//       address: {
//         street: "32, Laham St.",
//         city: "Innsbruck",
//         country: "Austria",
//       },
//       referredby: "E0012",
//     },
//     {
//       name: "Bob Washington",
//       id: "E01245",
//       role: ["HR"],
//       age: 43,
//       doj: "10-06-2010",
//       married: true,
//       address: {
//         street: "45, Abraham Lane.",
//         city: "Washington",
//         country: "USA",
//       },
//       referredby: null,
//     },
//   ]);
//   socket.on("back_at_ya", async (msg) => {
//     console.log(msg);
//   });
// });

// start server
server.listen(PORT, () => {
  console.log(`Socket IO and express server listening on port: ${PORT}`);
});
