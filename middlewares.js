import multer from "multer";
import routes from "./routes";

const multer_video = multer({ dest: "uploads/videos/" });

export const locals_middleware = (req, res, next) => {
  res.locals.site_name = "WeTube";
  res.locals.routes = routes;
  res.locals.user = {
    is_authenticated: true,
    id: "xbox1720",
  };
  next();
};

export const upload_video = multer_video.single("video-file");
