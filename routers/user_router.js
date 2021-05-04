import express from "express";
import {
  change_password,
  get_edit_profile,
  post_edit_profile,
  user_detail,
} from "../controllers/user_controller";
import { only_private, upload_avatar } from "../middlewares";
import routes from "../routes";

const user_router = express.Router();

user_router.get(routes.edit_profile, only_private, get_edit_profile);
user_router.post(
  routes.edit_profile,
  only_private,
  upload_avatar,
  post_edit_profile
);

user_router.get(routes.change_password, only_private, change_password);

user_router.get(routes.users_detail(), only_private, user_detail);

export default user_router;
