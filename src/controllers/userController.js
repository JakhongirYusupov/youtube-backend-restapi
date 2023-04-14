import errorHangling from "../utils/errorHandling.js";
import jwt from "jsonwebtoken";
import model from "../utils/postgres.js";
import models from "./models.js";
import { v4 as uuidv4 } from "uuid";
import path from "path";
const key = process.env.PRIVATE__KEY;

const REGISTER = async (req, res) => {
  try {
    const { token } = req.headers;
    if (token) {
      const secret_key = key + req.header["user-agent"];
      const verify = jwt.verify(token, secret_key);
      const user = await model(models.GETUSER, verify.id);
      console.log(user);
      if (user[0])
        return res.json({ status: 200, message: "You are already register!" });
    }
    let { username, password } = req.body;
    const { mv, name } = req.files.profile_img;
    const filename = uuidv4() + path.extname(name);
    password = jwt.sign(password, key);

    const user = await model(models.POSTUSER, username, password, filename);

    if (user) {
      mv(path.resolve("src/uploads/images/" + filename), function (err) {
        if (err) console.log(err);
        else console.log(err);
      });
      return res.json({ status: 200, message: "User succesfull created" });
    }
    return res.json({
      status: 400,
      message: "User did not create check token",
    });
  } catch (error) {
    errorHangling(error);
    return res.json({
      status: 400,
      message: "User did not create",
      error: error.detail || error.message,
    });
  }
};

const LOGIN = async (req, res) => {
  try {
    const { token } = req.headers;
    if (token) {
      const secret_key = key + req.header["user-agent"];
      const verify = jwt.verify(token, secret_key);
      const user = await model(models.GETUSER, verify.id);
      if (user[0])
        return res.json({ status: 200, message: "You are already login!" });
    }

    const { username, password } = req.body;
    const user = await model(models.LOGIN, username, jwt.sign(password, key));
    if (user[0])
      return res.json({
        status: 200,
        message: "You are succesfull login",
        data: user[0],
        token: jwt.sign(user[0], key + req.header["user-agent"], {
          expiresIn: "15d",
        }),
      });
    return res.json({ status: 400, message: "Email or password wrong!" });
  } catch (error) {
    errorHangling(error);
    return res.json({
      status: 400,
      message: "Did not login",
      error: error.detail || error.message,
    });
  }
};

export default {
  REGISTER,
  LOGIN,
};
