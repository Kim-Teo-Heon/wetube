import express from "express";
import {
  edit_video,
  get_upload,
  post_upload,
  video_detail,
} from "../controllers/video_controller";
import { upload_video } from "../middlewares";
import routes from "../routes";

const video_router = express.Router();

video_router.get(routes.upload, get_upload);
video_router.post(routes.upload, upload_video, post_upload);

video_router.get(routes.edit_video(), edit_video);
video_router.get(routes.delete_video, edit_video);

video_router.get(routes.video_detail(), video_detail);

export default video_router;
