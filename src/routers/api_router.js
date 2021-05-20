import express from "express";
import {
  post_add_comment,
  post_register_view,
  delete_comment,
} from "../controllers/video_controller";
import routes from "../routes";

const api_router = express.Router();

api_router.post(routes.register_view, post_register_view);
api_router.post(routes.add_commnet, post_add_comment);
api_router.delete(routes.delete_comment, delete_comment);

export default api_router;
