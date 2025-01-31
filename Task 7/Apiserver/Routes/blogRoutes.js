import express from "express";
import multer from "multer";
import path from "path";
import {  createBlog ,getBlogs,getBlogById,updateBlog,deleteBlog} from "../Controllers/blogcontroller.js";

const blogrouter = express.Router();
export const storage = multer.diskStorage({
  destination: "./uploads",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({ storage });

blogrouter.get("/blogList", getBlogs);
blogrouter.get("/:id", getBlogById);
blogrouter.post("/blogs", upload.single("image"),createBlog);
blogrouter.put("/ublogs", updateBlog);
blogrouter.delete("/delete", deleteBlog);

export default blogrouter;
