import { Router } from "express";
import videoController from "../controllers/videoController.js";
import videoMiddleware from "../middlewares/videoMiddleware.js";
import tokenVerify from "../utils/tokenVerify.js";

const route = Router();

route.post(
  "/video",
  tokenVerify,
  videoMiddleware.UPLOADVIDEO,
  videoController.POST
);

route.delete("/video/:video_id", tokenVerify, videoController.DELETE);
route.put(
  "/video",
  tokenVerify,
  videoMiddleware.UPDATEVIDEO,
  videoController.UPDATE
);

export default route;
