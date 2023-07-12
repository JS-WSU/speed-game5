import mongoose from "mongoose";

const connectionString = process.env.ATLAS_URI || "";

try {
  await mongoose.connect(connectionString, { dbName: "sample_training" });
  console.log("Succesfully connected to MongoDB cluster using Mongoose");
} catch (e) {
  console.error(e);
}
