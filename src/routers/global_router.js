import express from "express";
import passport from "passport";
import {
  get_join,
  get_login,
  github_login,
  logout,
  post_github_login,
  post_join,
  post_login,
  get_me,
  kakao_login,
  post_kakao_login,
} from "../controllers/user_controller";
import { home, search } from "../controllers/video_controller";
import { only_private, only_public } from "../middlewares";
import routes from "../routes";

const global_router = express.Router();

global_router.get(routes.home, home);

global_router.get(routes.join, only_public, get_join);
global_router.post(routes.join, only_public, post_join, post_login);

global_router.get(routes.login, only_public, get_login);
global_router.post(routes.login, only_public, post_login);

global_router.get(routes.logout, only_private, logout);
global_router.get(routes.search, search);

global_router.get(routes.github, github_login);
global_router.get(
  routes.github_callback,
  passport.authenticate("github", {
    failureRedirect: routes.login,
  }),
  post_github_login
);

global_router.get(routes.kakao, kakao_login);
global_router.get(
  routes.kakao_callback,
  passport.authenticate("kakao", { failureRedirect: routes.login }),
  post_kakao_login
);

global_router.get(routes.me, get_me);

export default global_router;
