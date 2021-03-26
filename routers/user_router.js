import express from 'express';
import { change_password, edit_profile } from '../controllers/user_controller';
import routes from '../routes';

const user_router = express.Router();


user_router.get(routes.edit_profile, edit_profile);

user_router.get(routes.change_password, change_password)

user_router.get(routes.users_detail(), (req, res) => {
    res.render('user_detail');
});

export default user_router;