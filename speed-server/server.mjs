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

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());

const server =http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000'
    }
});

io.of('/game').on('connection', (socket) => {
    console.log("User connected: " + socket.id);
    socket.emit('receive_message', JSON.stringify(
      [
        {
          name: "Aleix Melon",
          id: "E00245",
          role: [
            "Dev",
            "DBA"
          ],
          age: 23,
          doj: "11-12-2019",
          married: false,
          address: {
            street: "32, Laham St.",
            city: "Innsbruck",
            country: "Austria"
          },
          referredby: "E0012"
        },
        {
          name: "Bob Washington",
          id: "E01245",
          role: [
            "HR"
          ],
          age: 43,
          doj: "10-06-2010",
          married: true,
          address: {
            street: "45, Abraham Lane.",
            city: "Washington",
            country: "USA"
          },
          referredby: null
        }
      ]
    ));
})

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

// start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});

server.listen(4001, () => {
  console.log(`Listening on port: 4001`);
});