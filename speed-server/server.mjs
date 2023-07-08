import express from "express";
import cors from "cors";
import "./loadEnvironment.mjs";
import hello from "./routes/hello.mjs";

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());

app.use("/hello", hello);

// start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});