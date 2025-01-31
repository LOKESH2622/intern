import express from "express";
import authRoute from "./Routes/authroute.js";
import blogrouter from "./Routes/blogRoutes.js";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import dotenv from "dotenv";
dotenv.config();
const app = express();
mongoose.connect("mongodb://localhost:27017/")
app.use(express.json())
app.use(helmet())
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/", authRoute); 
app.use("/api", blogrouter);
app.get("/", (req, res) => {
  res.send("Hi, this is from the main server!");
});


const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

