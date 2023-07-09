import { MongoClient } from "mongodb";
// import mongoose from "mongoose"

const connectionString = process.env.ATLAS_URI || "";

// try {
//   await mongoose.connect(connectionString, {dbName: "sample_training"})
//   console.log("Succesfully connected to MongoDB cluster using Mongoose")
// } catch(e) {
//   console.error(e);
// }

const client = new MongoClient(connectionString);

let conn;
try {
  conn = await client.connect();
  console.log("Succesfully connected to MongoDB cluster")
} catch(e) {
  console.error(e);
}

let db = conn.db("sample_training");

export default db;