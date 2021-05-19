import multer from "multer";
import aws from "aws-sdk";
import multer_s3 from "multer-s3";
import routes from "./routes";

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_PRIVATE_KEY,
  region: "ap-northeast-2",
});

const multer_video = multer({
  storage: multer_s3({
    s3,
    acl: "public-read",
    bucket: "wetube-2021-test/video",
  }),
});
const multer_avatar = multer({
  storage: multer_s3({
    s3,
    acl: "public-read",
    bucket: "wetubve-2021-test/avatar",
  }),
});

export const locals_middleware = (req, res, next) => {
  res.locals.site_name = "WeTube";
  res.locals.routes = routes;
  res.locals.logged_user = req.user || null;
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
export const upload_avatar = multer_avatar.single("avatar");
