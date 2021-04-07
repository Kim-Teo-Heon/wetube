import express from "express";
import {
  get_join,
  login,
  logout,
  post_join,
} from "../controllers/user_controller";
import { home, search } from "../controllers/video_controller";
import routes from "../routes";

const global_router = express.Router();

global_router.get(routes.home, home);

global_router.get(routes.join, get_join);
global_router.post(routes.join, post_join);

global_router.get(routes.login, login);
global_router.get(routes.logout, logout);
global_router.get(routes.search, search);

export default global_router;
