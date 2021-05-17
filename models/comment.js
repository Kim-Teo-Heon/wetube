import mongoose from "mongoose";

const comment_schema = mongoose.Schema({
  text: {
    type: String,
    required: "Text is required",
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  // video: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "video",
  // },
});

const db = mongoose.model("comment", comment_schema);
export default db;
