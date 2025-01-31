import Blog from "../DataModels/post.js";
import User from "../DataModels/usermodel.js";
import mongoose from "mongoose";

// Get all blogs
export const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ dateOfCreation: -1 });
    res.status(200).json({ blogs });
  } catch (err) {
    res.status(500).json({ message: "Error fetching blogs." });
  }
};

// Get a blog by ID
export const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id)
      .populate("userId", "firstname lastname emailid")
      .populate("comments.userId", "firstname lastname")
      .populate("likes", "firstname lastname");

    if (!blog) {
      return res.status(404).json({ message: "Blog not found." });
    }
    res.status(200).json(blog);
  } catch (err) {
    res.status(500).json({ message: "Error fetching blog." });
  }
};

// Create a new blog
export const createBlog = async (req, res) => {
  try {
    console.log("Request Body:", req.body);
    console.log("Uploaded File:", req.file);

    // Find the user by email
    const user = await User.findOne({ emailid: req.body.userId });

    if (!user) {
      console.log("User not found with email:", req.body.userId);
      return res.status(400).json({ message: "User not found." });
    }
    const userId = user._id;

    // Create the blog
    const blog = new Blog({
      userId: userId,
      title: req.body.title,
      content: req.body.content,
      image: req.file ? `/uploads/${req.file.filename}` : null,
    });

    await blog.save();
    res.status(201).json(blog);
  } catch (err) {
    console.error("Error creating blog:", err);
    res.status(500).json({ message: "Error creating blog.", error: err.message });
  }
};

// Delete a blog
export const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found." });
    }
    res.status(200).json({ message: "Blog deleted successfully." });
  } catch (err) {
    res.status(500).json({ message: "Error deleting blog." });
  }
};
export const updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found." });
    }
    blog.title = req.body.title || blog.title;
    blog.content = req.body.content || blog.content;
    if (req.file) {
      blog.image = `/uploads/${req.file.filename}`;
    }

    await blog.save();
    res.status(200).json(blog);
  } catch (err) {
    console.error("Error updating blog:", err);
    res.status(500).json({ message: "Error updating blog.", error: err.message });
  }
};