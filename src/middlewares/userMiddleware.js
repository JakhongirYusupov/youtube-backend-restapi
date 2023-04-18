import errorHandling from "../utils/errorHandling.js";
import userValidation from "../validation/user.js";

const REGISTER = (req, res, next) => {
  try {
    if (!req.files) {
      res.json({ status: 400, message: "Select image" });
    }
    const { mimetype, size } = req.files.profile_img;
    const { error } = userValidation.POST(req.body);
    const imageError = userValidation.UPLOAD({ mimetype, size });
    if (error) {
      return res.status(400).json({ msg: error.details[0].message });
    }
    if (imageError.error) {
      return res.status(400).json({ msg: imageError.error.details[0].message });
    }
    next();
  } catch (error) {
    errorHandling(error);
  }
};

const LOGIN = (req, res, next) => {
  try {
    const { error } = userValidation.LOGIN(req.body);
    if (error) {
      return res.status(400).json({ msg: error.details[0].message });
    }
    next();
  } catch (error) {
    errorHandling(error);
  }
};

export default {
  LOGIN,
  REGISTER,
};
