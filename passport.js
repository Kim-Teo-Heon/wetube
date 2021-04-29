import passport from "passport";
import github_strategy from "passport-github";
import { github_login_callback } from "./controllers/user_controller";
import user from "./models/user";
import routes from "./routes";

passport.use(user.createStrategy());

passport.use(
  new github_strategy(
    {
      clientID: process.env.GH_ID,
      clientSecret: process.env.GH_SECRET,
      callbackURL: `http://localhost:4000${routes.github_callback}`,
    },
    github_login_callback
  )
);

// serializeUser => 어떤 field가 쿠키에 포함될 것인지 알려줌
passport.serializeUser(user.serializeUser());
// deserializeUser => 어느 사용자인지 어떻게 찾는가
// 찾은 사용자를 middleware나 routes의 request object에 할당
passport.deserializeUser(user.deserializeUser());
