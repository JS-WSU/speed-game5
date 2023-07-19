import mongoose from "mongoose";

const ChatMessageSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const ChatMessage = mongoose.model("ChatMessage", ChatMessageSchema);

export default ChatMessage;
