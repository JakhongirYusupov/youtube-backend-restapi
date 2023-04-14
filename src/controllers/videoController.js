import errorHandling from "../utils/errorHandling.js";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import model from "../utils/postgres.js";
import models from "./models.js";

const POST = async (req, res) => {
  try {
    const { title } = req.body;
    const { id } = req.user;
    let { name, mv, size } = req.files.video;
    const filename = uuidv4() + path.extname(name);
    const ownVideo = await model(models.GET_OWN_VIDEO, title, id);
    console.log(ownVideo);
    if (ownVideo[0])
      return res.json({
        status: 400,
        message: "You already created this video!",
      });

    const video = await model(
      models.POSTVIDEO,
      title,
      filename,
      Math.floor(size / 1024),
      req.user.id
    );

    if (video) {
      mv(path.resolve("src/uploads/videos/" + filename), function (err) {
        if (err) console.log(err);
        else console.log(err);
      });
      return res.json({ status: 200, message: "Video created", data: video });
    }

    res.json({ status: 400, message: "Video did not create" });
  } catch (error) {
    errorHandling(error);
    return res.json({
      status: 400,
      message: "Video did not create",
      error: error.detail || error.message,
    });
  }
};

const DELETE = async (req, res) => {
  try {
    const { video_id } = req.params;
    const response = await model(models.DELETE_VIDEO, video_id);

    if (response[0]) return res.json({ status: 200, message: "Video deleted" });

    res.json({ status: 404, message: "Video not found" });
  } catch (error) {
    errorHandling(error);
    return res.json({
      status: 400,
      message: "Video did not delete",
      error: error.detail || error.message,
    });
  }
};

const UPDATE = async (req, res) => {
  try {
    const { id, title } = req.body;
    const video = await model(models.UPDATE_VIDEO, title, id, req.user.id);
    console.log(video);
    if (video[0])
      return res.json({
        status: 200,
        message: "Video updated",
        data: video[0],
      });

    res.json({ status: 404, message: "Video not found" });
  } catch (error) {
    errorHandling(error);
    return res.json({
      status: 400,
      message: "Video did not delete",
      error: error.detail || error.message,
    });
  }
};

export default {
  POST,
  DELETE,
  UPDATE,
};
