import express from "express";
import User from "../db/models/UserSchema.mjs";
import bcrypt from "bcrypt";
import asyncHandler from "express-async-handler";

const router = express.Router();

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const users = await User.aggregate([
      { $set: { totalGames: { $add: ["$wins", "$losses"] } } },
      { $set: { percentage: { $divide: ["$wins", "$totalGames"] } } },
      { $sort: { percentage: 1 } },
      { $unset: ["percentage"] },
    ]).limit(10);
    res.status(200).send(users);
  })
);

router.post(
  "/make-salt",
  asyncHandler(async (req, res) => {
    const emailTaken = await User.findOne({ email: req.body.email });

    const usernameTaken = await User.findOne({ username: req.body.username });

    let message = "";

    if (emailTaken) {
      message += "Email already taken. ";
    }
    if (usernameTaken) {
      message += "Username already taken.";
    }

    if (emailTaken || usernameTaken) {
      return res.status(401).send(message);
    }

    const salt = await bcrypt.genSalt(10);
    res.status(201).send(salt);
  })
);

router.post(
  "/get-salt",
  asyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });

    if (user) {
      res.status(201).send(user.salt);
    } else {
      res.status(401).send("Invalid Email or Password.");
    }
  })
);

router.post(
  "/register",
  asyncHandler(async (req, res) => {
    const { email, username, password, salt } = req.body;

    const newUser = new User({
      email,
      username,
      password,
      salt,
    });

    await newUser.save();

    req.session.user = { username };

    res.status(201).send(req.session.user);
  })
);

router.get("/test", async (req, res) => {
  console.log("hello");
  res.status(200).send("dasd");
});

router.post(
  "/login",
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });

    if (password !== user.password) {
      res.status(401).send("Invalid Email or Password.");
    } else {
      req.session.user = { username: user.username }; // makes session

      res.status(201).send(req.session.user);
    }
  })
);

router.get(
  "/authenticated",
  asyncHandler(async (req, res) => {
    if (req.session.user) {
      console.log(req.session.user);
      res.status(200).send(req.session.user);
    } else {
      res.status(401).send("Unauthorized.");
    }
  })
);

router.delete(
  `/logout`,
  asyncHandler(async (req, res) => {
    req.session.destroy((error) => {
      if (error) {
        return res.status(404).send(error.message);
      }
      res.clearCookie("session-id"); // cleaning the cookies from the user session
      res.status(204).send("Session destroyed successfully!");
    });
  })
);

router.get(
  "/user/:username",
  asyncHandler(async (req, res) => {
    console.log("test");
    const user = await User.findOne({ username: req.params.username });
    res.status(200).send(user);
  })
);

export default router;
