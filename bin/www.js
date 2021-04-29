import dotenv from "dotenv";

dotenv.config();

import "../db";
import "../models/video";
import "../models/comment";
import "../models/user";
import "../passport";
import app from "../app";

const port = process.env.PORT;

const handle_listening = () => {
  console.log(`Listening on: http://localhost:${port}`);
};

app.listen(port, handle_listening);
