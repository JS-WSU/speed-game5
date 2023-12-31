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
  SpeedTypes,
  UserTypes,
} from "../speed-client/src/utils/Constants.mjs";
import { Deck } from "./utils/Constants.mjs";
import FilteredGames from "./utils/FilteredGames.mjs";
import FilterGameStatusForUser from "./utils/FilterGameStatusForUser.mjs";
import ShuffleCards from "./utils/ShuffleCards.mjs";
import EmitToAllUsersInGame from "./utils/EmitToAllUsersInGame.mjs";

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

// Main namespace
// const california_game = {
//   deck: [],
//   fieldCards: [],
//   hostName: undefined,
//   playerOne: {
//     name: undefined,
//     pile: []
//   },
//   playerTwo: {
//     name: undefined,
//     pile: []
//   },
//   viewers: [],
//   gameState: "waiting"
// }

// const regular_game = {
//   deck: [],
//   hostName: undefined,
//   playerOne: {
//     name: undefined,
//     fieldCards: [],
//     pile: [],
//     sidePile: []
//   },
//   playerTwo: {
//     name: undefined,
//     fieldCards: [],
//     pile: [],
//     sidePile: []
//   },
//   viewers: [],
//   gameState: "waiting"
// }

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
        playerOne: {
          name: hostName,
          fieldCards: [],
          hand: [],
          sidePile: [],
          drawPile: [],
          ready: false,
        },
        playerTwo: {
          name: null,
          fieldCards: [],
          hand: [],
          sidePile: [],
          drawPile: [],
          ready: false,
        },
        viewers: [],
        gameState: GameStates.WAITING,
      });
    } else {
      games.push({
        deck: Deck,
        hostName,
        speedType,
        playerOne: {
          name: hostName,
          deck: [],
          field: [],
          ready: false,
        },
        playerTwo: {
          name: null,
          deck: [],
          field: [],
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

  socket.on("quit_game", (hostName, userType, username) => {
    socket.leave(username);
    console.log(`${socket.id} left room ${username}`);
    const gameIndex = games.findIndex((room) => room.hostName === hostName);

    if (gameIndex !== -1) {
      if (userType === UserTypes.PLAYER_ONE) {
        games[gameIndex].playerOne.name = null;
      } else if (userType === UserTypes.PLAYER_TWO) {
        games[gameIndex].playerTwo.name = null;
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
        !games[gameIndex].playerTwo.name
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

    games[gameIndex] = ShuffleCards(games[gameIndex]);

    EmitToAllUsersInGame(io, games[gameIndex], "game_started");
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

  socket.on("disconnect", () => {
    console.log(`Socket ${socket.id} disconnected from main namespace`);
  });
});

// // Regular Speed namespace
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
