import multer from "multer";
import routes from "./routes";

const multer_video = multer({ dest: "uploads/videos/" });

export const locals_middleware = (req, res, next) => {
  res.locals.site_name = "WeTube";
  res.locals.routes = routes;
  res.locals.user = req.user || null;
  next();
};

export const only_public = (req, res, next) => {
  if (req.user) {
    res.redirect(routes.home);
  } else {
    next();
  }
};

export const only_private = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect(routes.home);
  }
};

export const upload_video = multer_video.single("video-file");
