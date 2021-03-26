import express from 'express';
import { edit_video, upload } from '../controllers/video_controller';
import routes from '../routes';

const video_router = express.Router();

video_router.get('/', (req, res) => {
    
})
video_router.get(routes.upload, upload)
video_router.get(routes.edit_video, edit_video);
video_router.get(routes.delete_video, edit_video);

export default video_router;