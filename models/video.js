import mongoose from "mongoose";

const video_schema = new mongoose.Schema({
  file_url: {
    type: String,
    required: "File is required",
  },
  title: {
    type: String,
    required: "Title is required",
  },
  description: String,
  views: {
    type: Number,
    default: 0,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
});

const model = mongoose.model("video", video_schema);
export default model;
