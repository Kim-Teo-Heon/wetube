import express from "express";
import {
  get_edit_video,
  post_edit_video,
  get_upload,
  post_upload,
  video_detail,
} from "../controllers/video_controller";
import { upload_video } from "../middlewares";
import routes from "../routes";

const video_router = express.Router();

// Upload
video_router.get(routes.upload, get_upload);
video_router.post(routes.upload, upload_video, post_upload);

// Video Detail
video_router.get(routes.video_detail(), video_detail);

// Edit Video
video_router.get(routes.edit_video(), get_edit_video);
video_router.post(routes.edit_video(), post_edit_video);

// Delete Video
video_router.get(routes.delete_video, get_edit_video);

export default video_router;
