import mongoose from "mongoose";

const RecordSchema = new mongoose.Schema({});

const Record = mongoose.model("Record", RecordSchema);

export default Record;
