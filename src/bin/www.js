import "@babel/polyfill";
import dotenv from "dotenv";
import "../db";
import app from "../app";

dotenv.config();

import "../models/video";
import "../models/comment";
import "../models/user";
import "../passport";

const port = process.env.PORT;

const handle_listening = () => {
  console.log(`Listening on: http://localhost:${port}`);
};

app.listen(port, handle_listening);
