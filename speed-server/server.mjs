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
import cards from "./routes/cards.mjs";

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    name: "session-id",
    store: MongoDBStore,
    cookie: { maxAge: 2678400, sameSite: false, secure: false },
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

// Main lobby chat namespace

let rooms = [];

io.on("connection", async (socket) => {
  console.log(`${socket.id} has joined the main namespace.`);

  socket.emit("chat_messages", await ChatMessage.find({}));
  socket.emit("rooms", rooms);

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

  socket.on("host_game", ({ hostName, speedType }) => {
    socket.join(hostName);
    rooms.push({ hostName, speedType });
    io.emit("rooms", rooms);
  });

  socket.on("disconnect", () => {
    console.log(`Socket ${socket.id} disconnected`);
  });
});

// Regular Speed namespace
const regularSpeedNameSpace = io.of("regular_speed");

regularSpeedNameSpace.on("connection", (socket) => {
  console.log(`${socket.id} has joined the regular namespace.`);
});

// California Speed namespace
const californiaSpeedNameSpace = io.of("california");

californiaSpeedNameSpace.on("connection", (socket) => {
  console.log(`${socket.id} has joined the california namespace.`);
});

// Game namespace
const gameNameSpace = io.of("/games");

gameNameSpace.on("connection", (socket) => {
  console.log(`${socket.id} has joined the game namespace.`);

  socket.on("disconnect", () => {
    console.log(`Socket ${socket.id} disconnected`);
  });

  gameNameSpace.emit("receive_message", [
    {
      name: "Aleix Melon",
      id: "E00245",
      role: ["Dev", "DBA"],
      age: 23,
      doj: "11-12-2019",
      married: false,
      address: {
        street: "32, Laham St.",
        city: "Innsbruck",
        country: "Austria",
      },
      referredby: "E0012",
    },
    {
      name: "Bob Washington",
      id: "E01245",
      role: ["HR"],
      age: 43,
      doj: "10-06-2010",
      married: true,
      address: {
        street: "45, Abraham Lane.",
        city: "Washington",
        country: "USA",
      },
      referredby: null,
    },
  ]);
  socket.on("back_at_ya", async (msg) => {
    console.log(msg);
  })
});

// start server
server.listen(PORT, () => {
  console.log(`Socket IO and express server listening on port: ${PORT}`);
});
