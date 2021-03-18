import express from 'express';
import { join, login, logout } from '../controllers/user_controller';
import { home, search } from '../controllers/video_controller';
import routes from '../routes';

const global_router = express.Router();

global_router.get(routes.home,home);
global_router.get(routes.join,join);
global_router.get(routes.login,login);
global_router.get(routes.logout,logout);
global_router.get(routes.search,search);

export default global_router;