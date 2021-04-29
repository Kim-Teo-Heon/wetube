import passport from "passport";
import routes from "../routes";
import User from "../models/user";

export const get_join = (req, res) => res.render("join", { page_name: "Join" });
export const post_join = async (req, res, next) => {
  const {
    body: { name, email, password, password2 },
  } = req;

  if (password !== password2) {
    // 구글의 비밀 번호 저장을 막기 위함
    res.status(400);
    res.render("join", { page_name: "Join" });
  } else {
    try {
      const user = await User({
        name,
        email,
      });
      await User.register(user, password);
      next();
    } catch (error) {
      console.log(error);
    }
  }
};

export const get_login = (req, res) => {
  res.render("login", { page_name: "Login" });
};
export const post_login = passport.authenticate("local", {
  failureRedirect: routes.login,
  successRedirect: routes.home,
});

export const github_login = passport.authenticate("github");

export const github_login_callback = async (
  access_token,
  refresh_token,
  profile,
  cb
) => {
  const {
    _json: { id, avatar_url, name, email },
  } = profile;
  try {
    const user = await User.findOne({ email });
    if (user) {
      user.github_id = id;
      user.save();
      return cb(null, user);
    }
    const new_user = await User.create({
      email,
      name,
      github_id: id,
      avatar_url,
    });
    return cb(null, new_user);
  } catch (error) {
    return cb(error);
  }
};

export const post_github_login = (req, res) => {
  res.redirect(routes.home);
};

export const logout = (req, res) => {
  req.logout();
  res.redirect(routes.home);
};
export const edit_profile = (req, res) => res.render("edit_profile");
export const change_password = (req, res) => res.render("change_password");
