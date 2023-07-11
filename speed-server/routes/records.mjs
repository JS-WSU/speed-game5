import express from "express";
import Record from "../db/models/RecordSchema.mjs";

const router = express.Router();

router.get("/john", async (req, res) => {
  const record = await Record.findOne({ name: "John" });
  res.status(200).send(record);
});

export default router;
