import express from "express";
import ChatMessage from "../db/models/ChatMessageSchema.mjs";
import bcrypt from "bcrypt";
import asyncHandler from "express-async-handler";

const router = express.Router();

router.get(
  "/",
  asyncHandler( async(req, res) => {
    const messages = await ChatMessage.find({});
    res.status(200).send(messages);
  })
)

router.post(
  "/sendMessage",
  asyncHandler( async(req, res) => {
    const { username, body, date } = req.body;

    const newMessage = new ChatMessage({
      username,
      body,
      date
    });

    await newMessage.save();
    res.status(201).send("message sent succesfully");
  })
)

export default router;