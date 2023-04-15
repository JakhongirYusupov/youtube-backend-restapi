import { Router } from "express";
import VerifyToken from "../utils/tokenVerify.js";
import userController from "../controllers/userController.js";

const route = Router();

route.get("/user", VerifyToken, userController.GET);

export default route;
