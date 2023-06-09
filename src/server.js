import express from "express";
import cors from "cors";
import "../config.js";
import upload from "express-fileupload";
import path from "path";
const PORT = process.env.PORT || 5050;

import userRoute from "./routes/register.js";
import videoRoute from "./routes/video.js";
import getUserRoute from "./routes/user.js";
const app = express();

app.use(cors());
app.use(upload());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(process.cwd(), "/src/uploads")));

app.use(userRoute);
app.use(videoRoute);
app.use(getUserRoute);

app.listen(PORT, () =>
  console.log(`server is running http://localhost:${PORT}`)
);
