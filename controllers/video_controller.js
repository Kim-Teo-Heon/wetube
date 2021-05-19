import routes from "../routes";
import video from "../models/video";
import Comment from "../models/comment";

export const home = async (req, res) => {
  try {
    const videos = await video.find({}).sort({ _id: -1 });
    res.render("home", { page_title: "Home", videos });
  } catch (error) {
    res.render("home", { page_title: "Home", videos: [] });
  }
};
export const search = async (req, res) => {
  // 최신 방법
  const {
    query: { term: searching_by },
  } = req;
  // 옛날 방법
  // const searching_by = req.query.term;
  let videos = [];
  try {
    videos = await video.find({
      $or: [
        { title: { $regex: searching_by, $options: "i" } },
        { description: { $regex: searching_by, $options: "i" } },
      ],
    });
    // i => 대문자 소문자 구별 x
  } catch (error) {
    console.log(error);
  }
  res.render("search", { page_title: "Search", searching_by, videos });
};

export const get_upload = (req, res) =>
  res.render("upload", { page_title: "Upload" });

export const post_upload = async (req, res) => {
  const {
    body: { title, description },
    file: { location },
  } = req;

  const new_video = await video.create({
    file_url: location,
    title,
    description,
    creator: req.user.id,
  });
  await req.user.videos.push(new_video.id);
  req.user.save();
  // To Do : Upload Video and Save Video
  res.redirect(routes.video_detail(new_video.id));
};

export const video_detail = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const Video = await video
      .findById(id)
      .populate("creator")
      .populate({
        path: "comments",
        populate: { path: "creator" },
      });
    res.render("video_detail", { page_title: Video.title, video: Video });
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }
};

export const get_edit_video = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const edit_video = await video.findById(id);
    if (edit_video.creator.toString() !== req.user.id) {
      throw Error();
    } else {
      res.render("edit_video", {
        page_title: `Edit ${edit_video.title}`,
        video: edit_video,
      });
    }
  } catch (error) {
    res.redirect(routes.home);
  }
};
export const post_edit_video = async (req, res) => {
  const {
    body: { title, description },
    params: { id },
  } = req;
  try {
    await video.findOneAndUpdate({ _id: id }, { title, description });
    res.redirect(routes.video_detail(id));
  } catch (error) {
    res.redirect(routes.home);
  }
};

export const delete_video = async (req, res) => {
  const {
    params: { id },
  } = req;

  try {
    const edit_video = await video.findById(id);
    if (edit_video.creator.toString() !== req.user.id) {
      throw Error();
    } else {
      await video.deleteOne({ _id: id });
      // await video.findOneAndRemove({ _id: id });
    }
  } catch (error) {
    console.log(error);
  }
  res.redirect(routes.home);
};

export const post_register_view = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const Video = await video.findById(id);
    Video.views += 1;
    Video.save();
    res.status(200);
  } catch (error) {
    console.log(error);
    res.status(400);
  } finally {
    res.end();
  }
};

export const post_add_comment = async (req, res) => {
  const {
    params: { id },
    user,
    body: { comment },
  } = req;
  try {
    const Video = await video.findById(id);
    const new_comment = await Comment.create({
      text: comment,
      creator: user.id,
    });
    Video.comments.push(new_comment.id);
    Video.save();
    res.status(200);
  } catch (error) {
    res.status(400);
  } finally {
    res.end();
  }
};

export const delete_comment = async (req, res) => {
  const {
    params: { id },
    body: { index },
  } = req;
  try {
    const Video = await video.findById(id);
    const delete_comment_id = Video.comments.reverse()[index];
    const comment = await Comment.findById(delete_comment_id);

    if (req.user.id === comment.creator.toString()) {
      await Comment.deleteOne({ _id: delete_comment_id });
      await Video.comments.filter((element) => element !== delete_comment_id);
      Video.save();
    } else {
      throw Error();
    }
    res.status(200);
  } catch (error) {
    console.log(error);
    res.status(400);
  } finally {
    res.end();
  }
};
