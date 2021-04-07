import express from "express";
import logger from "morgan";
import helmet from "helmet";
import cookie_parser from "cookie-parser";
import body_parser from "body-parser";
import { locals_middleware } from "./middlewares";
import routes from "./routes";
import user_router from "./routers/user_router";
import global_router from "./routers/global_router";
import video_router from "./routers/video_router";

// app에 express 실행 한 것을 담음
const app = express();

app.use(helmet({ contentSecurityPolicy: false }));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(body_parser.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));
app.use(body_parser.json());
app.use(cookie_parser());
app.use(locals_middleware);
// 이게 뭔 의미냐?
// app.use(function(req, res, next) {
//     res.setHeader("Content-Security-Policy", "script-src 'self' https://archive.org");
//     return next();
//     });

// Routes
app.use(routes.home, global_router);
app.use(routes.users, user_router);
app.use(routes.videos, video_router);

export default app;
