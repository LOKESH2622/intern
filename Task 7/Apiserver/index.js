import express from "express";
import authRoute from "./Routes/authroute.js";
import blogrouter from "./Routes/blogRoutes.js";
import commentroute from "./Routes/commentRoutes.js";
import cors from "cors";
import mongoose from "mongoose";
import { Server as SocketServer } from "socket.io";  // Renaming to avoid conflict
import cookieParser from "cookie-parser";
import helmet from "helmet";
import dotenv from "dotenv";
import http from "http";

dotenv.config();
const app = express();

// Rename `Server` to `serverInstance` to avoid conflict
const serverInstance = http.createServer(app);

const io = new SocketServer(serverInstance, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});
app.set("io", io); 
io.on("connection", (socket) => {
  console.log("A user connected");
  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});
mongoose
  .connect("mongodb://localhost:27017/")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/", authRoute);
app.use("/api", blogrouter);
app.use("/comment", (req, res, next) => {
  req.io = io;  
  next();
}, commentroute);
app.get("/", (req, res) => {
  res.send("Hi, this is from the main server!");
});

const PORT = 5000;
serverInstance.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
