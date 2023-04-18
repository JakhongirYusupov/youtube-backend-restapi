import { Router } from "express";
import userMiddleware from "../middlewares/userMiddleware.js";
import userController from "../controllers/userController.js";

const route = Router();

route.post("/register", userMiddleware.REGISTER, userController.REGISTER);
route.post("/login", userMiddleware.LOGIN, userController.LOGIN);

export default route;
