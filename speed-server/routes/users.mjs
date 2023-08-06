import express from "express";
import User from "../db/models/UserSchema.mjs";
import bcrypt from "bcrypt";
import asyncHandler from "express-async-handler";
import SortByWinsGameType from "../utils/SortByWinsGameType.mjs";
import { GameTypes, MONGO_DB_LIMIT } from "../utils/Constants.mjs";

const router = express.Router();

// router.get(
//   "/reset",
//   asyncHandler(async (req, res) => {
//     await User.updateMany(null, {
//       $set: {
//         california_losses: 0,
//         california_wins: 0,
//         regular_losses: 0,
//         regular_wins: 0,
//       },
//     });

//     res.status(200).send(await User.find());
//   })
// );

router.get(
  "/top-10-each",
  asyncHandler(async (req, res) => {
    let users_california = await SortByWinsGameType(GameTypes.CALIFORNIA, 10);

    let users_regular = await SortByWinsGameType(GameTypes.REGULAR, 10);

    users_california = users_california.filter((user) => user.totalGames > 0);

    users_regular = users_regular.filter((user) => user.totalGames > 0);

    res.status(200).send({ users_california, users_regular });
  })
);

router.get(
  "/regular/:username",
  asyncHandler(async (req, res) => {
    const thisUser = await User.findOne({ username: req.params.username });

    if (!thisUser) {
      return res.status(404).send("User does not exist.");
    }

    const users = await SortByWinsGameType(GameTypes.REGULAR, MONGO_DB_LIMIT);

    let rank;

    let userFound = users.find((user, index) => {
      rank = index + 1;
      return user.username === thisUser.username;
    });

    userFound = { ...userFound, rank };
    res.status(200).send(userFound);
  })
);

router.get(
  "/california/:username",
  asyncHandler(async (req, res) => {
    const thisUser = await User.findOne({ username: req.params.username });

    if (!thisUser) {
      return res.status(404).send("User does not exist.");
    }

    const users = await SortByWinsGameType(
      GameTypes.CALIFORNIA,
      MONGO_DB_LIMIT
    );

    let rank;

    let userFound = users.find((user, index) => {
      rank = index + 1;
      return user.username === thisUser.username;
    });

    userFound = { ...userFound, rank };
    res.status(200).send(userFound);
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

export default router;
