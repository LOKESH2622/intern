import express from "express";
import multer from "multer";
import { createBlog, getBlogs, getBlogById, updateBlog, deleteBlog, getBlogImage,likeBlog } from "../Controllers/blogcontroller.js";

const blogrouter = express.Router();

// Store images in memory instead of saving to disk
const storage = multer.memoryStorage();
const upload = multer({ storage });

blogrouter.get("/blogList", getBlogs);
blogrouter.get("/:id", getBlogById);
blogrouter.get("/blogs/image/:id", getBlogImage); 
blogrouter.post("/blogs/like/:id", likeBlog);
blogrouter.post("/blogs", upload.single("image"), createBlog);
blogrouter.put("/blogs/:id", upload.single("image"), updateBlog);  
blogrouter.delete("/delete/:id", deleteBlog);

export default blogrouter;
