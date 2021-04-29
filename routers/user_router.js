import express from "express";
import { change_password, edit_profile } from "../controllers/user_controller";
import { only_private } from "../middlewares";
import routes from "../routes";

const user_router = express.Router();

user_router.get(routes.edit_profile, only_private, edit_profile);

user_router.get(routes.change_password, only_private, change_password);

user_router.get(routes.users_detail(), only_private, (req, res) => {
  res.render("user_detail");
});

export default user_router;
