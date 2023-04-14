import jwt from "jsonwebtoken";
import errorHandling from "./errorHandling.js";
const key = process.env.PRIVATE__KEY;

const tokenVerify = async (req, res, next) => {
  try {
    const { token } = req.headers;
    if (token) {
      const secret_key = key + req.header["user-agent"];
      const user = jwt.verify(token, secret_key);

      if (!user) res.json({ status: 404, message: "You are not login!" });
      req.user = user;
      return next();
    }
    return res.json({ status: 404, message: "You are not login!" });
  } catch (error) {
    errorHandling(error);
    res.json({ status: 400, message: "You are not login", error });
  }
};

export default tokenVerify;
