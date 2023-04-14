import errorHandling from "../utils/errorHandling.js";
import video from "../validation/video.js";

const UPLOADVIDEO = (req, res, next) => {
  try {
    if (!req.files) return res.status(400).json({ message: "Video null" });
    const { mimetype, size } = req.files.video;
    const { error } = video.UPLOADVIDEO({ ...req.body, mimetype, size });
    if (error) {
      return res.status(400).json({ msg: error.details[0].message });
    }
    next();
  } catch (error) {
    errorHandling(error);
  }
};

const UPDATEVIDEO = (req, res, next) => {
  try {
    const { error } = video.UPDATEVIDEO(req.body);
    if (error) {
      return res.status(400).json({ msg: error.details[0].message });
    }
    next();
  } catch (error) {
    errorHandling(error);
  }
};

export default {
  UPLOADVIDEO,
  UPDATEVIDEO,
};
