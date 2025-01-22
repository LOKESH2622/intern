import express from "express";
import authRoute from "./Routes/authroute.js";
import cors from "cors";
import mongoose from "mongoose";
const app = express();
mongoose.connect("mongodb://localhost:27017/")
app.use(express.json())
app.use(cors())
app.use("/", authRoute); 
app.get("/", (req, res) => {
  res.send("Hi, this is from the main server!");
});


const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

