import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    salt: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    california_wins: {
      type: Number,
      default: 0,
    },
    california_losses: {
      type: Number,
      default: 0,
    },
    regular_wins: {
      type: Number,
      default: 0,
    },
    regular_losses: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", UserSchema);

export default User;
