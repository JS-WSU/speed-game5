import ConnectMongoDBSession from "connect-mongodb-session";
import session from "express-session";

const ConnectMongoDBStore = ConnectMongoDBSession(session);

const MongoDBStore = new ConnectMongoDBStore({
  uri: process.env.ATLAS_URI,
  collection: "mySessions",
  databaseName: "sample_training",
});

export default MongoDBStore;
