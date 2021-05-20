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
    req.flash("error", "Password don't match");
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
      res.redirect(routes.home);
    }
  }
};

export const get_login = (req, res) => {
  res.render("login", { page_name: "Login" });
};
export const post_login = passport.authenticate("local", {
  failureRedirect: routes.login,
  successRedirect: routes.home,
  failureFlash: "Can't log in. Check email and/or password",
  successFlash: "Welcome",
});

export const github_login = passport.authenticate("github", {
  failureFlash: "Welcome",
  successFlash: "Can't log in at this time",
});

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
    const user = await User.findOne({ $or: [{ email }, { github_id: id }] });
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

export const kakao_login = passport.authenticate("kakao", {
  failureFlash: "Can't log in at this time",
  successFlash: "Welcome",
});
export const kakao_login_callback = async (
  access_token,
  refresh_token,
  profile,
  cb
) => {
  const {
    _json: {
      id,
      properties: { nickname: name, profile_image: avatar_url },
      kakao_account: { email },
    },
  } = profile;
  try {
    const user = await User.findOne({ $or: [{ email }, { kakao_id: id }] });
    if (user) {
      user.kakao_id = id;
      user.save();
      return cb(null, user);
    }
    const new_user = await User.create({
      email,
      name,
      kakao_id: id,
      avatar_url,
    });
    return cb(null, new_user);
  } catch (error) {
    return cb(error);
  }
};
export const post_kakao_login = (req, res) => {
  res.redirect(routes.home);
};

export const logout = (req, res) => {
  req.logout();
  req.flash("info", "Logged out, see you later");
  res.redirect(routes.home);
};

export const get_me = (req, res) => {
  res.render("user_detail", { page_title: "User Detail", user: req.user });
};

export const user_detail = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const user = await User.findById(id).populate("videos");
    res.render("user_detail", { page_title: "User Detail", user });
  } catch (error) {
    req.flash("error", "User not found");
    res.redirect(routes.home);
  }
};

export const get_edit_profile = (req, res) => {
  res.render("edit_profile", { page_title: "Edit Profile" });
};
export const post_edit_profile = async (req, res) => {
  const {
    user: { _id: id, avatar_url },
    body: { name, email },
    file,
  } = req;
  try {
    await User.findByIdAndUpdate(id, {
      name,
      email,
      avatar_url: file ? `/${file.location}` : avatar_url,
    });
    req.flash("success", "Profile updated");
    res.redirect(routes.me);
  } catch (error) {
    req.flash("error", "Can't update profile");
    res.redirect(routes.edit_profile);
  }
};

export const get_change_password = (req, res) => {
  res.render("change_password", { page_title: "Change Password" });
};
export const post_change_password = async (req, res) => {
  const {
    body: { old_password, new_password, new_password1 },
  } = req;
  try {
    if (new_password !== new_password1) {
      req.flash("error", "Pssword don't match");
      res.status(400);
      res.redirect(`/users/${routes.change_password}`);
      return;
    }
    await req.user.changePassword(old_password, new_password);
    res.redirect(routes.me);
  } catch (error) {
    req.flash("error", "Can't change password");
    res.status(400);
    res.redirect(`/users/${routes.change_password}`);
  }
};
