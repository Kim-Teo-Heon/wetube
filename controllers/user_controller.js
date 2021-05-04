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

export const kakao_login = passport.authenticate("kakao");
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
  console.log(id);
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
    const user = await User.findById(id);
    console.log(user);
    res.render("user_detail", { page_title: "User Detail", user });
  } catch (error) {
    console.log("Error");
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
  console.log(file);
  try {
    await User.findByIdAndUpdate(id, {
      name,
      email,
      avatar_url: file ? file.path : avatar_url,
    });
    res.redirect(routes.me);
  } catch (error) {
    res.redirect(routes.edit_profile);
  }
};

export const change_password = (req, res) => {
  res.render("change_password", { page_title: "Change Password" });
};
