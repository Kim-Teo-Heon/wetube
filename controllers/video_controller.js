import routes from "../routes";
import video from "../models/video";

export const home = async (req, res) => {
  try {
    const videos = await video.find({});
    res.render("home", { page_title: "Home", videos });
  } catch (error) {
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
  // To Do : Upload Video and Save Video
  res.redirect(routes.video_detail(new_video.id));
};

export const video_detail = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const Video = await video.findById(id);
    res.render("video_detail", { page_title: "Video Detail", video: Video });
  } catch (error) {
    res.redirect(routes.home);
  }
};
export const edit_video = (req, res) => {
  console.log("Edit page");
  res.render("edit_video", { page_title: "Edit Video" });
};
export const delete_video = (req, res) =>
  res.render("delete_video", { page_title: "Delete Video" });
