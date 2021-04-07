import routes from "../routes";
import video from "../models/video";

export const home = async (req, res) => {
  try {
    const videos = await video.find({});
    console.log(videos);
    res.render("home", { page_title: "Home", videos });
  } catch (error) {
    console.log(error);
    res.render("home", { page_title: "Home", videos: [] });
  }
};
export const search = (req, res) => {
  // 최신 방법
  const {
    query: { term: searching_by },
  } = req;
  // 옛날 방법
  // const searching_by = req.query.term;

  res.render("search", { page_title: "Search", searching_by, videos });
};

export const get_upload = (req, res) =>
  res.render("upload", { page_title: "Upload" });

export const post_upload = async (req, res) => {
  console.log("post");
  const {
    body: { title, description },
    file: { path },
  } = req;

  const new_video = await video.create({
    file_url: path,
    title,
    description,
  });
  console.log(new_video);
  // To Do : Upload Video and Save Video
  res.redirect(routes.video_detail(new_video.id));
  console.log("end");
};

export const edit_video = (req, res) =>
  res.render("edit_video", { page_title: "Edit Video" });
export const delete_video = (req, res) =>
  res.render("delete_video", { page_title: "Delete Video" });

export const video_detail = (req, res) =>
  res.render("video_detail", { page_title: "Video Detail" });
