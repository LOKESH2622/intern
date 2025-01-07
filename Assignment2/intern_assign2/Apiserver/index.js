import express from "express";
import authRoute from "./Routes/authroute.js";
const app = express();
app.use("/auth", authRoute); 
app.get("/", (req, res) => {
  res.send("Hi, this is from the main server!");
});


const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
