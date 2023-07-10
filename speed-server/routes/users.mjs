import express from "express";
import User from "../models/UserSchema.mjs";
import bcrypt from "bcrypt";
import asyncHandler from "express-async-handler";

const router = express.Router();

router.post("/gen-salt", async (req, res) => {
  const usernameTaken = await User.findOne({ username: req.body.username });

  if (usernameTaken) {
    res.status(401).send("Username already taken");
  } else {
    const salt = await bcrypt.genSalt(10);
    res.status(201).send(salt);
  }
});

router.post("/get-salt", async (req, res) => {
  console.log(req.session);

  const user = await User.findOne({ username: req.body.username });

  if (user) {
    res.status(201).send(user.salt);
  } else {
    res.status(401).send("Invalid Username or Password");
  }
});

router.post("/register-new-user", async (req, res) => {
  const { username, password, salt, userType } = req.body;

  const newUser = new User({
    username,
    password,
    salt,
    userType,
  });

  await newUser.save();

  req.session.user = { username, isLoggedIn: true }; // makes session

  res
    .status(201)
    .send({ message: `${username} created!`, userSession: req.session.user });

  // res.status(204).send(`${username} created!`);
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username: username });

  if (password !== user.password) {
    return res.status(401).send("Invalid Username or Password");
  }

  req.session.user = { username: user.username, isLoggedIn: true }; // makes session

  console.log(req.session);

  res
    .status(201)
    .send({ message: "Login successful", userSession: req.session.user });
});

router.get(
  "/isLoggedIn",
  asyncHandler(async (req, res) => {
    console.log(req.session);

    if (req.session.user) {
      res.status(200).send(req.session.user);
    } else {
      res.status(401).send("Unauthorized");
    }
  })
);

router.delete(`/logout`, async (req, res) => {
  console.log(req.session);
  req.session.destroy((error) => {
    if (error) {
      return res.status(404).send(error.message);
    }
    res.clearCookie("session-id"); // cleaning the cookies from the user session
    res.status(204).send("Session destroyed successfully!");
  });
});

export default router;
