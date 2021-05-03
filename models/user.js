import mongoose from "mongoose";
import passport_local_mongoose from "passport-local-mongoose";

const user_schema = new mongoose.Schema({
  name: String,
  email: String,
  avatar_url: String,
  kakao_id: Number,
  github_id: Number,
});

// usernameField를 username으로 하지않는 이유는 username 변경 시 확인이 복잡해짐
user_schema.plugin(passport_local_mongoose, { usernameField: "email" });
const model = mongoose.model("user", user_schema);
export default model;
