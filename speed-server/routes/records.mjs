import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";

const router = express.Router();

router.get("/john", async(req, res)=> {
  const records = db.collection("records");

  const record = await records.find({name: "John"}).toArray()

  res.status(200).send(record);
})

export default router;