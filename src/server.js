import express from "express";
import cors from "cors";
import "../config.js";
import upload from "express-fileupload";
const PORT = process.env.PORT || 5050;

import userRoute from "./routes/register.js";

const app = express();

app.use(upload());
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use(userRoute);

app.listen(PORT, () =>
  console.log(`server is running http://localhost:${PORT}`)
);
