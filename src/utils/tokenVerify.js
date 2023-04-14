import jwt from "jsonwebtoken";
const key = process.env.PRIVATE__KEY;

const tokenVerify = (req, res, next) => {
  try {
    const { token } = req.headers;
    if (token) {
      const userAgent = req.headers["user-agent"];
      const secret_key = key + userAgent;
      const user = jwt.verify(token, secret_key);
      if (!user) res.json({ status: 404, message: "You are not login!" });
      req.user = user;
      return next();
    }
    return res.json({ status: 404, message: "You are not login!" });
  } catch (error) {
    res.json({ status: 400, message: "You are not login", error });
  }
};

export default tokenVerify;
