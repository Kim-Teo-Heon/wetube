import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

const handle_connect = () => console.log("✔ Connected to DB");
const handle_error = (error) =>
  console.log(`❌ Error on DB connection:${error}`);

db.once("open", handle_connect);
db.on("error", handle_error);
