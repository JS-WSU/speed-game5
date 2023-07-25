import "./loadEnvironment.mjs";
import "./db/conn.mjs";
import MongoDBStore from "./db/sessions.mjs";
import session from "express-session";
import express from "express";
import cors from "cors";
import records from "./routes/records.mjs";
import users from "./routes/users.mjs";
import cards from "./routes/cards.mjs";
import http from "http";
import { Server } from "socket.io";
import User from "./db/models/UserSchema.mjs";
import ChatMessage from "./db/models/ChatMessageSchema.mjs";
import { UserTypes } from "../speed-client/src/utils/Constants.mjs";

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
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
app.use("/cards", cards);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

// Main namespace

let rooms = [];

io.on("connection", async (socket) => {
  console.log(`${socket.id} has joined the main namespace.`);

  socket.on("join_lobby", async () => {
    socket.join("lobby");
    console.log(`${socket.id} has joined the lobby`);
    socket.emit("chat_messages", await ChatMessage.find({}));
    socket.emit("rooms", rooms);
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
    rooms.push({
      hostName,
      speedType,
      playerOne: hostName,
      playerTwo: undefined,
      viewers: [],
    });

    io.to("lobby").emit("rooms", rooms);
  });

  socket.on("join_game", (hostName, userType, username) => {
    socket.join(hostName);

    const roomIndex = rooms.findIndex((room) => room.hostName === hostName);

    if (userType === UserTypes.PLAYER_TWO) {
      rooms[roomIndex] = { ...rooms[roomIndex], playerTwo: username };
    } else if (userType === UserTypes.VIEWER) {
      const viewerFound = rooms[roomIndex].viewers.find(
        (viewer) => viewer === username
      );
      if (!viewerFound) {
        rooms[roomIndex] = {
          ...rooms[roomIndex],
          viewers: [...rooms[roomIndex].viewers, username],
        };
      }
    }

    io.to("lobby").emit("rooms", rooms);
    io.to(hostName).emit("game_status", rooms[roomIndex]);
  });

  socket.on("quit_game", (hostName, userType, username) => {
    socket.leave(hostName);
    const roomIndex = rooms.findIndex((room) => room.hostName === hostName);

    if (userType === UserTypes.PLAYER_ONE) {
      rooms[roomIndex].playerOne = undefined;
    } else if (userType === UserTypes.PLAYER_TWO) {
      rooms[roomIndex].playerTwo = undefined;
    } else {
      let viewers = rooms[roomIndex].viewers;
      viewers = viewers.filter((viewer) => viewer !== username);
      rooms[roomIndex].viewers = viewers;
    }

    if (!rooms[roomIndex].playerOne) {
      rooms = rooms.filter(
        (room) => room.hostName !== rooms[roomIndex].hostName
      );
    }

    io.to(hostName).emit("left_game", rooms[roomIndex], userType, username);
    io.to("lobby").emit("rooms", rooms);
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

//     const room = rooms.find((room) => room.hostName === hostName);

//     console.log(rooms);

//     regularSpeedNameSpace.to(hostName).emit("game_status", room);
//   });

//   socket.on("quit", (hostName, userType, username) => {
//     socket.leave(hostName);
//     const roomIndex = rooms.findIndex((room) => room.hostName === hostName);

//     if (userType === UserTypes.PLAYER_ONE) {
//       rooms[roomIndex].playerOne = undefined;
//     } else if (userType === UserTypes.PLAYER_TWO) {
//       rooms[roomIndex].playerTwo = undefined;
//     } else {
//       let viewers = rooms[roomIndex].viewers;
//       viewers = viewers.filter((viewer) => viewer !== username);
//       rooms[roomIndex].viewers = viewers;
//     }

//     if (!rooms[roomIndex].playerOne && !rooms[roomIndex].playerTwo) {
//       rooms = rooms.filter(
//         (room) => room.hostName !== rooms[roomIndex].hostName
//       );
//     } else {
//       regularSpeedNameSpace
//         .to(hostName)
//         .emit("quit", rooms[roomIndex], userType, username);
//     }

//     io.emit("rooms", rooms);
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

//     const room = rooms.find((room) => room.hostName === hostName);

//     console.log(rooms);

//     californiaSpeedNameSpace.to(hostName).emit("game_status", room);
//   });

//   socket.on("quit", (hostName, userType, username) => {
//     const roomIndex = rooms.findIndex((room) => room.hostName === hostName);

//     if (userType === UserTypes.PLAYER_ONE) {
//       rooms[roomIndex].playerOne = undefined;
//     } else if (userType === UserTypes.PLAYER_TWO) {
//       rooms[roomIndex].playerTwo = undefined;
//     } else {
//       let viewers = rooms[roomIndex].viewers;
//       viewers = viewers.filter((viewer) => viewer !== username);
//       rooms[roomIndex].viewers = viewers;
//     }

//     if (!rooms[roomIndex].playerOne && !rooms[roomIndex].playerTwo) {
//       rooms = rooms.filter(
//         (room) => room.hostName !== rooms[roomIndex].hostName
//       );
//     } else {
//       californiaSpeedNameSpace
//         .to(hostName)
//         .emit("quit", rooms[roomIndex], userType, username);
//     }

//     io.emit("rooms", rooms);

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
