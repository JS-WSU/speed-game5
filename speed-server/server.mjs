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

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

const chatNameSpace = io.of("/chat");
// Main namespace
chatNameSpace.on("connection", async (socket) => {
  console.log(`${socket.id} has joined the chat namespace.`);

  chatNameSpace.emit("chat_messages", await User.find({}));

  socket.on("disconnect", () => {
    console.log(`Socket ${socket.id} disconnected`);
  });
});

// Game namespace
const gameNameSpace = io.of("/games");

gameNameSpace.on("connection", (socket) => {
  console.log("User connected to game namespace: " + socket.id);

  socket.on("disconnect", () => {
    console.log(`Socket ${socket.id} disconnected`);
  });
  // socket.on("user", (userData) => {
  //   io.emit("user", `Hello, ${userData.username} is here!`);
  // });

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
});

// start server
server.listen(PORT, () => {
  console.log(`Socket IO and express server listening on port: ${PORT}`);
});
