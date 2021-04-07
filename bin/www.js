import app from "../app";
import "../db";
import "../models/video";
import "../models/comment";
import dotenv from "dotenv";
dotenv.config();

const port = process.env.PORT;

const handle_listening = () => {
  console.log(`Listening on: http://localhost:${port}`);
};

app.listen(port, handle_listening);
